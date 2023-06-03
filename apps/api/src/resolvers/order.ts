import { OrderDetail, OrderStatus } from "src/entities/OrderDetail";
import { type MyContext } from "../types";
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { isVerified } from "src/middlewares/isVerified";
import { Cart } from "src/entities/Cart";
import { CreateOrderInput } from "./GqlObjets/OrderInput";
import { Promo } from "src/entities/Promo";
import { PaymentDetail, PaymentStatus } from "src/entities/PaymentDetail";
import { OrderItem } from "src/entities/OrderItem";
import { User } from "src/entities/User";
import { capitalize } from "src/utils/helpers";

@Resolver()
export class OrderResolver {
	@Query(() => [OrderDetail], { nullable: true })
	@UseMiddleware(isVerified)
	orders(@Ctx() { req }: MyContext) {
		return OrderDetail.find({
			relations: {
				orderitems: {
					inventory: {
						product: {
							images: true,
							category: true,
							inventories: {
								variants: {
									variant_value: {
										variant: true,
									},
								},
							},
						},
						variants: {
							variant_value: {
								variant: true,
							},
						},
					},
				},
				address: true,
				paymentdetails: true,
				promo: true,
			},
			where: { userId: req.session.userId },
			order: {
				created_at: "DESC",
			},
		});
	}

	@Query(() => OrderDetail, { nullable: true })
	@UseMiddleware(isVerified)
	orderById(
		@Arg("orderId", () => String) orderId: string,
		@Ctx() { req }: MyContext
	): Promise<OrderDetail | null> {
		return OrderDetail.findOne({
			relations: {
				orderitems: {
					inventory: {
						product: {
							images: true,
							category: true,
							inventories: {
								variants: {
									variant_value: {
										variant: true,
									},
								},
							},
						},
						variants: {
							variant_value: {
								variant: true,
							},
						},
					},
				},
				address: true,
				paymentdetails: true,
				promo: true,
			},
			where: { userId: req.session.userId, id: orderId },
		});
	}

	@Mutation(() => String)
	@UseMiddleware(isVerified)
	async createOrder(
		@Arg("options", () => CreateOrderInput) options: CreateOrderInput,
		@Ctx() { req }: MyContext
	): Promise<string> {
		// Getting Current User Information
		const userId = req.session.userId;
		const userRes = await User.findOneByOrFail({ id: userId });

		// Getting Cart Items
		const cartRes = await Cart.find({
			relations: {
				inventory: {
					product: {
						inventories: {
							variants: {
								variant_value: {
									variant: true,
								},
							},
						},
					},
				},
			},
			where: {
				userId,
			},
		});

		// Getting Promo Information by Promo Code
		const promo = await Promo.findOneBy({ code: options.promoCode });

		// Calculating Sub Total, Shipping, Discount and Total
		const subTotal = cartRes.reduce(
			(acc, item) => acc + item.inventory.price * item.quantity,
			0
		);
		const discount =
			(promo?.isDiscountAmountPercentage
				? (subTotal * promo.discount_amount) / 100
				: promo?.discount_amount) ?? 0;
		const shipping = options.shippingMethod === "standard" ? 150 : 300;
		const total = subTotal - discount + shipping;

		// Creating Order
		const orderRes = await OrderDetail.create({
			addressId: options.addressId,
			promoId: promo?.id,
			userId,
			status: "PENDING",
			amount: total,
		}).save();

		const reqUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

		const resposne = await fetch(
			"https://a.khalti.com/api/v2/epayment/initiate/",
			{
				method: "POST",
				body: JSON.stringify({
					return_url: `${reqUrl}/cart/checkout/result`,
					website_url: reqUrl,
					amount: total * 10,
					purchase_order_id: orderRes.id ?? "order-id",
					purchase_order_name: "Hamropasal Payment",
					customer_info: {
						name: `${userRes?.first_name} ${userRes?.last_name}`,
						email: userRes?.email,
						phone: userRes?.phone_number ?? 9800000000,
					},
					amount_breakdown: [
						{
							label: "Sub Total",
							amount: (subTotal - discount) * 10,
						},
						{
							label: "Shipping Charges",
							amount: shipping * 10,
						},
					],
					product_details: cartRes.map((item) => ({
						identity: `${item.inventory?.product.name}-${
							item.inventory?.variants
								?.map((variant) =>
									capitalize(variant.variant_value.value as string)
								)
								.sort()
								.join("-") ?? ""
						}`,
						name: item.inventory?.product.name,
						total_price: item.quantity * (item.inventory?.price ?? 0) * 10,
						quantity: item.quantity,
						unit_price: item.inventory?.price ?? 0 * 10,
					})),
				}),
				headers: {
					"content-type": "application/json",
					Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
				},
			}
		);

		const { pidx, payment_url } = await resposne.json();

		await OrderItem.insert(
			cartRes.map((cartitem) => ({
				inventoryId: cartitem.inventoryId,
				quantity: cartitem.quantity,
				orderId: orderRes.id,
			}))
		);

		await Cart.delete({
			userId,
		});

		await PaymentDetail.create({
			id: pidx,
			amount: total,
			provider: "khalti",
			orderId: orderRes.id,
			status: "PENDING",
		}).save();

		return payment_url as string;
	}

	@Mutation(() => String)
	@UseMiddleware(isVerified)
	async createPayment(
		@Arg("orderId", () => String) orderId: string,
		@Ctx() { req }: MyContext
	): Promise<string> {
		const orderRes = await OrderDetail.findOneOrFail({
			relations: {
				orderitems: {
					inventory: {
						product: {
							inventories: {
								variants: {
									variant_value: {
										variant: true,
									},
								},
							},
						},
					},
				},
				user: true,
				paymentdetails: true,
			},
			where: { id: orderId },
		});

		const successPayment = orderRes.paymentdetails.find(
			(payment) => payment.status === "COMPLETED"
		);

		if (successPayment) {
			throw new Error("Payment Already Completed");
		}

		const reqUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

		const resposne = await fetch(
			"https://a.khalti.com/api/v2/epayment/initiate/",
			{
				method: "POST",
				body: JSON.stringify({
					return_url: `${reqUrl}/cart/checkout/result`,
					website_url: reqUrl,
					amount: orderRes.amount * 10,
					purchase_order_id: orderRes.id ?? "order-id",
					purchase_order_name: "Hamropasal Payment",
					customer_info: {
						name: `${orderRes.user?.first_name} ${orderRes.user?.last_name}`,
						email: orderRes.user?.email,
						phone: orderRes.user?.phone_number ?? 9800000000,
					},
					amount_breakdown: [
						{
							label: "Re-attempt Payment",
							amount: orderRes.amount * 10,
						},
					],
					product_details: orderRes.orderitems.map((item) => ({
						identity: `${item.inventory?.product.name}-${
							item.inventory?.variants
								?.map((variant) =>
									capitalize(variant.variant_value.value as string)
								)
								.sort()
								.join("-") ?? ""
						}`,
						name: item.inventory?.product.name,
						total_price: item.quantity * (item.inventory?.price ?? 0) * 10,
						quantity: item.quantity,
						unit_price: item.inventory?.price ?? 0 * 10,
					})),
				}),
				headers: {
					"content-type": "application/json",
					Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
				},
			}
		);

		const { pidx, payment_url } = await resposne.json();

		await PaymentDetail.create({
			id: pidx,
			amount: orderRes.amount,
			provider: "khalti",
			orderId: orderId,
			status: "PENDING",
		}).save();

		return payment_url as string;
	}

	@Mutation(() => OrderDetail)
	@UseMiddleware(isVerified)
	async updateStatus(
		@Arg("pidx", () => String) pidx: string,
		@Arg("orderId", () => String) orderId: string,
		@Ctx() { req }: MyContext
	): Promise<OrderDetail> {
		const resposne = await fetch(
			"https://a.khalti.com/api/v2/epayment/lookup/",
			{
				method: "POST",
				body: JSON.stringify({
					pidx,
				}),
				headers: {
					"content-type": "application/json",
					Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
				},
			}
		);

		const data = await resposne.json();

		const paymentStatus = data.status.toUpperCase() as PaymentStatus;
		let orderStatus: OrderStatus;

		switch (data.status) {
			case "Pending":
				orderStatus = "PENDING";
				break;

			case "Initiated":
				orderStatus = "PENDING";
				break;

			case "Completed":
				orderStatus = "PLACED";
				break;

			case "Refunded":
				orderStatus = "REJECTED";
				break;

			default:
				orderStatus = "PENDING";
				break;
		}

		await PaymentDetail.save({
			id: data.pidx,
			status: paymentStatus,
			transactionId: data.transaction_id,
		});

		await OrderDetail.update(
			{ id: orderId, userId: req.session.userId },
			{
				status: orderStatus,
			}
		);

		return OrderDetail.findOneOrFail({
			relations: {
				orderitems: {
					inventory: {
						product: {
							images: true,
							category: true,
							inventories: {
								variants: {
									variant_value: {
										variant: true,
									},
								},
							},
						},
						variants: {
							variant_value: {
								variant: true,
							},
						},
					},
				},
				address: true,
				paymentdetails: true,
				promo: true,
			},
			where: { id: orderId, userId: req.session.userId },
		});
	}
}

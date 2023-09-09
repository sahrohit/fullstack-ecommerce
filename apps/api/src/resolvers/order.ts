import { OrderDetail, OrderStatus } from "../entities/OrderDetail";
import { type MyContext } from "../types";
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { isVerified } from "../middlewares/isVerified";
import { Cart } from "../entities/Cart";
import {
	CreatePaymentResponse,
	CreateOrderInput,
} from "./GqlObjets/OrderInput";
import { Promo } from "../entities/Promo";
import { PaymentDetail, PaymentStatus } from "../entities/PaymentDetail";
import { OrderItem } from "../entities/OrderItem";
import { capitalize } from "../utils/helpers";
import { nanoid } from "nanoid";
import { ESEWA_MERCHANT_CODE } from "../constants";
import { ShippingMethod } from "../entities/ShippingMethod";

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

	@Mutation(() => OrderDetail)
	@UseMiddleware(isVerified)
	async createOrder(
		@Arg("options", () => CreateOrderInput) options: CreateOrderInput,
		@Ctx() { req }: MyContext
	): Promise<OrderDetail> {
		// Getting Current User Information
		const userId = req.session.userId;

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

		const shippingResponse = await ShippingMethod.findOne({
			where: {
				id: options.shippingId,
			},
		});

		const shipping = (shippingResponse?.price ?? 0) / 100;
		const total = subTotal - discount + shipping;

		// Creating Order
		const orderRes = await OrderDetail.create({
			addressId: options.addressId,
			promoId: promo?.id,
			userId,
			shippingId: options.shippingId,
			status: "PENDING",
			amount: total,
		}).save();

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

		return orderRes;
	}

	// @Mutation(() => String)
	// @UseMiddleware(isVerified)
	// async createOrder(
	// 	@Arg("options", () => CreateOrderInput) options: CreateOrderInput,
	// 	@Ctx() { req }: MyContext
	// ): Promise<string> {
	// 	// Getting Current User Information
	// 	const userId = req.session.userId;
	// 	const userRes = await User.findOneByOrFail({ id: userId });

	// 	// Getting Cart Items
	// 	const cartRes = await Cart.find({
	// 		relations: {
	// 			inventory: {
	// 				product: {
	// 					inventories: {
	// 						variants: {
	// 							variant_value: {
	// 								variant: true,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 		where: {
	// 			userId,
	// 		},
	// 	});

	// 	// Getting Promo Information by Promo Code
	// 	const promo = await Promo.findOneBy({ code: options.promoCode });

	// 	// Calculating Sub Total, Shipping, Discount and Total
	// 	const subTotal = cartRes.reduce(
	// 		(acc, item) => acc + item.inventory.price * item.quantity,
	// 		0
	// 	);
	// 	const discount =
	// 		(promo?.isDiscountAmountPercentage
	// 			? (subTotal * promo.discount_amount) / 100
	// 			: promo?.discount_amount) ?? 0;
	// 	const shipping = options.shippingMethod === "standard" ? 150 : 300;
	// 	const total = subTotal - discount + shipping;

	// 	// Creating Order
	// 	const orderRes = await OrderDetail.create({
	// 		addressId: options.addressId,
	// 		promoId: promo?.id,
	// 		userId,
	// 		status: "PENDING",
	// 		amount: total,
	// 	}).save();

	// 	const resposne = await fetch(
	// 		"https://a.khalti.com/api/v2/epayment/initiate/",
	// 		{
	// 			method: "POST",
	// 			body: JSON.stringify({
	// 				return_url: `${process.env.CLIENT_URL}/cart/checkout/result`,
	// 				website_url: process.env.CLIENT_URL,
	// 				amount: 7000,
	// 				purchase_order_id: orderRes.id ?? "order-id",
	// 				purchase_order_name: "Hamropasal Payment",
	// 				customer_info: {
	// 					name: `${userRes?.first_name} ${userRes?.last_name}`,
	// 					email: userRes?.email,
	// 					phone: userRes?.phone_number ?? 9800000000,
	// 				},
	// 				amount_breakdown: [
	// 					{
	// 						label: `Sub Total ${(subTotal - discount) / 100}`,
	// 						amount: 5000,
	// 					},
	// 					{
	// 						label: `Shipping Charges ${shipping / 100}`,
	// 						amount: 2000,
	// 					},
	// 				],
	// 				product_details: cartRes.map((item) => ({
	// 					identity: `${item.inventory?.product.name}-${
	// 						item.inventory?.variants
	// 							?.map((variant) =>
	// 								capitalize(variant.variant_value.value as string)
	// 							)
	// 							.sort()
	// 							.join("-") ?? ""
	// 					}`,
	// 					name: item.inventory?.product.name,
	// 					total_price: item.quantity * (item.inventory?.price ?? 0) * 10,
	// 					quantity: item.quantity,
	// 					unit_price: item.inventory?.price ?? 0 * 10,
	// 				})),
	// 			}),
	// 			headers: {
	// 				"content-type": "application/json",
	// 				Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
	// 			},
	// 		}
	// 	);

	// 	const { pidx, payment_url } = await resposne.json();

	// 	await OrderItem.insert(
	// 		cartRes.map((cartitem) => ({
	// 			inventoryId: cartitem.inventoryId,
	// 			quantity: cartitem.quantity,
	// 			orderId: orderRes.id,
	// 		}))
	// 	);

	// 	await Cart.delete({
	// 		userId,
	// 	});

	// 	await PaymentDetail.create({
	// 		id: pidx,
	// 		amount: total,
	// 		provider: "khalti",
	// 		orderId: orderRes.id,
	// 		status: "PENDING",
	// 	}).save();

	// 	return payment_url as string;
	// }

	@Mutation(() => CreatePaymentResponse)
	@UseMiddleware(isVerified)
	async createPayment(
		@Arg("orderId", () => String) orderId: string,
		@Arg("provider", () => String) provider: string
	): Promise<CreatePaymentResponse> {
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
				shipping: true,
			},
			where: { id: orderId },
		});

		const successPayment = orderRes.paymentdetails.find(
			(payment) => payment.status === "COMPLETED"
		);

		if (successPayment) {
			throw new Error("Payment Already Completed");
		}

		// Getting Promo Information by Promo Code
		const promo = await Promo.findOneBy({ id: orderRes.promoId });

		// Calculating Sub Total, Shipping, Discount and Total
		const subTotal = orderRes.orderitems.reduce(
			(acc, item) => acc + item.inventory.price * item.quantity,
			0
		);
		const discount =
			(promo?.isDiscountAmountPercentage
				? (subTotal * promo.discount_amount) / 100
				: promo?.discount_amount) ?? 0;

		switch (provider) {
			case "khalti":
				const resposne = await fetch(
					"https://a.khalti.com/api/v2/epayment/initiate/",
					{
						method: "POST",
						body: JSON.stringify({
							return_url: `${process.env.CLIENT_URL}/cart/checkout/result`,
							website_url: process.env.CLIENT_URL,
							amount: 7000,
							purchase_order_id: orderRes.id ?? "order-id",
							purchase_order_name: "Hamropasal Payment",
							customer_info: {
								name: `${orderRes.user?.first_name} ${orderRes.user?.last_name}`,
								email: orderRes.user?.email,
								phone: orderRes.user?.phone_number ?? 9800000000,
							},
							amount_breakdown: [
								{
									label: `Sub Total ${(subTotal - discount) / 100}`,
									amount: 5000,
								},
								{
									label: `Shipping Charges ${orderRes.shipping.price / 100}`,
									amount: 2000,
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

				return {
					provider: "khalti",
					paymentUrl: payment_url as string,
				};

			case "esewa":
				await PaymentDetail.create({
					id: nanoid(),
					amount: orderRes.amount,
					provider: "esewa",
					orderId: orderId,
					status: "PENDING",
				}).save();

				return {
					provider: "esewa",
					amt: orderRes.amount,
					psc: 0,
					pdc: 0,
					txAmt: 0,
					tAmt: orderRes.amount,
					pid: orderRes.id,
					scd: ESEWA_MERCHANT_CODE,
				};

			default:
				throw new Error("Provider Not Selected");
		}
	}

	@Mutation(() => OrderDetail)
	@UseMiddleware(isVerified)
	async updateStatus(
		@Arg("orderId", () => String) orderId: string,
		@Ctx() { req }: MyContext,
		@Arg("pidx", () => String, { nullable: true }) pidx?: string,
		@Arg("refId", () => String, { nullable: true }) refId?: string
	): Promise<OrderDetail> {
		if (pidx) {
			// Khalti Payment
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
		} else if (refId) {
			const orderRes = await OrderDetail.findOneOrFail({
				where: { id: orderId, userId: req.session.userId },
			});

			// Esewa Payment
			const body = new FormData();
			body.set("amt", orderRes.amount.toString());
			body.set("rid", refId);
			body.set("pid", orderId);
			body.set("scd", ESEWA_MERCHANT_CODE);

			const response = await fetch("https://uat.esewa.com.np/epay/transrec", {
				method: "POST",
				body,
			});

			const xmlResponse = await response.text();

			const orderStatus = xmlResponse.toLowerCase().includes("success")
				? "COMPLETED"
				: "FAILED";

			await PaymentDetail.update(
				{
					orderId: orderId,
				},
				{
					status: orderStatus,
					transactionId: refId,
				}
			);

			await OrderDetail.update(
				{ id: orderId, userId: req.session.userId },
				{
					status: orderStatus === "COMPLETED" ? "PLACED" : "PENDING",
				}
			);
		}

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
				shipping: true,
				promo: true,
			},
			where: { id: orderId, userId: req.session.userId },
		});
	}
}

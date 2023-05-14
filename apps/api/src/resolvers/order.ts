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
import { CreateOrderInput, CreatePaymentInput } from "./GqlObjets/OrderInput";
import { Promo } from "src/entities/Promo";
import { PaymentDetail, PaymentStatus } from "src/entities/PaymentDetail";
import { OrderItem } from "src/entities/OrderItem";

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
		const userId = req.session.userId;

		const cartRes = await Cart.find({
			relations: {
				inventory: true,
			},
			where: {
				userId,
			},
		});

		const promo = await Promo.findOneBy({ code: options.promoCode });

		const orderRes = await OrderDetail.create({
			addressId: options.addressId,
			promoId: promo?.id,
			userId,
			status: "PENDING",
		}).save();

		await OrderItem.insert(
			cartRes.map((cartitem) => ({
				inventoryId: cartitem.inventoryId,
				quantity: cartitem.quantity,
				orderId: orderRes.id,
			}))
		);

		return OrderDetail.findOneByOrFail({ id: orderRes.id });
	}

	@Mutation(() => PaymentDetail)
	@UseMiddleware(isVerified)
	async createPayment(
		@Arg("options", () => CreatePaymentInput) options: CreatePaymentInput,
		@Ctx() { req }: MyContext
	): Promise<PaymentDetail> {
		const userId = req.session.userId;
		const cartRes = await Cart.find({
			relations: {
				inventory: true,
			},
			where: {
				userId,
			},
		});

		const promo = await Promo.findOneBy({ code: options.promoCode });

		const subTotal = cartRes.reduce(
			(accumulator, item) => accumulator + item.quantity * item.inventory.price,
			0
		);
		const discountAmount =
			(promo?.isDiscountAmountPercentage
				? (subTotal * promo.discount_amount) / 100
				: promo?.discount_amount) ?? 0;

		const total = subTotal - discountAmount;

		return PaymentDetail.create({
			id: options.pidx,
			amount: total,
			provider: options.provider,
			orderId: options.orderId,
			status: "PENDING",
		}).save();
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

		let paymentStatus: PaymentStatus;
		let orderStatus: OrderStatus;

		switch (data.status) {
			case "Pending":
				paymentStatus = "PENDING";
				orderStatus = "PENDING";
				break;

			case "Completed":
				paymentStatus = "COMPLETED";
				orderStatus = "PLACED";
				break;

			case "Initiated":
				paymentStatus = "COMPLETED";
				orderStatus = "PLACED";
				break;

			case "Refunded":
				paymentStatus = "REFUNDED";
				orderStatus = "REJECTED";
				break;

			default:
				paymentStatus = "PENDING";
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

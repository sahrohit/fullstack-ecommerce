import { OrderDetail } from "src/entities/OrderDetail";
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
import OrderInput from "./GqlObjets/OrderInput";
import { Promo } from "src/entities/Promo";
import { PaymentDetail } from "src/entities/PaymentDetail";

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
							category: true,
							images: true,
						},
					},
				},
			},
			where: { userId: req.session.userId },
		});
	}

	@Mutation(() => OrderDetail)
	@UseMiddleware(isVerified)
	async createOrder(
		@Arg("options", () => OrderInput) options: OrderInput,
		@Ctx() { req }: MyContext
	): Promise<OrderDetail> {
		const userId = req.session.userId;
		const cartRes = await Cart.find({
			relations: {
				inventory: {
					price: true,
				},
				quantity: true,
			},
			where: {
				userId,
			},
		});

		const promo = await Promo.findOneBy({ code: options.promoCode });

		const subTotal = cartRes.reduce(
			(accumulator, item) =>
				accumulator + item.quantity * item!.inventory!.price,
			0
		);

		const discountAmount =
			(promo?.isDiscountAmountPercentage
				? (subTotal * promo.discount_amount) / 100
				: promo?.discount_amount) ?? 0;

		const total = subTotal - discountAmount;
		const orderRes = await OrderDetail.create({
			addressId: options.addressId,
			promoId: promo?.id,
			userId,
			status: "PENDING",
		}).save();

		await PaymentDetail.create({
			id: options.pidx,
			amount: total,
			provider: options.provider,
			orderId: orderRes.id,
			status: "PENDING",
		}).save();

		return OrderDetail.findOneByOrFail({ id: orderRes.id });
	}
}

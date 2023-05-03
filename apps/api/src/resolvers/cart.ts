import { Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Cart } from "../entities/Cart";
import type { MyContext } from "../types";
import { isVerified } from "src/middlewares/isVerified";

@Resolver(Cart)
export class CartResolver {
	@Query(() => [Cart], { nullable: true })
	async fetchCartItems(@Ctx() { req }: MyContext): Promise<Cart[]> {
		return await Cart.find({
			relations: {
				variant: {
					inventory: {
						product: true,
					},
					variant_value: {
						variant: true,
					},
				},
			},
			where: { userId: req.session?.userId },
		});
	}

	// @Mutation(() => Cart)
	// @UseMiddleware(isVerified)
	// async addToCart(
	// 	@Arg("inventoryId", () => Int) inventoryId: number,
	// 	@Arg("quantity", () => Int) quantity: number,
	// 	@Ctx() { req }: MyContext
	// ): Promise<Cart> {
	// 	const cart = await Cart.findOne({
	// 		where: { userId: req.session?.userId, inventoryId },
	// 	});

	// 	if (cart) {
	// 		cart.quantity += quantity;
	// 		return cart.save();
	// 	}

	// 	return Cart.create({
	// 		userId: req.session?.userId,
	// 		inventoryId: inventoryId,
	// 		quantity: quantity,
	// 	}).save();
	// }

	// @Mutation(() => Cart)
	// @UseMiddleware(isVerified)
	// async updateCart(
	// 	@Arg("inventoryId", () => Int) inventoryId: number,
	// 	@Arg("quantity", () => Int) quantity: number,
	// 	@Ctx() { req }: MyContext
	// ): Promise<Cart> {
	// 	const cart = await Cart.findOne({
	// 		where: { userId: req.session?.userId, inventoryId },
	// 	});

	// 	if (cart) {
	// 		cart.quantity = quantity;
	// 		return cart.save();
	// 	}

	// 	return Cart.create({
	// 		userId: req.session?.userId,
	// 		inventoryId: inventoryId,
	// 		quantity: quantity,
	// 	}).save();
	// }

	// @Mutation(() => Boolean)
	// @UseMiddleware(isVerified)
	// async deleteFromCart(
	// 	@Arg("inventoryId", () => Int) inventoryId: number,
	// 	@Arg("quantity", () => Int) quantity: number,
	// 	@Ctx() { req }: MyContext
	// ): Promise<boolean> {
	// 	const cart = await Cart.findOne({
	// 		where: { userId: req.session?.userId, inventoryId },
	// 	});

	// 	if (cart?.quantity === quantity) {
	// 		await cart.remove();
	// 		return true;
	// 	}

	// 	if (cart) {
	// 		cart.quantity = cart.quantity - quantity;
	// 		cart.save();
	// 		return true;
	// 	}
	// 	return false;
	// }

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async clearCart(@Ctx() { req }: MyContext): Promise<boolean> {
		await Cart.delete({ userId: req.session?.userId });
		return true;
	}
}

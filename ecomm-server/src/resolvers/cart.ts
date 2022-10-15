import { AppDataSource } from "../data-source";
import { isVerified } from "../middlewares/isVerified";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { Cart } from "../entities/Cart";
import { MyContext } from "../types";
import CartResponse from "./GqlObjets/CartResponse";

const CART_QUERY_SQL = `
	SELECT c.*,
		p.name "product_name",
		p.desc "product_desc",
		p.identifier "product_identifier",
		p."categoryId" "categoryId",
		pi.images "images"
	FROM cart c
			LEFT JOIN product p ON c."productId" = p.id
				LEFT JOIN LATERAL (
		SELECT json_agg(json_build_object(
				'image_id', pi.id,
				'imageURL', pi."imageURL"
			)) AS images
		FROM product_image pi
		WHERE p.id = pi."productId") pi ON true
`;

@Resolver(Cart)
export class CartResolver {
	@Query(() => [CartResponse], { nullable: true })
	async fetchCartItems(@Ctx() { req }: MyContext): Promise<CartResponse> {
		// return Cart.find({ where: { userId: 12 } });
		const cart = await AppDataSource.query(
			`
			${CART_QUERY_SQL}
			WHERE "userId" = $1;
    		`,
			[12]
		);
		console.log(cart);
		return cart;
	}

	@Mutation(() => Cart)
	// @UseMiddleware(isVerified)
	async addToCart(
		@Arg("productId", () => Int) productId: number,
		@Arg("quantity", () => Int) quantity: number,
		@Ctx() { req }: MyContext
	): Promise<Cart> {
		const cart = await Cart.findOne({ where: { userId: 12, productId } });

		if (cart) {
			cart.quantity += quantity;
			return cart.save();
		}

		return Cart.create({
			userId: 12,
			productId: productId,
			quantity: quantity,
		}).save();
	}

	@Mutation(() => Cart)
	// @UseMiddleware(isVerified)
	async updateCart(
		@Arg("productId", () => Int) productId: number,
		@Arg("quantity", () => Int) quantity: number,
		@Ctx() { req }: MyContext
	): Promise<Cart> {
		const cart = await Cart.findOne({ where: { userId: 12, productId } });

		if (cart) {
			cart.quantity = quantity;
			return cart.save();
		}

		return Cart.create({
			userId: 12,
			productId: productId,
			quantity: quantity,
		}).save();
	}

	// @Mutation(() => Boolean)
	// // @UseMiddleware(isVerified)
	// async increamentCart(
	// 	@Arg("cartId", () => Int) cartId: number,
	// 	@Ctx() { req }: MyContext
	// ): Promise<boolean> {
	// 	const cart = await Cart.findOne({ where: { id: cartId } });
	// 	if (cart) {
	// 		cart.quantity = cart.quantity + 1;
	// 		await cart.save();
	// 		return true;
	// 	}
	// 	return false;
	// }

	// @Mutation(() => Boolean)
	// // @UseMiddleware(isVerified)
	// async decreamentCart(
	// 	@Arg("cartId", () => Int) cartId: number,
	// 	@Ctx() { req }: MyContext
	// ): Promise<boolean> {
	// 	const cart = await Cart.findOne({ where: { id: cartId } });
	// 	if (cart) {
	// 		cart.quantity = cart.quantity - 1;
	// 		await cart.save();
	// 		return true;
	// 	}
	// 	return false;
	// }

	@Mutation(() => Boolean)
	// @UseMiddleware(isVerified)
	async deleteFromCart(
		@Arg("productId", () => Int) productId: number,
		@Arg("quantity", () => Int) quantity: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		const cart = await Cart.findOne({ where: { userId: 12, productId } });

		if (cart?.quantity === quantity) {
			await cart.remove();
			return true;
		}

		if (cart) {
			cart.quantity = cart.quantity - quantity;
			cart.save();
			return true;
		}
		return false;
	}

	@Mutation(() => Boolean)
	// @UseMiddleware(isVerified)
	async clearCart(@Ctx() { req }: MyContext): Promise<boolean> {
		await Cart.delete({ userId: 12 });
		return true;
	}
}

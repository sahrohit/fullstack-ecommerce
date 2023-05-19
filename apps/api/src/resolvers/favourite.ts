import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { Favourite } from "src/entities/Favourite";
import { isVerified } from "src/middlewares/isVerified";
import type { MyContext } from "../types";

@Resolver(Favourite)
export class FavouriteResolver {
	@Query(() => [Favourite])
	@UseMiddleware(isVerified)
	async favourites(@Ctx() { req }: MyContext): Promise<Favourite[]> {
		return await Favourite.find({ where: { userId: req.session?.userId } });
	}

	@Query(() => [Favourite])
	async favouritesWithProduct(@Ctx() { req }: MyContext): Promise<Favourite[]> {
		return await Favourite.find({
			relations: {
				product: {
					inventories: {
						variants: {
							variant_value: {
								variant: true,
							},
						},
					},
					category: true,
					images: true,
					discount: true,
				},
			},
			where: { userId: req.session?.userId },
		});
	}

	@Mutation(() => Favourite)
	@UseMiddleware(isVerified)
	async addToFavourite(
		@Arg("productId", () => Int) productId: number,
		@Ctx() { req }: MyContext
	): Promise<Favourite> {
		return await Favourite.create({
			productId,
			userId: req.session?.userId,
		}).save();
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async removeFromFavourite(
		@Arg("productId", () => Int) productId: number,
		@Ctx() { req }: MyContext
	): Promise<Boolean> {
		await Favourite.delete({ productId, userId: req.session?.userId });
		return true;
	}
}

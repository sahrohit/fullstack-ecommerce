import { isVerified } from "src/middlewares/isVerified";
import {
	Arg,
	FieldResolver,
	Int,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { ProductReview } from "src/entities/ProductReview";
import { User } from "src/entities/User";

@Resolver(ProductReview)
export class ReviewResolver {
	@FieldResolver(() => User)
	user(@Root() review: ProductReview) {
		if (review.isAnonymous) {
			return {
				first_name: "Anonymous",
				last_name: "",
			};
		}
		return {
			first_name: review.user.first_name,
			last_name: review.user.last_name,
		};
	}

	@Query(() => [ProductReview], { nullable: true })
	@UseMiddleware(isVerified)
	async reviews(@Arg("productId", () => Int) productId: number) {
		return ProductReview.find({
			relations: {
				user: true,
			},
			where: { productId },
		});
	}
}

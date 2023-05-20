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
import ReviewSummaryResponse from "./GqlObjets/ReviewResponse";

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

	@Query(() => ReviewSummaryResponse, { nullable: true })
	@UseMiddleware(isVerified)
	async reviewSummary(
		@Arg("productId", () => Int) productId: number
	): Promise<ReviewSummaryResponse | undefined> {
		return ProductReview.createQueryBuilder("product_review")
			.where("product_review.productId = :productId", { productId })
			.select("COUNT(product_review.id)", "count")
			.addSelect("AVG(product_review.rating)", "rating")
			.getRawOne();
	}

	@Query(() => [ProductReview], { nullable: true })
	@UseMiddleware(isVerified)
	async reviews(@Arg("productId", () => Int) productId: number) {
		return ProductReview.find({
			relations: {
				user: true,
			},
			where: { productId },
			take: 3,
			order: {
				rating: "DESC",
				desc: "DESC",
			},
		});
	}

	@Query(() => [ProductReview], { nullable: true })
	@UseMiddleware(isVerified)
	async allReviews(@Arg("productId", () => Int) productId: number) {
		return ProductReview.find({
			relations: {
				user: true,
			},
			where: { productId },
		});
	}
}

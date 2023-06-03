import { isVerified } from "src/middlewares/isVerified";
import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { ProductReview } from "src/entities/ProductReview";
import { User } from "src/entities/User";
import ReviewSummaryResponse from "./GqlObjets/ReviewResponse";
import type { MyContext } from "src/types";
import { OrderDetail } from "src/entities/OrderDetail";

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
	async allReviews(@Arg("productId", () => Int) productId: number) {
		return ProductReview.find({
			relations: {
				user: true,
			},
			where: { productId },
		});
	}

	@Query(() => ProductReview, { nullable: true })
	@UseMiddleware(isVerified)
	async reviewByUserAndProduct(
		@Arg("productId", () => Int) productId: number,
		@Ctx() { req }: MyContext
	): Promise<ProductReview | null> {
		return ProductReview.findOne({
			relations: {
				user: true,
			},
			where: {
				productId,
				user: {
					id: req.session.userId,
				},
			},
		});
	}

	@Mutation(() => ProductReview, { nullable: true })
	@UseMiddleware(isVerified)
	async addReview(
		@Arg("productId", () => Int) productId: number,
		@Arg("rating", () => Int) rating: number,
		@Arg("review", () => String) review: string,
		@Arg("desc", () => String) desc: string,
		@Arg("isAnonymous", () => Boolean) isAnonymous: boolean,
		@Ctx() { req }: MyContext
	) {
		const orderRes = await OrderDetail.findOne({
			relations: {
				orderitems: {
					inventory: { product: true },
				},
			},
			where: {
				orderitems: {
					inventory: {
						product: {
							id: productId,
						},
					},
				},
				userId: req.session.userId,
			},
		});

		// Check if the user has ordered the product
		if (!orderRes) {
			return null;
		}

		return ProductReview.create({
			productId,
			rating,
			review,
			desc,
			isAnonymous,
			userId: req.session.userId,
		}).save();
	}

	@Mutation(() => ProductReview, { nullable: true })
	@UseMiddleware(isVerified)
	async updateReview(
		@Arg("productId", () => Int) productId: number,
		@Arg("rating", () => Int) rating: number,
		@Arg("review", () => String) review: string,
		@Arg("desc", () => String) desc: string,
		@Arg("isAnonymous", () => Boolean) isAnonymous: boolean,
		@Ctx() { req }: MyContext
	) {
		const reviewRes = await ProductReview.findOneOrFail({
			where: {
				productId,
				userId: req.session.userId,
			},
		});

		return ProductReview.save({
			...reviewRes,
			rating,
			review,
			desc,
			isAnonymous,
		});
	}
}

import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { Product } from "../entities/Product";
import { Between } from "typeorm";
import { ProductInventory } from "../entities/ProductInventory";
import { ProductImage } from "../entities/ProductImage";

@ObjectType()
class ProductSummary {
	@Field(() => Int)
	max!: number;

	@Field(() => Int)
	min!: number;

	@Field(() => Int)
	count!: number;
}

@ObjectType()
class PaginatedProducts {
	@Field(() => [Product])
	products!: Product[];

	@Field(() => Boolean)
	hasMore!: boolean;
}

@Resolver(Product)
export class ProductResolver {
	@Query(() => ProductSummary, { nullable: true })
	async productsSummary() {
		const query = ProductInventory.createQueryBuilder("pi");
		query.select("MAX(pi.price)", "max");
		query.addSelect("MIN(pi.price)", "min");
		query.addSelect("COUNT(pi.inventory_id)", "count");

		const { max = 99999, min = 0, count = 0 } = await query.getRawOne();

		return {
			max,
			min,
			count,
		};
	}

	@Query(() => [Product], { nullable: true })
	async searchProducts(
		@Arg("query") query: string,
		@Arg("limit", () => Int, { nullable: true }) limit: number
	): Promise<Product[]> {
		return Product.createQueryBuilder("p")
			.select()
			.leftJoinAndMapMany("p.images", ProductImage, "pi", "pi.productId = p.id")
			.where("document_with_weights @@ plainto_tsquery(:query)", {
				query: `${query}:*`,
			})
			.where("pi.sequence = 0")
			.orderBy(
				"ts_rank(document_with_weights, plainto_tsquery(:query))",
				"DESC"
			)
			.limit(limit ?? null)
			.getMany();
	}

	@Query(() => PaginatedProducts, { nullable: true })
	async queryProducts(
		@Arg("query") query: string,
		@Arg("sort", { nullable: true }) sort?: string,
		@Arg("limit", { nullable: true }) limit?: number,
		@Arg("offset", { nullable: true }) offset?: number
	): Promise<PaginatedProducts> {
		const realLimit = Math.min(30, limit ?? 30);
		const realLimitPlusOne = realLimit + 1;
		try {
			const variants = JSON.parse(query);

			const LOWERPRICE = variants?.lowerPrice ?? 0;
			const HIGHERPRICE =
				variants?.higherPrice ??
				(
					await ProductInventory.findOne({
						select: ["price"],
						where: { isPublished: true },
						order: { price: "DESC" },
					})
				)?.price;

			delete variants?.lowerPrice;
			delete variants?.higherPrice;

			let productQuery: any = [];

			Object.keys(variants)?.forEach(function (key) {
				productQuery.push({
					value: variants[key],
					variant: {
						variant_name: key,
					},
				});
			});

			const products = await Product.find({
				relations: {
					inventories: true,
					images: true,
					discount: true,
					reviews: true,
				},
				where: {
					images: {
						sequence: 0,
					},
					inventories: {
						price: Between(LOWERPRICE, HIGHERPRICE),

						variants: {
							variant_value: [...productQuery],
						},
						isPublished: true,
					},
				},
				take: realLimitPlusOne,
				skip: offset ?? 0,
				order: {
					created_at: sort === "newest" ? "DESC" : "ASC",
					// inventories: {
					// 	price:
					// 		(sort === "price-low-to-high" && "ASC") ||
					// 		(sort === "price-high-to-low" && "DESC") ||
					// 		undefined,
					// 	quantity: sort === "popularity" ? "DESC" : undefined,
					// },
				},
			});

			return {
				products: products.slice(0, realLimit),
				hasMore: products.length === realLimitPlusOne,
			};
		} catch (error) {
			const products = await Product.find({
				relations: {
					inventories: true,
					images: true,
					discount: true,
					reviews: true,
				},
				where: {
					images: {
						sequence: 0,
					},
					inventories: {
						isPublished: true,
					},
				},
				order: {
					created_at: sort === "newest" ? "DESC" : "ASC",
				},
			});

			return {
				products: products.slice(0, realLimit),
				hasMore: products.length === realLimitPlusOne,
			};
		}
	}

	@Query(() => [Product], { nullable: true })
	async products(): Promise<Product[]> {
		return await Product.find({
			relations: {
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
			where: {
				inventories: {
					isPublished: true,
				},
			},
		});
	}

	@Query(() => Product, { nullable: true })
	async product(
		@Arg("identifier") identifier: string
	): Promise<Product | null> {
		return await Product.findOne({
			relations: {
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
			where: {
				identifier: identifier,
				inventories: {
					isPublished: true,
				},
			},
		});
	}
}

import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { Product } from "../entities/Product";
import { Between } from "typeorm";
import { ProductInventory } from "src/entities/ProductInventory";
import { ProductImage } from "src/entities/ProductImage";

@ObjectType()
class ProductSummary {
	@Field(() => Int)
	max!: number;

	@Field(() => Int)
	min!: number;

	@Field(() => Int)
	count!: number;
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
		@Arg("limit", { nullable: true }) limit: number
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

	@Query(() => [Product], { nullable: true })
	async queryProducts(@Arg("query") query: string): Promise<Product[]> {
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

			return await Product.find({
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
			});
		} catch (error) {
			console.error(error);
			return await Product.find({
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
			});
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

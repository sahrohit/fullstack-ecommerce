import { Arg, Query, Resolver } from "type-graphql";
import { Product } from "../entities/Product";
import { Between } from "typeorm";
import { ProductInventory } from "src/entities/ProductInventory";

@Resolver(Product)
export class ProductResolver {
	@Query(() => Number, { nullable: true })
	async expensiveProduct() {
		const { price } = await ProductInventory.findOneOrFail({
			select: ["price"],
			where: { isPublished: true },
			order: { price: "DESC" },
		});
		return price;
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

import { Arg, Query, Resolver } from "type-graphql";
import { Product } from "../entities/Product";

@Resolver(Product)
export class ProductResolver {
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

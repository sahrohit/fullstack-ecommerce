import { AppDataSource } from "../data-source";
import {
	Arg,
	Field,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from "type-graphql";
import { ProductCategory } from "../entities/ProductCategory";
import UpdateCategoryInput from "./GqlObjets/UpdateCategoryInput";

@ObjectType()
class ProductCategoryWithProductCount extends ProductCategory {
	@Field(() => Int)
	product_count?: number;
}

@Resolver()
export class CategoryResolver {
	@Query(() => [ProductCategory])
	async categories(): Promise<ProductCategory[]> {
		return ProductCategory.find({
			relations: ["products"],
			order: {
				id: "ASC",
			},
		});
	}

	@Query(() => [ProductCategoryWithProductCount], { nullable: true })
	async categoriesSummary(): Promise<ProductCategoryWithProductCount[]> {
		const categories = await AppDataSource.query(
			`
			SELECT count(p.id)  product_count, pca.*
			FROM product_category pca
         	LEFT OUTER JOIN product p on pca.id = p."categoryId"
			GROUP BY pca.id
			ORDER BY pca.name
    		`
		);
		return categories;
	}

	@Mutation(() => ProductCategory)
	async addCategory(
		@Arg("name") name: string,
		@Arg("desc") desc: string,
		@Arg("identifier") identifier: string
	): Promise<ProductCategory> {
		return ProductCategory.create({ name, desc, identifier }).save();
	}

	@Mutation(() => ProductCategory)
	async updateCategory(
		@Arg("id") id: number,
		@Arg("options") options: UpdateCategoryInput
	): Promise<ProductCategory> {
		await ProductCategory.save({ id, ...options });
		return ProductCategory.findOneByOrFail({
			id,
		});
	}

	@Mutation(() => Boolean)
	async deleteCategory(@Arg("id") id: number): Promise<boolean> {
		await ProductCategory.delete({ id });
		return true;
	}
}

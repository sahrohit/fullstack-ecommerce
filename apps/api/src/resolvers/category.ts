import { AppDataSource } from "../data-source";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProductCategory } from "../entities/ProductCategory";
import ProductCategorySummary from "./GqlObjets/ProductCategorySummary";
import UpdateCategoryInput from "./GqlObjets/UpdateCategoryInput";

@Resolver()
export class CategoryResolver {
	@Query(() => [ProductCategory])
	async categories(): Promise<ProductCategory[]> {
		return ProductCategory.find({
			order: {
				id: "ASC",
			},
		});
	}

	@Query(() => [ProductCategorySummary], { nullable: true })
	async categoriesSummary(): Promise<ProductCategorySummary[]> {
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
		const result = await ProductCategory.createQueryBuilder()
			.update(ProductCategory)
			.set({ ...options })
			.where("id = :id", { id })
			.returning("*")
			.execute();
		return result.raw[0];
	}

	@Mutation(() => Boolean)
	async deleteCategory(@Arg("id") id: number): Promise<boolean> {
		await ProductCategory.delete({ id });
		return true;
	}
}

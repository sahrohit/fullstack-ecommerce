import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProductCategory } from "../entities/ProductCategory";
import UpdateCategoryInput from "./GqlObjets/UpdateCategoryInput";

@Resolver()
export class CategoryResolver {
	@Query(() => [ProductCategory])
	async categories(): Promise<ProductCategory[]> {
		return ProductCategory.find();
	}

	@Mutation(() => ProductCategory)
	async addCategory(
		@Arg("name") name: string,
		@Arg("desc") desc: string
	): Promise<ProductCategory> {
		return ProductCategory.create({ name, desc }).save();
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

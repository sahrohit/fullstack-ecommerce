import { AppDataSource } from "../data-source";
import {
	Arg,
	Ctx,
	Field,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from "type-graphql";
import { ProductCategory } from "../entities/ProductCategory";
import UpdateCategoryInput from "./GqlObjets/UpdateCategoryInput";
import { MyContext } from "../types";

@ObjectType()
class ProductCategoryWithProductCount extends ProductCategory {
	@Field(() => Int)
	product_count?: number;
}

@Resolver()
export class CategoryResolver {
	@Query(() => [ProductCategory])
	async categories(@Ctx() { req }: MyContext): Promise<ProductCategory[]> {
		return ProductCategory.find({
			where: {
				tenantId: req.session?.tenantId,
			},
		});
	}

	@Query(() => [ProductCategoryWithProductCount], { nullable: true })
	async categoriesSummary(
		@Ctx() { req }: MyContext
	): Promise<ProductCategoryWithProductCount[]> {
		const categories = await AppDataSource.query(
			`
			SELECT count(p.id)  product_count, pca.*
			FROM product_category pca
			LEFT OUTER JOIN product p on pca.id = p."categoryId"
			WHERE pca."tenantId" = $1
			GROUP BY pca.id
			ORDER BY pca.name
    		`,
			[req.session.tenantId]
		);
		return categories;
	}

	@Mutation(() => ProductCategory)
	async addCategory(
		@Arg("name") name: string,
		@Arg("desc") desc: string,
		@Arg("identifier") identifier: string,
		@Ctx() { req }: MyContext
	): Promise<ProductCategory> {
		return ProductCategory.create({
			name,
			desc,
			identifier,
			tenantId: req.session.tenantId,
		}).save();
	}

	@Mutation(() => ProductCategory)
	async updateCategory(
		@Arg("id") id: number,
		@Arg("options") options: UpdateCategoryInput,
		@Ctx() { req }: MyContext
	): Promise<ProductCategory> {
		await ProductCategory.save({ id, ...options });
		return ProductCategory.findOneByOrFail({
			id,
		});
	}

	@Mutation(() => Boolean)
	async deleteCategory(
		@Arg("id") id: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await ProductCategory.delete({ id, tenantId: req.session.tenantId });
		return true;
	}
}

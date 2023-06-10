import { ProductCategory } from "../../entities/ProductCategory";
import { ProductImage } from "../../entities/ProductImage";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export default class ProductResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	identifier!: string;

	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	categoryId!: number;

	@Field()
	discountId!: number;

	@Field(() => [ProductImage])
	images!: ProductImage[];

	@Field()
	category!: ProductCategory;

	@Field()
	created_at!: Date;

	@Field()
	updated_at!: Date;
}

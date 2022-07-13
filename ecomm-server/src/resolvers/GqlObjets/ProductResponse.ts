import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
export default class ProductResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	identifier!: string;

	@Field()
	categoryId!: number;

	@Field()
	category_name!: string;

	@Field()
	category_desc!: string;

	@Field({ nullable: true })
	discount_name?: string;

	@Field({ nullable: true })
	discount_percent?: number;

	@Field({ nullable: true })
	discount_desc?: string;

	@Field({ nullable: true })
	discount_active?: boolean;

	@Field(() => [ProductVariantResponse])
	variants!: ProductVariantResponse[];

	@Field(() => [ProductImageResponse])
	images!: ProductImageResponse[];

	@Field()
	created_at!: Date;

	@Field()
	updated_at!: Date;
}

@ObjectType()
class ProductVariantResponse {
	@Field(() => Int)
	quantity!: number;

	@Field(() => Int)
	variant_id!: number;

	@Field(() => Int)
	product_id!: number;

	@Field(() => Float)
	price!: number;

	@Field()
	variant!: string;
}

@ObjectType()
class ProductImageResponse {
	@Field(() => Int)
	image_id!: number;

	@Field()
	imageURL!: string;
}

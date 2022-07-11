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

	@Field(() => [ProductVariant])
	variants!: ProductVariant[];

	@Field()
	created_at!: Date;

	@Field()
	updated_at!: Date;
}

@ObjectType()
export class ProductVariant {
	@Field(() => Int)
	quantity!: number;

	@Field(() => Float)
	price!: number;

	@Field()
	variant!: string;
}

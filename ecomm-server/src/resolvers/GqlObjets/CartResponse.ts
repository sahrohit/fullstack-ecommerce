import { Field, Int, ObjectType } from "type-graphql";
import { ProductImageResponse } from "./ProductResponse";

@ObjectType()
export default class CartResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	userId!: number;

	@Field()
	quantity!: number;

	@Field()
	productId!: number;

	@Field()
	product_name!: string;

	@Field({ nullable: true })
	product_desc!: string;

	@Field({ nullable: true })
	product_identifier!: string;

	@Field({ nullable: true })
	categoryId!: number;

	@Field(() => [ProductImageResponse], { nullable: true })
	images!: ProductImageResponse[];

	@Field()
	created_at!: Date;

	@Field()
	updated_at!: Date;
}

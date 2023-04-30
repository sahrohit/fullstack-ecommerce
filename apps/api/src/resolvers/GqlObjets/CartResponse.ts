import { Field, Int, ObjectType } from "type-graphql";
import { ProductImage } from "src/entities/ProductImage";

@ObjectType()
export default class CartResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	userId!: number;

	@Field()
	quantity!: number;

	@Field()
	inventoryId!: number;

	@Field()
	product_name!: string;

	@Field({ nullable: true })
	product_desc!: string;

	@Field({ nullable: true })
	product_identifier!: string;

	@Field()
	categoryId!: number;

	@Field()
	price!: number;

	@Field()
	variant!: string;

	@Field(() => [ProductImage], { nullable: true })
	images!: ProductImage[];

	@Field()
	created_at!: Date;

	@Field()
	updated_at!: Date;
}

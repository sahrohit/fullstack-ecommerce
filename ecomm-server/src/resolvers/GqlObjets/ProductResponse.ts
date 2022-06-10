import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export default class ProductResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	price!: number;

	@Field()
	quantity!: number;

	@Field()
	category_name!: string;

	@Field()
	category_desc!: string;

	@Field({ nullable: true })
	discount_percent?: number;

	@Field({ nullable: true })
	discount_name?: string;

	@Field({ nullable: true })
	discount_desc?: string;

	@Field({ nullable: true })
	discount_active?: boolean;
}

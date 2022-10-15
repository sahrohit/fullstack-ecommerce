import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class ProductCategorySummary {
	@Field(() => Int)
	id?: number;

	@Field()
	name?: string;

	@Field()
	identifier?: string;

	@Field()
	desc?: string;

	@Field()
	product_count?: number;

	@Field()
	created_at?: Date;

	@Field()
	updated_at?: Date;
}

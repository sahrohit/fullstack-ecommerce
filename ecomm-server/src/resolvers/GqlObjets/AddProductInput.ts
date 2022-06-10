import { InputType, Field } from "type-graphql";

@InputType()
export default class AddProductInput {
	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	price!: number;

	@Field()
	quantity!: number;

	@Field()
	category_id!: number;
}

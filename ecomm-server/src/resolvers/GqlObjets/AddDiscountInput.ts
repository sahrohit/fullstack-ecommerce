import { InputType, Field } from "type-graphql";

@InputType()
export default class AddDiscountInput {
	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	discount_percent!: number;

	@Field({ nullable: true })
	active!: boolean;
}

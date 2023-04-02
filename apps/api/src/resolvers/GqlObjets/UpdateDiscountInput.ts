import { InputType, Field } from "type-graphql";

@InputType()
export default class UpdateDiscountInput {
	@Field()
	id!: number;

	@Field({ nullable: true })
	name!: string;

	@Field({ nullable: true })
	desc!: string;

	@Field({ nullable: true })
	discount_percent!: number;

	@Field({ nullable: true })
	active!: boolean;
}

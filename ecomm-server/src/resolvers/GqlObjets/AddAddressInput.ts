import { InputType, Field } from "type-graphql";

@InputType()
export default class AddAddressInput {
	@Field()
	name!: string;

	@Field()
	address_line1!: string;

	@Field({ nullable: true })
	address_line2?: string;

	@Field()
	city!: string;

	@Field()
	state!: string;

	@Field()
	postal_code!: string;

	@Field()
	country!: string;

	@Field()
	phone_number!: string;
}

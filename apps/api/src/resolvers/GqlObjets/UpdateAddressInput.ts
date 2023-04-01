import { InputType, Field } from "type-graphql";

@InputType()
export default class UpdateAddressInput {
	@Field({ nullable: true })
	name!: string;

	@Field({ nullable: true })
	address_line1?: string;

	@Field({ nullable: true })
	address_line2?: string;

	@Field({ nullable: true })
	city?: string;

	@Field({ nullable: true })
	state!: string;

	@Field({ nullable: true })
	postal_code?: string;

	@Field({ nullable: true })
	country?: string;

	@Field({ nullable: true })
	phone_number?: string;
}

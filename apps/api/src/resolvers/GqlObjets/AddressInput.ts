import { InputType, Field } from "type-graphql";

@InputType()
export default class AddressInput {
	@Field()
	name!: string;

	@Field()
	type!: string;

	@Field()
	address!: string;

	@Field()
	city!: string;

	@Field()
	state!: string;

	@Field()
	zip!: string;

	@Field()
	country!: string;

	@Field()
	phone_number!: string;
}

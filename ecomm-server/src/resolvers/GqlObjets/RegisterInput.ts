import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
	@Field()
	username!: string;

	@Field()
	password!: string;

	@Field()
	first_name!: string;

	@Field()
	last_name?: string;

	@Field()
	email!: string;

	@Field()
	phone_number?: string;
}

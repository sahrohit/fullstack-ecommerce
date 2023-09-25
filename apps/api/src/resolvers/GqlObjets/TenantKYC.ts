import { Field, InputType } from "type-graphql";

@InputType()
export class TenantKYCInput {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	address!: string;

	@Field(() => String)
	phone_number!: string;

	@Field(() => String)
	pan_number!: string;

	@Field(() => String)
	bank_name!: string;

	@Field(() => String)
	bank_branch!: string;

	@Field(() => String)
	account_number!: string;

	@Field(() => String)
	account_name!: string;

	@Field(() => String)
	registration_document!: string;

	@Field(() => String)
	pan_document!: string;
}

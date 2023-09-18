import { InputType, Field } from "type-graphql";

@InputType()
export class AdminRegisterInput {
	@Field()
	password!: string;

	@Field()
	first_name!: string;

	@Field()
	last_name?: string;

	@Field()
	email!: string;

	@Field()
	tenant_name!: string;

	@Field()
	tenant_desc!: string;

	@Field()
	tenant_category_id!: number;

	@Field()
	subdomain!: string;
}

import { InputType, Field } from "type-graphql";

@InputType()
export class AdminRegisterInput {
	@Field()
	password!: string;

	@Field({ nullable: true })
	first_name?: string;

	@Field({ nullable: true })
	last_name?: string;

	@Field()
	email!: string;

	@Field()
	tenant_name!: string;

	@Field()
	tenant_category_id!: number;

	@Field()
	subdomain!: string;
}

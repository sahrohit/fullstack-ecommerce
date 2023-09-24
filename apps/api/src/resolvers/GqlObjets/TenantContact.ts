import { Field, InputType } from "type-graphql";

@InputType()
export class TenantContactInput {
	@Field(() => String)
	primary!: string;

	@Field(() => String, { nullable: true })
	secondary?: string;

	@Field(() => String, { nullable: true })
	ntc?: string;

	@Field(() => String, { nullable: true })
	ncell?: string;

	@Field(() => String, { nullable: true })
	facebook?: string;

	@Field(() => String, { nullable: true })
	instagram?: string;

	@Field(() => String, { nullable: true })
	tiktok?: string;

	@Field(() => String, { nullable: true })
	twitter?: string;

	@Field(() => String, { nullable: true })
	whatsapp?: string;

	@Field(() => String, { nullable: true })
	viber?: string;
}

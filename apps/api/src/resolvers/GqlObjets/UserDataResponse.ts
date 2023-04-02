import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class UserDataResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	first_name!: string;

	@Field()
	last_name!: string;

	@Field()
	email!: string;

	@Field(() => Boolean)
	email_verified!: boolean;

	@Field({ nullable: true })
	phone_number!: string;

	@Field(() => Boolean)
	phone_number_verified!: boolean;

	@Field({ nullable: true })
	imageUrl!: string;

	@Field()
	roleId!: number;

	@Field()
	role!: string;

	@Field()
	created_at!: Date;

	@Field()
	updated_at!: Date;
}

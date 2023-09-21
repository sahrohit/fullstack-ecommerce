import { ObjectType, Field, Int } from "type-graphql";
import { User } from "../../entities/User";
import { Column } from "typeorm";
import { UserRole } from "../../entities/UserRole";
import { Staff } from "../../entities/Staff";

@ObjectType()
export class FieldError {
	@Field()
	field!: string;

	@Field()
	message!: string;
}

@ObjectType()
export class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@ObjectType()
export class UserDataResponse {
	@Field(() => Int)
	id!: number;

	@Field()
	first_name!: string;

	@Field({ nullable: true })
	last_name?: string;

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
	@Column({ default: 1 })
	roleId!: number;

	@Field(() => UserRole)
	role!: UserRole;

	@Field(() => Staff, { nullable: true })
	staff?: Staff;
}

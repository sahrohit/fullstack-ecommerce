import { ObjectType, Field } from "type-graphql";
import { User } from "../../entities/User";

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

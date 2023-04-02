import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class DiscountResponse {
	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	discount_percent!: number;

	@Field()
	active!: boolean;
}

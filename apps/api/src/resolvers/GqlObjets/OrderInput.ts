import { InputType, Field } from "type-graphql";

@InputType()
export default class OrderInput {
	@Field()
	promoCode!: string;

	@Field()
	addressId!: number;

	@Field()
	pidx!: string;

	@Field()
	provider!: string;

	@Field()
	state!: string;

	@Field()
	zip!: string;

	@Field()
	country!: string;

	@Field()
	phone_number!: string;
}

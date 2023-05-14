import { InputType, Field } from "type-graphql";

@InputType()
export class CreateOrderInput {
	@Field()
	promoCode!: string;

	@Field()
	addressId!: number;
}

@InputType()
export class CreatePaymentInput {
	@Field()
	orderId!: string;

	@Field()
	pidx!: string;

	@Field()
	promoCode!: string;

	@Field()
	provider!: string;
}

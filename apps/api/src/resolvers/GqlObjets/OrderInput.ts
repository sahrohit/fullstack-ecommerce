import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class CreateOrderInput {
	@Field()
	promoCode!: string;

	@Field()
	addressId!: number;

	@Field()
	shippingMethod!: string;
}

@ObjectType()
export class CreateOrderResponse {
	@Field()
	orderId!: string;

	@Field()
	pidx!: string;

	@Field()
	promoCode!: string;

	@Field()
	provider!: string;
}

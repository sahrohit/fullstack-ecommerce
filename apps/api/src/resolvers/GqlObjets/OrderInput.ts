import { InputType, Field, ObjectType, Int } from "type-graphql";

@InputType()
export class CreateOrderInput {
	@Field()
	promoCode!: string;

	@Field()
	addressId!: number;

	@Field()
	shippingId!: number;
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

@ObjectType()
export class CreatePaymentResponse {
	@Field()
	provider!: string;

	@Field(() => Int, { nullable: true })
	amt?: number;

	@Field(() => Int, { nullable: true })
	psc?: number;

	@Field(() => Int, { nullable: true })
	pdc?: number;

	@Field(() => Int, { nullable: true })
	txAmt?: number;

	@Field(() => Int, { nullable: true })
	tAmt?: number;

	@Field(() => String, { nullable: true })
	pid?: string;

	@Field(() => String, { nullable: true })
	scd?: string;

	@Field(() => String, { nullable: true })
	paymentUrl?: string;
}

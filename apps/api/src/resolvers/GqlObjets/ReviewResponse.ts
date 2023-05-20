import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
export default class ReviewSummaryResponse {
	@Field(() => Int, { nullable: true })
	count!: number;

	@Field(() => Float, { nullable: true })
	rating!: number;
}

import { InputType, Field } from "type-graphql";

@InputType()
export default class UpdateProductInput {
	@Field({ nullable: true })
	name!: string;

	@Field({ nullable: true })
	desc!: string;

	@Field({ nullable: true })
	price!: number;

	@Field({ nullable: true })
	quantity!: number;

	@Field({ nullable: true })
	category_id!: number;
}

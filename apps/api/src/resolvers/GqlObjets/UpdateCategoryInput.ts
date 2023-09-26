import { Field, InputType } from "type-graphql";

@InputType()
export default class UpdateCategoryInput {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	desc?: string;

	@Field({ nullable: true })
	imageURL?: string;
}

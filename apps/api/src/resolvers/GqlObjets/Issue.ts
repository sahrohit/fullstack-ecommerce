import { InputType, Field } from "type-graphql";

@InputType()
export default class IssueInput {
	@Field()
	subject!: string;

	@Field()
	content!: string;

	@Field()
	html!: string;

	@Field()
	categoryId!: number;
}

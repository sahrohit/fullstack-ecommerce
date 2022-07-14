import { InputType, Field, Int, Float } from "type-graphql";

@InputType()
export default class AddProductInput {
	@Field()
	name!: string;

	@Field()
	desc!: string;

	@Field()
	categoryId!: number;

	@Field()
	identifier!: string;

	@Field(() => [ProductVariantInput])
	variants!: ProductVariantInput[];

	@Field(() => [ProductImageInput])
	images!: ProductImageInput[];
}

@InputType()
class ProductVariantInput {
	@Field(() => Int)
	quantity!: number;

	@Field(() => Float)
	price!: number;

	@Field()
	variant!: string;
}

@InputType()
class ProductImageInput {
	@Field()
	imageURL!: string;
}

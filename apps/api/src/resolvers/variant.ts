import { Variant } from "../entities/Variant";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class VariantResolver {
	@Query(() => [Variant])
	variants(): Promise<Variant[]> {
		return Variant.find({
			relations: {
				variant_values: true,
			},
		});
	}
}

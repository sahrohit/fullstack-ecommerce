import { Arg, Query, Resolver } from "type-graphql";
import { Promo } from "src/entities/Promo";

@Resolver()
export class PromoResolver {
	@Query(() => Promo, { nullable: true })
	async promo(@Arg("code") code: string): Promise<Promo | null> {
		return await Promo.findOne({
			where: {
				code,
			},
		});
	}
}

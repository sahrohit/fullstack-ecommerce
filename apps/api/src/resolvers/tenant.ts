import { isVerified } from "../middlewares/isVerified";
import { Tenant } from "../entities/Tenant";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class TenantResolver {
	@Query(() => Tenant)
	@UseMiddleware(isVerified)
	details(@Ctx() { req }: MyContext): Promise<Tenant | null> {
		return Tenant.findOne({
			where: {
				id: req.session.tenantId,
			},
		});
	}

	@Mutation(() => Tenant)
	@UseMiddleware(isVerified)
	async updateTenant(
		@Ctx() { req }: MyContext,
		@Arg("name") name: string,
		@Arg("categoryId", () => Int) categoryId: number,
		@Arg("desc") desc: string,
		@Arg("address") address: string
	): Promise<Tenant> {
		await Tenant.update(
			{
				id: req.session.tenantId,
			},
			{
				name,
				categoryId,
				desc,
				address,
			}
		);

		return Tenant.findOneOrFail({
			where: {
				id: req.session.tenantId,
			},
		});
	}
}

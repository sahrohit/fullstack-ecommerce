import { isVerified } from "../middlewares/isVerified";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { ShippingMethod } from "../entities/ShippingMethod";
import { MyContext } from "../types";

@Resolver()
export class ShippingMethodResolver {
	@Query(() => [ShippingMethod])
	@UseMiddleware(isVerified)
	async shippingmethods() {
		return ShippingMethod.find();
	}

	@Query(() => [ShippingMethod])
	@UseMiddleware(isVerified)
	async shippingmethodsByTenant(@Ctx() { req }: MyContext) {
		return ShippingMethod.find({
			where: {
				tenantId: req.session?.tenantId,
			},
		});
	}

	@Mutation(() => ShippingMethod)
	@UseMiddleware(isVerified)
	async createShippingMethod(
		@Ctx() { req }: MyContext,
		@Arg("name") name: string,
		@Arg("dispatch_in", () => Int) desc: number,
		@Arg("price", () => Int) price: number
	): Promise<ShippingMethod> {
		return ShippingMethod.create({
			name,
			dispatch_in: desc,
			price,
			tenantId: req.session.tenantId,
		}).save();
	}

	@Mutation(() => ShippingMethod)
	@UseMiddleware(isVerified)
	async updateShippingMethod(
		@Ctx() { req }: MyContext,
		@Arg("id", () => Int) id: number,
		@Arg("name") name: string,
		@Arg("dispatch_in", () => Int) dispatch_in: number,
		@Arg("price", () => Int) price: number
	): Promise<ShippingMethod> {
		await ShippingMethod.update(
			{
				id,
				tenantId: req.session.tenantId,
			},
			{
				name,
				dispatch_in,
				price,
			}
		);

		return ShippingMethod.findOneOrFail({
			where: {
				id,
			},
		});
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async deleteShippingMethod(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await ShippingMethod.delete({ id, tenantId: req.session.tenantId });
		return true;
	}
}

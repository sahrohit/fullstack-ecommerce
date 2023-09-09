import { isVerified } from "../middlewares/isVerified";
import { Query, Resolver, UseMiddleware } from "type-graphql";
import { ShippingMethod } from "../entities/ShippingMethod";

@Resolver()
export class ShippingMethodResolver {
	@Query(() => [ShippingMethod])
	@UseMiddleware(isVerified)
	async shippingmethods() {
		return ShippingMethod.find();
	}
}

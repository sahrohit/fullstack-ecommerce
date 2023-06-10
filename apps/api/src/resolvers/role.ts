import { isVerified } from "../middlewares/isVerified";
import { UserRole } from "../entities/UserRole";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class RoleResolver {
	@Query(() => [UserRole])
	@UseMiddleware(isVerified)
	async roles() {
		return UserRole.find();
	}
}

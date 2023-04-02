import { UserRole } from "../entities/UserRole";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import {type MyContext } from "../types";
import UserDataResponse from "./GqlObjets/UserDataResponse";
import { isVerified } from "../middlewares/isVerified";

const FETCH_ADMIN_SQL = `
    SELECT "user".*,
        ur.name "role"
    FROM "user"
            LEFT JOIN user_role ur on ur.id = "user"."roleId"
`;

@Resolver()
export class AdminResolver {
	@Query(() => [UserDataResponse])
	@UseMiddleware(isVerified)
	async users(@Ctx() { req }: MyContext) {
		const user = await User.findOne({ where: { id: req.session.userId } });

		if (!user) {
			throw new Error("User not found");
		}

		const users = await AppDataSource.query(
			`
			${FETCH_ADMIN_SQL}
			WHERE "roleId" <= $1;
    		`,
			[user.roleId]
		);

		return users;
	}

	@Query(() => [UserRole])
	// @UseMiddleware(isVerified)
	async roles() {
		return UserRole.find();
	}
}

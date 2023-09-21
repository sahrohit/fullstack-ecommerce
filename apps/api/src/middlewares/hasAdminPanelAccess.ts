import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

export const hasAdminPanelAccess: MiddlewareFn<MyContext> = async (
	{ context },
	next
) => {
	if (!context.req.session.userId) {
		throw new Error("Not Authenticated");
	}

	if (!context.req.session.tenantId) {
		throw new Error("Not Authorized");
	}

	const user = await User.findOne({
		where: { id: context.req.session.userId },
	});

	if (!user?.email_verified && !user?.phone_number_verified) {
		throw new Error("User Not Verified");
	}

	if (user.roleId <= 1) {
		throw new Error("Not Authorized");
	}

	return next();
};

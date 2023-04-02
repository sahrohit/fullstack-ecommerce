import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

export const isVerified: MiddlewareFn<MyContext> = async (
	{ context },
	next
) => {
	if (!context.req.session.userId) {
		throw new Error("Not Authenticated");
	}

	const user = await User.findOne({
		where: { id: context.req.session.userId },
	});

	if (!user?.email_verified && !user?.phone_number_verified) {
		throw new Error("User Not Verified");
	}

	return next();
};

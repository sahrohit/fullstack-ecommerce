import { Router } from "express";
import jwt from "jsonwebtoken";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { getGoogleOAuthToken } from "../utils/oauth";

const router: Router = Router();

interface GoogleUserResponse {
	iss: string;
	azp: string;
	aud: string;
	sub: string;
	email: string;
	email_verified: boolean;
	at_hash: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	locale: string;
	iat: number;
	exp: number;
}

router.get(
	"/google/callback",
	async (req: MyContext["req"], res: MyContext["res"]) => {
		// 1. Get the code from query string

		const code = req.query.code as string;

		// 2. Get the id and access token

		const { id_token, access_token, refresh_token, expires_in } =
			await getGoogleOAuthToken({ code });

		// 3. Get user with token

		const profile = jwt.decode(id_token) as GoogleUserResponse;

		// 4. Upsert the User

		const exisitingUser = await Account.findOne({
			where: {
				providerAccountId: profile.sub,
			},
			relations: {
				user: true,
			},
		});

		if (exisitingUser) {
			req.session.userId = exisitingUser.userId;
			res.redirect(`${process.env.CLIENT_URL}`);
			return;
		}

		const existingUserByEmail = await User.findOne({
			where: {
				email: profile.email,
			},
		});

		if (existingUserByEmail) {
			await Account.create({
				userId: existingUserByEmail.id,
				type: "OAUTH",
				provider: "google",
				providerAccountId: profile.sub,
				access_token: access_token,
				refresh_token: refresh_token,
				expires_at: expires_in,
			}).save();

			req.session.userId = existingUserByEmail.id;
			res.redirect(`${process.env.CLIENT_URL}`);
			return;
		}

		const userRes = await User.create({
			password: "unset",
			first_name: profile.given_name,
			last_name: profile.family_name,
			email: profile.email,
			email_verified: profile.email_verified,
			imageUrl:
				profile.picture ??
				`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${profile.name}`,
		}).save();

		await Account.create({
			userId: userRes.id,
			type: "OAUTH",
			provider: "google",
			providerAccountId: profile.sub,
			access_token: access_token,
			refresh_token: refresh_token,
			expires_at: expires_in,
		}).save();

		req.session.userId = userRes.id;
		res.redirect(`${process.env.CLIENT_URL}`);
	}
);

export default router;

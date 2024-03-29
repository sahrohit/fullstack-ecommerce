import argon2 from "argon2";
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { v4 } from "uuid";
import {
	COOKIE_NAME,
	FORGOT_PASSWORD_PREFIX,
	VERIFY_EMAIL_PREFIX,
} from "../constants";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { forgetPasswordTemplate } from "../static/forgetPasswordTemplate";
import { verifyEmailTemplate } from "../static/verifyEmailTemplate";
import { type MyContext } from "../types";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister } from "../utils/validator";
import { RegisterInput } from "./GqlObjets/RegisterInput";
import { isVerified } from "../middlewares/isVerified";
import { UserDataResponse, UserResponse } from "./GqlObjets/User";
import { hasAdminPanelAccess } from "../middlewares/hasAdminPanelAccess";

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => String)
	async email(@Root() user: User, @Ctx() { req }: MyContext) {
		if (req.session.userId === user.id) {
			return user.email;
		}
		const currentUser = await User.findOne({
			where: { id: req.session?.userId },
		});
		if (currentUser?.roleId && currentUser?.roleId >= user.roleId) {
			return user.email;
		}
		return "";
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		//Not Logged in
		console.log(req.session?.userId);
		if (!req.session?.userId) {
			return null;
		}
		return User.findOne({ where: { id: req.session?.userId } });
	}

	@Query(() => User, { nullable: true })
	meWithAccount(@Ctx() { req }: MyContext) {
		if (!req.session?.userId) {
			return null;
		}

		return User.findOne({
			relations: {
				accounts: true,
			},
			where: { id: req.session?.userId },
		});
	}

	@Query(() => UserDataResponse)
	@UseMiddleware(hasAdminPanelAccess)
	userByEmail(@Arg("email") email: string, @Ctx() { req }: MyContext) {
		return User.findOneOrFail({
			select: {
				id: true,
				first_name: true,
				last_name: true,
				email: true,
				email_verified: true,
				phone_number: true,
				phone_number_verified: true,
				imageUrl: true,
				roleId: true,
				role: {
					id: true,
					name: true,
				},
				staff: {
					id: true,
					userId: true,
					tenantId: true,
					status: true,
					tenant: {
						id: true,
						name: true,
						logo: true,
						subdomain: true,
						defaultForPreview: true,
						userId: true,
						categoryId: true,
					},
				},
			},
			relations: {
				role: true,
				staff: {
					tenant: true,
				},
			},
			where: { email },
		});
	}

	@Mutation(() => User)
	@UseMiddleware(isVerified)
	async updateProfile(
		@Arg("imageUrl") imageUrl: string,
		@Arg("first_name") first_name: string,
		@Arg("last_name") last_name: string,
		@Ctx() { req }: MyContext
	): Promise<User> {
		await User.update(
			{
				id: req.session.userId,
			},
			{
				imageUrl,
				first_name,
				last_name,
			}
		);

		return User.findOneOrFail({
			where: {
				id: req.session.userId,
			},
		});
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("options") options: RegisterInput,
		@Ctx() { redis }: MyContext
	): Promise<UserResponse> {
		const errors = validateRegister(options);
		if (errors) {
			return { errors };
		}

		const hashedPassword = await argon2.hash(options.password);
		let user;
		try {
			const result = await AppDataSource.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					password: hashedPassword,
					first_name: options.first_name,
					last_name: options.last_name,
					email: options.email,
					imageUrl: `https://api.dicebear.com/6.x/micah/svg?size=256&seed=${options.first_name}`,
				})
				.returning("*")
				.execute();
			user = result.raw[0];
		} catch (err: any) {
			if (err.code === "23505" || err.detail.includes("already exists")) {
				return {
					errors: [{ field: "email", message: `Email already exists` }],
				};
			}
		}

		const token = v4();
		await redis.set(
			VERIFY_EMAIL_PREFIX + token,
			user.id,
			"PX",
			1000 * 60 * 60 * 24 * 3 //3 day
		);

		await sendEmail(
			options.email,
			"Verify Email",
			verifyEmailTemplate(
				`${process.env.CLIENT_URL}/auth/verify-email/${token}`
			)
		);

		return { user };
	}

	@Mutation(() => Boolean)
	async resendVerificationEmail(
		@Ctx() { redis }: MyContext,
		@Arg("email") email: string
	) {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return false;
		}

		const token = v4();
		await redis.set(
			VERIFY_EMAIL_PREFIX + token,
			user.id,
			"PX",
			1000 * 60 * 60 * 24 * 3
		); //3 day

		await sendEmail(
			user.email,
			"Verify Email",
			verifyEmailTemplate(
				`${process.env.CLIENT_URL}/auth/verify-email/${token}`
			)
		);

		return true;
	}

	@Mutation(() => Boolean)
	async verifyEmail(
		@Arg("token") token: string,
		@Ctx() { req, redis }: MyContext
	): Promise<boolean> {
		const userId = await redis.get(VERIFY_EMAIL_PREFIX + token);

		if (!userId) {
			return false;
		}

		const user = await User.findOne({ where: { id: parseInt(userId) } });

		if (!user) {
			return false;
		}

		User.update({ id: parseInt(userId) }, { email_verified: true });
		await redis.del(VERIFY_EMAIL_PREFIX + token);

		req.session.userId = user.id;
		return true;
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne({
			where: { email: email },
		});
		if (!user) {
			return {
				errors: [{ field: "email", message: "User doesn't exist " }],
			};
		}
		const valid = await argon2.verify(user.password, password);
		if (!valid) {
			return {
				errors: [{ field: "password", message: "Incorrect Password" }],
			};
		}
		if (!user.email_verified) {
			return {
				errors: [{ field: "global", message: "Email not verified" }],
			};
		}
		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}
				resolve(true);
			})
		);
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("email") email: string,
		@Ctx() { redis }: MyContext
	) {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return true;
		}

		const token = v4();
		await redis.set(
			FORGOT_PASSWORD_PREFIX + token,
			user.id,
			"PX",
			1000 * 60 * 60 * 24 * 3
		); //3 day

		await sendEmail(
			email,
			"Forgot Password",
			forgetPasswordTemplate(
				`${process.env.CLIENT_URL}/auth/change-password/${token}`
			)
		);

		return true;
	}

	@Mutation(() => UserResponse)
	async changePassword(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { req, redis }: MyContext
	): Promise<UserResponse> {
		if (newPassword.length <= 2) {
			return {
				errors: [{ field: "newPassword", message: "Password Too short" }],
			};
		}

		const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

		if (!userId) {
			return { errors: [{ field: "token", message: "Token Expired" }] };
		}

		const user = await User.findOne({ where: { id: parseInt(userId) } });

		if (!user) {
			return {
				errors: [{ field: "token", message: "User no longer exists." }],
			};
		}

		User.update(
			{ id: parseInt(userId) },
			{ password: await argon2.hash(newPassword) }
		);

		await redis.del(FORGOT_PASSWORD_PREFIX + token);

		//Logging in User
		req.session.userId = user.id;

		return { user };
	}

	@Mutation(() => UserResponse)
	async updatePassword(
		@Arg("currentPassword") currentPassword: string,
		@Arg("newPassword") newPassword: string,
		@Arg("confirmPassword") confirmPassword: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		if (newPassword !== confirmPassword) {
			return {
				errors: [
					{ field: "confirmPassword", message: "Passwords do not match" },
				],
			};
		}

		if (!req.session.userId) {
			return {
				errors: [{ field: "global", message: "Not Logged In." }],
			};
		}

		const user = await User.findOne({
			where: { id: req.session.userId },
		});

		if (!user) {
			return {
				errors: [{ field: "global", message: "Not a valid User." }],
			};
		}

		const valid = await argon2.verify(user.password, currentPassword);

		if (!valid) {
			return {
				errors: [
					{ field: "currentPassword", message: "Invalid Current Password." },
				],
			};
		}

		User.update(
			{ id: req.session.userId },
			{ password: await argon2.hash(newPassword) }
		);

		return { user };
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async updateLanguagePreference(
		@Arg("language") language: string,
		@Arg("currency") currency: string,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await User.update(
			{ id: req.session.userId },
			{ language: language, currency: currency }
		);

		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async updateMarketingPreference(
		@Arg("marketing_product_news")
		marketing_product_news: boolean,
		@Arg("marketing_company_news")
		marketing_company_news: boolean,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await User.update(
			{ id: req.session.userId },
			{
				marketing_company_news: marketing_company_news,
				marketing_product_news: marketing_product_news,
			}
		);

		return true;
	}
}

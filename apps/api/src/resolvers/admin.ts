import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserResponse } from "./GqlObjets/User";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { AppDataSource } from "../data-source";
import { validateAdminRegister } from "../utils/validator";
import { VERIFY_EMAIL_PREFIX } from "../constants";
import { v4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";
import { verifyEmailTemplate } from "../static/verifyEmailTemplate";
import { AdminRegisterInput } from "./GqlObjets/Admin";
import { TenantCategory } from "../entities/TenantCategory";
import { Tenant } from "../entities/Tenant";
import { TenantContact } from "../entities/TenantContant";

@Resolver()
export class AdminResolver {
	@Query(() => User, { nullable: true })
	async meStaff(@Ctx() { req }: MyContext) {
		if (!req.session?.userId || !req.session?.tenantId) {
			return null;
		}
		const user = await User.findOne({
			relations: {
				staff: {
					tenant: true,
				},
			},
			where: {
				id: req.session?.userId,
				staff: {
					tenantId: req.session?.tenantId,
				},
			},
		});
		if (!user?.staff.tenantId) {
			return null;
		}
		return user;
	}

	@Query(() => [TenantCategory])
	async tenantCategories(): Promise<TenantCategory[]> {
		return TenantCategory.find({
			order: {
				id: "ASC",
			},
		});
	}

	@Mutation(() => UserResponse)
	async adminLogin(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne({
			relations: {
				staff: {
					tenant: true,
				},
			},
			where: { email },
		});
		if (!user) {
			return {
				errors: [{ field: "email", message: "User doesn't exist" }],
			};
		}
		if (
			user.roleId === 1 ||
			!user.staff.tenant.id ||
			user.staff.status === "REVOKED"
		) {
			return {
				errors: [{ field: "global", message: "Not Authorized" }],
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
		req.session.tenantId = user.staff.tenantId;
		return { user };
	}

	@Mutation(() => UserResponse)
	async adminRegister(
		@Arg("options") options: AdminRegisterInput,
		@Ctx() { redis }: MyContext
	): Promise<UserResponse> {
		// Validating User Input
		const errors = validateAdminRegister(options);
		if (errors) {
			return { errors };
		}

		// Check if user already exists
		const exisitingUser = await User.findOne({
			where: { email: options.email },
		});

		if (exisitingUser) {
			const valid = await argon2.verify(
				exisitingUser.password,
				options.password
			);
			if (!valid) {
				return {
					errors: [{ field: "password", message: "Incorrect Password" }],
				};
			}
			// Update the role if the user already exists
			await User.update({ id: exisitingUser.id }, { roleId: 5 });
		} else {
			// Create new user
			let user;
			const hashedPassword = await argon2.hash(options.password);
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
						roleId: 5,
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

			// Generate verification token
			const token = v4();
			await redis.set(
				VERIFY_EMAIL_PREFIX + token,
				user.id,
				"PX",
				1000 * 60 * 60 * 24 * 3 //3 day
			);

			// Send email
			await sendEmail(
				options.email,
				"Verify Email",
				verifyEmailTemplate(
					`${process.env.CLIENT_URL}/auth/verify-email/${token}`
				)
			);
		}

		await AppDataSource.manager.transaction(
			async (transactionalEntityManager) => {
				const res = await transactionalEntityManager.save(Tenant, {
					name: options.tenant_name,
					categoryId: options.tenant_category_id,
					subdomain: options.subdomain,
					defaultForPreview: false,
				});
				await transactionalEntityManager.save(TenantContact, {
					tenantId: res.id,
				});
			}
		);

		await Tenant.save({
			name: options.tenant_name,
			categoryId: options.tenant_category_id,
			subdomain: options.subdomain,
			defaultForPreview: false,
		});

		return {
			user: await User.findOneOrFail({
				relations: {
					staff: {
						tenant: true,
					},
				},
				where: { email: options.email },
			}),
		};
	}
}

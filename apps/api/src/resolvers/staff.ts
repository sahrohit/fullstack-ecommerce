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
import { Staff } from "../entities/Staff";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

@Resolver()
export class StaffResolver {
	@Query(() => [Staff], { nullable: true })
	@UseMiddleware(isVerified)
	staffs(
		@Ctx() { req }: MyContext,
		@Arg("roleId", () => Int, { nullable: true }) roleId?: number
	): Promise<Staff[]> {
		return Staff.find({
			relations: {
				tenant: true,
				user: {
					role: true,
				},
			},
			where: {
				tenantId: req.session?.tenantId,
				user: {
					roleId,
				},
			},
			order: {
				user: {
					roleId: "DESC",
				},
				status: "ASC",
			},
		});
	}

	@Mutation(() => Staff)
	@UseMiddleware(isVerified)
	async updateRole(
		@Arg("userId", () => Int) userId: number,
		@Arg("newroleId", () => Int) newroleId: number,
		@Ctx() { req }: MyContext
	): Promise<Staff> {
		// Getting currently logged in user
		const currentUser = await User.findOneOrFail({
			where: {
				id: req.session.userId,
			},
		});

		if (currentUser.roleId < newroleId) {
			throw new Error("Not Enough Clearance");
		}

		await User.update(
			{ id: userId },
			{
				roleId: newroleId,
			}
		);

		return Staff.findOneOrFail({
			relations: {
				tenant: true,
				user: {
					role: true,
				},
			},
			where: {
				userId,
			},
		});
	}

	@Mutation(() => Staff)
	@UseMiddleware(isVerified)
	async addStaff(
		@Arg("userId", () => Int) userId: number,
		@Arg("roleId", () => Int) roleId: number,
		@Ctx() { req }: MyContext
	): Promise<Staff> {
		// Getting currently logged in user
		const currentUser = await User.findOneOrFail({
			relations: {
				staff: {
					tenant: true,
				},
			},
			where: {
				id: req.session.userId,
			},
		});

		// New Staff User
		const newStaff = await User.findOneOrFail({
			relations: {
				staff: {
					tenant: true,
				},
			},
			where: {
				id: userId,
			},
		});

		// If the currently logged in user is lower than the new role
		if (currentUser.roleId < roleId) {
			throw new Error("Not Enough Clearance");
		}

		// If the user is already a staff, in another organization
		if (newStaff.staff.tenantId && newStaff.staff.status === "REVOKED") {
			await User.update(
				{ id: userId },
				{
					roleId,
				}
			);

			await Staff.update(
				{
					userId,
				},
				{
					tenantId: currentUser.staff.tenantId,
					status: "ACCEPTED",
				}
			);

			return Staff.findOneOrFail({
				relations: {
					tenant: true,
					user: {
						role: true,
					},
				},
				where: {
					userId,
				},
			});
		}

		// If the user is not a staff in any organization

		// Updating the user role to the new role
		await User.update(
			{ id: userId },
			{
				roleId,
			}
		);

		return Staff.create({
			userId,
			tenantId: req.session.tenantId,
			status: "ACCEPTED",
		}).save();
	}

	@Mutation(() => Staff)
	@UseMiddleware(isVerified)
	async updateStaffStatus(
		@Arg("userId", () => Int) userId: number,
		@Arg("status") status: "ACCEPTED" | "REVOKED",
		@Ctx() { req }: MyContext
	): Promise<Staff> {
		// Getting currently logged in user
		const currentUser = await User.findOneOrFail({
			where: {
				id: req.session.userId,
			},
		});

		// Getting the user whose status need to be updated
		const staffedUser = await User.findOneOrFail({
			where: {
				id: userId,
			},
		});

		// You need to be higher or same role to revoke/grant access
		if (currentUser.roleId < staffedUser.roleId) {
			throw new Error("Not Enough Clearance");
		}

		await Staff.update(
			{
				userId,
			},
			{
				status,
			}
		);

		return Staff.findOneOrFail({
			relations: {
				tenant: true,
				user: {
					role: true,
				},
			},
			where: {
				userId,
			},
		});
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async deleteStaff(
		@Arg("userId", () => Int) userId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		// Getting currently logged in user
		const currentUser = await User.findOneOrFail({
			where: {
				id: req.session.userId,
			},
		});

		// Getting the user whose status need to be updated
		const staffedUser = await User.findOneOrFail({
			where: {
				id: userId,
			},
		});

		if (currentUser.roleId < staffedUser.roleId) {
			throw new Error("Not Enough Clearance");
		}

		await AppDataSource.manager.transaction(
			async (transactionalEntityManager) => {
				await transactionalEntityManager.update(
					User,
					{
						id: userId,
					},
					{
						roleId: 1,
					}
				);
				await transactionalEntityManager.delete(Staff, {
					userId,
				});
			}
		);
		return true;
	}
}

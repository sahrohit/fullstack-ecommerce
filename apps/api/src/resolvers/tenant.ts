import { isVerified } from "../middlewares/isVerified";
import { Tenant } from "../entities/Tenant";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { TenantContact } from "../entities/TenantContant";
import { TenantContactInput } from "./GqlObjets/TenantContact";
import { TenantKyc } from "../entities/TenantKyc";
import { TenantKYCInput } from "./GqlObjets/TenantKYC";

@Resolver()
export class TenantResolver {
	@Query(() => Tenant)
	@UseMiddleware(isVerified)
	details(@Ctx() { req }: MyContext): Promise<Tenant | null> {
		return Tenant.findOne({
			where: {
				id: req.session.tenantId,
			},
		});
	}

	@Mutation(() => Tenant)
	@UseMiddleware(isVerified)
	async updateTenant(
		@Ctx() { req }: MyContext,
		@Arg("name") name: string,
		@Arg("categoryId", () => Int) categoryId: number,
		@Arg("desc") desc: string,
		@Arg("address") address: string
	): Promise<Tenant> {
		await Tenant.update(
			{
				id: req.session.tenantId,
			},
			{
				name,
				categoryId,
				desc,
				address,
			}
		);

		return Tenant.findOneOrFail({
			where: {
				id: req.session.tenantId,
			},
		});
	}

	@Query(() => TenantContact, { nullable: true })
	@UseMiddleware(isVerified)
	tenantContacts(@Ctx() { req }: MyContext): Promise<TenantContact | null> {
		return TenantContact.findOne({
			where: {
				tenantId: req.session.tenantId,
			},
		});
	}

	@Mutation(() => TenantContact)
	@UseMiddleware(isVerified)
	async updateTenantContact(
		@Ctx() { req }: MyContext,
		@Arg("options", () => TenantContactInput) options: TenantContactInput
	): Promise<TenantContact> {
		await TenantContact.upsert(
			{
				...options,
				tenantId: req.session.tenantId,
			},
			{
				conflictPaths: ["tenantId"],
				skipUpdateIfNoValuesChanged: true,
			}
		);

		return TenantContact.findOneOrFail({
			where: {
				tenantId: req.session.tenantId,
			},
		});
	}

	@Query(() => TenantKyc, { nullable: true })
	@UseMiddleware(isVerified)
	tenantKYC(@Ctx() { req }: MyContext): Promise<TenantKyc | null> {
		return TenantKyc.findOne({
			where: {
				tenantId: req.session.tenantId,
			},
		});
	}

	@Mutation(() => TenantKyc)
	@UseMiddleware(isVerified)
	async requestKYCVerfication(
		@Ctx() { req }: MyContext,
		@Arg("options", () => TenantKYCInput) options: TenantKYCInput
	): Promise<TenantKyc> {
		await TenantKyc.upsert(
			{
				...options,
				tenantId: req.session.tenantId,
				status: "IN_PROGRESS",
			},
			{
				conflictPaths: ["tenantId"],
				skipUpdateIfNoValuesChanged: true,
			}
		);

		return TenantKyc.findOneOrFail({
			where: {
				tenantId: req.session.tenantId,
			},
		});
	}
}

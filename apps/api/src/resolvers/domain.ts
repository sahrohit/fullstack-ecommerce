import { isVerified } from "../middlewares/isVerified";
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import {
	type DomainResponse,
	type DomainConfigResponse,
	type DomainVerificationResponse,
	type DomainVerificationStatusProps,
	VerifyDomainResponse,
} from "./GqlObjets/Domain";
import { MyContext } from "../types";
import { Tenant } from "../entities/Tenant";

export const addDomainToVercel = async (domain: string) => {
	return await fetch(
		`https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains`,
		{
			body: `{\n  "name": "${domain}"\n}`,
			headers: {
				Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
		}
	).then((res) => res.json());
};

export const removeDomainFromVercelProject = async (domain: string) => {
	return await fetch(
		`https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
			},
			method: "DELETE",
		}
	).then((res) => res.json());
};

export const getDomainResponse = async (
	domain: string
): Promise<DomainResponse & { error: { code: string; message: string } }> => {
	return await fetch(
		`https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	).then((res) => {
		return res.json();
	});
};

export const getConfigResponse = async (
	domain: string
): Promise<DomainConfigResponse> => {
	return await fetch(`https://api.vercel.com/v6/domains/${domain}/config`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
};

export const verifyDomain = async (
	domain: string
): Promise<DomainVerificationResponse> => {
	return await fetch(
		`https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}/verify`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	).then((res) => res.json());
};

@Resolver()
export class DomainResolver {
	@Query(() => VerifyDomainResponse)
	@UseMiddleware(isVerified)
	async verifyDomain(
		@Arg("domain") domain: string
	): Promise<VerifyDomainResponse> {
		let status: DomainVerificationStatusProps = "Valid Configuration";

		const [domainJson, configJson] = await Promise.all([
			getDomainResponse(domain),
			getConfigResponse(domain),
		]);

		if (domainJson?.error?.code === "not_found") {
			// domain not found on Vercel project
			status = "Domain Not Found";

			// unknown error
		} else if (domainJson.error) {
			status = "Unknown Error";

			// if domain is not verified, we try to verify now
		} else if (!domainJson.verified) {
			status = "Pending Verification";
			const verificationJson = await verifyDomain(domain);

			// domain was just verified
			if (verificationJson && verificationJson.verified) {
				status = "Valid Configuration";
			}
		} else if (configJson.misconfigured) {
			status = "Invalid Configuration";
		} else {
			status = "Valid Configuration";
		}
		return {
			status,
			domainJson,
		};
	}

	@Mutation(() => Tenant)
	async updateSubDomain(
		@Arg("subdomain") subdomain: string,
		@Ctx() { req }: MyContext
	): Promise<Tenant> {
		try {
			await Tenant.update(
				{
					id: req.session.tenantId,
				},
				{
					subdomain,
				}
			);
		} catch (err: any) {
			if (err.code === "23505" || err.detail.includes("already exists")) {
				throw new Error("Subdomain is already in use");
			}
		}

		return Tenant.findOneOrFail({
			where: {
				id: req.session.tenantId,
			},
		});
	}

	@Mutation(() => Tenant)
	async updateCustomDomain(
		@Arg("customDomain") customDomain: string,
		@Ctx() { req }: MyContext
	): Promise<Tenant> {
		const tenant = await Tenant.findOneByOrFail({
			id: req.session.tenantId,
		});

		if (tenant.customDomain) {
			await removeDomainFromVercelProject(tenant.customDomain);
		}

		await addDomainToVercel(customDomain);

		await Tenant.update(
			{
				id: req.session.tenantId,
			},
			{
				customDomain,
			}
		);

		return Tenant.findOneByOrFail({
			id: req.session.tenantId,
		});
	}
}

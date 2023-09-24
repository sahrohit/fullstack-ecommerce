import { Field, Int, ObjectType } from "type-graphql";

export type DomainVerificationStatusProps =
	| "Valid Configuration"
	| "Invalid Configuration"
	| "Pending Verification"
	| "Domain Not Found"
	| "Unknown Error";

// From https://vercel.com/docs/rest-api/endpoints#get-a-project-domain
export interface DomainResponse {
	name: string;
	apexName: string;
	projectId: string;
	redirect?: string | null;
	redirectStatusCode?: (307 | 301 | 302 | 308) | null;
	gitBranch?: string | null;
	updatedAt?: number;
	createdAt?: number;
	/** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
	verified: boolean;
	/** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
	verification: {
		type: string;
		domain: string;
		value: string;
		reason: string;
	}[];
}

// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
export interface DomainConfigResponse {
	/** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
	configuredBy?: ("CNAME" | "A" | "http") | null;
	/** Which challenge types the domain can use for issuing certs. */
	acceptedChallenges?: ("dns-01" | "http-01")[];
	/** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
	misconfigured: boolean;
}

// From https://vercel.com/docs/rest-api/endpoints#verify-project-domain
export interface DomainVerificationResponse {
	name: string;
	apexName: string;
	projectId: string;
	redirect?: string | null;
	redirectStatusCode?: (307 | 301 | 302 | 308) | null;
	gitBranch?: string | null;
	updatedAt?: number;
	createdAt?: number;
	/** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
	verified: boolean;
	/** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
	verification?: {
		type: string;
		domain: string;
		value: string;
		reason: string;
	}[];
}

@ObjectType()
export class VerificationResponse {
	@Field(() => String)
	type!: string;

	@Field(() => String)
	domain!: string;

	@Field(() => String)
	value!: string;

	@Field(() => String)
	reason!: string;
}

@ObjectType()
export class DomainErrorResponse {
	@Field(() => String)
	code!: string;

	@Field(() => String)
	message!: string;
}

@ObjectType()
export class DomainJsonResponse {
	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => String, { nullable: true })
	apexName?: string;

	@Field(() => String, { nullable: true })
	projectId?: string;

	@Field(() => String, { nullable: true })
	redirect?: string | null;

	@Field(() => Int, { nullable: true })
	redirectStatusCode?: (307 | 301 | 302 | 308) | null;

	@Field(() => String, { nullable: true })
	gitBranch?: string | null;

	@Field(() => String, { nullable: true })
	updatedAt?: number;

	@Field(() => String, { nullable: true })
	createdAt?: number;

	/** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
	@Field(() => String, { nullable: true })
	verified?: boolean;

	@Field(() => [VerificationResponse], { nullable: true })
	verification?: VerificationResponse[];

	@Field(() => DomainErrorResponse, { nullable: true })
	error?: DomainErrorResponse;
}

@ObjectType()
export class VerifyDomainResponse {
	@Field(() => String)
	status!: DomainVerificationStatusProps;

	@Field(() => DomainJsonResponse)
	domainJson!: DomainJsonResponse;
}

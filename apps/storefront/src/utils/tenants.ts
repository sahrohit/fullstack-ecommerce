interface Tenant {
	created_at: string;
	updated_at: string;
	id: number;
	name: string;
	desc: string;
	logo: string;
	font: string;
	subdomain: string;
	customDomain: string;
	defaultForPreview: boolean;
	userId: number;
}

/**
 * Returns the data of the hostname based on its subdomain or custom domain
 * or the default host if there's no match.
 *
 * This method is used by middleware.ts
 */
export async function getHostnameDataOrDefault(
	subdomainOrCustomDomain?: string
) {
	const tenants = await (
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/getAll`)
	).json();

	const DEFAULT_HOST = tenants.find((t: Tenant) => t.defaultForPreview);

	if (!subdomainOrCustomDomain) return DEFAULT_HOST;

	// check if site is a custom domain or a subdomain
	const customDomain = subdomainOrCustomDomain.includes(".");

	// fetch data from mock database using the site value as the key
	return (
		tenants.find((item: Tenant) =>
			customDomain
				? item.customDomain === subdomainOrCustomDomain
				: item.subdomain === subdomainOrCustomDomain
		) ?? DEFAULT_HOST
	);
}

/**
 * Returns the data of the hostname based on its subdomain.
 *
 * This method is used by pages under middleware.ts
 */
export async function getHostnameDataBySubdomain(subdomain: string) {
	const tenants = await (
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/getAll`)
	).json();

	return tenants.find((item: Tenant) => item.subdomain === subdomain);
}

/**
 * Returns the paths for `getStaticPaths` based on the subdomain of every
 * available hostname.
 */
export async function getSubdomainPaths() {
	const tenants = await (
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/getAll`)
	).json();
	// get all sites that have subdomains set up
	const subdomains = tenants.filter((item: Tenant) => item.subdomain);

	// build paths for each of the sites in the previous two lists
	return subdomains.map((item: Tenant) => ({
		params: { site: item.subdomain },
	}));
}

const tenants = async (): Promise<Tenant[]> =>
	(await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/getAll`)).json();

export default tenants;

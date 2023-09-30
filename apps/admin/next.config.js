/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["images.unsplash.com", "utfs.io"],
	},
	transpilePackages: ["ui"],
};

module.exports = nextConfig;

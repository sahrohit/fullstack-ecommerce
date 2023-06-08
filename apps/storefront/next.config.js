/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["images.unsplash.com", "static.nike.com", "c.static-nike.com"],
	},
};

module.exports = nextConfig;

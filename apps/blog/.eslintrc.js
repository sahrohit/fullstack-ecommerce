module.exports = {
	root: true,
	extends: ["custom/astro"],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: "./tsconfig.json",
		extraFileExtensions: [".astro"],
	},
};

module.exports = {
	root: true,
	extends: ["custom/next"],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: "./tsconfig.json",
	},
	rules: {
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": "off",
	},
	ignorePatterns: ["src/generated/**"],
};

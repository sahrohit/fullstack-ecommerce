module.exports = {
	root: true,
	extends: ["custom-server"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	ignorePatterns: ["node_modules", "**/*.d.ts"],
};

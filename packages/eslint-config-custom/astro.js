const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
	env: {
		node: true,
		es2022: true,
		browser: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:astro/recommended",
	],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/jsx-props-no-spreading": "off",
	},
	overrides: [
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			parserOptions: {
				project,
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {},
		},
	],
	ignorePatterns: ["public", "dist", ".yarn"],
};

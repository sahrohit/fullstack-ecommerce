const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
	extends: [
		"eslint:recommended",
		"turbo",
		"next",
		"airbnb/base",
		"airbnb-typescript/base",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	parserOptions: {
		project,
		ecmaVersion: "latest",
		sourceType: "module",
	},
	env: {
		node: true,
		es6: true,
	},

	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	overrides: [
		{
			files: ["**/__tests__/**/*"],
			env: {
				jest: true,
			},
		},
	],
	ignorePatterns: ["node_modules/", "dist/"],
	// add rules configurations here
	rules: {
		"import/no-default-export": "off",
	},
};

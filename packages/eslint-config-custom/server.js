const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
	extends: ["eslint:recommended", "turbo", "prettier"].map(require.resolve),
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

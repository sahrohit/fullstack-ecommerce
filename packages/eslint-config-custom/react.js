const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"turbo",
		"airbnb",
		"airbnb-typescript",
		"plugin:react/jsx-runtime",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	plugins: ["@typescript-eslint", "import"],
	parserOptions: {
		project,
	},
	globals: {
		JSX: true,
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
	// add rules configurations here
	rules: {
		"import/no-default-export": "off",
		"import/no-default-export": "off",
		"react/function-component-definition": [
			2,
			{
				namedComponents: "arrow-function",
			},
		],
		"react/jsx-props-no-spreading": "off",
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"import/no-extraneous-dependencies": "off",
	},
	ignorePatterns: [
		"**/*.js",
		"**/*.json",
		"node_modules",
		"public",
		"styles",
		".next",
		"coverage",
		"dist",
		".turbo",
	],
};

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"turbo",
		"next",
		"airbnb",
		"airbnb-typescript",
		"plugin:react/jsx-runtime",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	plugins: ["@typescript-eslint", "import"],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: ["apps/*/tsconfig.json"],
			},
		},
	},
	rules: {
		// react
		"react/function-component-definition": [
			2,
			{
				namedComponents: "arrow-function",
			},
		],

		// next
		"@next/next/no-html-link-for-pages": "off",

		"react/jsx-props-no-spreading": "off",
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": "off",
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

module.exports = {
	extends: ["eslint:recommended", "turbo", "prettier"],
	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
};

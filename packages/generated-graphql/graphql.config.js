module.exports = {
	overwrite: true,
	schema: "http://localhost:4000/graphql",
	documents: "src/**/*.graphql",
	ignoreNoDocuments: true,
	generates: {
		"src/index.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				reactApolloVersion: 3,
			},
			hooks: {
				afterOneFileWrite: ["eslint --fix", "prettier --write"],
			},
		},
	},
};

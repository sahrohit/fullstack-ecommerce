module.exports = {
	overwrite: true,
	schema: "http://localhost:4000/graphql",
	documents: "src/graphql/**/*.graphql",
	ignoreNoDocuments: true,
	generates: {
		"src/generated/graphql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				reactApolloVersion: 3,
			},
			hooks: {
				afterOneFileWrite: ["prettier --write"],
			},
		},
	},
};

const CommitLintConfiguration = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"build",
				"chore",
				"ci",
				"docs",
				"feat",
				"fix",
				"perf",
				"refactor",
				"revert",
				"style",
				"test",
			],
		],
		"scope-enum": [2, "always", ["root", "admin", "api", "web", "storefront", "generated-graphql", "ui"]],
		"scope-case": [2, "always", "kebab-case"],
	},
};

module.exports = CommitLintConfiguration;

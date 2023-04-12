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
		"scope-enum": [
			2,
			"always",
			[
				"others",
				"components",
				"config",
				"pages",
				"data",
				"styles",
				"routes",
				"services",
				"styles",
				"types",
			],
		],
		"scope-case": [2, "always", "kebab-case"],
	},
};

module.exports = CommitLintConfiguration;

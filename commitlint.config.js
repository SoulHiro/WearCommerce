const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore"]],
    "subject-case": [0],
    "subject-full-stop": [0],
  },
};

export default Configuration;
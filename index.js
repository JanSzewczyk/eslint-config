module.exports = {
  extends: [
    "google",
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "plugin:jest/recommended",
    "plugin:jest-formatting/recommended",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parserOptions: {
    project: "tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint", "import", "react-hooks"],
  rules: {
    "import/no-unresolved": "error",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "type",
        ],

        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
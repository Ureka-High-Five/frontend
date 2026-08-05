const path = require("node:path");

const tsconfigProjects = [
  path.join(__dirname, "apps/service/tsconfig.app.json"),
  path.join(__dirname, "apps/admin/tsconfig.app.json"),
  path.join(__dirname, "packages/api/tsconfig.json"),
  path.join(__dirname, "packages/data-access/tsconfig.json"),
  path.join(__dirname, "packages/types/tsconfig.json"),
  path.join(__dirname, "packages/ui/tsconfig.json"),
];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@typescript-eslint", "import", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/order": [
      "error",
      {
        groups: ["external", "internal", "type"],
        pathGroups: [
          {
            pattern: "{react*,react*/**}",
            group: "external",
            position: "before",
          },
          {
            pattern: "@stores/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@apis/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@hooks/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@utils/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@constants/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@assets/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@components/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@pages/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@types/*",
            group: "type",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: [],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/function-component-definition": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  settings: {
    "import/resolver": {
      typescript: {
        noWarnOnMultipleProjects: true,
        project: tsconfigProjects,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: ["packages/ui/src/**/*.tsx"],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],
};

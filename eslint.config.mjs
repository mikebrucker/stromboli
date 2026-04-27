import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    semi: true,
    braceStyle: "1tbs",
    commaDangle: "always-multiline",
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ["metro.config.js", "babel.config.js"],
        },
      },
    },
  },
  {
    files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    ignores: ["node_modules/", ".expo/", "dist/", "expo-env.d.ts"],
  },
  {
    rules: {
      "eqeqeq": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: "avoidEscape" }],
    },
  },
]);

import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import unicorn from "eslint-plugin-unicorn";
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
    plugins: {
      unicorn,
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
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["./**", "../**"],
          message: "Use '@/' path alias instead of relative imports.",
        }],
      }],
      "no-extra-boolean-cast": "off",
      "no-console": ["warn", { allow: ["error"] }],
      "no-restricted-properties": ["warn", {
        object: "Math",
        property: "random",
        message: "Reminder to remove Math.random() after you're finished debugging.",
      }],
      "no-shadow": "off",
      "no-use-before-define": ["error", { functions: false,
        classes: true,
        variables: true }],
      // typescript-eslint
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "default",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow" },
        { selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow" },
        { selector: "typeLike",
          format: ["PascalCase"] },
        { selector: "class",
          format: ["PascalCase"] },
        { selector: "enumMember",
          format: ["PascalCase"] },
        { selector: "enum",
          format: ["PascalCase"] },
        { selector: "property",
          format: null,
          leadingUnderscore: "allow" },
      ],
      "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-extraneous-class": ["error", { allowStaticOnly: true }],
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          types: {
            Object: {
              message: "Avoid using the `Object` type.",
              fixWith: "object",
            },
            Function: {
              message: "Avoid using the `Function` type.",
              fixWith: "<P, T>(args: P) => T",
            },
            Boolean: {
              message: "Avoid using the `Boolean` type.",
              fixWith: "boolean",
            },
            Number: {
              message: "Avoid using the `Number` type.",
              fixWith: "number",
            },
            String: {
              message: "Avoid using the `String` type.",
              fixWith: "string",
            },
            Symbol: {
              message: "Avoid using the `Symbol` type.",
              fixWith: "symbol",
            },
          },
        },
      ],
      "@typescript-eslint/no-shadow": ["error", { ignoreTypeValueShadow: false }],
      "@typescript-eslint/no-unnecessary-condition": ["error", { checkTypePredicates: true }],
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-nullish-coalescing": ["error", { ignorePrimitives: { string: true } }],
      "@typescript-eslint/prefer-literal-enum-member": "off",
      "@typescript-eslint/related-getter-setter-pairs": "off",
      "@typescript-eslint/restrict-plus-operands": ["error", { allowNumberAndString: true }],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/unbound-method": "off",
      // stylistic
      "@stylistic/arrow-parens": ["error", "as-needed"],
      "@stylistic/generator-star-spacing": [
        "error",
        {
          before: true,
          after: true,
          method: { before: true,
            after: true },
        },
      ],
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/jsx-wrap-multilines": [
        "error",
        {
          declaration: "parens-new-line",
          assignment: "parens-new-line",
          return: "parens-new-line",
          arrow: "parens-new-line",
          condition: "parens-new-line",
          logical: "parens-new-line",
          prop: "parens-new-line",
          propertyValue: "parens-new-line",
        }],
      "@stylistic/multiline-ternary": ["error", "never"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: "avoidEscape" }],
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/yield-star-spacing": ["error", "after"],
      // unicorn
      // "unicorn/no-useless-switch-case": "error",
      // "unicorn/prefer-array-some": "error",
      // "unicorn/prefer-at": ["error", { checkAllIndexAccess: true }],
      "unicorn/prefer-switch": "error",
      "unicorn/prefer-ternary": "error",
      "unicorn/switch-case-braces": "error",
    },
  },
]);

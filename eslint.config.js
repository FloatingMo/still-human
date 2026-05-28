import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwind from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "build"]),

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      ...tailwind.configs["flat/recommended"], // Explicitly spread flat variant array
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      tailwindcss: {
        // Enforce linting inside your separated styling primitives and objects
        callees: ["classnames", "clsx", "ctl", "cva", "tv"],
        ignoredKeys: ["compoundVariants", "defaultVariants"],
      },
    },
    rules: {
      // Prevent layout-thrashing class names while maintaining scannability
      "max-len": [
        "error",
        { code: 140, ignorePattern: "class(Name)?=\\s*['\"`]|.*Styles.*" },
      ],

      // Strict layout configurations
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "error",

      // Crucial v4 override: Turn off typo-checking if you generate dynamic classes,
      // or configure it to ignore fluid css-variable tokens.
      "tailwindcss/no-unknown-classname": "off",
    },
  },
]);

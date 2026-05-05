import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 1. ESLint's baseline recommended rules (Replaces `extends: ["js/recommended"]`)
  js.configs.recommended,

  // 2. Your specific file targeting and global variables
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },

  // 3. Prettier MUST be the very last item in the array
  eslintConfigPrettier,
];
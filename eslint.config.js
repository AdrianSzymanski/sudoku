import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  globalIgnores(['node_modules', 'dist']),
  {
    basePath: './',
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        2,
        { 'fixStyle': 'separate-type-imports' }
      ],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': 'avoidEscape' }],
      '@stylistic/semi': ['error', 'always'],
    }
  },
]);

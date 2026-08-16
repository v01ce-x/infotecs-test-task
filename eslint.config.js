import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      files: ['src/**/*.{ts,tsx}'],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
          ...globals.browser,
        },
        parserOptions: {
          projectService: true,
        },
      },
      plugins: {
        prettier: prettierPlugin,
      },
      rules: {
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            trailingComma: 'all',
          },
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    eslintConfigPrettier,
);

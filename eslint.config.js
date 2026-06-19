import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

export default ts.config(
    {
        ignores: ['dist/**', 'build/**', 'node_modules/**', 'coverage/**', 'src-tauri/target/**'],
    },

    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,

    {
        files: ['**/*.{js,ts,svelte}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    {
        files: ['**/*.svelte', '**/*.svelte.ts'],
        languageOptions: {
            parserOptions: {
                parser: ts.parser,
                extraFileExtensions: ['.svelte'],
                svelteConfig,
            },
        },
    },

    {
        files: ['**/*.{ts,svelte}'],
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    prettier,
);

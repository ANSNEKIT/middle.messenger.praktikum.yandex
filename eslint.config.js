import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import arbnbPlugin from 'eslint-config-airbnb-base';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        files: ['src/**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: { ...globals.node },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        ignores: [
            '.github',
            '.idea',
            '            .vscode',
            'node_modules',
            'public',
            'dist',
            'static',
            '**/*.config.js',
            '**/*.d.ts',
            'server.mjs',
        ],
        plugins: {
            importPlugin,
            arbnbPlugin,
            eslintPluginPrettier,
        },
        rules: {
            semi: ['error', 'always'],
            'eol-last': ['error', 'always'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
];

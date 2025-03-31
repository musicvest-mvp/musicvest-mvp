import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig:{},
});

export default [
    ...compat.config({ extends: ['eslint:recommended', 'plugin:react/recommended'] }),
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    ...compat.plugins('react'),
    { languageOptions: { parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } } }, rules: { indent: ['error', 2], quotes: ['error', 'single'], semi: ['error', 'always'] } },
];
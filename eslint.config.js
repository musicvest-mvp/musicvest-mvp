// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';



export default [
  js.configs.recommended,
  react.configs.recommended,
  jsxA11y.configs.recommended,
  {
    plugins: {
      'react': react,
      'jsx-a11y': jsxA11y ,
       'import': importPlugin,
    },
    rules: {
        ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    ignores: ['node_modules', 'client/dist'],
  },
];
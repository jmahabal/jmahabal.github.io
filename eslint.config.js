import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import buttonSizeFix from './eslint-rules/button-size-fix.js';

export default [
  // Base configuration for all files
  {
    ignores: ['dist', 'declaration.d.ts', 'vite.config.ts', 'vite.config.d.ts'],
  },
  
  // Configuration for eslint.config.js itself
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  
  // Configuration for config files (no TypeScript parsing)
  {
    files: ['*.config.js', '*.config.ts', 'tailwind.config.js', 'vite.config.js', 'vite.config.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  
  // JavaScript files
  {
    files: ['**/*.{js,jsx,ts,tsx}', '!eslint.config.js', '!*.config.js', '!*.config.ts', '!tailwind.config.js', '!vite.config.js', '!vite.config.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      prettier,
      tailwindcss,
      'custom-rules': {
        rules: {
          'button-size-fix': buttonSizeFix,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'cn'],
        config: 'tailwind.config.js',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      

      
      // Prettier
      'prettier/prettier': 'error',
      
      // React
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      
      // TypeScript
      'no-unused-vars': 'off', // Use TS version
      '@typescript-eslint/no-unused-vars': ['warn'],
      
      // General
      'prefer-const': 'error',
      
      // Tailwind CSS rules
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'warn',
      'tailwindcss/no-arbitrary-value': 'off', // Allow arbitrary values but lint them
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
      
      // Enforce destructuring React imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react'],
              importNames: ['default'],
              message: 'Please use destructured imports from React instead of default import. Example: import { useState } from "react"'
            }
          ]
        }
      ],
      
      // Custom rule for Button size prop
      'custom-rules/button-size-fix': 'error',
    },
  },
]; 
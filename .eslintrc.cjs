module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'tailwindcss',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['classnames', 'clsx', 'cn'],
      config: 'tailwind.config.js',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'declaration.d.ts', 'vite.config.ts', 'scripts/**/*', 'vite.config.d.ts'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'react/prop-types': 'off', // Not needed with TypeScript
    'no-unused-vars': 'off', // Use TS version
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prefer-const': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
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
  },
}; 
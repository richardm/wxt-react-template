// eslint.config.mjs
import autoImports from './.wxt/eslint-auto-imports.mjs';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import vitest from '@vitest/eslint-plugin';

// FIXME: I'm not sure either of these are working
export default [
  autoImports,
  {
    files: ['**/*.{unit,browser}.{test,spec}.{ts,tsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      'vitest/max-nested-describe': ['error', { max: 3 }], // you can also modify rules' behavior using option like this
      'vitest/valid-title': ['error', { allowArguments: false }],
    },
  },
  {
    files: ['**/*.browser.{test,spec}.{ts,tsx}'],
    plugins: {
      jestDom: jestDomPlugin,
    },
    ...jestDomPlugin.configs['flat/recommended'],
    rules: {
      'jest-dom/prefer-to-have-length': 'error',
      'jest-dom/prefer-to-have-text-content': 'error',
      'jest-dom/prefer-to-have-attribute': 'error',
      'jest-dom/prefer-to-have-class': 'error',
      'jest-dom/prefer-to-have-id': 'error',
    },
  },
];

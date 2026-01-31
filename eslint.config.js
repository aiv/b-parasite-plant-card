import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['dist/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        customElements: 'readonly',
        window: 'readonly',
        console: 'readonly',
        Event: 'readonly',
        URL: 'readonly',
        document: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off'
    }
  }
];

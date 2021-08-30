module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'backpacker-react',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    camelcase: 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // https://stackoverflow.com/a/59268871
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
};

module.exports = {
  root: true,
  extends: ['backpacker-react', 'plugin:import/typescript'],
  rules: {
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

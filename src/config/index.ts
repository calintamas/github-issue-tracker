import env from 'react-native-config';

const DEFAULT_LANGUAGE = 'en';
const DEFAULT_THEME = 'base';

const REQUEST_TIMEOUT = 10 * 1000; // ms

const GITHUB_HOST = 'https://api.github.com';

const { GITHUB_TOKEN } = env;

export {
  DEFAULT_THEME,
  DEFAULT_LANGUAGE,
  GITHUB_HOST,
  REQUEST_TIMEOUT,
  GITHUB_TOKEN
};
export * from './error-codes';

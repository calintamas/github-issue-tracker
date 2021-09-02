import { create } from 'apisauce';

import { GITHUB_HOST, GITHUB_TOKEN, REQUEST_TIMEOUT } from '../../config';
import { logger } from '../../utils/logger';

function createGithubProvider() {
  const apiObj = create({
    baseURL: GITHUB_HOST,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${GITHUB_TOKEN}`
    },
    timeout: REQUEST_TIMEOUT
  });

  apiObj.addMonitor(logger.debug);

  return apiObj;
}

const githubProvider = createGithubProvider();

// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#client-errors
export type GithubClientError = {
  message?: string;
};

export { githubProvider };

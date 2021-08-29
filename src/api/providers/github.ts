import { create } from 'apisauce';

import { GITHUB_HOST, REQUEST_TIMEOUT } from '../../config';
import { logger } from '../../utils/logger';

function createGithubProvider() {
  const apiObj = create({
    baseURL: GITHUB_HOST,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json'
    },
    timeout: REQUEST_TIMEOUT
  });

  apiObj.addMonitor(logger.debug);

  return apiObj;
}

const githubProvider = createGithubProvider();

export { githubProvider };

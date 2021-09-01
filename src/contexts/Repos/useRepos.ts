import React from 'react';

import { GetRepoArgs } from '../../api';
import { logger } from '../../utils/logger';
import { useGithubApiContext } from '../GithubApi';
import { Repo } from './types';

export type AddRepoArgs = {
  onSuccess?: () => void;
} & GetRepoArgs;

function useRepos() {
  const { getRepo } = useGithubApiContext();

  const [repos, setRepos] = React.useState<Repo[]>([]);

  const addRepo = React.useCallback(
    async ({ owner, repo, onSuccess }: AddRepoArgs) => {
      try {
        const res = await getRepo({
          owner,
          repo
        });
        setRepos((prevRepos) => [
          ...prevRepos,
          {
            owner: res.owner.login,
            repo: res.name,
            imageUrl: res.owner.avatar_url
          }
        ]);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        logger.error(err);
      }
    },
    [getRepo]
  );

  return {
    repos,
    addRepo
  };
}

export { useRepos };

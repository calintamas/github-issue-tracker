import React from 'react';

import { ReactChildren } from '../../types';
import { Repo } from './types';
import { AddRepoArgs, useRepos } from './useRepos';

export type ReposContextType = {
  repos: Repo[];
  addRepo: (args: AddRepoArgs) => void;
};

const ReposContext = React.createContext<ReposContextType | undefined>(
  undefined
);

export type ReposProviderProps = {
  children: ReactChildren;
};

function ReposProvider({ children }: ReposProviderProps): JSX.Element {
  const { repos, addRepo } = useRepos();

  const value = {
    repos,
    addRepo
  };

  return (
    <ReposContext.Provider value={value}>{children}</ReposContext.Provider>
  );
}

function useReposContext(): ReposContextType {
  const ctx = React.useContext(ReposContext);
  if (!ctx) {
    throw new Error(`useReposContext() must be called within ReposContext`);
  }
  return ctx;
}

export { ReposProvider, useReposContext };

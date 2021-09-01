import React from 'react';

import { GithubIssuesApi, GithubReposApi } from '../../api';
import { ReactChildren } from '../../types';

export type GithubApiContextType = GithubIssuesApi & GithubReposApi;

const GithubApiContext = React.createContext<GithubApiContextType | null>(null);

export type GithubApiContextProviderProps = {
  children: ReactChildren;
} & GithubApiContextType;

function GithubApiProvider({
  children,
  ...props
}: GithubApiContextProviderProps): JSX.Element {
  return (
    <GithubApiContext.Provider value={props}>
      {children}
    </GithubApiContext.Provider>
  );
}

function useGithubApiContext(): GithubApiContextType {
  const ctx = React.useContext(GithubApiContext);
  if (!ctx) {
    throw new Error(
      `useGithubApiContext() must be called within GithubApiContext`
    );
  }
  return ctx;
}

export { GithubApiProvider, useGithubApiContext };

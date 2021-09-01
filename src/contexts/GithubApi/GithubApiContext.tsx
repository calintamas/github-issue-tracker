import React from 'react';

import { GithubIssuesApi } from '../../api';

export type GithubApiContextType = GithubIssuesApi;

const GithubApiContext = React.createContext<GithubApiContextType | null>(null);

export type GithubApiContextProviderProps = {
  children: React.ReactNode;
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

function useGithubApi(): GithubApiContextType {
  const ctx = React.useContext(GithubApiContext);
  if (!ctx) {
    throw new Error(`useGithubApi() must be called within GithubApiContext`);
  }
  return ctx;
}

export { GithubApiProvider, useGithubApi };

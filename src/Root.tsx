import { ConfigProvider } from '@backpacker/primitives';
import React from 'react';
import { LogBox } from 'react-native';

import { getRepoIssueByNumber, getRepositoryIssues } from './api';
import { DEFAULT_THEME } from './config';
import { BookmarksProvider, GithubApiProvider } from './contexts';
import { RootNavigator } from './navigation';
import { themeConfig } from './theme';

LogBox.ignoreAllLogs(true);

function Root(): JSX.Element {
  return (
    <ConfigProvider defaultTheme={DEFAULT_THEME} config={themeConfig}>
      <GithubApiProvider
        getRepositoryIssues={getRepositoryIssues}
        getRepoIssueByNumber={getRepoIssueByNumber}>
        <BookmarksProvider>
          <RootNavigator />
        </BookmarksProvider>
      </GithubApiProvider>
    </ConfigProvider>
  );
}

export default Root;

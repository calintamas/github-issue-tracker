import { ConfigProvider } from '@backpacker/primitives';
import React from 'react';
import { LogBox } from 'react-native';

import { getRepositoryIssues } from './api';
import App from './App';
import { DEFAULT_THEME } from './config';
import { GithubApiProvider } from './contexts';
import { themeConfig } from './theme';

LogBox.ignoreAllLogs(true);

function Root(): JSX.Element {
  return (
    <ConfigProvider defaultTheme={DEFAULT_THEME} config={themeConfig}>
      <GithubApiProvider getRepositoryIssues={getRepositoryIssues}>
        <App />
      </GithubApiProvider>
    </ConfigProvider>
  );
}

export default Root;

import { ConfigProvider } from '@backpacker/primitives';
import React from 'react';

import App from './App';
import { DEFAULT_THEME } from './config';
import { themeConfig } from './theme';

function Root() {
  return (
    <ConfigProvider defaultTheme={DEFAULT_THEME} config={themeConfig}>
      <App />
    </ConfigProvider>
  );
}

export default Root;

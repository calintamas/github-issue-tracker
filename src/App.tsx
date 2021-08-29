import React from 'react';

import { useTranslation } from './i18n';
import { Column, Text } from './primitives';

function App() {
  const { t } = useTranslation();

  return (
    <Column flex={1} center>
      <Text variant='headline'>{t('home')}</Text>
    </Column>
  );
}

export default App;

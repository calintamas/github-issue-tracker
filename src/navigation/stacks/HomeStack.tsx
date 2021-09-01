import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useTranslation } from '../../i18n';
import { Home } from '../../screens/Home';
import { RepoIssueDetails } from '../../screens/RepoIssueDetails';
import { RepoIssueList } from '../../screens/RepoIssueList';

const Stack = createStackNavigator();

function HomeStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          title: t('repos')
        }}
      />
      <Stack.Screen name='RepoIssueList' component={RepoIssueList} />
      <Stack.Screen name='RepoIssueDetails' component={RepoIssueDetails} />
    </Stack.Navigator>
  );
}

export { HomeStack };

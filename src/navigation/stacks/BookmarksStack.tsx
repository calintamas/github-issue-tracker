import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Bookmarks } from '../../screens/Bookmarks';
import { RepoIssueDetails } from '../../screens/RepoIssueDetails';

const Stack = createStackNavigator();

function BookmarksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Bookmarks' component={Bookmarks} />
      <Stack.Screen name='RepoIssueDetails' component={RepoIssueDetails} />
    </Stack.Navigator>
  );
}

export { BookmarksStack };

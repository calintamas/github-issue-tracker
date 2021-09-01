import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Bookmarks } from '../../screens/Bookmarks';

const Stack = createStackNavigator();

function BookmarksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Bookmarks' component={Bookmarks} />
    </Stack.Navigator>
  );
}

export { BookmarksStack };

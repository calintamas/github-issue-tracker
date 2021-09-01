import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BookmarksStack, HomeStack } from './stacks';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name='HomeStack' component={HomeStack} />
      <Tab.Screen name='BookmarksStack' component={BookmarksStack} />
    </Tab.Navigator>
  );
}

export { BottomTabNavigator };

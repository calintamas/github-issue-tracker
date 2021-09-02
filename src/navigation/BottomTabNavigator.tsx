import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { useTranslation } from '../i18n';
import { BookmarksStack, HomeStack } from './stacks';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: t('repositories')
        }}
      />
      <Tab.Screen
        name='BookmarksStack'
        component={BookmarksStack}
        options={{
          tabBarLabel: t('bookmarks')
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomTabNavigator };

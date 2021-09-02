import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Emoji } from '../components/Emoji';
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
          tabBarLabel: t('repos'),
          tabBarIcon: () => <Emoji name='house' />
        }}
      />
      <Tab.Screen
        name='BookmarksStack'
        component={BookmarksStack}
        options={{
          tabBarLabel: t('bookmarks'),
          tabBarIcon: () => <Emoji name='bookmarks' />
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomTabNavigator };

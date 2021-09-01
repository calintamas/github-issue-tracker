import { NavigationContainer } from '@react-navigation/native';
import {
  TransitionPresets,
  createStackNavigator
} from '@react-navigation/stack';
import React from 'react';

import { useTranslation } from '../i18n';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AddRepoStack } from './stacks';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name='BottomTabNavigator'
          component={BottomTabNavigator}
          options={{
            title: t('repos')
          }}
        />

        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            animationEnabled: true,
            ...TransitionPresets.ModalPresentationIOS
          }}>
          <Stack.Screen name='AddRepoStack' component={AddRepoStack} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { RootNavigator };

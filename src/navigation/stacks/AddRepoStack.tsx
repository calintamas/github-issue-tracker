import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useTranslation } from '../../i18n';
import { AddRepo } from '../../screens/AddRepo';

const Stack = createStackNavigator();

function AddRepoStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AddRepo'
        component={AddRepo}
        options={{
          title: t('add_a_new_repo')
        }}
      />
    </Stack.Navigator>
  );
}

export { AddRepoStack };

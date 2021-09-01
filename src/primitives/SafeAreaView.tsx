import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';

import { ReactChildren } from '../types';

export type SafeAreaViewProps = {
  children: ReactChildren;
  style?: ViewStyle;
};

function SafeAreaViewWrapper({ style, children }: SafeAreaViewProps) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1
        },
        style
      ]}>
      {children}
    </SafeAreaView>
  );
}

export default SafeAreaViewWrapper;

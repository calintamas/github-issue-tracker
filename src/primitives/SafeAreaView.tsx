import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';

export type SafeAreaViewProps = {
  children: React.ReactNode;
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

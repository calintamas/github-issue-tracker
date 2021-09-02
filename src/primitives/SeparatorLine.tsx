import { useTheme } from '@backpacker/primitives';
import React from 'react';
import { View, ViewStyle } from 'react-native';

function SeparatorLine(props: ViewStyle) {
  const { colors } = useTheme().theme;

  const baseStyle = {
    height: 1,
    width: '100%',
    backgroundColor: colors.background,
    ...props
  };
  return <View style={baseStyle} />;
}

export { SeparatorLine };

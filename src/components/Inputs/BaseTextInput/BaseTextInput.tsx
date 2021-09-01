import React from 'react';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useTheme } from '../../../primitives';
import styles from './styles';

export type BaseTextInputProps = {
  hasError?: boolean;
  style?: ViewStyle;
} & TextInputProps;

function BaseTextInput({ hasError, style, ...rest }: BaseTextInputProps) {
  const { colors } = useTheme().theme;

  const baseStyle = [
    styles.base,
    {
      color: colors.text,
      backgroundColor: colors.surface
    },
    hasError && { color: colors.red },
    style
  ];

  return (
    <TextInput
      style={baseStyle}
      placeholderTextColor={colors.neutral}
      underlineColorAndroid='transparent'
      {...rest}
    />
  );
}

export { BaseTextInput };

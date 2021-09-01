import React from 'react';

import { Text, Touchable, useTheme } from '../../primitives';

export type DefaultButtonProps = {
  label: string;
  onPress?: () => void;
};

function DefaultButton({ label, onPress }: DefaultButtonProps) {
  const { colors } = useTheme().theme;

  return (
    <Touchable
      onPress={onPress}
      width='100%'
      height={50}
      borderRadius={8}
      backgroundColor={colors.brand}
      justifyContent='center'
      alignItems='center'>
      <Text variant='callout' color={colors.invertedText} semibold>
        {label}
      </Text>
    </Touchable>
  );
}

export { DefaultButton };

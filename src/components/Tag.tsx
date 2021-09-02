import React from 'react';

import { Column, Text, useTheme } from '../primitives';

export type TagProps = {
  isSelected: boolean;
  label: string;
};

function Tag({ isSelected, label }: TagProps) {
  const { colors } = useTheme().theme;

  return (
    <Column
      backgroundColor={isSelected ? colors.lightBrand : colors.background}
      borderWidth={1}
      borderColor={isSelected ? colors.lightBrandText : colors.border}
      borderRadius={15}
      padding={5}
      minWidth={50}
      center>
      <Text
        variant='caption1'
        color={isSelected ? colors.lightBrandText : colors.text}>
        {label}
      </Text>
    </Column>
  );
}

export { Tag };

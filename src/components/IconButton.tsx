import React from 'react';

import { Text, Touchable } from '../primitives';

export type IconButtonProps = {
  name: 'plus';
  onPress?: () => void;
};

function getIcon(name: IconButtonProps['name']): string {
  switch (name) {
    case 'plus':
      return '➕';
    default:
      throw new Error(`Icon ${name} not supported`);
  }
}

function IconButton({ name, onPress }: IconButtonProps) {
  return (
    <Touchable onPress={onPress} padding={5}>
      <Text>{getIcon(name)}</Text>
    </Touchable>
  );
}

export { IconButton };

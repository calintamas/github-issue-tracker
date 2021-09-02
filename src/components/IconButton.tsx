import React from 'react';

import { Touchable } from '../primitives';
import { Emoji, EmojiName } from './Emoji';

export type IconButtonProps = {
  name: EmojiName;
  onPress?: () => void;
};

function IconButton({ name, onPress }: IconButtonProps) {
  return (
    <Touchable onPress={onPress} padding={5}>
      <Emoji name={name} />
    </Touchable>
  );
}

export { IconButton };

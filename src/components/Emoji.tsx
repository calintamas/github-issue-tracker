import React from 'react';

import { Text } from '../primitives';

export type EmojiName =
  | 'speech-baloon'
  | 'heavy-plus-sign'
  | 'yellow-heart'
  | 'white-heart'
  | 'green-circle'
  | 'red-circle'
  | 'house'
  | 'bookmarks';

type EmojiProps = {
  name: EmojiName;
};

function getEmojiFor(name: EmojiName): string {
  switch (name) {
    case 'heavy-plus-sign':
      return '➕';

    case 'yellow-heart':
      return '💛';

    case 'white-heart':
      return '🤍';

    case 'green-circle':
      return '🟢';

    case 'red-circle':
      return '🔴';

    case 'speech-baloon':
      return '💬';

    case 'house':
      return '🏠';

    case 'bookmarks':
      return '🔖';

    default:
      throw new Error(`Icon ${name} not supported`);
  }
}

function Emoji({ name }: EmojiProps) {
  return (
    <Text variant='body' padding={2}>
      {getEmojiFor(name)}
    </Text>
  );
}

export { Emoji };

import React from 'react';
import { Image } from 'react-native';

import { Column, Row, Spacer, Text, Touchable, useTheme } from '../primitives';

export type RepoRowProps = {
  owner: string;
  repo: string;
  imageUrl: string;
  onPress?: () => void;
};

function RepoRow({ owner, repo, imageUrl, onPress }: RepoRowProps) {
  const { colors } = useTheme().theme;

  return (
    <Touchable
      backgroundColor={colors.surface}
      padding={15}
      borderRadius={8}
      onPress={onPress}>
      <Row alignItems='center'>
        <Column>
          <Image
            source={{
              uri: imageUrl
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 8
            }}
          />
        </Column>
        <Spacer size={2} />
        <Column>
          <Text variant='caption1' color={colors.neutral}>
            {owner}
          </Text>
          <Text variant='headline' color={colors.text} medium>
            {repo}
          </Text>
        </Column>
      </Row>
    </Touchable>
  );
}

export { RepoRow };

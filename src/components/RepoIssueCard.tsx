import React from 'react';

import { RepositoryIssueStatus } from '../api';
import { Column, Row, Spacer, Text, useTheme } from '../primitives';
import { formatTimeSince } from '../utils/time';
import { Emoji } from './Emoji';

type RepoIssueCardProps = {
  owner: string;
  repo: string;
  title: string;
  commentsCount: number;
  createdAt: string;
  status: RepositoryIssueStatus;
  number: number;
  isHighlighted: boolean;
};

function RepoIssueCard({
  owner,
  repo,
  title,
  commentsCount,
  createdAt,
  status,
  number,
  isHighlighted
}: RepoIssueCardProps) {
  const { colors } = useTheme().theme;

  return (
    <Row
      backgroundColor={isHighlighted ? colors.highlight : colors.surface}
      paddingVertical={10}>
      <Column width={60} center>
        <Emoji name={status === 'closed' ? 'red-circle' : 'green-circle'} />
      </Column>

      <Column flex={1}>
        <Text
          variant='caption1'
          ellipsizeMode='middle'
          numberOfLines={1}
          color={colors.neutral}>{`${owner}/${repo} #${number}`}</Text>
        <Spacer size={0.5} />
        <Text variant='body' ellipsizeMode='tail' numberOfLines={3}>
          {title}
        </Text>
        {commentsCount > 0 && (
          <>
            <Spacer size={0.5} />
            <Row alignItems='center'>
              <Emoji name='speech-baloon' />
              <Text variant='caption2' color={colors.neutral}>
                {commentsCount}
              </Text>
            </Row>
          </>
        )}
      </Column>

      <Column width={60} alignItems='center'>
        <Text variant='caption1' color={colors.neutral}>
          {formatTimeSince(createdAt)}
        </Text>
      </Column>
    </Row>
  );
}

export { RepoIssueCard };

import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Column, SafeAreaView, Text } from '../../primitives';
import { useRepoIssueDetails } from './useRepoIssueDetails';

function RepoIssueDetails() {
  const { data, loading, err } = useRepoIssueDetails({
    owner: 'facebook',
    repo: 'react',
    issueNumber: 140
  });

  if (loading) {
    return (
      <Column flex={1} center>
        <ActivityIndicator />
      </Column>
    );
  }

  if (err) {
    return (
      <Column flex={1} center>
        <Text>{`${err.message}`}</Text>
      </Column>
    );
  }

  return (
    <SafeAreaView>
      <Column flex={1} center>
        <Text variant='title1'>{data?.title}</Text>
        <Text variant='body'>{data?.body}</Text>
        <Text>{data?.number}</Text>
      </Column>
    </SafeAreaView>
  );
}

export { RepoIssueDetails };

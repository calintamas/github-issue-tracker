import React from 'react';
import { ActivityIndicator } from 'react-native';

import { IconButton } from '../../components/IconButton';
import { useBookmarksContext } from '../../contexts';
import { RepoIssueDetailsScreenProps } from '../../navigation/types';
import { Column, SafeAreaView, Text } from '../../primitives';
import { useRepoIssueDetails } from './useRepoIssueDetails';

function RepoIssueDetails({ route }: RepoIssueDetailsScreenProps) {
  const { issueNumber } = route.params;

  const { data, loading, err } = useRepoIssueDetails(route.params);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksContext();

  const isIssueBookmarked = React.useMemo(
    () => isBookmarked(issueNumber),
    [isBookmarked, issueNumber]
  );

  const toggleBookmark = React.useCallback(() => {
    if (!data) {
      return;
    }
    if (isIssueBookmarked) {
      removeBookmark(issueNumber);
    } else {
      addBookmark(data);
    }
  }, [addBookmark, data, isIssueBookmarked, issueNumber, removeBookmark]);

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
        <IconButton
          name={isIssueBookmarked ? 'yellow-heart' : 'white-heart'}
          onPress={toggleBookmark}
        />
        <Text variant='title1'>{data?.title}</Text>
        <Text variant='body'>{data?.body}</Text>
        <Text>{data?.number}</Text>
      </Column>
    </SafeAreaView>
  );
}

export { RepoIssueDetails };

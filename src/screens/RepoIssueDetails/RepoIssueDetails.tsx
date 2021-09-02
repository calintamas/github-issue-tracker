import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import { IconButton } from '../../components/IconButton';
import { useBookmarksContext } from '../../contexts';
import { RepoIssueDetailsScreenProps } from '../../navigation/types';
import { Column, SafeAreaView, Spacer, Text, useTheme } from '../../primitives';
import { useRepoIssueDetails } from './useRepoIssueDetails';

function RepoIssueDetails({ route, navigation }: RepoIssueDetailsScreenProps) {
  const { colors, padding } = useTheme().theme;
  const { owner, repo, issueId, issueNumber } = route.params;

  const { data, loading, err } = useRepoIssueDetails(route.params);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksContext();

  const isIssueBookmarked = React.useMemo(
    () => isBookmarked(issueId),
    [isBookmarked, issueId]
  );

  const toggleBookmark = React.useCallback(() => {
    if (!data) {
      return;
    }
    if (isIssueBookmarked) {
      removeBookmark(issueId);
    } else {
      addBookmark({
        ...data,
        owner,
        repo
      });
    }
  }, [
    addBookmark,
    data,
    isIssueBookmarked,
    issueId,
    owner,
    removeBookmark,
    repo
  ]);

  const renderRightHeader = React.useCallback(
    () => (
      <IconButton
        name={isIssueBookmarked ? 'yellow-heart' : 'white-heart'}
        onPress={toggleBookmark}
      />
    ),
    [toggleBookmark, isIssueBookmarked]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderRightHeader,
      title: `#${issueNumber}`
    });
  }, [issueNumber, navigation, renderRightHeader]);

  if (loading) {
    return (
      <Column flex={1} center>
        <ActivityIndicator />
      </Column>
    );
  }

  if (err || !data) {
    return (
      <Column flex={1} center>
        <Text>{`${err?.message}`}</Text>
      </Column>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding,
          backgroundColor: colors.surface
        }}>
        <Text variant='title1'>{data.title}</Text>
        <Spacer size={2} />
        <Text variant='body' color={colors.text}>
          {data.body}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export { RepoIssueDetails };

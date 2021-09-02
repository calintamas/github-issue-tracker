import React from 'react';
import { FlatList } from 'react-native';

import { RepoIssueCard } from '../../components/RepoIssueCard';
import { BookmarkedRepoIssue, useBookmarksContext } from '../../contexts';
import { RepoIssueDetailsScreenProps } from '../../navigation/types';
import { SafeAreaView, SeparatorLine, Touchable } from '../../primitives';

function Bookmarks({ navigation }: RepoIssueDetailsScreenProps) {
  const { bookmarks } = useBookmarksContext();

  const renderItem = React.useCallback(
    ({ item }) => {
      const { number, title, state, comments, created_at, owner, repo, id } =
        item as BookmarkedRepoIssue;

      const onPress = () => {
        navigation.navigate('RepoIssueDetails', {
          owner,
          repo,
          issueNumber: number,
          issueId: id
        });
      };

      return (
        <Touchable key={`${number}`} onPress={onPress}>
          <RepoIssueCard
            owner={owner}
            repo={repo}
            title={title}
            commentsCount={comments}
            createdAt={created_at}
            status={state}
            number={number}
            isHighlighted={false}
          />
        </Touchable>
      );
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <SeparatorLine />}
      />
    </SafeAreaView>
  );
}

export { Bookmarks };

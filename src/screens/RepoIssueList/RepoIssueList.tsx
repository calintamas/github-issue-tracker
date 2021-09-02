import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { RepositoryIssue } from '../../api';
import { RepoIssueCard } from '../../components/RepoIssueCard';
import { Tag } from '../../components/Tag';
import { useBookmarksContext } from '../../contexts';
import { useTranslation } from '../../i18n';
import { RepoIssueListScreenProps } from '../../navigation/types';
import {
  Column,
  Row,
  SafeAreaView,
  SeparatorLine,
  Spacer,
  Text,
  Touchable,
  useTheme
} from '../../primitives';
import { RepoIssueFilters, useRepoIssueList } from './useRepoIssueList';

const initialFilters: RepoIssueFilters = {
  page: 1,
  perPage: 10,
  status: 'open'
};

function RepoIssueList({
  route,
  navigation
}: RepoIssueListScreenProps): JSX.Element {
  const { t } = useTranslation();
  const { owner, repo } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${owner}/${repo}`
    });
  }, [navigation, owner, repo]);

  const { colors, padding } = useTheme().theme;

  const {
    data,
    filters,
    loadNextPage,
    isLoadingMoreData,
    isRefreshingData,
    showAllIssues,
    showClosedIssues,
    showOpenIssues,
    refreshIssues
  } = useRepoIssueList({
    ...initialFilters,
    owner,
    repo
  });

  const { isBookmarked, bookmarks } = useBookmarksContext();

  const renderItem = React.useCallback(
    ({ item }) => {
      const { number, title, state, comments, created_at, id } =
        item as RepositoryIssue;
      const onPress = () =>
        navigation.navigate('RepoIssueDetails', {
          owner,
          repo,
          issueNumber: number,
          issueId: id
        });
      return (
        <Touchable key={`${id}`} onPress={onPress}>
          <RepoIssueCard
            owner={owner}
            repo={repo}
            title={title}
            commentsCount={comments}
            createdAt={created_at}
            status={state}
            number={number}
            isHighlighted={isBookmarked(id)}
          />
        </Touchable>
      );
    },
    [isBookmarked, navigation, owner, repo]
  );

  const onEndReached = React.useCallback(() => {
    loadNextPage();
  }, [loadNextPage]);

  const renderHeader = React.useCallback(
    () => (
      <Column padding={padding} backgroundColor={colors.surface}>
        <Text variant='title1' semibold>
          {t('issues')}
        </Text>
        <Spacer />
        <Row>
          <Touchable onPress={showAllIssues}>
            <Tag label='All' isSelected={filters.status === 'all'} />
          </Touchable>
          <Spacer />
          <Touchable onPress={showClosedIssues}>
            <Tag label='Closed' isSelected={filters.status === 'closed'} />
          </Touchable>
          <Spacer />
          <Touchable onPress={showOpenIssues}>
            <Tag label='Open' isSelected={filters.status === 'open'} />
          </Touchable>
        </Row>
      </Column>
    ),
    [
      colors.surface,
      filters.status,
      padding,
      showAllIssues,
      showClosedIssues,
      showOpenIssues,
      t
    ]
  );

  return (
    <SafeAreaView>
      <FlatList
        onRefresh={refreshIssues}
        refreshing={isRefreshingData}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ItemSeparatorComponent={() => <SeparatorLine />}
        ListHeaderComponent={renderHeader}
        extraData={bookmarks}
      />
      {isLoadingMoreData && <ActivityIndicator size='small' />}
    </SafeAreaView>
  );
}

export { RepoIssueList };

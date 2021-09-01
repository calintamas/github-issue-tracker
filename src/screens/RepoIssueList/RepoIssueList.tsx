import React from 'react';
import { ActivityIndicator, Button, FlatList } from 'react-native';

import { RepositoryIssue } from '../../api';
import { RepoIssueListScreenProps } from '../../navigation/types';
import { Column, Row, SafeAreaView, Spacer, Text } from '../../primitives';
import { RepoIssueFilters, useRepoIssueList } from './useRepoIssueList';

const initialFilters: RepoIssueFilters = {
  page: 1,
  perPage: 30,
  status: 'open'
};

function RepoIssueList({ route }: RepoIssueListScreenProps): JSX.Element {
  const {
    data,
    loadNextPage,
    isLoadingMoreData,
    isRefreshingData,
    showAllIssues,
    showClosedIssues,
    showOpenIssues,
    refreshIssues
  } = useRepoIssueList({
    ...initialFilters,
    owner: route.params.owner,
    repo: route.params.repo
  });

  const renderItem = React.useCallback(({ item }) => {
    const { number, title, state } = item as RepositoryIssue;
    return (
      <Column key={`${number}`}>
        <Row>
          <Text>{number}</Text>
          <Spacer />
          <Text>{state}</Text>
        </Row>
        <Text textAlign='left'>{title}</Text>
      </Column>
    );
  }, []);

  const onEndReached = React.useCallback(() => {
    loadNextPage();
  }, [loadNextPage]);

  return (
    <SafeAreaView>
      <Row justifyContent='space-between'>
        <Button title='All' onPress={showAllIssues} />
        <Column>
          <Button title='Closed' onPress={showClosedIssues} />
        </Column>
        <Button title='Open' onPress={showOpenIssues} />
      </Row>

      <FlatList
        onRefresh={refreshIssues}
        refreshing={isRefreshingData}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ItemSeparatorComponent={() => <Spacer />}
      />
      {isLoadingMoreData && <ActivityIndicator size='small' />}
    </SafeAreaView>
  );
}

export { RepoIssueList };

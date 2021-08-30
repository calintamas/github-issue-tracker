import React from 'react';
import { ActivityIndicator, Button, FlatList } from 'react-native';

import { RepositoryIssue } from './api';
import { RepoIssueFilters, useRepoIssueList } from './hooks';
import { Column, Row, SafeAreaView, Spacer, Text } from './primitives';

const initialFilters: RepoIssueFilters = {
  owner: 'facebook',
  repo: 'react',
  page: 1,
  perPage: 30,
  status: 'open'
};

function App(): JSX.Element {
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
  } = useRepoIssueList(initialFilters);

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
    console.log('onEndReached');
    loadNextPage();
  }, [loadNextPage]);

  console.log({
    data,
    filters,
    isRefreshingData,
    isLoadingMoreData
  });

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

export default App;

import React from 'react';
import { FlatList } from 'react-native';

import { RepositoryIssue } from '../../api';
import { useBookmarksContext } from '../../contexts';
import { Column, Row, SafeAreaView, Spacer, Text } from '../../primitives';

function Bookmarks() {
  const { bookmarks } = useBookmarksContext();

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

  return (
    <SafeAreaView>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer />}
      />
    </SafeAreaView>
  );
}

export { Bookmarks };

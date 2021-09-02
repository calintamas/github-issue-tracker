import React from 'react';
import { FlatList } from 'react-native';

import { IconButton } from '../../components/IconButton';
import { RepoRow } from '../../components/RepoRow';
import { useReposContext } from '../../contexts';
import { HomeNavigationProp } from '../../navigation/types';
import { SafeAreaView, useTheme } from '../../primitives';

type HomeProps = {
  navigation: HomeNavigationProp;
};

function Home({ navigation }: HomeProps) {
  const { padding } = useTheme().theme;

  const { repos } = useReposContext();

  const renderHeaderRight = React.useCallback(
    () => (
      <IconButton
        name='heavy-plus-sign'
        onPress={() =>
          navigation.navigate('AddRepoStack', {
            screen: 'AddRepo'
          })
        }
      />
    ),
    [navigation]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerRightContainerStyle: {
        paddingHorizontal: 10
      }
    });
  }, [navigation, renderHeaderRight]);

  const renderItem = React.useCallback(
    ({ item }) => {
      const { owner, repo, imageUrl } = item;
      return (
        <RepoRow
          owner={owner}
          repo={repo}
          imageUrl={imageUrl}
          onPress={() =>
            navigation.navigate('RepoIssueList', {
              owner,
              repo
            })
          }
        />
      );
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={{ padding }}
        // ListHeaderComponent={renderHeader}
        data={repos}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export { Home };

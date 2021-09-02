import React from 'react';
import { FlatList } from 'react-native';

import { IconButton } from '../../components/IconButton';
import { RepoRow } from '../../components/RepoRow';
import { useReposContext } from '../../contexts';
import { useTranslation } from '../../i18n';
import { HomeNavigationProp } from '../../navigation/types';
import { Row, SafeAreaView, Spacer, Text, useTheme } from '../../primitives';

type HomeProps = {
  navigation: HomeNavigationProp;
};

function Home({ navigation }: HomeProps) {
  const { t } = useTranslation();
  const { padding } = useTheme().theme;

  const { repos } = useReposContext();

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

  const renderHeader = React.useCallback(
    () => (
      <>
        <Row justifyContent='space-between' alignItems='center'>
          <Text variant='title1' semibold>
            {t('repositories')}
          </Text>
          <IconButton
            name='heavy-plus-sign'
            onPress={() =>
              navigation.navigate('AddRepoStack', {
                screen: 'AddRepo'
              })
            }
          />
        </Row>
        <Spacer size={3} />
      </>
    ),
    [navigation, t]
  );

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={{ padding }}
        ListHeaderComponent={renderHeader}
        data={repos}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export { Home };

import React from 'react';

import { DefaultButton } from '../../components/Buttons';
import { BaseTextInput } from '../../components/Inputs';
import { useReposContext } from '../../contexts';
import { useTranslation } from '../../i18n';
import { AddRepoStackNavigationProp } from '../../navigation/types';
import { Column, SafeAreaView, Spacer, useTheme } from '../../primitives';
import { useForm } from './useForm';

export type AddRepoProps = {
  navigation: AddRepoStackNavigationProp;
};

function AddRepo({ navigation }: AddRepoProps) {
  const { t } = useTranslation();
  const { padding } = useTheme().theme;

  const { addRepo } = useReposContext();
  const { repo, owner, setRepo, setOwner } = useForm();

  const onAddRepo = React.useCallback(async () => {
    await addRepo({
      owner,
      repo,
      onSuccess: () => navigation.pop()
    });
  }, [addRepo, navigation, owner, repo]);

  return (
    <SafeAreaView>
      <Column flex={1} padding={padding} paddingBottom={padding * 2}>
        <BaseTextInput
          value={owner}
          onChangeText={setOwner}
          placeholder={t('repository_owner')}
          autoCapitalize='none'
          returnKeyType='next'
        />
        <Spacer />
        <BaseTextInput
          value={repo}
          onChangeText={setRepo}
          placeholder={t('repository_name')}
          autoCapitalize='none'
          returnKeyType='done'
        />
        <Spacer flex={1} />
        <DefaultButton label={t('add_repo')} onPress={onAddRepo} />
      </Column>
    </SafeAreaView>
  );
}

export { AddRepo };

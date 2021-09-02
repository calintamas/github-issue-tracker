import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  RepoIssueList: {
    owner: string;
    repo: string;
  };
  RepoIssueDetails: {
    owner: string;
    repo: string;
    issueNumber: number;
    issueId: number;
  };
};

export type BookmarksStackParamList = {
  Bookmarks: undefined;
};

export type BottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Bookmarks: NavigatorScreenParams<BookmarksStackParamList>;
};

export type AddRepoStackParamList = {
  AddRepo: undefined;
};

export type RootStackParamList = {
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;
  AddRepoStack: NavigatorScreenParams<AddRepoStackParamList>;
};

export type HomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BottomTabNavigator'
>;

export type AddRepoStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddRepoStack'
>;

export type RepoIssueListScreenProps = StackScreenProps<
  HomeStackParamList,
  'RepoIssueList'
>;

export type RepoIssueDetailsScreenProps = StackScreenProps<
  HomeStackParamList,
  'RepoIssueDetails'
>;

import './src/i18n/setup';

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import Root from './src/Root';

AppRegistry.registerComponent(appName, () => Root);

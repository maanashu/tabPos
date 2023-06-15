/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import { App } from '@/App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';

if (Platform.OS === 'android') {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Check details: ' + detail, type);
  if (type === 'PRESS') {
    // Handle notification press event
  } else if (type === 'ACTION_PRESS') {
    // Handle notification action press event
  }
});

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import { App } from '@/App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

if (Platform.OS === 'android') {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    // App was terminated, handle the notification and open the desired screen
    await handleNotification(detail.notification);
  }
});

const handleNotification = (notification) => {
  if (notification) {
    navigate(NAVIGATION.deliveryOrders2, { screen: 'delivery' });
  }
};

AppRegistry.registerComponent(appName, () => App);

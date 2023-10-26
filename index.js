/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';

import notifee, { EventType } from '@notifee/react-native';

import { App } from '@/App';
import { store } from '@/store';
import { NAVIGATION } from '@/constants';
import { name as appName } from './app.json';
import { navigate } from '@/navigation/NavigationRef';
import { getPendingOrders } from '@/actions/DashboardAction';

if (Platform.OS === 'android') {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    store.dispatch(getPendingOrders());
    await handleNotification(detail.notification);
  }
});

const handleNotification = (notification) => {
  if (notification) {
    navigate(NAVIGATION.deliveryOrders2, { screen: 'delivery' });
  }
};

AppRegistry.registerComponent(appName, () => App);

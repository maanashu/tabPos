/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';

import notifee, { EventType } from '@notifee/react-native';

import { App as tabPOSApp } from '@/App';
import { App as mPOSApp } from '@mPOS/App';
import { store } from '@/store';
import { NAVIGATION } from '@/constants';
import { name as appName } from './app.json';
import { navigate } from '@/navigation/NavigationRef';
import { getPendingOrders } from '@/actions/DashboardAction';
import { isTablet } from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';

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

console.log('isTablet ===>', isTablet());
isTablet() ? Orientation.lockToLandscapeLeft() : Orientation.lockToPortrait();
const App = isTablet() ? tabPOSApp : mPOSApp;

AppRegistry.registerComponent(appName, () => App);

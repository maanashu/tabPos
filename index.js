/**
 * @format
 */
// if (__DEV__) {
//   import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
// }
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
import moment from 'moment';
import 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

/**
 * Set default timezone for all the moment calls inside the app
 * By doing this it will not be needed to everytime call timezone method to change utc date/time to local date/time
 */
const defaultTimezone = RNLocalize.getTimeZone();
moment.tz.setDefault(defaultTimezone);

if (Platform.OS === 'android') {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    store.dispatch(getPendingOrders());
    handleNotification(detail.notification);
  }
});

const handleNotification = (notification) => {
  if (notification) {
    navigate(NAVIGATION.deliveryOrders2, { screen: 'delivery' });
  }
};

isTablet() ? Orientation.lockToLandscapeLeft() : Orientation.lockToPortrait();
const App = isTablet() ? tabPOSApp : mPOSApp;

AppRegistry.registerComponent(appName, () => App);

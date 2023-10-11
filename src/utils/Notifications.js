import messaging from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { deliOrder, getOrderCount, getReviewDefault, todayOrders } from '@/actions/DeliveryAction';
import { store } from '@/store';
import { getPendingOrders } from '@/actions/DashboardAction';

// Request user permission for notifications
const requestPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    // console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }
};

// Get the device token for sending push notifications
const getDeviceToken = async () => {
  try {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    // console.log('Error getting device token:', error);
    return null;
  }
};

// Handle incoming push notifications when the app is in the foreground
const onMessageReceivedForeground = async (message) => {
  if (message?.data?.type === 'order_delivered') {
    store.dispatch(getReviewDefault(5, 1));
    store.dispatch(getReviewDefault(5, 4));
    store.dispatch(getOrderCount());
    store.dispatch(todayOrders());
  }
  if (message?.data?.type === 'order_received') {
    store.dispatch(getReviewDefault(0, 1));
    store.dispatch(getReviewDefault(0, 4));
    store.dispatch(getOrderCount());
    store.dispatch(getPendingOrders());
    store.dispatch(deliOrder());
  }
  if (message?.data?.type === 'order_pickup') {
    store.dispatch(getReviewDefault(4, 1));
    store.dispatch(getReviewDefault(4, 4));
    store.dispatch(getOrderCount());
  }
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId: 'default',
    },
  });
};

// Handle incoming push notifications when the app is in the background or closed
const onMessageReceivedBackground = async (message) => {
  if (message?.data?.type === 'order_delivered') {
    store.dispatch(getReviewDefault(5, 1));
    store.dispatch(getReviewDefault(5, 4));
    store.dispatch(getOrderCount());
    store.dispatch(todayOrders());
  }
  if (message?.data?.type === 'order_received') {
    store.dispatch(getReviewDefault(0, 1));
    store.dispatch(getReviewDefault(0, 4));
    store.dispatch(getOrderCount());
    store.dispatch(getPendingOrders());
    store.dispatch(deliOrder());
  }
  if (message?.data?.type === 'order_pickup') {
    store.dispatch(getReviewDefault(4, 1));
    store.dispatch(getReviewDefault(4, 4));
    store.dispatch(getOrderCount());
  }
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId: 'default',
    },
  });
};

// Configure Firebase Cloud Messaging
const configureMessaging = async () => {
  messaging().onMessage(onMessageReceivedForeground);

  messaging().setBackgroundMessageHandler(onMessageReceivedBackground);
};

export { configureMessaging, requestPermission, getDeviceToken };

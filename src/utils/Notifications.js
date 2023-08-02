import messaging from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

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

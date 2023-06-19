import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// Request user permission for notifications
const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    console.log('Notification permission granted');
  } catch (error) {
    console.log('Notification permission denied:', error);
  }
};

// Get the device token for sending push notifications
const getDeviceToken = async () => {
  try {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('Device token:', token);
    return token;
  } catch (error) {
    console.log('Error getting device token:', error);
    return null;
  }
};

// Handle incoming push notifications when the app is in the foreground
const onMessageReceivedForeground = async message => {
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId: 'default',
    },
  });
};

// Handle incoming push notifications when the app is in the background or closed
const onMessageReceivedBackground = async message => {
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
  await requestPermission();

  messaging().onMessage(onMessageReceivedForeground);

  messaging().setBackgroundMessageHandler(onMessageReceivedBackground);
};

export { configureMessaging, getDeviceToken };

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
  console.log('Received notification in foreground:', message);
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  notifee.displayNotification({
    title: 'Your order has been shipped',
    body: `Your order was shipped at 69am!`,
    android: {
      channelId,
    },
  });
};

// Handle incoming push notifications when the app is in the background or closed
const onMessageReceivedBackground = async message => {
  console.log('Received notification in background:', message);
};

// Configure Firebase Cloud Messaging
const configureMessaging = async () => {
  await requestPermission();

  messaging().onMessage(async remoteMessage => {
    console.log('Received notification in foreground:', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: 'notifee', //remoteMessage.notification.body,
      android: {
        channelId: 'default',
      },
    });
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Received notification in background:', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: 'notifee',
      android: {
        channelId: 'default',
      },
    });
  });
};

export { configureMessaging, getDeviceToken };

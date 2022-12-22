import {
  Alert,
  Keyboard,
  Linking,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import { strings } from '@/localization';

const HandleUnhandledTouches = () => {
  Keyboard.dismiss();
};

const NormalAlert = ({
  title = '',
  message = '',
  yesText = 'OK',
  cancelText = 'Cancel',
  singleButton = true,
}) => {
  return new Promise((resolve, reject) => {
    singleButton
      ? Alert.alert(
          title,
          message,
          [{ text: yesText, onPress: () => resolve(true), style: 'default' }],
          { cancelable: false }
        )
      : Alert.alert(
          title,
          message,
          [
            {
              text: cancelText,
              onPress: () => reject(false),
              style: 'default',
            },
            {
              text: yesText,
              onPress: () => resolve(true),
              style: 'default',
            },
          ],
          { cancelable: false }
        );
  });
};

const ValidateEmail = param => {
  const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const paramTrim = param?.trim();
  if (paramTrim) {
    if (emailRegex.test(paramTrim)) {
      return true;
    } else {
      ToastAndroid.show(strings.validation.enterValidEmail, ToastAndroid.SHORT);

      return false;
    }
  } else {
    ToastAndroid.show(strings.validation.enterValidEmail, ToastAndroid.SHORT);

    return false;
  }
};

const ValidateName = param => {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const paramTrim = param?.trim();
  if (paramTrim) {
    if (nameRegex.test(paramTrim)) {
      return true;
    } else {
      NormalAlert({
        title: strings.validation.alert,
        message: strings.validation.enterValidName,
      });
      return false;
    }
  } else {
    NormalAlert({
      title: strings.validation.alert,
      message: strings.validation.enterValidName,
    });
    return false;
  }
};

const requestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow JOBR Driver to use your location?',
          message: `Your precise location is used to show your position on the map, get directions, estimate travel times and improve search results`,
          buttonPositive: 'Allow Once',
          buttonNeutral: 'Allow while using the app',
          buttonNegative: 'Don’t Allow',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('location permission denied');
      }
    } else {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      getCurrentLocation();
    }
  } catch (err) {
    console.warn(err);
  }
};
const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(loc => {
    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  });
};
export {
  HandleUnhandledTouches,
  // hideSplash,
  NormalAlert,
  requestPermissions,
  // RequestMultiplePermissions,
  // OpenCamera,
  // OpenGallery,
  ValidateEmail,
  ValidateName,
};

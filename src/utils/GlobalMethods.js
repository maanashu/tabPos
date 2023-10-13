import { Alert, Keyboard, Linking, PermissionsAndroid, ToastAndroid } from 'react-native';
import { strings } from '@/localization';
import moment from 'moment';

moment.suppressDeprecationWarnings = true;

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

const ValidateEmail = (param) => {
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

const ValidateName = (param) => {
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
  Geolocation.getCurrentPosition((loc) => {
    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  });
};

const getLoginSessionTime = (userLoginTime) => {
  // Get the current time
  const currentTime = moment();

  // Specify the login time (12:53:27 PM)
  const loginTime = moment(userLoginTime, 'h:mm:ss A');

  // Calculate the time difference in minutes
  const sessionTimeInMinutes = currentTime.diff(loginTime, 'minutes');

  // Convert minutes to hours and minutes
  const sessionHours = Math.floor(sessionTimeInMinutes / 60);
  const sessionMinutes = sessionTimeInMinutes % 60;

  // Format the time as "hh:mm"
  const sessionTimeFormatted = moment({
    hours: sessionHours,
    minutes: sessionMinutes,
  }).format('HH[h]:mm[m]');

  return sessionTimeFormatted;
};

const orderDeliveryTime = (orderTime) => {
  // Get the current time
  const currentTime = moment();

  // Specify the login time (12:53:27 PM)
  const orderCreateTime = moment(orderTime, 'h:mm:ss A');

  // Calculate the time difference in minutes
  const orderCreateTimeInMinutes = currentTime.diff(orderCreateTime, 'minutes');

  // Convert minutes to hours and minutes
  const ordersHours = Math.floor(orderCreateTimeInMinutes / 60);
  const ordersMinutes = orderCreateTimeInMinutes % 60;
  const ordersSecond = ordersMinutes * 60;

  // Format the time as "hh:mm"
  const orderTimeFormatted = moment({
    hours: ordersHours,
    minutes: ordersMinutes,
    seconds: ordersSecond,
  }).format('HH[h]:mm[m]');

  return orderTimeFormatted;
};
const getStartEndFormattedDate = (date) => {
  return `${moment(date).format('hh:mm A')}`;
};

function calculateDuration(start_time, end_time) {
  const format = 'hh:mm A';
  const start = moment(start_time, format);
  const end = moment(end_time, format);
  const duration = moment.duration(end.diff(start));
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${hours} HR ${minutes} Min`;
}

function getDaysAndDates(year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
  const currentDate = moment();
  const daysInMonth = currentDate.daysInMonth();

  const daysAndDates = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment({ year, month: month - 1, day });

    if (date.isSameOrAfter(currentDate, 'day')) {
      const dayOfWeek = date.format('ddd').toUpperCase();
      const completeDate = date.format('YYYY-MM-DD');
      daysAndDates.push({ day: dayOfWeek, date: date.date(), completeDate: completeDate });
    }
  }

  return daysAndDates;
}
function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const getCalendarActionButtonTitle = (status) => {
  switch (status) {
    case 1:
      return 'Check-in';
    case 2:
      return 'Mark Completed';
    case 3:
      return 'Completed';
    case 4:
      return 'Declined';
    case 5:
      return 'Cancelled';

    default:
      return 'Status unknown';
  }
};

const formattedReturnPrice = (price) => {
  // Convert price to a number, defaulting to 0 if it's falsy or not a number
  const numericPrice = parseFloat(price) || 0;

  // Format the numeric price with 2 decimal places
  const formattedPrice = numericPrice.toFixed(2);

  // Determine the sign and prepend accordingly
  const sign = numericPrice == 0 ? '' : '-';

  return `${sign}$${formattedPrice}`;
};

const formattedReturnPriceWithoutSign = (price) => {
  // Convert price to a number, defaulting to 0 if it's falsy or not a number
  const numericPrice = parseFloat(price) || 0;

  // Format the numeric price with 2 decimal places
  const formattedPrice = numericPrice.toFixed(2);

  // Determine the sign and prepend accordingly
  const sign = numericPrice == 0 ? '' : '-';

  return `${sign}${formattedPrice}`;
};

const calculateTimeSlotSelection = ({
  index,
  timeSlotInterval,
  estimatedServiceDuration,
  timeSlotsData,
}) => {
  return new Promise((resolve) => {
    const calculateIndex = Math.ceil(estimatedServiceDuration / timeSlotInterval);

    // Create a copy of the timeSlotsData to avoid mutating the state directly
    const updatedTimeSlotsData = [...timeSlotsData];

    // Iterate through the time slots
    for (let i = 0; i < updatedTimeSlotsData.length; i++) {
      if (i >= index && i < index + calculateIndex) {
        updatedTimeSlotsData[i].selected = true;
      } else {
        updatedTimeSlotsData[i].selected = false;
      }
    }

    // Resolve the promise with the modified timeSlotsData
    resolve(updatedTimeSlotsData);
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
  getLoginSessionTime,
  orderDeliveryTime,
  getStartEndFormattedDate,
  calculateDuration,
  getDaysAndDates,
  capitalizeFirstLetter,
  getCalendarActionButtonTitle,
  formattedReturnPrice,
  calculateTimeSlotSelection,
  formattedReturnPriceWithoutSign,
};

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
const getCurrentAddress = (current_location) => {
  if (current_location) {
    if (current_location?.custom_address) {
      if (current_location?.formatted_address) {
        return current_location?.custom_address.trim() + ', ' + current_location?.formatted_address;
      }

      return (
        current_location?.custom_address.trim() +
        ', ' +
        current_location?.city +
        ', ' +
        current_location?.state +
        ', ' +
        (current_location?.state_code ? current_location?.state_code : '') +
        ' ' +
        (current_location?.postal_code ? current_location?.postal_code + ', ' : '') +
        current_location?.country
      );
    } else if (current_location?.street_address) {
      return (
        current_location?.street_address.trim() +
        ', ' +
        current_location?.city +
        ', ' +
        current_location?.state +
        ', ' +
        (current_location?.state_code ? current_location?.state_code : '') +
        ' ' +
        (current_location?.zipcode ? current_location?.zipcode + ', ' : '') +
        current_location?.country
      );
    } else {
      return current_location?.formatted_address;
    }
  }

  return '';
};

const imageSource = (url, img) => {
  if (typeof url === 'string' && url?.length > 2) {
    return { uri: url };
  } else {
    return img;
  }
};

const pSBC = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    i = parseInt,
    m = Math.round,
    a = typeof c1 == 'string';
  if (
    typeof p != 'number' ||
    p < -1 ||
    p > 1 ||
    typeof c0 != 'string' ||
    (c0[0] != 'r' && c0[0] != '#') ||
    (c1 && !a)
  )
    return null;
  if (!this.pSBCr)
    this.pSBCr = (d) => {
      let n = d.length,
        x = {};
      if (n > 9) {
        ([r, g, b, a] = d = d.split(',')), (n = d.length);
        if (n < 3 || n > 4) return null;
        (x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
          (x.g = i(g)),
          (x.b = i(b)),
          (x.a = a ? parseFloat(a) : -1);
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5)
          (x.r = (d >> 24) & 255),
            (x.g = (d >> 16) & 255),
            (x.b = (d >> 8) & 255),
            (x.a = m((d & 255) / 0.255) / 1000);
        else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
      return x;
    };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
    (f = this.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != 'c'
        ? this.pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')'
    );
  else
    return (
      '#' +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};
const calculateTimeDuration = (item) => {
  const startMoment = moment(item?.start_date_time);
  const endMoment = moment(item?.end_date_time);
  const duration = moment.duration(endMoment.diff(startMoment));

  const startFormattedTime = startMoment.format('h:mm A');
  const endFormattedTime = moment(item?.end_date_time).format('h:mm A');

  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;

  const newFormattedTime = `${startFormattedTime} - ${endFormattedTime} (${hours} hrs ${minutes} mins)`;
  return newFormattedTime;
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
  getCurrentAddress,
  imageSource,
  pSBC,
  calculateTimeDuration,
};

import axios from 'axios';
import { strings } from '@mPOS/localization';
import { store } from '@/store';
import { getDeviceToken } from '@mPOS/utils/Notifications';
import * as RNLocalize from 'react-native-localize';
import CustomAlert from '@mPOS/components/CustomAlert';
import { logoutFunction } from '@mPOS/actions/UserActions';

let invalidTokenAlertShown = false;

const getTimeZone = RNLocalize.getTimeZone();

const client = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
});

client.interceptors.request.use(async function (config) {
  const user = store.getState().user?.posLoginData?.token;
  const fcmToken = await getDeviceToken();
  console.log('user', user);

  /**
   * @API_URLS_USING_POS_USER_ACCESS_TOKEN - Add URLs of API in this array which requires pos user token
   * @returns Token for api call
   */
  const getRole = () => {
    return { token: user, appName: 'pos' };
  };

  config.headers = {
    ...config.headers,
    timezone: getTimeZone,
    Authorization: getRole().token,
    'app-name': getRole().appName,
  };

  if (fcmToken) {
    config.headers['fcm-token'] = fcmToken;
  }

  return config;
});

client.interceptors.response.use(
  (response) =>
    response.status === 204
      ? Promise.reject({ error: 'emptyContent', statusCode: 204 })
      : response.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && !invalidTokenAlertShown) {
        invalidTokenAlertShown = true;
        // Handle 401 Unauthorized scenario here
        CustomAlert({
          title: 'Alert',
          description: 'Session activated from another device, please login again to continue',
          yesButtonTitle: 'Logout',
          showSingleButton: true,
          onYesPress: () => {
            store.dispatch(logoutFunction());
            invalidTokenAlertShown = false;
          },
        });
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ error: strings.common.connectionError });
    } else {
      return Promise.reject(error);
    }
  }
);
const setAuthorization = (token) => {
  client.defaults.headers.common.authorization = token;
};

const clearAuthorization = () => {
  delete client.defaults.headers.common.authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };

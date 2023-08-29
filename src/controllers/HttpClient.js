import axios from 'axios';
import { strings } from '@/localization';
import { store } from '@/store';
import * as RNLocalize from 'react-native-localize';
import { API_URLS_USING_POS_USER_ACCESS_TOKEN } from '@/utils/APIinventory';
import { getDeviceToken } from '@/utils/Notifications';
import { logoutUserFunction } from '@/actions/UserActions';
import { logoutFunction, merchantLoginSuccess } from '@/actions/AuthActions';
import CustomAlert from '@/components/CustomAlert';

const getTimeZone = RNLocalize.getTimeZone();

const client = axios.create({});

client.interceptors.request.use(async function (config) {
  const register = store.getState().auth?.merchantLoginData?.token;
  const user = store.getState().user?.posLoginData?.token;
  const fcmToken = await getDeviceToken();

  console.log('register', register);

  /**
   * @API_URLS_USING_POS_USER_ACCESS_TOKEN - Add URLs of API in this array which requires pos user token
   * @returns Token for api call
   */
  const getRole = () => {
    if (API_URLS_USING_POS_USER_ACCESS_TOKEN.includes(config.url)) {
      return { token: user, appName: 'pos' };
    } else {
      return { token: register, appName: 'merchant' };
    }
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
      if (error.response.status === 401) {
        // Handle 401 Unauthorized scenario here
        CustomAlert({
          title: 'Alert',
          description: 'Session activated from another device, please login again to continue',
          yesButtonTitle: 'Logout',
          showSingleButton: true,
          onYesPress: () => {
            store.dispatch(merchantLoginSuccess({}));
            store.dispatch(logoutUserFunction());
            store.dispatch(logoutFunction());
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

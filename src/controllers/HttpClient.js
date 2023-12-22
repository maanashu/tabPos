import axios from 'axios';
import { strings } from '@/localization';
import { store } from '@/store';
import * as RNLocalize from 'react-native-localize';
import { API_URLS_USING_POS_USER_ACCESS_TOKEN } from '@/utils/APIinventory';
import { getDeviceToken } from '@/utils/Notifications';
import { logoutUserFunction } from '@/actions/UserActions';
import { logoutFunction, merchantLoginSuccess } from '@/actions/AuthActions';
import CustomAlert from '@/components/CustomAlert';

let invalidTokenAlertShown = false;

const getTimeZone = RNLocalize.getTimeZone();

const client = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
});

client.interceptors.request.use(async function (config) {
  const register = store.getState().auth?.merchantLoginData?.token;
  const user = store.getState().user?.posLoginData?.token;
  const poss = store.getState().user?.posLoginData;
  const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
  const fcmToken = await getDeviceToken();
  const posNumber = store.getState().user?.posLoginData?.pos_number;
  /**c
   * @API_URLS_USING_POS_USER_ACCESS_TOKEN - Add URLs of API in this array which requires pos user token
   * @returns Token for api call
   *
   */
  const getRole = () => {
    if (API_URLS_USING_POS_USER_ACCESS_TOKEN(sellerID).includes(config.url)) {
      return { token: register, appName: 'merchant' };
    } else {
      return { token: user, appName: 'pos' };
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

  if (posNumber) {
    config.headers['pos-no'] = posNumber;
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
            store.dispatch(merchantLoginSuccess({}));
            store.dispatch(logoutUserFunction());
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

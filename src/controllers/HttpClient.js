import axios from 'axios';
import { Config } from 'react-native-config';
import { strings } from '@/localization';
import { store } from '@/store';
import * as RNLocalize from 'react-native-localize';
import { API_URLS_USING_POS_USER_ACCESS_TOKEN } from '@/utils/APIinventory';

const getTimeZone = RNLocalize.getTimeZone();

const client = axios.create({});
console.log('client', client);

client.interceptors.request.use(function (config) {
  const register = store.getState().auth?.merchantLoginData?.token;
  const user = store.getState().user?.posLoginData?.token;
  console.log('user', user);
  console.log('register', register);

  /**
   * @API_URLS_USING_POS_USER_ACCESS_TOKEN - Add URLs of API in this array which requires pos user token
   * @returns Token for api call
   */
  const getToken = () => {
    if (API_URLS_USING_POS_USER_ACCESS_TOKEN.includes(config.url)) {
      return user;
    } else {
      return register;
    }
  };
  console.log('getToken', getToken());

  config.headers = {
    ...config.headers,
    timezone: getTimeZone,
    Authorization: getToken(),
    'app-name': 'pos',
  };
  console.log('config', config.headers);
  return config;
});

client.interceptors.response.use(
  response =>
    response.status === 204
      ? Promise.reject({ error: 'emptyContent', statusCode: 204 })
      : response.data,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ error: strings.common.connectionError });
    } else {
      return Promise.reject(error);
    }
  }
);

const setAuthorization = token => {
  client.defaults.headers.common.authorization = token;
};

const clearAuthorization = () => {
  delete client.defaults.headers.common.authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };

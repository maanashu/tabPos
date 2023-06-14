import { strings } from '@/localization';
import {
  ORDER_URL,
  ApiOrderInventory,
  USER_URL,
  ApiUserInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';
import axios from 'axios';

export class SettingController {
  static async getSetting() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getSetting + `?app_name=pos`;
      console.log('endpoint111111111', endpoint);
      HttpClient.get(endpoint)
        .then(response => {
          console.log(';response', error);
          resolve(response);
        })
        .catch(error => {
          console.log(';error', error);
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  // static async getSetting() {
  //   return new Promise(async (resolve, reject) => {
  //     const token = store.getState().auth?.merchantLoginData?.token;

  //     const endpoint = USER_URL + ApiUserInventory.getSetting + `?app_name=pos`;
  //     await axios({
  //       url: endpoint,
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'app-name': 'pos',
  //         Authorization: token,
  //       },
  //     })
  //       .then(resp => {
  //         console.log('resp', resp);
  //         resolve(resp?.data);
  //       })
  //       .catch(error => {
  //         reject(error);
  //         console.log('error', error);
  //       });
  //   });
  // }
}

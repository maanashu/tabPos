import {
  USER_URL,
  PRODUCT_URL,
  ApiProductInventory,
  ApiUserInventory,
} from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Toast from 'react-native-toast-message';
import { strings } from '@/localization';

export class UserController {
  static async loginPosUser(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.loginPosuser;
      console.log('endpoint', endpoint);
      HttpClient.post(endpoint, data)
        .then(response => {
          console.log('response', response);
          if (response.status_code === 200) {
            Toast.show({
              type: 'success_toast',
              text2: strings.successMessages.loginSuccess,
              position: 'bottom',
              visibilityTime: 1500,
            });
            resolve(response);
            //  navigate(NAVIGATION.posUsers);
          } else {
            Toast.show({
              text2: response.msg,
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
          }
        })
        .catch(error => {
          console.log('error', error);
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error.msg);
        });
    });
  }
}

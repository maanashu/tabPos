import { USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import Toast from 'react-native-toast-message';
import { strings } from '@/localization';
import DeviceInfo from 'react-native-device-info';

export class UserController {
  static async loginPosUser(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.loginPosuser;
      const uniqueId = await DeviceInfo.getUniqueId();
      HttpClient.post(endpoint, data, {
        headers: { 'device-id': uniqueId, 'app-name': 'pos' },
      })
        .then((response) => {
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
        .catch((error) => {
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

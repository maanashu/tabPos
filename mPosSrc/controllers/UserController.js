import DeviceInfo from 'react-native-device-info';

import { strings } from '@mPOS/localization';
import { HttpClient } from './HttpClient';
import { ApiUserInventory, USER_URL } from '@mPOS/utils/APIinventory';
import { CustomErrorToast, CustomSuccessToast } from '@mPOS/components/Toast';

export class UserController {
  static async loginPosUser(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.loginPosuser;
      const uniqueId = await DeviceInfo.getUniqueId();
      console.log('endpoint123455', endpoint);
      console.log('data', data);
      HttpClient.post(endpoint, data, {
        headers: { 'device-id': uniqueId, 'app-name': 'pos' },
      })
        .then((response) => {
          console.log('response', response);
          if (response.status_code === 200) {
            CustomSuccessToast({
              message: strings.successMessages.loginSuccess,
            });
            resolve(response);
          } else {
            CustomSuccessToast({ message: response.msg });
          }
        })
        .catch((error) => {
          console.log('error', error);
          CustomErrorToast({ message: error?.msg });
          reject(error.msg);
        });
    });
  }
}

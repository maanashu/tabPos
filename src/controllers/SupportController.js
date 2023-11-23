import { ApiSupportInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import Toast from 'react-native-toast-message';

export class SupportController {
  static async getSupportList() {
    return new Promise((resolve, reject) => {
      const endpoint = ApiSupportInventory.supportList;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            Toast.show({
              text2: error.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 2000,
            });
          }
          reject(error);
        });
    });
  }
}

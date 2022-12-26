import { strings } from '@/localization';
import { USER_URL,PRODUCT_URL, ApiProductInventory, ApiUserInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class UserController {
  // static async login(username, password) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (username && password) {
  //         resolve({ username });
  //       } else {
  //         reject(new Error(strings.login.invalidCredentials));
  //       }
  //     }, 500);
  //   });
  // }

  static async getCategory() {
    return new Promise((resolve, reject) => {
      const endpoint =
      PRODUCT_URL + ApiProductInventory.getCategory;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  };

  static async getBrand() {
    return new Promise((resolve, reject) => {
      const endpoint =
      PRODUCT_URL + ApiProductInventory.getBrand + `?page=1&limit=10&search=test`;
      // console.log('-------------------endpoint', endpoint)
      HttpClient.get(endpoint)
      
        .then(response => {
          resolve(response);
          // console.log('---------------------response', response)
        })
        .catch(error => {
          // console.log('jkhgfvkmc ')
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  }

  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}

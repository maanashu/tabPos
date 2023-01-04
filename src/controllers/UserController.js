import { strings } from '@/localization';
import {
  USER_URL,
  PRODUCT_URL,
  ApiProductInventory,
  ApiUserInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

const categoryFunction = ({ body, selectedId }) => {
  if (selectedId) {
    category_id: [selectedId];
    subcategory_id: [];
    name: '';
    brand_id: [];
  }
};

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
      const endpoint = PRODUCT_URL + ApiProductInventory.getCategory;
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
  }

  static async getSubCategory(selectedId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getSubCategory +
        `?category_id=` +
        `${selectedId}`;
      HttpClient.get(endpoint)
        .then(response => {
          if (response === '') {
            resolve([]);
          }
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
  }

  static async getBrand(selectedId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getBrand +
        `?page=1&limit=10&category_id=` +
        `${selectedId}`;
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            console.log('no content');
            resolve([]);
          }
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

  static async getProduct(selectedId, subSelectedId,brandSelectedId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL + ApiProductInventory.getProduct + `?page=1&limit=10`;

      const selectedCatArr = selectedId ? [selectedId] : []
      const selectedSubCatArr = subSelectedId ? [subSelectedId] : []
      const selectedBrandCatArr = brandSelectedId ? [brandSelectedId] : []

      const body = {
        category_id: selectedCatArr,
        subcategory_id: selectedSubCatArr,
        name: '',
        brand_id: selectedBrandCatArr,
      }
      
      HttpClient.post(endpoint, body)
        .then(response => {
          // console.log('response', response)
          // console.log('body', body)
          if (response?.status_code === 200) {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }

  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}

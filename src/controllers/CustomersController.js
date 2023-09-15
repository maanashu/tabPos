import { strings } from '@/localization';
import { ORDER_URL, ApiOrderInventory, USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';

export class CustomersController {
  static async getUserOrder(data) {
    let originalString = data?.customerType;
    let convertedString = originalString.toLowerCase().replace(/\s+/g, '_');
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getUserOrder +
        `?seller_id=${data?.sellerID}&type=${convertedString}&page=${data?.page}&limit=${data?.limit}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          error?.msg &&
            Toast.show({
              text2: error.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          reject(error);
          // reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  }

  static async getOrderUser(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrderUser +
        `?seller_id=${data?.sellerID}&user_uid=${data?.userId}&page=${data?.page}&limit=${data?.limit}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getCustomers(time, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getCustomer + `?seller_id=${sellerID}&filter=${time}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
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

  static async getAcceptMarketing(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiUserInventory.getAcceptMarketing +
        `?user_id=${data?.userid}&seller_id=${data?.sellerid}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async marketingUpdate(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.marketingUpdate;
      HttpClient.post(endpoint, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

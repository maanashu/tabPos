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
        data?.area === 'none' && data?.calenderDate === undefined
          ? ORDER_URL +
            ApiOrderInventory.getUserOrder +
            `?seller_id=${data?.sellerID}&type=${convertedString}&page=${data?.page}&limit=${data?.limit}`
          : data?.calenderDate !== undefined && data?.area == 'none'
          ? ORDER_URL +
            ApiOrderInventory.getUserOrder +
            `?seller_id=${data?.sellerID}&type=${convertedString}&date=${data?.calenderDate}&page=${data?.page}&limit=${data?.limit}`
          : data?.calenderDate === undefined && data?.area !== 'none'
          ? ORDER_URL +
            ApiOrderInventory.getUserOrder +
            `?seller_id=${data?.sellerID}&type=${convertedString}&area=${data?.area}&page=${data?.page}&limit=${data?.limit}`
          : ORDER_URL +
            ApiOrderInventory.getUserOrder +
            `?seller_id=${data?.sellerID}&type=${convertedString}&date=${data?.calenderDate}&area=${data?.area}&page=${data?.page}&limit=${data?.limit}`;

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
    console.log('data', data);
    return new Promise((resolve, reject) => {
      const endpoint =
        data?.month === 'none' && data?.storeLocation === 'none'
          ? ORDER_URL +
            ApiOrderInventory.getOrderUser +
            `?seller_id=${data?.sellerID}&user_uid=${data?.userId}&page=${data?.page}&limit=${data?.limit}`
          : data?.month !== 'none' && data?.storeLocation === 'none'
          ? ORDER_URL +
            ApiOrderInventory.getOrderUser +
            `?seller_id=${data?.sellerID}&user_uid=${data?.userId}&month=${data?.month}&page=${data?.page}&limit=${data?.limit}`
          : data?.month === 'none' && data?.storeLocation !== 'none'
          ? ORDER_URL +
            ApiOrderInventory.getOrderUser +
            `?seller_id=${data?.sellerID}&user_uid=${data?.userId}&store_location=${data?.storeLocation}&page=${data?.page}&limit=${data?.limit}`
          : ORDER_URL +
            ApiOrderInventory.getOrderUser +
            `?seller_id=${data?.sellerID}&user_uid=${data?.userId}&month=${data?.month}&store_location=${data?.storeLocation}&page=${data?.page}&limit=${data?.limit}`;

      console.log('endpoint', endpoint);

      HttpClient.get(endpoint)
        .then((response) => {
          console.log('response', response);
          resolve(response);
        })
        .catch((error) => {
          console.log('error', error);
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

  static async getArea(data) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ORDER_URL + ApiOrderInventory.getArea + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getStoreLocation(data) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ORDER_URL + ApiOrderInventory.getStoreLocation + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

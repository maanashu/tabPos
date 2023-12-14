import { strings } from '@/localization';
import { ORDER_URL, ApiOrderInventory, USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';
import { log } from 'react-native-reanimated';
import axios from 'axios';

export class CustomersController {
  static async getUserOrder(data) {
    console.log('second', data);

    return new Promise((resolve, reject) => {
      const type = data?.customerType?.toLowerCase().replace(/\s+/g, '_');
      const defaultParams = {
        seller_id: data?.sellerID,
        type: type,
      };

      const queryParams = {
        ...defaultParams,
        page: data?.page,
        limit: data?.limit,
      };

      if (data?.search) {
        queryParams.search = data?.search;
      }

      if (data?.calenderDate !== undefined) {
        queryParams.date = data?.calenderDate;
      }

      if (data?.area !== 'none' && data?.area !== undefined) {
        queryParams.area = data?.area;
      }

      if (data?.dayWisefilter) {
        queryParams.filter = data?.dayWisefilter;
      }

      if (data?.start_date !== 'Invalid date' && data?.start_date !== undefined) {
        queryParams.start_date = data?.start_date;
      }

      if (data?.end_date !== 'Invalid date' && data?.end_date !== undefined) {
        queryParams.end_date = data?.end_date;
      }

      const params = new URLSearchParams(queryParams).toString();

      const endpoint = `${ORDER_URL}${ApiOrderInventory.getUserOrder}?${params}`;

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
      console.log('endpoint---------', endpoint);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getCustomers(data, sellerID) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const endpoint =
        ORDER_URL + ApiOrderInventory.getCustomer + `?seller_id=${sellerID}&${params}`;
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

  static async updateUserProfile(data, id) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.updateUserProfile + `/${id}`;
      HttpClient.put(endpoint, data)
        .then((response) => {
          resolve(response);
          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: response?.msg,
            visibilityTime: 2000,
          });
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }
}

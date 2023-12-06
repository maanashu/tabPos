import { strings } from '@/localization';
import { ORDER_URL, ApiOrderInventory, USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';
import { log } from 'react-native-reanimated';
import axios from 'axios';

export class CustomersController {
  static async getUserOrder(data) {
    let originalString = data?.customerType;
    let convertedString = originalString.toLowerCase().replace(/\s+/g, '_');
    return new Promise((resolve, reject) => {
      function generateUserOrderEndpoint(data) {
        const {
          search,
          area,
          calenderDate,
          sellerID,
          dayWisefilter,
          page,
          limit,
          customerType,
          start_date,
          end_date,
        } = data;
        const type = customerType?.toLowerCase().replace(/\s+/g, '_');
        const baseEndpoint = `${ORDER_URL}${ApiOrderInventory.getUserOrder}`;

        let queryParams = [`seller_id=${sellerID}`, `type=${type}`];

        if (search) queryParams.push(`search=${search}`);
        if (calenderDate !== undefined) queryParams.push(`date=${calenderDate}`);
        if (area !== 'none' && undefined) queryParams.push(`area=${area}`);
        if (dayWisefilter) queryParams.push(`filter=${dayWisefilter}`);
        if (page) queryParams.push(`page=${page}`);
        if (limit) queryParams.push(`limit=${limit}`);
        if (start_date !== 'Invalid date' && undefined)
          queryParams.push(`start_date=${start_date}`);
        if (end_date !== 'Invalid date' && undefined) queryParams.push(`end_date=${end_date}`);
        const queryString = queryParams.join('&');

        return `${baseEndpoint}?${queryString}`;
      }

      const endpoint = generateUserOrderEndpoint(data);

      HttpClient.get(endpoint)
        .then((response) => {
          console.log('adsagd', endpoint);
          resolve(response);
        })
        .catch((error) => {
          console.log('errorerror', error);
          console.log('error', endpoint);

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

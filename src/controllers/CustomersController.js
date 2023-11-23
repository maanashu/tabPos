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
        const { search, area, calenderDate, sellerID, dayWisefilter, page, limit, customerType } =
          data;
        const type = customerType?.toLowerCase().replace(/\s+/g, '_');
        const baseEndpoint = `${ORDER_URL}${ApiOrderInventory.getUserOrder}`;

        let queryParams = [`seller_id=${sellerID}`, `type=${type}`];

        if (search) queryParams.push(`search=${search}`);
        if (calenderDate !== undefined) queryParams.push(`date=${calenderDate}`);
        if (area !== 'none' && undefined) queryParams.push(`area=${area}`);
        if (dayWisefilter) queryParams.push(`filter=${dayWisefilter}`);
        if (page) queryParams.push(`page=${page}`);
        if (limit) queryParams.push(`limit=${limit}`);

        const queryString = queryParams.join('&');

        return `${baseEndpoint}?${queryString}`;
      }

      const endpoint = generateUserOrderEndpoint(data);

      HttpClient.get(endpoint)
        .then((response) => {
          console.log('response', endpoint);

          resolve(response);
        })
        .catch((error) => {
          console.log('dsjhsdk', error);
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

  static async getCustomers(time, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getCustomer + `?seller_id=${sellerID}&filter=${time}`;
      HttpClient.get(endpoint)
        .then((response) => {
          console.log('adagsjdghjasd', endpoint);
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

  static async updateUserProfile(data) {
    const endpoint = USER_URL + ApiUserInventory.updateUserProfile;
    const posToken = store.getState().user?.posLoginData?.token;
    const body = {
      pos_staff_id: data?.pos_staff_id,
      firstname: data?.firstname,
      email: data?.email,
      role_ids: [data?.role_id],
      phone_no: data?.phone_number,
      custom_address: data?.custom_address,
      address_type: data?.address_type,
      country: data?.country,
      city: data?.city,
      state: data?.state,
      zipcode: data?.zipCode,
    };

    const config = {
      headers: { Authorization: posToken, 'app-name': 'pos' },
    };

    try {
      const response = await axios.put(endpoint, body, config);
      if (response?.status === 200) {
        console.log('asgdhasgd', response);
        Toast.show({
          position: 'bottom',
          type: 'success_toast',
          text2: response?.data?.msg,
          visibilityTime: 2000,
        });
        return response.data; // Assuming you want to return the response data
      } else {
        throw new Error(`Unexpected status code: ${response?.status}`);
      }
    } catch (error) {
      console.log('shdjhas', error?.response?.data);
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: errorMessage,
        visibilityTime: 2000,
      });
      throw error; // Re-throw the error to propagate it to the calling function
    }
  }
}

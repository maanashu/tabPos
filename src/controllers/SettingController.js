import { USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';
import axios from 'axios';

export class SettingController {
  static async getSetting() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        USER_URL + ApiUserInventory.getSetting + `/?app_name=pos&seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.statusCode !== 204) {
            Toast.show({
              text2: error.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          }
          reject(error);
        });
    });
  }

  static async upadteApi(data) {
    return new Promise(async (resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = USER_URL + ApiUserInventory.getSetting;
      const body = {
        ...data,
        seller_id: sellerID,
        app_name: 'pos',
      };
      HttpClient.patch(endpoint, body)
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

  static async getShippingPickup() {
    return new Promise((resolve, reject) => {
      const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = USER_URL + ApiUserInventory.getShippingPickup + `?seller_id=${sellerId}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.statusCode === 204) {
            Toast.show({
              text2: 'No Shipping & Pickup address found',
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          } else {
            Toast.show({
              text2: error.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          }
          reject(error);
        });
    });
  }

  static async addressUpdateById(body) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getShippingPickup + '/change-status';

      HttpClient.post(endpoint, body)
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
  static async updateAddressStatus(body) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.updateAddressStatus;
      HttpClient.put(endpoint, body)
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
  static async deleteAddressById(address_id) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getShippingPickup + '/' + address_id;
      HttpClient.delete(endpoint)
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

  static async getUserAddress() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getUserAddress;
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

  static async getCountries() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getCountries;
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

  static async getState(id) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getState + `?country_id=${id}`;
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

  static async staffDetail(id) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.staffDetail + `?id=${id}`;
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

  static async getTax(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiUserInventory.getTax +
        `?is_tax_details=${data.is_tax}&seller_id=${data.sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.error === 'emptyContent') {
            Toast.show({
              text2: 'tax not found',
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          }
          reject(error);
        });
    });
  }

  static async getTgetPosDetailWeeklyaxTrue(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiUserInventory.getTax +
        `?is_tax_details=${data.is_tax}&seller_id=${data.sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getGoogleCode(authToken) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getGoogleCode;
      const headers = {
        Authorization: authToken,
        'app-name': 'pos',
      };
      axios
        .get(endpoint, authToken && { headers })
        .then((response) => {
          resolve(response?.data);
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

  static async verifyGoogleCode(data, authToken) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.verifyGoogleCode;
      const headers = {
        Authorization: authToken,
        'app-name': 'pos',
      };
      axios
        .post(endpoint, data, authToken && { headers })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          if (error?.msg === 'Invalid code.') {
            Toast.show({
              text2: 'Token Code Expire',
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          } else if ((error = '[AxiosError: Request failed with status code 500]')) {
            Toast.show({
              text2: 'Token Code Expire',
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          }

          reject(error);
        });
    });
  }

  static async configureGoogleCode(data, authToken) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.configureGoogleCode;
      const headers = {
        Authorization: authToken,
        'app-name': 'pos',
      };
      axios
        .post(endpoint, data, authToken && { headers })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          if (error?.msg === 'Invalid code.') {
            Toast.show({
              text2: 'Token Code Expire',
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          } else if ((error = '[AxiosError: Request failed with status code 500]')) {
            Toast.show({
              text2: 'Token Code Expire',
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          }
          reject(error);
        });
    });
  }

  static async configureGoogleCodeMPOS(data, authToken) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.configureGoogleCode;
      const headers = {
        Authorization: authToken,
        'app-name': 'pos',
      };
      axios
        .post(endpoint, data, { headers })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // if (error?.msg === 'Invalid code.') {
          Toast.show({
            text2: 'Token Code Expire',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          // }
          reject(error);
        });
    });
  }
  static async verifyGoogleCodeMPOS(data, authToken) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.verifyGoogleCode;
      const headers = {
        Authorization: authToken,
        'app-name': 'pos',
      };
      axios
        .post(endpoint, data, { headers })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // if (error?.msg === 'Invalid code.') {
          Toast.show({
            text2: 'Token Code Expire',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          // }

          reject(error);
        });
    });
  }

  static async taxPayer(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getTax;
      const body = {
        seller_id: data?.sellerId,
        name: data?.businessName,
        ssn: data?.ssn,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        zip_code: data?.zipCode,
        business_name: data?.businessName,
        street_address: data?.streetAdd,
        apartment: data?.appartment,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });

          reject(error);
        });
    });
  }

  static async fetchAllNotifications() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.notifications;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response?.payload?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async addLanguage(body) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getSetting;
      HttpClient.put(endpoint, body)
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

  static async getPosDetailWeekly(weekNo) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getPosDetailWeekly + `?week_no=${weekNo}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async staffRequest(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.staffRequest;
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log('response', response);
          Toast.show({
            text2: response?.msg,
            position: 'bottom',
            type: 'success_toast',
            visibilityTime: 1500,
          });
          resolve(response);
        })
        .catch((error) => {
          console.log('error', error);
          Toast.show({
            text2: error?.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async getStaffTransaction(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiUserInventory.getStaffTransaction +
        `?transaction_id=${data?.transactionId}&week_no=${data?.weekNo}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }
}

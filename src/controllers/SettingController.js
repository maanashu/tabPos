import {
  ORDER_URL,
  ApiOrderInventory,
  USER_URL,
  ApiUserInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';
import axios from 'axios';

export class SettingController {
  static async getSetting() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getSetting + `?app_name=pos`;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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
      const endpoint = USER_URL + ApiUserInventory.getSetting;
      HttpClient.patch(endpoint, data)
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
          reject(error);
        });
    });
  }

  static async getShippingPickup() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getShippingPickup;
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
          reject(error);
        });
    });
  }

  static async addressUpdateById(body) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getShippingPickup;
      HttpClient.put(endpoint, body)
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
          reject(error);
        });
    });
  }

  static async getUserAddress() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getUserAddress;
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
          reject(error);
        });
    });
  }

  static async getCountries() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getCountries;
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
          reject(error);
        });
    });
  }

  static async getState(id) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL + ApiUserInventory.getState + `?country_id=${id}`;
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
          reject(error);
        });
    });
  }

  static async staffDetail() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.staffDetail;
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
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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

  static async getTaxTrue(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiUserInventory.getTax +
        `?is_tax_details=${data.is_tax}&seller_id=${data.sellerID}`;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static async getGoogleCode() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getGoogleCode;
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
          reject(error);
        });
    });
  }

  static async verifyGoogleCode(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.verifyGoogleCode;
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          if (error?.msg === 'Invalid token code.') {
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
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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
        .then(response => {
          resolve(response?.payload?.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

import { strings } from '@/localization';
import {
  ORDER_URL,
  ApiOrderInventory,
  ApiUserInventory,
  USER_URL,
  ApiProductInventory,
  PRODUCT_URL,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class DashboardController {
  static async getOrderDeliveries(sellerID, page) {
    return new Promise((resolve, reject) => {
      // const endpoint =
      //   ORDER_URL +
      //   ApiOrderInventory.getOrderUser +
      //   `?seller_id=${sellerID}&delivery_option=1&page=${page}&limit=10`;
      const endpoint =
        ORDER_URL + ApiOrderInventory.getOrderUser + `?seller_id=${sellerID}&delivery_option=1`;
      console.log('endpoint', endpoint);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getDrawerSession() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
      HttpClient.post(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getDrawerSessionPost(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
      const amountStringy = parseFloat(data.amount);
      const body = {
        amount: amountStringy,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'PosCart created successfully') {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch((error) => {
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

  static async startstarckingSession(resData) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.trackSessionSave;
      const amountStringy = parseFloat(resData.amount);
      const body = resData?.notes
        ? {
            drawer_id: resData.drawerID,
            note: resData.notes,
            amount: amountStringy,
            transaction_type: 'start_tracking_session',
            mode_of_cash: 'cash_in',
          }
        : {
            drawer_id: resData.drawerID,
            amount: amountStringy,
            transaction_type: 'start_tracking_session',
            mode_of_cash: 'cash_in',
          };

      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Create drawer activity.') {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch((error) => {
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

  static async getTotalSale(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getTotalSale + `?seller_id=${sellerID}&filter=today`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg || 'unknown error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });

          reject(error);
        });
    });
  }

  static async posLoginDetail() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.posLoginDetail;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg || 'unknown error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async searchProductList(search, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.searchProductList +
        `?app_name=pos&delivery_options=3&search=${search}&seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async onLineOrders(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.onLineOrders + `?seller_id=${sellerID}`;
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

  static async getPendingOrders(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.pendingOrders + `?seller_id=${sellerID}`;
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

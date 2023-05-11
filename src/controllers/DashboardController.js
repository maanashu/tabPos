import { strings } from '@/localization';
import {
  ORDER_URL,
  ApiOrderInventory,
  ApiUserInventory,
  USER_URL,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class DashboardController {
  static async getOrderDeliveries(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrderUser +
        `?seller_id=${sellerID}&delivery_option=1`;
      console.log('endpoint', endpoint);
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

  static async getDrawerSession() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
      HttpClient.post(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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
        .then(response => {
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
        .then(response => {
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
}

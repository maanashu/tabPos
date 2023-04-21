import { strings } from '@/localization';
import {
  ORDER_URL,
  ApiOrderInventory,
  ApiProductInventory,
  PRODUCT_URL,
  USER_URL,
  ApiUserInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { log } from 'react-native-reanimated';

export class CashTrackingController {
  static async getDrawerSession() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
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
  static async CashTrackingController() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
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
  static async trackSessionSave(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.trackSessionSave;
      const amountNonString = parseFloat(data.amount);
      const body = data.notes
        ? {
            drawer_id: data.drawerId,
            note: data.notes,
            amount: amountNonString,
            transaction_type: data.transactionType,
            mode_of_cash: data.modeOfcash,
          }
        : {
            drawer_id: data.drawerId,
            amount: amountNonString,
            transaction_type: data.transactionType,
            mode_of_cash: data.modeOfcash,
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
          // Toast.show({
          //   position: 'bottom',
          //   type: 'error_toast',
          //   text2: error.msg,
          //   visibilityTime: 2000,
          // });
          alert(error.msg);
          reject(error.msg);
        });
    });
  }
  static async getSessionHistory(newDateFormat) {
    const urlAccDate = newDateFormat => {
      if (newDateFormat) {
        return (
          USER_URL +
          ApiUserInventory.getSessionHistory +
          `?filter_date=${newDateFormat}`
        );
      } else {
        return USER_URL + ApiUserInventory.getSessionHistory;
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = urlAccDate(newDateFormat);
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: 'History not found',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async endTrackingSession(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.trackSessionSave;
      const amountNonString = parseFloat(data.amount);
      const body = {
        drawer_id: data.drawerId,
        amount: amountNonString,
        transaction_type: data.transactionType,
        mode_of_cash: data.modeOfcash,
      };
      HttpClient.post(endpoint, body)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          alert(error.msg);
          reject(error.msg);
        });
    });
  }

  static async getDrawerSessionById(status) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL + ApiUserInventory.getSessionHistory + `?drawer_id=${status}`;
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
}

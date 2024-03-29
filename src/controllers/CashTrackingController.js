import { strings } from '@/localization';
import { USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
import { store } from '@/store';

export class CashTrackingController {
  static async getDrawerSession() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
      const body = {
        seller_id: sellerID,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          // console.log('GETSSSSSS', JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error.error,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  }
  static async getPaymentDrawerSessions(drawerId) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = drawerId
        ? USER_URL + `${ApiUserInventory.getPaymentHistory}?drawer_id=${drawerId}`
        : USER_URL + ApiUserInventory.getPaymentHistory;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log('error', JSON.stringify(error));
          if (error?.statusCode !== 204) {
            Toast.show({
              text2: error.error,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
          }
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  }
  static async CashTrackingController() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
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

  static async getSessionHistory(data) {
    // const urlAccDate = (newDateFormat) => {
    //   if (newDateFormat !== undefined && staff !== undefined && staff !== '') {
    //     return (
    //       USER_URL +
    //       ApiUserInventory.getSessionHistory +
    //       `?filter_date=${newDateFormat}&pos_user_id=${staff}`
    //     );
    //   } else if (newDateFormat !== undefined) {
    //     return USER_URL + ApiUserInventory.getSessionHistory + `?filter_date=${newDateFormat}`;
    //   } else {
    //     return USER_URL + ApiUserInventory.getSessionHistory;
    //   }
    // };

    return new Promise((resolve, reject) => {
      const endpoint =
        data?.calenderDate === undefined && data?.staffId === 'none'
          ? USER_URL +
            ApiUserInventory.getSessionHistory +
            `?page=${data?.page}&limit=${data?.limit}`
          : data?.calenderDate !== undefined && data?.staffId === 'none'
          ? USER_URL +
            ApiUserInventory.getSessionHistory +
            `?page=${data?.page}&limit=${data?.limit}&filter_date=${data?.calenderDate}`
          : data?.calenderDate === undefined && data?.staffId !== 'none'
          ? USER_URL +
            ApiUserInventory.getSessionHistory +
            `?page=${data?.page}&limit=${data?.limit}&pos_user_id=${data?.staffId}`
          : USER_URL +
            ApiUserInventory.getSessionHistory +
            `?page=${data?.page}&limit=${data?.limit}&pos_user_id=${data?.staffId}&filter_date=${data?.calenderDate}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          error?.msg &&
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
  static async sendSessionHistory(drawer_id) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.sendSessionHistory + '?drawer_id=' + drawer_id;
      HttpClient.get(endpoint)
        .then((response) => {
          Toast.show({
            text2: 'Email sent successfully',
            position: 'bottom',
            // type: 'error_toast',
            visibilityTime: 1500,
          });
          resolve(response);
        })
        .catch((error) => {
          error?.msg &&
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
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log('errorr', error);
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
  static async getDrawerSessionById(status) {
    return new Promise((resolve, reject) => {
      // const endpoint = USER_URL + ApiUserInventory.getDrawerSessionById + `?drawer_id=${status}`;
      const endpoint = USER_URL + ApiUserInventory.getDrawer(status);

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log('errooror', error);
          if (error?.statusCode !== 204 && error?.statusCode !== 400) {
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
  static async getExpectedCashByDrawerId(status) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getExpectedCashByDrawerId(status);
      console.log('Expected Cash ', endpoint);

      HttpClient.get(endpoint)
        .then((response) => {
          console.log('expected,,', response);
          resolve(response);
        })
        .catch((error) => {
          console.log('error--', error);
          if (error?.statusCode !== 204) {
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
}

import { strings } from '@/localization';
import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class WalletController {
  static async getTotalTra(time, sellerID, date) {
    return new Promise((resolve, reject) => {
      const BASE_URL = ORDER_URL + ApiOrderInventory.getTotalTra;
      const sellerParam = `seller_id=${sellerID}`;

      let endpoint = '';

      if (time !== null) {
        endpoint = `${BASE_URL}?${sellerParam}&filter=${time}`;
      } else {
        endpoint = `${BASE_URL}?${sellerParam}&date=${date}`;
      }

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTotakTraDetail(time, sellerID, transactionType) {
    const endpointAccTra = (time, sellerID, transactionType) => {
      if (transactionType === 'all') {
        return (
          ORDER_URL +
          ApiOrderInventory.getTotakTraDetail +
          `?seller_id=${sellerID}&filter_by=${time === undefined ? 'week' : time}`
        );
      } else {
        return (
          ORDER_URL +
          ApiOrderInventory.getTotakTraDetail +
          `?seller_id=${sellerID}&filter_by=${
            time === undefined ? 'week' : time
          }&transaction_type=${transactionType}`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = endpointAccTra(time, sellerID, transactionType);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTotalTraType() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getTotalTraType;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // static async acceptOrder(data) {
  //   return new Promise((resolve, reject) => {
  //     const endpoint =
  //       ORDER_URL + ApiOrderInventory.acceptOrder + `/${data.orderId}`;
  //     const body = {
  //       status: data.status,
  //     };
  //     HttpClient.put(endpoint, body)
  //       .then(response => {
  //         if (response?.msg === 'Order status updated successfully!') {
  //           Toast.show({
  //             position: 'bottom',
  //             type: 'success_toast',
  //             text2: response?.msg,
  //             visibilityTime: 2000,
  //           });
  //         }
  //         resolve(response);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // };
}

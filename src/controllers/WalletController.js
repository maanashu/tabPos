import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
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

      console.log('endpoint1234556', endpoint);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTotalTraType(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getTotalTraType + `?seller_id=${sellerID}`;

      console.log('endpoint22222222222', endpoint);
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

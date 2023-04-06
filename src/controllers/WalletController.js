import { strings } from '@/localization';
import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class WalletController {


  static async getTotalTra(time, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getTotalTra +`?seller_id=${sellerID}&filter=${time}`;
        HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  static async getTotakTraDetail(time, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getTotakTraDetail +`?seller_id=${sellerID}&filter=${time}`;
        HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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

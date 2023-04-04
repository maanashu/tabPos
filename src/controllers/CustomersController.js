import { strings } from '@/localization';
import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class CustomersController {
  static async getUserOrder(sellerID, selectedValue) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getUserOrder + `?seller_id=${sellerID}&limit=${selectedValue}`;
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
  };


  static async getOrderUser(status, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getOrderUser + `?seller_id=${sellerID}&user_uid=${status}`;
        console.log('endpoint',endpoint);
      HttpClient.get(endpoint)
        .then(response => {
          console.log('response', response );
          resolve(response);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
    });
  };

  static async getCustomers(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getCustomers + `?seller_id=${sellerID}`;
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
  };



 

  
}

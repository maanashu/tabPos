import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';

export class WalletController {
  static async getTotalTra(time, sellerID, date) {
    return new Promise((resolve, reject) => {
      const BASE_URL = ORDER_URL + ApiOrderInventory.getTotalTra;
      const sellerParam = `seller_id=${sellerID}`;

      let endpoint = '';

      if (time === undefined) {
        endpoint = `${BASE_URL}?${sellerParam}&start_date=${date?.start_date}&end_date=${date?.end_date}`;
      } else {
        endpoint = `${BASE_URL}?${sellerParam}&filter=${time}`;
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

  static async getTotakTraDetail(sellerID, typeSelectData, filterData) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(typeSelectData).toString();
      const paramsFilter = new URLSearchParams(filterData).toString();
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getTotakTraDetail +
        `?seller_id=${sellerID}&${params}&${paramsFilter}`;
      console.log('endpoint', sellerID, typeSelectData, filterData, endpoint);

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log('error', error);

          reject(error);
        });
    });
  }

  static async getTotalTraType(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        data?.calendarDate == undefined || data?.calendarDate == ''
          ? ORDER_URL +
            ApiOrderInventory.getTotalTraType +
            `?seller_id=${data?.sellerID}&filter=${data?.dayWiseFilter}`
          : ORDER_URL +
            ApiOrderInventory.getTotalTraType +
            `?seller_id=${data?.sellerID}&date=${data?.calendarDate}`;
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

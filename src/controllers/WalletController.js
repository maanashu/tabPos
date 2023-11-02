import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { isTablet } from 'react-native-device-info';

export class WalletController {
  static async getTotalTra(time, sellerID, date) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(time).toString();
      const BASE_URL = ORDER_URL + ApiOrderInventory.getTotalTra;
      const sellerParam = `seller_id=${sellerID}`;
      let endpoint = '';

      if (time === undefined) {
        endpoint = `${BASE_URL}?${sellerParam}&start_date=${date?.start_date}&end_date=${date?.end_date}`;
      } else {
        endpoint = `${BASE_URL}?${sellerParam}&filter=${time}`;
      }
      let mPosEndpoint = `${BASE_URL}?${params}`;
      const finalEndpoint = isTablet() ? endpoint : mPosEndpoint;
      HttpClient.get(finalEndpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTotakTraDetail(data) {
    return new Promise((resolve, reject) => {
      const baseEndpoint = `${ORDER_URL}${ApiOrderInventory.getTotakTraDetail}?seller_id=${data?.sellerId}&transaction_type=${data?.transactionType}&page=${data?.page}&limit=${data?.limit}`;

      let queryParams = [];

      if (data?.calendarDate === undefined) {
        if (data?.start_date && data?.end_date === 'Invalid date') {
          queryParams.push(`filter_by=${data?.dayWiseFilter}`);
        } else {
          queryParams.push(`start_date=${data?.start_date}`);
          queryParams.push(`end_date=${data?.end_date}`);
        }
      } else {
        queryParams.push(`date=${data?.calendarDate}`);
      }
      if (data?.delivery_option || data?.app_name) {
        if (data?.delivery_option !== undefined) {
          queryParams.push(`delivery_option=${data?.delivery_option}`);
        }
        if (data?.app_name !== undefined) {
          queryParams.push(`app_name=${data?.app_name}`);
        }
      }
      if (data?.status || data?.orderType) {
        if (data?.status !== 'none') {
          queryParams.push(`status=${data?.status}`);
        }
        if (data?.orderType !== 'none') {
          queryParams.push(`order_type=${data?.orderType}`);
        }
      }
      const queryString = queryParams.join('&');

      const endpoint = `${baseEndpoint}&${queryString}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
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

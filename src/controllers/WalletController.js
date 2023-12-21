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
      const params = new URLSearchParams(data).toString();

      const defaultParams = {
        seller_id: data?.sellerId,
        transaction_type: data?.transactionType,
      };

      const queryParams = {
        ...defaultParams,
        page: data?.page,
        limit: data?.limit,
      };

      // if (data?.search) {
      //   queryParams.search = data?.search;
      // }

      if (data?.calendarDate !== undefined) {
        queryParams.date = data?.calendarDate;
      }

      if (data?.status !== 'none') {
        queryParams.status = data?.status;
      }

      if (data?.orderType !== 'none') {
        queryParams.order_type = data?.orderType;
      }

      if (data?.dayWiseFilter) {
        queryParams.filter_by = data?.dayWiseFilter;
      }

      if (data?.start_date !== 'Invalid date' && data?.start_date !== undefined) {
        queryParams.start_date = data?.start_date;
      }

      if (data?.end_date !== 'Invalid date' && data?.end_date !== undefined) {
        queryParams.end_date = data?.end_date;
      }

      if (data?.app_name !== undefined) {
        queryParams.app_name = data?.app_name;
      }

      if (data?.delivery_option !== undefined) {
        queryParams.delivery_option = data?.delivery_option;
      }
      const stringifiedQueryParams = new URLSearchParams(queryParams).toString();
      const endpoint = `${ORDER_URL}${ApiOrderInventory.getTotakTraDetail}?${stringifiedQueryParams}`;

      const mPosEndpoint = `${ORDER_URL}${ApiOrderInventory.getTotakTraDetail}?${params}`;
      const finalEndPoint = isTablet() ? endpoint : mPosEndpoint;
      HttpClient.get(finalEndPoint)
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
      const defaultParams = {
        seller_id: data?.sellerID,
      };
      const queryParams = {
        ...defaultParams,
      };

      if (data?.orderType !== 'none') {
        queryParams.order_type = data?.orderType;
      }

      if (data?.calendarDate !== undefined) {
        queryParams.date = data?.calendarDate;
      }

      if (data?.dayWiseFilter) {
        queryParams.filter = data?.dayWiseFilter;
      }

      if (data?.start_date !== 'Invalid date' && data?.start_date !== undefined) {
        queryParams.start_date = data?.start_date;
      }

      if (data?.end_date !== 'Invalid date' && data?.end_date !== undefined) {
        queryParams.end_date = data?.end_date;
      }
      const stringifiedQueryParams = new URLSearchParams(queryParams).toString();

      const params = new URLSearchParams(data).toString();

      const endpoint = ORDER_URL + ApiOrderInventory.getTotalTraType + `?` + stringifiedQueryParams;

      const mPosEndpoint = `${ORDER_URL}${ApiOrderInventory.getTotalTraType}?${params}`;
      const finalEndPoint = isTablet() ? endpoint : mPosEndpoint;
      HttpClient.get(finalEndPoint)
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

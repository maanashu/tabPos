import { strings } from '@/localization';
import { store } from '@/store';
import {
  ORDER_URL,
  ApiOrderInventory,
  USER_URL,
  ApiUserInventory,
  PRODUCT_URL,
  ApiProductInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class DeliveryController {
  static async getOrderCount() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL + ApiOrderInventory.getOrderCount + `?seller_id=${sellerID}&delivery_option=1`;
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

  static async getReviewDefault(status) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrders +
        `?status=${status}&seller_id=${sellerID}&delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getOrders(status) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrders +
        `?status=${status}&seller_id=${sellerID}&delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async acceptOrder(data) {
    console.log('data========', data);
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.acceptOrder + `/${data.orderId}`;
      const body = {
        status: data.status,
      };
      console.log('endpoint========', endpoint);
      console.log('body========', body);
      HttpClient.put(endpoint, body)
        .then((response) => {
          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: response?.msg,
            visibilityTime: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          console.log('error========', error);
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error?.msg,
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async deliveryOrd() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getOrders + `?delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async deliverygraph() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL + ApiOrderInventory.shippingGraph + `?seller_id=${sellerID}&filter=week`;
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

  static async deliveringOrder() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ORDER_URL + ApiOrderInventory.deliveringOrder + `?seller_id=${sellerID}`;
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
          reject(error);
        });
    });
  }

  static async todayOrders() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ORDER_URL + ApiOrderInventory.todayOrders + `?seller_id=${sellerID}`;
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
          reject(error);
        });
    });
  }

  static async getOrderstatistics(delivery) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrderstatistics +
        `?seller_id=${sellerID}&filter=week&delivery_option=${delivery}`;
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
          reject(error);
        });
    });
  }

  static async getGraphOrders() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.graphOrders +
        `?seller_id=${sellerID}&filter=week&delivery_option=1`;
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
          reject(error);
        });
    });
  }

  static async getSellerDriverList() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = USER_URL + ApiUserInventory.getSellerDrivers + `?sellerId=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getProductByUpc(upc) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.skuSearch +
        `?app_name=merchant&seller_id=${sellerId}&search=${upc}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode === 204) {
            alert('Product not found');
          }
          reject(error);
        });
    });
  }
}

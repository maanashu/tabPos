import { store } from '@/store';
import { HttpClient } from './HttpClient';
import { ApiOrderInventory } from '@mPOS/utils/APIinventory';
import { CustomErrorToast, CustomSuccessToast } from '@mPOS/components/Toast';

export class DeliveryController {
  static async todayOrders() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.todayOrders + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }

  static async getDeliveryTypesOrders() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.deliveryTypeOrder + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }

  static async getOrders(status) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ApiOrderInventory.getOrders + `?status=${status}&seller_id=${sellerID}&delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getGraphOrders() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ApiOrderInventory.graphOrders + `?seller_id=${sellerID}&filter=week&delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }

  static async getOrderstatistics() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ApiOrderInventory.getOrderstatistics +
        `?seller_id=${sellerID}&filter=week&delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }

  static async getOrderCount() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.getOrderCount + `?seller_id=${sellerID}&delivery_option=1`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.msg);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }

  static async acceptOrder(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ApiOrderInventory.acceptOrder + `/${data.orderId}`;
      const body = {
        status: data.status,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
          CustomSuccessToast({ message: response?.msg });
        })
        .catch((error) => {
          reject(error);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }
}

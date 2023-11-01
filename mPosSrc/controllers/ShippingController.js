import { store } from '@/store';
import { HttpClient } from './HttpClient';
import { ApiOrderInventory } from '@mPOS/utils/APIinventory';
import { CustomErrorToast, CustomSuccessToast } from '@mPOS/components/Toast';

export class ShippingController {
  static async todayShippingStatus() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.todayShipStatus + `?seller_id=${sellerID}&type=shipping`;
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

  static async todayCurrentStatus() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.todayShipStatus + `?seller_id=${sellerID}&type=current`;
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

  static async getOrders(status) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ApiOrderInventory.getOrders + `?status=${status}&seller_id=${sellerID}&delivery_option=4`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getOrderCount() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.getOrderCount + `?seller_id=${sellerID}&delivery_option=4`;
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

  static async getGraphOrders() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ApiOrderInventory.graphOrders + `?seller_id=${sellerID}&filter=week&delivery_option=4`;
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
        `?seller_id=${sellerID}&filter=week&delivery_option=4`;
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

  static async orderStatusCount() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.orderStatusCount + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error?.msg);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }

  static async getOrderDetail(id) {
    return new Promise((resolve, reject) => {
      const endpoint = ApiOrderInventory.getOrderDetail + `/${id}`;
      console.log(endpoint);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error?.msg);
          CustomErrorToast({ message: error?.msg });
        });
    });
  }
}

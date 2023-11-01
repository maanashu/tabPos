import { ApiOrderInventory } from '@mPOS/utils/APIinventory';
import { HttpClient } from './HttpClient';

export class AnalyticsController {
  static async getOrderData(orderID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        orderID?.page && orderID?.limit
          ? ApiOrderInventory.getOrderData +
            `/${orderID?.orderId}&page=${orderID?.page}&limit=${orderID?.limit}`
          : ApiOrderInventory.getOrderData + `/${orderID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getAnalyticStatistics(sellerID, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const endpoint = ApiOrderInventory.getAnalyticStatistics + `?seller_id=${sellerID}&${params}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getAnalyticOrderGraphs(sellerID, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const endpoint =
        ApiOrderInventory.getAnalyticOrderGraphs + `?seller_id=${sellerID}&${params}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTotalOrder(sellerID, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const endpoint = ApiOrderInventory.getTotalOrder + `?seller_id=${sellerID}&${params}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTotalInventory(sellerID, data) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const endpoint = `${ApiOrderInventory.getTotalInventory}?seller_id=${sellerID}&${params}&page=1&limit=20`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getSoldProduct(sellerID, data, page) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const endpoint = `${ApiOrderInventory.getSoldProduct}?seller_id=${sellerID}&${params}&page=${page}&limit=15`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

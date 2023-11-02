import { store } from '@/store';
import { ApiOrderInventory, ORDER_URL } from '@mPOS/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { CustomErrorToast } from '@mPOS/components/Toast';

export class WalletController {
  static async walletAnalytics(filter) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(filter).toString();

      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ApiOrderInventory.walletAnalytics + `?seller_id=${sellerID}&${params}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            CustomErrorToast({ message: error?.msg });
          }
          reject(error);
        });
    });
  }
  static async TransactionDetails(filter) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const params = new URLSearchParams(filter).toString();
      const endpoint = ApiOrderInventory.getOrders + `?${params}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            CustomErrorToast({ message: error?.msg });
          }
          reject(error);
        });
    });
  }
  static async TransactionTypes(filter) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(filter).toString();
      const endpoint = ApiOrderInventory.getTransType + `?${params}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            CustomErrorToast({ message: error?.msg });
          }
          reject(error);
        });
    });
  }

  static async getOrdersByInvoiceId(invoice) {
    return new Promise((resolve, reject) => {
      const endpoint = ApiOrderInventory.invoiceIdSearch + `${invoice}`;
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

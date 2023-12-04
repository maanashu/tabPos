import { NAVIGATION } from '@/constants';
import { navigate } from '@/navigation/NavigationRef';
import { store } from '@/store';
import {
  ORDER_URL,
  ApiOrderInventory,
  ApiUserInventory,
  USER_URL,
  ApiProductInventory,
  PRODUCT_URL,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class DashboardController {
  static async getOrderDeliveries(sellerID, page) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrderUser +
        `?seller_id=${sellerID}&delivery_option=1&page=${page}&limit=10`;
      // const endpoint =
      //   ORDER_URL + ApiOrderInventory.getOrderUser + `?seller_id=${sellerID}&delivery_option=1`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getDrawerSession() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
      const body = {
        seller_id: sellerID,
      };
      console.log('12333', endpoint);
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getDrawerSessionPost(data) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = USER_URL + ApiUserInventory.getDrawerSession;
      const amountStringy = parseFloat(data.amount);
      const body = {
        seller_id: sellerID,
        amount: amountStringy,
        notes: data?.notes,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'PosCart created successfully') {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async startstarckingSession(resData) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.trackSessionSave;
      const amountStringy = parseFloat(resData.amount);
      const body = resData?.notes
        ? {
            drawer_id: resData.drawerID,
            note: resData.notes,
            amount: amountStringy,
            transaction_type: 'start_tracking_session',
            mode_of_cash: 'cash_in',
          }
        : {
            drawer_id: resData.drawerID,
            amount: amountStringy,
            transaction_type: 'start_tracking_session',
            mode_of_cash: 'cash_in',
          };

      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Create drawer activity.') {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async getTotalSale(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getTotalSale + `?seller_id=${sellerID}&filter=today`;
      console.log('-----------', endpoint);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg || 'unknown error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });

          reject(error);
        });
    });
  }

  static async posLoginDetail() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.posLoginDetail;
      console.log('--------------', endpoint);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg || 'unknown error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async searchProductList(search, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.searchProductList +
        `?app_name=pos&delivery_options=3&search=${search}&seller_id=${sellerID}&need_invoice_search=true`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async onLineOrders(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.onLineOrders + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async getPendingOrders(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.pendingOrders + `?seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error?.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async getOrdersByInvoiceId(invoice) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.invoiceIdSearch + `${invoice}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getProductsBySku(sku) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.skuSearch +
        `?app_name=merchant&seller_id=${sellerId}&search=${sku}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async returnProduct(data, screen) {
    const drawerId =
      store.getState().dashboard?.drawerSession?.id ||
      store.getState()?.cashTracking?.getDrawerSession?.id;

    return new Promise((resolve, reject) => {
      if (!drawerId) {
        alert('drawerId not found');
        reject({ err: { msg: 'drawerId not found' } });
        return;
      }
      const endpoint = ORDER_URL + ApiOrderInventory.return;
      const body = { ...data, drawer_id: drawerId };

      HttpClient.post(endpoint, body)
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
          if (
            error?.msg === 'Invalid product or the product already returned!' ||
            error?.msg === 'Order already returned!'
          ) {
            alert('Product already returned!');
            if (screen === 'delivery') {
              navigate(NAVIGATION.deliveryOrders2, { screen: 'delivery' });
            } else {
              navigate('SearchScreen', { screen: 'return' });
            }
          } else {
            alert(error?.msg);
          }
          reject(error.msg);
        });
    });
  }

  static async scanBarCode(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.scanbarcode;
      const body = {
        barcode: data,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.msg);
        });
    });
  }
}

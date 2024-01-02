import { strings } from '@/localization';
import { store } from '@/store';
import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class ShippingController {
  static async getOrderCount(status) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getOrderCount + `?seller_id=${status}&delivery_option=4`;
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
      // const needRecent = status >= 4 ? true : false;
      // const isTracking = status == '4' ? true : false;
      // console.log(needRecent, 'NeeddReceneteee', isTracking, 'ISTrackinnngggggg');
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrders +
        `?status=${status}&seller_id=${sellerID}&delivery_option=4`;

      // const endpoint =
      //   ORDER_URL +
      //   ApiOrderInventory.getOrders +
      //   `?status=${status}&seller_id=${sellerID}&delivery_option=4&need_recent=${needRecent}&page=1&limit=20&is_tracking=${isTracking}&start_date=2023-11-25&end_date=2023-12-01&filter_by=year`;

      // const endpoint =
      //   ORDER_URL +
      //   ApiOrderInventory.getOrders +
      //   `?status=${status}&seller_id=${sellerID}&delivery_option=4&need_recent=${needRecent}&page=1&limit=20&is_tracking=${isTracking}`;

      // console.log(endpoint, 'shipping-orders URL-----------');
      HttpClient.get(endpoint)
        .then((response) => {
          // console.log('response-0-0-0-0-0-0', JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          // console.log('error-0-0-0-0-0-0', JSON.stringify(error));

          reject(error);
        });
    });
  }

  static async getOrders(status, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrders +
        `?status=${status}&seller_id=${sellerID}&delivery_option=4`;
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
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.acceptOrder + `/${data.orderId}`;
      const body = {
        status: data.status,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          // console.log('response-0-03-120-3=312', JSON.stringify(response));

          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: response?.msg,
            visibilityTime: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          // console.log('errorr2222222222', JSON.stringify(error));
          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: error?.msg,
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async deliveringOrd() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getOrders + `&delivery_option=4`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getShippingService() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getShippingService;
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

  static async shipServiceUpdate(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getOrders + `/${data.orderID}`;
      const body = {
        shipping_service_id: data?.shippingServiceTypeId,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          if (response?.msg === 'order updated successfully') {
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
            text2: error?.msg,
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async shippingGraph() {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.shippingGraph + `?seller_id=${sellerId}&filter=year`;
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

  static async todayShippingStatus() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL + ApiOrderInventory.todayShipStatus + `?seller_id=${sellerID}&type=shipping`;
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

  static async todayCurrentStatus() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL + ApiOrderInventory.todayShipStatus + `?seller_id=${sellerID}&type=current`;
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

  static async orderStatusCount() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL + ApiOrderInventory.orderStatusCount + `?seller_id=${sellerID}&delivery_option=4`;
      console.log('sellerID', sellerID);
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

  static async getGraphOrders() {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.graphOrders +
        `?seller_id=${sellerId}&filter=year&delivery_option=4`;
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

  static async getShippingOrderstatistics() {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.getOrderstatistics +
        `?seller_id=${sellerID}&filter=year&delivery_option=4`;
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
}

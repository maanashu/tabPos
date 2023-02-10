import { strings } from '@/localization';
import {
  USER_URL,
  PRODUCT_URL,
  ApiProductInventory,
  ApiUserInventory,
  ORDER_URL,
  ApiOrderInventory,
} from '@/utils/APIinventory';
import { Alert } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

export class RetailController {
  static async getCategory(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = PRODUCT_URL + ApiProductInventory.getCategory + `?page=1&limit=20&seller_id=${sellerID}&main_category=true`;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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

  static async getSubCategory(sellerID, selectedId) {
    return new Promise((resolve, reject) => {
      const endpoint = PRODUCT_URL + ApiProductInventory.getSubCategory + `?page=1&limit=20&category_id=${selectedId}&seller_id=${sellerID}&main_category=true`;
      HttpClient.get(endpoint)
        .then(response => {
          if (response === '') {
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
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

  static async getBrand(sellerID, selectedId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getBrand + `?page=1&limit=10&seller_id=${sellerID}&category_id=${selectedId}`
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
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

  static async getProduct(
    selectedId,
    subSelectedId,
    brandSelectedId,
    sellerID
  ) {
    const urlAccCat = (
      selectedId,
      subSelectedId,
      brandSelectedId,
      sellerID
    ) => {
      if (selectedId && sellerID && !subSelectedId && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?page=1&limit=10&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      } else if (selectedId && subSelectedId && sellerID && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct + `?page=1&limit=10&sub_category_ids=${subSelectedId}&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      } else if (selectedId && subSelectedId && brandSelectedId && sellerID) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +`?page=1&limit=10&sub_category_ids=${subSelectedId}&brand_id=${brandSelectedId}&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = urlAccCat(
        selectedId,
        subSelectedId,
        brandSelectedId,
        sellerID
      );
      console.log('endpoint',endpoint)
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            console.log('no content');
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  };


  static async getProductDefault( sellerID ) {
    return new Promise((resolve, reject) => {
      const endpoint =  PRODUCT_URL + ApiProductInventory.getProduct +`?page=1&limit=10&seller_id=${sellerID}`;
      console.log
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            console.log('no content');
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  };

  static async getSearchProduct(search, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getProduct +
        `/${sellerID}?page=1&limit=10&search=${search}`;
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
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

  static async getAllCartCategory() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getAllCart;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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

  static async clearAllCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.clearAllCart;
      HttpClient.delete(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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

  static async clearOneCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.clearAllCart +
        `/` +
        `${data.cartId}` +
        `/` +
        `${data.productId}`;
      const body = {
        cartId: data.cartId,
        productId: data.productId,
      };
      HttpClient.delete(endpoint, body)
        .then(response => {
          if (response?.status_code === 200) {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }

  static async addTocart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.clearAllCart;
      const body = data.bundleId
        ? {
            seller_id: data.seller_id,
            product_id: data.product_id,
            service_id: data.service_id,
            qty: data.qty ? data.qty : 0,
            bundle_id: data.bundleId,
          }
        : {
            seller_id: data.seller_id,
            product_id: data.product_id,
            service_id: data.service_id,
            qty: data.qty,
          };
      HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 201) {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }
  static async addNotes(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.addNotes;
      const body = {
        cart_id: data.cartId,
        notes: data.notes,
      };
      HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 200) {
            Toast.show({
              type: 'success_toast',
              text2: strings.successMessages.loginSuccess,
              position: 'bottom',
              visibilityTime: 1500,
            });
            resolve(response);
          } else {
            Toast.show({
              text2: response.msg,
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
          }
        })
        .catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error.msg);
        });
    });
  }

  static async addDiscountToCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.addDiscountToCart;
      const description = data.descriptionDis ? data.descriptionDis : '';
      const discountInput = data.amountDis
        ? data.amountDis
        : data.percentDis
        ? data.percentDis
        : data.discountCode;
      const cartID = JSON.stringify(data.cartId);
      const body = {
        cart_id: cartID,
        discount: discountInput,
        discount_flag: data.value,
        discount_desc: description,
      };
      HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 200) {
            Toast.show({
              type: 'success_toast',
              text2: strings.successMessages.loginSuccess,
              position: 'bottom',
              visibilityTime: 1500,
            });
            resolve(response);
          } else {
            Toast.show({
              text2: response.msg,
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
          }
        })
        .catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error.msg);
        });
    });
  }

  static async getProductBundle(id) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiOrderInventory.getProductBundle +
        '?product_id=' +
        `${id}`;
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            console.log('no content');
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
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

  static async getUserDetail(customerPhoneNo) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL + ApiUserInventory.getUserDetail + `?phone=${customerPhoneNo}`;
      HttpClient.get(endpoint)
        .then(response => {
          if (response.status === 204) {
            resolve([]);
          }
          resolve(response);
        })
        .catch(error => {
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

  static async sendInvitation(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.sendInvitation;
      const body = {
        firstName: data.userFirstname,
        lastName: data.userLastName,
        email: data.userEmailAdd,
        phone: data.userPhoneNo,
      };
      HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 200) {
            // Toast.show({
            //   position: 'bottom',
            //   type: 'success_toast',
            //   text2: response?.msg,
            //   visibilityTime: 2000,
            // });
            Alert.alert(response?.msg);
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }

  static async createOrder(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.createOrder;
      const body = {
        cart_id: data.cartid,
        address_id: data.address_id,
        address_type: data.address_type,
        address: data.address,
        address_2: data.address_2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        fax: data.fax,
        shipping: data.shipping,
        date: data.date,
        delivery_type_id: data.delivery_type_id,
        preffered_delivery_start_time: data.preffered_delivery_start_time,
        preffered_delivery_end_time: data.preffered_delivery_end_time,
        service_id: data.service_id,
        coordinates: data.coordinates,
        is_favourite: data.is_favourite,
      };
       console.log('body', body),
       console.log('endpoint', endpoint);
       return
        HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 200) {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: response?.msg,
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }

  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}

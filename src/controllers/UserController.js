import { strings } from '@/localization';
import {
  USER_URL,
  PRODUCT_URL,
  ApiProductInventory,
  ApiUserInventory,
  ORDER_URL,
  ApiOrderInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';

const categoryFunction = ({ body, selectedId }) => {
  if (selectedId) {
    category_id: [selectedId];
    subcategory_id: [];
    name: '';
    brand_id: [];
  }
};

export class UserController {
  // static async login(username, password) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (username && password) {
  //         resolve({ username });
  //       } else {
  //         reject(new Error(strings.login.invalidCredentials));
  //       }
  //     }, 500);
  //   });
  // }

  static async getCategory() {
    return new Promise((resolve, reject) => {
      const endpoint = PRODUCT_URL + ApiProductInventory.getCategory;
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
  };

  static async getSubCategory(selectedId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getSubCategory +
        `?category_id=` +
        `${selectedId}`;
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

  static async getBrand(selectedId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getBrand +
        `?page=1&limit=10&category_id=` +
        `${selectedId}`;
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

  static async getProduct(selectedId, subSelectedId, brandSelectedId, search) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL + ApiProductInventory.getProduct + `?page=1&limit=10`;

      const selectedCatArr = selectedId ? [selectedId] : [];
      const selectedSubCatArr = subSelectedId ? [subSelectedId] : [];
      const selectedBrandCatArr = brandSelectedId ? [brandSelectedId] : [];
      // const searchingProArr = search ? search : ""

      const body = {
        category_id: selectedCatArr,
        subcategory_id: selectedSubCatArr,
        name: '',
        brand_id: selectedBrandCatArr,
      }

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
  };

  static async getSearchProduct(search) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL + ApiProductInventory.getProduct + `?page=1&limit=10`;
      const searchingProArr = search ? search : '';

      const body =  {
        category_id: [],
        subcategory_id: [],
        name: searchingProArr,
        brand_id: [],
      }
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
  };

  static async getAllCartCategory() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getAllCart;
      // console.log('endpoint',endpoint)
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
  };

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
  };

  static async clearOneCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
         ORDER_URL + ApiOrderInventory.clearAllCart + `/` +  `${data.cartId}` + `/` + `${data.productId}`;
      const body =  {
        cartId: data.cartId,
        productId: data.productId,
      }
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
  };

  static async addTocart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.clearAllCart;
      const body = {
        seller_id:data.seller_id,
        product_id: data.product_id,
        service_id: data.service_id,
        qty: data.qty,
        attribute_value_ids: data.attribute_value_ids
      }

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
  };
  static async addNotes(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.addNotes;

      const body = {
        cart_id:data.cartId,
        notes: data.notes
      }

      HttpClient.post(endpoint, body)
        .then(response => {
        //   if (response?.status_code === 200) {
        //     // Toast.show({
        //     //   position: 'bottom',
        //     //   type: 'success_toast',
        //     //   // text2: response?.msg,
        //     //   text:'successs',
        //     //   visibilityTime: 2000,
        //     // });
        //     console.log('dfghjsdfghjk')
        //   }
        //   resolve(response);
        // })
        // .catch(error => {
        //   Toast.show({
        //     position: 'bottom',
        //     type: 'error_toast',
        //     text2: error.msg,
        //     visibilityTime: 2000,
        //   });
        //   reject(error.msg);
        // });
        if (response?.status_code === 200) {
          Toast.show({
            type: 'success_toast',
            text2: strings.successMessages.loginSuccess,
            position: 'bottom',
            visibilityTime: 1500,
          });
          // console.log('fghj,./')
          resolve(response);
        } else {
          Toast.show({
            text2: response.msg,
            position: 'bottom',
            type: 'success_toast',
            visibilityTime: 1500,
          });
        }
      }).catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500
          })
        reject(error.msg);
      });
    });
  };

  static async addDiscountToCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.addDiscountToCart;
      const  description = data.descriptionDis ? data.descriptionDis  : '';
      const discountInput = data.amountDis ? data.amountDis : data.percentDis ? data.percentDis : data.discountCode;
      const  cartID = JSON.stringify(data.cartId);

      const body = {
        cart_id:cartID,
        discount:discountInput,
        discount_flag:data.value,
        discount_desc: description
      }
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
      }).catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500
          })
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

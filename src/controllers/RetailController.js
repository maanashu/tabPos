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

  static async getProduct(selectedId ,subSelectedId ,brandSelectedId ,sellerID) {
    const urlAccCat = (selectedId, subSelectedId,brandSelectedId, sellerID) => {
      if(selectedId &&  sellerID && !subSelectedId && !brandSelectedId  ){
         return(
          PRODUCT_URL + ApiProductInventory.getProduct + `/${sellerID}?page=1&limit=10&category_id=${selectedId}`
         )
      }else if (selectedId &&  subSelectedId && sellerID && !brandSelectedId){
        return(
          PRODUCT_URL + ApiProductInventory.getProduct + `/${sellerID}?page=1&limit=10&category_id=${selectedId}&sub_category_id=${subSelectedId}`
        )
      }else if(selectedId &&  subSelectedId && brandSelectedId &&  sellerID) {
        return(
          PRODUCT_URL + ApiProductInventory.getProduct + `/${sellerID}?page=1&limit=10&category_id=${selectedId}&sub_category_id=${subSelectedId}&brand_id=${brandSelectedId}`
        )
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = urlAccCat(selectedId ,subSelectedId ,brandSelectedId ,sellerID);
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
      const endpoint = PRODUCT_URL + ApiProductInventory.getProduct +`/${sellerID}?page=1&limit=10&search=${search}`;
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
  };

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
      const body = data.bundleId ? 
       {
        seller_id:data.seller_id,
        product_id: data.product_id,
        service_id: data.service_id,
        qty: data.qty ? data.qty : 0 ,
        bundle_id : data.bundleId
      }
      :{
        seller_id:data.seller_id,
        product_id: data.product_id,
        service_id: data.service_id,
        qty: data.qty,
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
  };

  static async getProductBundle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = PRODUCT_URL + ApiOrderInventory.getProductBundle + '?product_id=' + `${id}`;
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

  static async getUserDetail(customerPhoneNo) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getUserDetail +`?phone=${customerPhoneNo}`;
      console.log('endpoint',endpoint)
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
  };

  static async sendInvitation(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.sendInvitation;
      const body = {
        firstName:data.userFirstname,
        lastName:data.userLastName,
        email:data.userEmailAdd,
        phone:data.userPhoneNo
      }
      HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 200) {
            // Toast.show({
            //   position: 'bottom',
            //   type: 'success_toast',
            //   text2: response?.msg,
            //   visibilityTime: 2000,
            // });
           Alert.alert(response?.msg)
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


  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}

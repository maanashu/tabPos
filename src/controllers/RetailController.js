import {
  USER_URL,
  PRODUCT_URL,
  ApiProductInventory,
  ApiUserInventory,
  ORDER_URL,
  ApiOrderInventory,
  ApiWalletInventory,
  WALLET_URL,
} from '@/utils/APIinventory';
import { strings } from '@/localization';
import { HttpClient } from './HttpClient';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { store } from '@/store';

export class RetailController {
  static async getCategory(sellerID, search) {
    const getUrl = (sellerid, search) => {
      if (sellerid && search) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getCategory +
          `?seller_id=${sellerid}&main_category=true&search=${search}&service_type=product`
        );
      } else {
        return (
          PRODUCT_URL +
          ApiProductInventory.getCategory +
          `?seller_id=${sellerid}&main_category=true&service_type=product`
        );
      }
    };

    return new Promise((resolve, reject) => {
      const endpoint = getUrl(sellerID, search);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'catgory error',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getServiceCategory(sellerID, search) {
    const getUrl = (sellerid, search) => {
      if (sellerid && search) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getCategory +
          `?page=1&limit=100&&seller_id=${sellerid}&main_category=true&service_type=service&search=${search}`
        );
      } else {
        return (
          PRODUCT_URL +
          ApiProductInventory.getCategory +
          `?page=1&limit=100&&seller_id=${sellerid}&main_category=true&service_type=service`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = getUrl(sellerID, search);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'catgory error',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getSubCategory(sellerID, search) {
    const getUrl = (sellerid, search) => {
      if (sellerid && search) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getSubCategory +
          `?seller_id=${sellerid}&search=${search}&service_type=product`
        );
      } else {
        return (
          PRODUCT_URL +
          ApiProductInventory.getSubCategory +
          `?seller_id=${sellerid}&service_type=product`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = getUrl(sellerID, search);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'Sub-Category not found',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getServiceSubCategory(sellerID, search) {
    const getUrl = (sellerid, search) => {
      if (sellerid && search) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getSubCategory +
          `?seller_id=${sellerid}&search=${search}&service_type=service&need_subcategory=true`
        );
      } else {
        return (
          PRODUCT_URL +
          ApiProductInventory.getSubCategory +
          `?seller_id=${sellerid}&service_type=service&need_subcategory=true`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = getUrl(sellerID, search);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'Sub-Category not found',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getBrand(sellerID, search) {
    const getUrl = (sellerid, search) => {
      if (sellerid && search) {
        return (
          PRODUCT_URL + ApiProductInventory.getBrand + `?seller_id=${sellerid}&search=${search}`
        );
      } else {
        return PRODUCT_URL + ApiProductInventory.getBrand + `?seller_id=${sellerid}`;
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = getUrl(sellerID, search);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'Brands not found',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getProduct(selectedId, subSelectedId, brandSelectedId, sellerID) {
    const urlAccCat = (selectedId, subSelectedId, brandSelectedId, sellerID) => {
      if (selectedId && sellerID && !subSelectedId && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?app_name=pos&delivery_options=3&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      } else if (selectedId && subSelectedId && sellerID && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?app_name=pos&delivery_options=3&sub_category_ids=${subSelectedId}&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      } else if (selectedId && subSelectedId && brandSelectedId && sellerID) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?app_name=pos&delivery_options=3&sub_category_ids=${subSelectedId}&brand_id=${brandSelectedId}&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = urlAccCat(selectedId, subSelectedId, brandSelectedId, sellerID);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'Product not found',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getProductDefault(sellerID, page) {
    return new Promise((resolve, reject) => {
      // const endpoint =
      //   PRODUCT_URL +
      //   ApiProductInventory.getProduct +
      //   `?app_name=pos&delivery_options=3&seller_id=${sellerID}&page=1&limit=10`;
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getProduct +
        `?app_name=pos&delivery_options=3&seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'def product error',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getSearchProduct(search, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getProduct +
        `?app_name=pos&delivery_options=3&search=${search}&seller_id=${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          if (response.status === 204) {
            resolve([]);
          }
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

  static async getAllCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getAllCart;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getServiceCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getServiceCart;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getAllProductCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.posCarts + `/`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getAllServiceCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.appintment_cart + `/`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async clearAllCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.clearAllCart;
      HttpClient.delete(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async clearServiceAllCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.appintment_cart;
      HttpClient.delete(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
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
        .then((response) => {
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
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error?.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }

  static async clearOneserviceCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.appintment_cart +
        `/` +
        `${data.cartId}` +
        `/` +
        `${data.productId}`;
      HttpClient.delete(endpoint)
        .then((response) => {
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
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error?.msg,
            visibilityTime: 2000,
          });
          reject(error.msg);
        });
    });
  }

  static async addTocart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.addTocart;
      // let supplyID = data.supplyId.toString();
      // let supplyPriceID = data.supplyPriceID.toString();
      // let variantId = data.supplyVariantId.toString();
      const body = data?.offerId
        ? {
            seller_id: data.seller_id,
            service_id: data.service_id,
            product_id: data.product_id,
            qty: data.qty,
            supply_id: data.supplyId.toString(),
            supply_price_id: data.supplyPriceID.toString(),
            offer_id: data.offerId,
          }
        : data?.supplyVariantId
        ? {
            seller_id: data.seller_id,
            service_id: data.service_id,
            product_id: data.product_id,
            qty: data.qty,
            supply_id: data.supplyId.toString(),
            supply_price_id: data.supplyPriceID.toString(),
            supply_variant_id: data.supplyVariantId.toString(),
          }
        : {
            seller_id: data.seller_id,
            service_id: data.service_id,
            product_id: data.product_id,
            qty: data.qty,
            supply_id: data.supplyId.toString(),
            supply_price_id: data.supplyPriceID.toString(),
          };
      HttpClient.post(endpoint, body)
        .then((response) => {
          // if (response?.msg === 'PosCart created successfully') {
          //   Toast.show({
          //     position: 'bottom',
          //     type: 'success_toast',
          //     text2: response?.msg,
          //     visibilityTime: 2000,
          //   });
          // }
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: error.msg,
            visibilityTime: 5000,
          });
          reject(error);
        });
    });
  }

  static async addToServiceCart(data) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ORDER_URL + ApiOrderInventory.appintment_cart;
      const body = data?.offerId
        ? {
            seller_id: sellerID,
            supply_id: data.supplyId.toString(),
            supply_price_id: data.supplyPriceID.toString(),
            product_id: data.product_id.toString(),
            app_name: data?.appName,
            date: data?.date,
            start_time: data?.startTime,
            end_time: data?.endTime,
            pos_user_id: data?.posUserId,
            offer_id: data?.offerId,
          }
        : {
            seller_id: sellerID,
            supply_id: data.supplyId.toString(),
            supply_price_id: data.supplyPriceID.toString(),
            product_id: data.product_id.toString(),
            app_name: data?.appName,
            date: data?.date,
            start_time: data?.startTime,
            end_time: data?.endTime,
            pos_user_id: data?.posUserId,
          };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
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

  static async updateCartQtyy(data, cartId) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.updateCartQty + `/${cartId}`;

      HttpClient.put(endpoint, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async updateServiceCartQty(data, cartId) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.updateServiceCartQty + `/${cartId}`;

      HttpClient.put(endpoint, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async addNotes(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.addNotes + `/${data.cartId}`;
      const body = {
        notes: data.notes,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          if (response?.msg === 'PosCart updated!') {
            Toast.show({
              text2: 'Notes add succesfully',
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
            resolve(response);
          }
        })
        .catch((error) => {
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
      const endpoint = ORDER_URL + ApiOrderInventory.addNotes + `/${data.cartId}`;
      const orderAmountstrfy = JSON.stringify(data.orderAmount);
      const discountInput = data.amountDis
        ? data.amountDis
        : data.percentDis
        ? data.percentDis
        : data.discountCode;
      const body = {
        discount_value: discountInput,
        discount_flag: data.value,
        order_amount: orderAmountstrfy,
        discount_desc: data.descriptionDis,
      };

      HttpClient.put(endpoint, body)
        .then((response) => {
          if (response?.msg === 'PosCart updated!') {
            Toast.show({
              text2: 'Discount add succesfully',
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
            resolve(response);
          }
        })
        .catch((error) => {
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

  static async addServiceDiscountToCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.appintment_cart + `/${data.cartId}`;
      const orderAmountstrfy = JSON.stringify(data.orderAmount);
      const discountInput = data.amountDis
        ? data.amountDis
        : data.percentDis
        ? data.percentDis
        : data.discountCode;
      const body = {
        discount_value: discountInput,
        discount_flag: data.value,
        order_amount: orderAmountstrfy,
        // discount_desc: data.descriptionDis,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Appointment detail updated!') {
            Toast.show({
              text2: 'Discount add succesfully',
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
            resolve(response);
          }
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

  static async getProductBundle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = PRODUCT_URL + ApiOrderInventory.getProductBundle + '?product_id=' + `${id}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getUserDetail(customerPhoneNo) {
    return new Promise((resolve, reject) => {
      const endpoint =
        WALLET_URL +
        ApiWalletInventory.getUserDetail +
        `?page=1&limit=10&search=${customerPhoneNo}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async sendInvitation(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.sendInvitation;
      const body = {
        firstName: data.userFirstname,
        // lastName: data.userLastName,
        email: data.userEmailAdd,
        phone: data.userPhoneNo,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.status_code === 200) {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: 'successfully send invitation on your email',
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
          reject(error.msg);
        });
    });
  }

  static async createOrder(data) {
    return new Promise((resolve, reject) => {
      const drawerId = store.getState()?.cashTracking?.getDrawerSession?.id;
      const endpoint = ORDER_URL + ApiOrderInventory.createOrder;
      const body = data?.userId
        ? {
            drawer_id: drawerId,
            cart_id: data.cartid,
            user_id: data.userId,
            // tips: data.tips,
            mode_of_payment: data.modeOfPayment,
          }
        : {
            drawer_id: drawerId,
            cart_id: data.cartid,
            // tips: data.tips,
            mode_of_payment: data.modeOfPayment,
          };
      console.log('body', body);
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Order placed successfully!') {
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
          reject(error.msg);
        });
    });
  }

  static async createServiceOrder(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.createServiceOrder;
      const body = {
        cart_id: data?.serviceCartId,
        mode_of_payment: data?.modeOfPayment,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Appointment created successfully!') {
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
          reject(error.msg);
        });
    });
  }

  static async getWalletId(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = WALLET_URL + ApiWalletInventory.getWallet + `${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async walletGetByPhone(walletIdInp) {
    return new Promise((resolve, reject) => {
      const endpoint = WALLET_URL + ApiWalletInventory.walletGetByPhone + `?search=${walletIdInp}`;
      HttpClient.get(endpoint)
        .then((response) => {
          if (response?.msg === 'api wallets found') {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: 'Wallet found successfully',
              visibilityTime: 2000,
            });
          }
          resolve(response);
        })
        .catch((error) => {
          if (error?.error === 'emptyContent') {
            alert('Wallet not found');
            // Toast.show({
            //   position: 'bottom',
            //   type: 'error_toast',
            //   text2: 'Wallet not found',
            //   visibilityTime: 2000,
            // });
          }
          reject(error);
        });
    });
  }

  static async requestMoney(data) {
    return new Promise(async (resolve, reject) => {
      const token = store.getState().auth?.merchantLoginData?.token;
      const endpoint = WALLET_URL + ApiWalletInventory.requestMoney;
      const body = {
        amount: data.amount,
        reciever_address: data.wallletAdd,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Payment request sent success!') {
            Toast.show({
              text2: 'Request send successfully',
              position: 'bottom',
              type: 'success_toast',
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

  static async requestCheck(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = WALLET_URL + ApiWalletInventory.requestCheck + `${data.requestId}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getTips(sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getTips + `${sellerID}`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getOneProduct(sellerID, productId, offerId) {
    return new Promise((resolve, reject) => {
      const endpoint = offerId
        ? PRODUCT_URL +
          ApiProductInventory.getProduct +
          `/${productId}?app_name=pos&seller_id=${sellerID}&need_pos_users=true&offer_id=${offerId}`
        : PRODUCT_URL +
          ApiProductInventory.getProduct +
          `/${productId}?app_name=pos&seller_id=${sellerID}&need_pos_users=true`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
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
  static async getOneService(sellerID, serviceId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.getProduct +
        `/${serviceId}?app_name=pos&seller_id=${sellerID}&need_pos_users=true`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',
            text2: 'Service not found',
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async checkSuppliedVariant(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.checkSuppliedVariant +
        `?attribute_value_ids=${data.colorAndSizeId}&supply_id=${data.supplyId}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          alert('No Combination, Select Other Variant'),
            Toast.show({
              position: 'bottom',
              type: 'error_toast',
              text2: 'No Combination, Select Other Variant',
              visibilityTime: 2000,
            });
          reject(error);
        });
    });
  }

  static async logout() {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  static async scanProductAdd(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.scanProductAdd;
      // return;
      HttpClient.post(endpoint, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            position: 'top',
            type: 'error_toast',
            text2: error?.msg,
            visibilityTime: 3000,
          });
          reject(error);
        });
    });
  }

  static async getDynamicProducts(productTypeID = {}) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const defaultParams = {
        app_name: 'pos',
        delivery_options: '3',
        seller_id: sellerID,
        service_type: 'product',
        page: 1,
        limit: 25,
      };

      let finalParams;

      if (Object.keys(productTypeID).length !== 0) {
        finalParams = {
          ...defaultParams,
          ...productTypeID,
        };
      } else {
        finalParams = {
          ...defaultParams,
        };
      }

      const convertToQueryParam = new URLSearchParams(finalParams).toString();
      const endpoint = PRODUCT_URL + ApiProductInventory.product + '?' + convertToQueryParam;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   position: 'bottom',
          //   type: 'error_toast',
          //   text2: 'Product not found',
          //   visibilityTime: 2000,
          // });
          reject(error);
        });
    });
  }

  static async getMainProductPagination(productTypeID) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const defaultParams = {
        app_name: 'pos',
        delivery_options: '3',
        seller_id: sellerID,
        service_type: 'product',
        page: productTypeID.page,
        limit: 20,
      };
      let finalParams;
      if (Object.keys(productTypeID).length !== 0) {
        finalParams = {
          ...defaultParams,
          ...productTypeID,
        };
      } else {
        finalParams = {
          ...defaultParams,
        };
      }

      const convertToQueryParam = new URLSearchParams(finalParams).toString();
      const endpoint = PRODUCT_URL + ApiProductInventory.product + '?' + convertToQueryParam;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   position: 'bottom',
          //   type: 'error_toast',
          //   text2: 'Product not found',
          //   visibilityTime: 2000,
          // });
          reject(error);
        });
    });
  }
  static async getMainServices(productTypeID = {}) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const defaultParams = {
        app_name: 'pos',
        delivery_options: '2',
        seller_id: sellerID,
        service_type: 'service',
        need_pos_users: true,
      };

      let finalParams;

      if (Object.keys(productTypeID).length !== 0) {
        finalParams = {
          ...defaultParams,
          ...productTypeID,
        };
      } else {
        finalParams = {
          ...defaultParams,
        };
      }

      const convertToQueryParam = new URLSearchParams(finalParams).toString();
      const endpoint = PRODUCT_URL + ApiProductInventory.product + '?' + convertToQueryParam;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getMainProduct(selectedId, subSelectedId, brandSelectedId, sellerID) {
    const urlAccCat = (selectedId, subSelectedId, brandSelectedId, sellerID) => {
      if (sellerID && !selectedId && !subSelectedId && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.product +
          `?app_name=pos&delivery_options=3&seller_id=${sellerID}`
        );
      } else if (selectedId && sellerID && !subSelectedId && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?app_name=pos&delivery_options=3&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      } else if (selectedId && subSelectedId && sellerID && !brandSelectedId) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?app_name=pos&delivery_options=3&sub_category_ids=${subSelectedId}&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      } else if (selectedId && subSelectedId && brandSelectedId && sellerID) {
        return (
          PRODUCT_URL +
          ApiProductInventory.getProduct +
          `?app_name=pos&delivery_options=3&sub_category_ids=${subSelectedId}&brand_id=${brandSelectedId}&seller_id=${sellerID}&category_ids=${selectedId}`
        );
      }
    };
    return new Promise((resolve, reject) => {
      const endpoint = urlAccCat(selectedId, subSelectedId, brandSelectedId, sellerID);
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   position: 'bottom',
          //   type: 'error_toast',
          //   text2: 'Product not found',
          //   visibilityTime: 2000,
          // });
          reject(error);
        });
    });
  }

  static async createBulkCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.bulkCreate;
      HttpClient.post(endpoint, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   position: 'bottom',
          //   type: 'error_toast',

          //   text2: error.msg,
          //   text2: error?.msg,
          //   visibilityTime: 2000,
          // });
          reject(error);
        });
    });
  }

  static async attachCustomer(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.attachCustomer + `${data.cartId}`;
      const body = data?.phoneNo
        ? {
            phone_no: data?.phoneNo,
          }
        : {
            email: data?.phoneEmail,
          };
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

  static async attachServiceCustomer(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.attachServiceCustomer + `${data.cartId}`;
      const body = data?.phoneNo
        ? {
            phone_no: data?.phoneNo,
          }
        : {
            email: data?.phoneEmail,
          };
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

  static async getQrCode(cartId, data) {
    return new Promise((resolve, reject) => {
      const endpoint = data?.services
        ? ORDER_URL + ApiOrderInventory.qrcodeServices + `${cartId}`
        : ORDER_URL + ApiOrderInventory.qrCode + `${cartId}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: 'catgory error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async getTip(data, cartId) {
    return new Promise((resolve, reject) => {
      const endpoint = data.services
        ? ORDER_URL + ApiOrderInventory.serviceTip + `${data?.cartId}`
        : ORDER_URL + ApiOrderInventory.tip + `${data?.cartId}`;
      const body = {
        tip: data?.tip,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            position: 'bottom',
            type: 'error_toast',

            text2: error.msg,
            text2: error?.msg,
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async changeStatusProductCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.changeStatusProductCart + `/${data.cartId}`;
      const body = {
        status: data.status,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            Toast.show({
              text2: error?.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 3000,
            });
          }
          reject(error);
        });
    });
  }

  static async changeStatusServiceCart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.changeStatusServiceCart + `/${data.cartId}`;
      const body = {
        status: data.status,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            Toast.show({
              text2: error?.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 3000,
            });
          }
          reject(error);
        });
    });
  }

  static async addServiceNotescart(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.appintment_cart + `/${data.cartId}`;
      const body = {
        notes: data.notes,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          if (response?.msg === 'Appointment detail updated!') {
            Toast.show({
              text2: 'Notes add succesfully',
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
            resolve(response);
          }
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

  static async getTimeSlotsAPI(params) {
    return new Promise((resolve, reject) => {
      const convertToQueryParam = new URLSearchParams(params).toString();
      const endpoint = ORDER_URL + ApiOrderInventory.slots + '?' + convertToQueryParam;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: 'catgory error',
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async getAvailableOffer(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.availableOffer +
        `?app_name=pos&delivery_options=2&page=1&limit=10&seller_id=${data?.seller_id}&service_type=${data?.servicetype}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async qrCodePaymentStatus(id) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.qrstatus + `${id}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async ServicesqrCodePaymentStatus(id) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.ServicesQrStatus + `${id}`;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async productUpdatePrice(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.productUpdatePrice +
        `/${data?.cartid}/${data?.cartProductId}`;
      const body = {
        price: data?.updatedPrice,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async serviceUpdatePrice(data) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL +
        ApiOrderInventory.serviceUpdatePrice +
        `/${data?.cartid}/${data?.cartProductId}`;
      const body = {
        price: data?.updatedPrice,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }

  static async cartBarCode(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.cartBarCode;
      const body = {
        barcode: data?.barcode,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // Toast.show({
          //   text2: error?.msg,
          //   position: 'bottom',
          //   type: 'error_toast',
          //   visibilityTime: 1500,
          // });
          reject(error);
        });
    });
  }
}

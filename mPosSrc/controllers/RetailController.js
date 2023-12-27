import { store } from '@/store';
import { HttpClient } from './HttpClient';
import { CustomErrorToast, CustomSuccessToast } from '@mPOS/components/Toast';
import {
  ApiOrderInventory,
  ApiProductInventory,
  ORDER_URL,
  PRODUCT_URL,
} from '@mPOS/utils/APIinventory';

export class RetailController {
  static async getProduct(productTypeID = {}, page) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const defaultParams = {
        app_name: 'pos',
        delivery_options: '3',
        seller_id: sellerID,
        service_type: 'product',
        page: page,
        limit: 15,
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
      console.log('------------', endpoint);
      console.log('');
      HttpClient.get(endpoint)
        .then((response) => {
          console.log('response', response);
          resolve(response);
        })
        .catch((error) => {
          console.log('error', error);
          error?.msg && CustomErrorToast({ message: error?.msg });
          reject(error);
        });
    });
  }

  static async getOneProduct(productId) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        PRODUCT_URL +
        ApiProductInventory.product +
        `/${productId}?app_name=pos&seller_id=${sellerID}&need_pos_users=true`;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          error?.msg && CustomErrorToast({ message: error?.msg });
          reject(error);
        });
    });
  }

  static async addProductCart(data) {
    return new Promise((resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint = ORDER_URL + ApiOrderInventory.addProductCart;
      const body = {
        seller_id: sellerID,
        service_id: data.service_id,
        product_id: data.product_id,
        qty: data.qty,
        supply_id: data.supplyId.toString(),
        supply_price_id: data.supplyPriceID.toString(),
        ...(data.supplyVariantId && {
          supply_variant_id: data.supplyVariantId.toString(),
        }),
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          CustomSuccessToast({ message: response?.msg });
          resolve(response);
        })
        .catch((error) => {
          CustomErrorToast({ message: error?.msg });
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
          error?.msg &&
            CustomErrorToast({
              message: 'No Combination, Select Other Variant',
            });
          reject(error);
        });
    });
  }

  static async getProductCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.getProductCart;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          error?.msg &&
            CustomErrorToast({
              message: error?.msg,
            });
          reject(error);
        });
    });
  }

  static async clearProductCart() {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.poscarts;
      HttpClient.delete(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          error?.msg &&
            CustomErrorToast({
              message: error?.msg,
            });
          reject(error);
        });
    });
  }
}

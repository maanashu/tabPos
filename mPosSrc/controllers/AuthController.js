import { ApiUserInventory, USER_URL } from '@mPOS/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { strings } from '@mPOS/localization';
import { store } from '@/store';
import { CustomErrorToast, CustomSuccessToast } from '@mPOS/components/Toast';

export class AuthController {
  static async verifyPhone(data) {
    const endpoint = USER_URL + ApiUserInventory.verifyPhone;
    const body = data;
    await HttpClient.post(endpoint, body)
      .then((response) => {
        if (response.status_code === 200) {
          if (response?.payload?.is_phone_exits) {
            navigate(MPOS_NAVIGATION.verifyOtp);
          } else {
            CustomErrorToast({
              message: strings.validationMessages.phoneNotExist,
            });
          }
        } else {
          CustomSuccessToast({ message: response.msg });
        }
      })
      .catch((error) => {
        CustomErrorToast({ message: error.msg });
      });
  }

  static async merchantLogin(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.merchantLogin;
      const body = data;
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response.status_code === 200) {
            CustomSuccessToast({ message: strings.successMessages.loginSuccess });
            navigate(MPOS_NAVIGATION.posUsers);
            resolve(response);
          } else {
            CustomSuccessToast({ message: response.msg });
          }
        })
        .catch((error) => {
          CustomErrorToast({ message: error.msg });
          reject(error.msg);
        });
    });
  }

  static async getAllPosUsers(data) {
    return new Promise(async (resolve, reject) => {
      const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
      const endpoint =
        USER_URL +
        ApiUserInventory.getPosUsers +
        `?page=${data.page}&limit=${data.limit}&seller_id=${sellerID}`;
      await HttpClient.get(endpoint)
        .then((response) => {
          if (response?.status_code === 200) {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

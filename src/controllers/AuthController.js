import { USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Toast from 'react-native-toast-message';
import { strings } from '@/localization';

export class AuthController {
  static async verifyPhone(phoneNumber, countryCode) {
    const endpoint = USER_URL + ApiUserInventory.verifyPhone;
    const body = {
      phone_code: countryCode,
      phone_no: phoneNumber,
      // isAlreadyCheck: true,
    };
    await HttpClient.post(endpoint, body)
      .then((response) => {
        if (response.status_code === 200) {
          if (response?.payload?.is_phone_exits) {
            navigate(NAVIGATION.merchantPasscode, {
              posuser: '',
              from: 'verifyphone',
            });
          } else {
            Toast.show({
              text2: strings.valiadtion.phoneNotExist,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 2000,
            });
          }
        } else {
          Toast.show({
            text2: response.msg,
            position: 'bottom',
            type: 'success_toast',
            visibilityTime: 2000,
          });
        }
      })
      .catch((error) => {
        Toast.show({
          text2: error.msg,
          position: 'bottom',
          type: 'error_toast',
          visibilityTime: 2000,
        });
      });
  }

  static async verifyOtp(id, value, key) {
    const endpoint = USER_URL + ApiUserInventory.verifyOtp;
    const body = key
      ? {
          otp: 1234,
          id: id,
          role_id: 2,
          isAlreadyCheck: true,
        }
      : {
          otp: 1234,
          id: id,
          role_id: 2,
        };
    await HttpClient.post(endpoint, body)
      .then((response) => {
        if (response.status_code === 200) {
          Toast.show({
            type: 'success_toast',
            text2: strings.successMessages.otpVerified,
            position: 'bottom',
            visibilityTime: 1500,
          });
          key ? navigate(NAVIGATION.setPin) : navigate(NAVIGATION.register);
        } else {
          Toast.show({
            text2: response.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
        }
      })
      .catch((error) => {
        Toast.show({
          text2: error.msg,
          position: 'bottom',
          type: 'error_toast',
          visibilityTime: 1500,
        });
      });
  }

  static async merchantLogin(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.merchantLogin;
      const body = {
        type: 'phone',
        phone_code: data.country_code,
        phone_number: data.phone_no,
        security_pin: data.pin,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          if (response.status_code === 200) {
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
        .catch((error) => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 2500,
          });
          reject(error.msg);
        });
    });
  }

  static async loginPosUser(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.loginPosuser;

      HttpClient.post(endpoint, data)
        .then((response) => {
          if (response.status_code === 200) {
            Toast.show({
              type: 'success_toast',
              text2: strings.successMessages.loginSuccess,
              position: 'bottom',
              visibilityTime: 1500,
            });
            resolve(response);

            //  navigate(NAVIGATION.posUsers);
          } else {
            Toast.show({
              text2: response.msg,
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 1500,
            });
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

  static async getProfile(id) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.getProfile + `${id}`;
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
          reject(new Error((strings.verify.error = error.msg)));
        });
    });
  }

  static async setPin(data) {
    const endpoint = USER_URL + ApiUserInventory.setPin;
    const body = {
      phone_code: data.phone_code,
      phone_number: data.phone_no,
      pin: data.pin,
      otp: data.otp,
    };
    await HttpClient.post(endpoint, body)
      .then((response) => {
        if (response?.status_code === 200) {
          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: response?.msg,
            visibilityTime: 2000,
          });
          navigate(NAVIGATION.login);
        }
      })
      .catch((error) => {
        Toast.show({
          position: 'bottom',
          type: 'error_toast',
          text2: error.msg,
          visibilityTime: 2000,
        });
      });
  }

  static async getAllPosUsers(data, search) {
    // const getUrl = (sellerID, search) => {
    //   if (data && search) {
    //     return (
    //       USER_URL +
    //       ApiUserInventory.getPosUsers +
    //       `?page=${data.page}&limit=${data.limit}&seller_id=${data.seller_id}&search=${search}`
    //     );
    //   } else {
    //     return (
    //       USER_URL +
    //       ApiUserInventory.getPosUsers +
    //       `?page=${data.page}&limit=${data.limit}&seller_id=${data.seller_id}`
    //     );

    //     // USER_URL + ApiUserInventory.abc(sellerID);
    //   }
    // };

    return new Promise(async (resolve, reject) => {
      // const endpoint =  `${USER_URL}${ApiUserInventory.getPosUsers}?page=1&limit=10&seller_id=${sellerID}`;
      // const endpoint = getUrl(data.seller_id, search);
      const endpoint =
        USER_URL +
        ApiUserInventory.getPosUsers +
        `?page=${data.page}&limit=${data.limit}&seller_id=${data.seller_id}`;
      console.log('Enspoint', endpoint);
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

import { USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import Toast from 'react-native-toast-message';
import { strings } from '@/localization';
import DeviceInfo from 'react-native-device-info';

export class UserController {
  static async loginPosUser(data) {
    return new Promise(async (resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.loginPosuser;
      const uniqueId = await DeviceInfo.getUniqueId();
      HttpClient.post(endpoint, data, {
        headers: { 'device-id': uniqueId, 'app-name': 'pos' },
      })
        .then((response) => {
          if (response.status_code === 200) {
            console.log('---------------', JSON.stringify(response));
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

  static async deviceRegister() {
    return new Promise(async (resolve, reject) => {
      const endpoint = ApiUserInventory.deviceRegister;
      const uniqueId = await DeviceInfo.getUniqueId();
      const body = {
        device_id: uniqueId,
        app_name: 'pos',
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.msg === 'biometric_off') {
            alert(
              'Please login with PIN and enable biometric authentication from your application'
            );
          } else {
            alert(error.msg);
          }
          reject(error);
        });
    });
  }

  static async updateBioMetricLoginPreference() {
    return new Promise(async (resolve, reject) => {
      const endpoint = ApiUserInventory.deviceUnRegister;
      const uniqueId = await DeviceInfo.getUniqueId();
      const body = {
        device_id: uniqueId,
        app_name: 'pos',
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async deviceLogin(id) {
    return new Promise(async (resolve, reject) => {
      const endpoint = ApiUserInventory.deviceLogin;
      const uniqueId = await DeviceInfo.getUniqueId();
      const body = {
        device_id: uniqueId,
        app_name: 'pos',
        user_id: id,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.msg === 'biometric_off') {
            alert(
              'Please login with PIN and enable biometric authentication from your application'
            );
          } else {
            alert(error.msg);
          }
          reject(error);
        });
    });
  }

  static async verifyPin(pin) {
    return new Promise((resolve, reject) => {
      const endpoint = ApiUserInventory.verifyPin;
      const body = {
        security_pin: pin,
      };

      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }

  static async changeOldPin(data) {
    return new Promise((resolve, reject) => {
      const endpoint = ApiUserInventory.changeOldPin;
      HttpClient.post(endpoint, data)
        .then((response) => {
          resolve(response);
          Toast.show({
            text2: 'Pin changed successfully',
            position: 'bottom',
            type: 'success_toast',
            visibilityTime: 2000,
          });
        })
        .catch((error) => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 2000,
          });
          reject(error);
        });
    });
  }
}

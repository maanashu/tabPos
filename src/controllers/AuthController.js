import { USER_URL, ApiUserInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Toast from 'react-native-toast-message';
import { strings } from '@/localization';

export class AuthController {

  static async sendOtp(phoneNumber, countryCode, key) {
    const endpoint = USER_URL + ApiUserInventory.sendOtp;
    const body = key ? {
      phone_code: countryCode,
      phone_no: phoneNumber,
      isAlreadyCheck: true,
    } : {
      phone_code: countryCode,
      phone_no: phoneNumber,
    };
    await HttpClient.post(endpoint, body)
      .then(response => {
        if (response.status_code === 200) {
          if (response?.payload?.is_phone_exits) {
            navigate(NAVIGATION.login);
          } else {
            Toast.show({
              position: 'bottom',
              type: 'success_toast',
              text2: 'OTP sent successfully !',
              visibilityTime: 2000,
            });
            navigate(NAVIGATION.verify, { id: response.payload.id, key: key });
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
      .catch(error => {
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
    const body = key ? {
      otp: 1234,
      id: id,
      role_id: 2,
      isAlreadyCheck: true
    } : {
      otp: 1234,
      id: id,
      role_id: 2
    };
    await HttpClient.post(endpoint, body)
      .then(response => {
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
      .catch(error => {
        Toast.show({
          text2: error.msg,
          position: 'bottom',
          type: 'error_toast',
          visibilityTime: 1500,
        });
      });
  }

  static async register(data, params) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.register;
      const body = {
        username: params.username,
        firstname: params.firstname,
        lastname: params.lastname,
        security_pin: params.pin,
        confirm_security_pin: params.confirmPin,
        role_id: 2,
        phone_code: params.code,
        phone_no: params.phone,
        is_wallet: 'true',
        dob: data.date,
        ssn_number: data.ssn,
        gender: data.gender,
        zipcode:data.zipCode,
        current_address: {
          street_address: data.street,
          apt: data.appartment,
          state: data.stateName,
          city: data.cityName,
          // postal_code: "1212",
          country: data.countryName,
          address_type: "current"
      },
      };
      HttpClient.post(endpoint, body)
        .then(response => {
          if (response?.status_code === 201) {
            navigate(NAVIGATION.ageVerification);
            resolve(response);
          }else {
            Toast.show({
              text2: response.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500
            })
          }
          return
        }).catch(error => {
          Toast.show({
            text2: error.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500
          });
          reject(new Error((strings.verify.error = error.msg)));
        });
    });
  }

  static async personalInformation(data) {
    // console.log('----------------------personalInformationsssssss', data )
    const endpoint = USER_URL + ApiUserInventory.personalInformation;
    // return;
    const body = {
      steps: '1',
      date: data.date,
      ssn: data.ssn,
      gender: data.gender,
      current_address: {
        street: data.street,
        appartment: data.appartment,
        state: data.state,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
       
      },
    };
    await HttpClient.put(endpoint, body)
      .then(response => {
        if (response?.status_code === 201) {
          navigate(NAVIGATION.ageVerification);
        }
      })
      .catch(error => {
        Toast.show({
          text2: error.msg,
          position: 'bottom',
          type: 'error_toast',
          visibilityTime: 2000,
        });
      });
  }

  static async getCountries() {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL + ApiUserInventory.countryList + '?page=1&limit=10&search';
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
          reject(new Error((strings.verify.error = error.msg)));
        });
    });
  }

  static async getState() {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL + ApiUserInventory.stateList + '?page=1&limit=10&search';
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
          reject(new Error((strings.verify.error = error.msg)));
        });
    });
  }

  static async getCities() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.citiesList + '?page=1&limit=10&search';
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
          reject(new Error((strings.verify.error = error.msg)));
        });
    });
  }

  static async ageVerification(data) {
    const endpoint = USER_URL + ApiUserInventory.ageVerification;
    const body = {
      identity_type: data.identityType,
      identity_urls: [
        {
          document: data.finalFrontPhoto,
        },
        {
          document: data.finalBackPhoto
        }
      ]
    };
    await HttpClient.post(endpoint, body)
      .then(response => {
        if (response?.status_code === 200) {
          Toast.show({
            type: 'success_toast',
            text2: strings.successMessages.uploadDocument,
            position: 'bottom',
            visibilityTime: 1500,
          });
          // navigate(NAVIGATION.ageVerification);
        } else {
          Toast.show({
            text2: response.msg,
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
        }
      })
      .catch(error => {
        // Toast.show({
        //   text2: error.msg,
        //   position: 'bottom',
        //   type: 'error_toast',
        //   visibilityTime: 2000,
        // });
        console.log(error.msg)
      });
  }

  static async login(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiUserInventory.login;
      const body = {
        phone_code: data.phone_code,
        phone_number: data.phone_no,
        password: data.pin
      };
      HttpClient.post(endpoint, body)
        .then(response => {
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
        }).catch(error => {
          if (error.status_code === 409 && error.msg === 'security pin not set yet.') {
            Toast.show({
              text2: strings.validation.setPin,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500,
            });
            navigate(NAVIGATION.setPin)
          } else {
            Toast.show({
              text2: error.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 1500
            })
          }
          reject(error.msg);
        });
    })
  }

  static async setPin(data) {
    const endpoint = USER_URL + ApiUserInventory.setPin;
    const body = {
      phone_code: data.phone_code,
      phone_number: data.phone_no,
      pin: data.pin,
      otp: data.otp
    }
    await HttpClient.post(endpoint, body)
      .then(response => {
        if (response?.status_code === 200) {
          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: response?.msg,
            visibilityTime: 2000,
          });
          navigate(NAVIGATION.login)
        }
      }).catch(error => {
        Toast.show({
          position: 'bottom',
          type: 'error_toast',
          text2: error.msg,
          visibilityTime: 2000,
        });
      })
  }
}

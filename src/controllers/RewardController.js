import { ApiRewards, USER_URL } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export class RewardController {
  static async getGraphDataAPI(sellerID, filter = 'today') {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiRewards.getRewardGraph +
        `?seller_id=${sellerID}&filter=${filter}`;

      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: 'graph data error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(new Error((strings.valiadtion.error = error.msg)));
        });
    });
  }
  static async getRewardedUsersAPI() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiRewards.getRewardedUsers;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: 'rewarded user list error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }

  static async getRewardUser(value, sellerID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        USER_URL +
        ApiRewards.getRewardUser +
        `?seller_id=${sellerID}&filter=${value}`;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          Toast.show({
            text2: 'rewarded user list error',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
          reject(error);
        });
    });
  }
}

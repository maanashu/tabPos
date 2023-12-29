import { WALLET_URL, plansAPI } from '@/utils/APIinventory';
import { strings } from '@/localization';
import { HttpClient } from './HttpClient';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { store } from '@/store';
export class SubscriptionController {
  static async getAllPlans() {
    return new Promise((resolve, reject) => {
      const endpoint = WALLET_URL + plansAPI.getAllPlans;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getPlanById(planId) {
    return new Promise((resolve, reject) => {
      const endpoint = WALLET_URL + plansAPI.getPlanById + planId;
      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getActiveSubscriptions() {
    return new Promise((resolve, reject) => {
      const endpoint = WALLET_URL + plansAPI.activePlan;
      HttpClient.get(endpoint)
        .then((response) => {
          console.log('ERere', JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async buySubscription(plan_id) {
    return new Promise((resolve, reject) => {
      const endpoint = WALLET_URL + plansAPI.buyPlan;
      const param = {
        plan_id: plan_id,
      };

      HttpClient.post(endpoint, param)
        .then((response) => {
          Toast.show({
            position: 'bottom',
            type: 'success_toast',
            text2: 'Success',
            visibilityTime: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

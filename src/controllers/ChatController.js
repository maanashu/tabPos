import { strings } from '@/localization';
import { ApiChatInverntory, USER_URL } from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';
export class ChatController {
  static async sendChat(data) {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiChatInverntory.sendChat;
      const body = {
        recipient_id: data,
        media_type: 'text',
        ...data,
      };
      HttpClient.post(endpoint, body)
        .then((response) => {
          resolve(response);
          // navigate(NAVIGATION.settings);
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

  static async getMessages(id) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(id).toString();

      let endpoint;

      if (typeof id === 'object') {
        endpoint = `${ApiChatInverntory.getMessages}get-seller-message?${params}`;
      } else {
        endpoint = `${ApiChatInverntory.getMessages}${id}`;
      }

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error?.statusCode != 204) {
            Toast.show({
              text2: error.msg,
              position: 'bottom',
              type: 'error_toast',
              visibilityTime: 2000,
            });
          }

          reject(error);
        });
    });
  }
  static async getMessageHeads() {
    return new Promise((resolve, reject) => {
      const endpoint = USER_URL + ApiChatInverntory.getMessageHeads;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
          // navigate(NAVIGATION.settings);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

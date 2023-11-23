import { ApiSupportInventory, ApiUserInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import Toast from 'react-native-toast-message';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { strings } from '@/localization';

export class SupportController {
  static async getSupportList() {
    return new Promise((resolve, reject) => {
      const endpoint = ApiSupportInventory.supportList;
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

  static async addNewTicket(data) {
    console.log('request payload: ' + JSON.stringify(data));
    const getBody = (data) => {
      if (data.document_url === undefined && data.type === 'refund') {
        return {
          subject_id: data.subject_id,
          email: data.email,
          name: data.name,
          notes: data.notes,
          type: data.type,
          order_id: data.order_id.toString(),
          department_id: data.department_id,
        };
      } else if (data.document_url !== undefined && data.type === 'refund') {
        return {
          subject_id: data.subject_id,
          email: data.email,
          name: data.name,
          notes: data.notes,
          type: data.type,
          order_id: data.order_id.toString(),
          department_id: data.department_id,
          document_url: [{ url: data.document_url }],
        };
      } else if (data.document_url === undefined) {
        return {
          subject_id: data.subject_id,
          email: data.email,
          name: data.name,
          notes: data.notes,
          type: data.type,
          department_id: data.department_id,
        };
      } else {
        return {
          subject_id: data.subject_id,
          email: data.email,
          name: data.name,
          notes: data.notes,
          type: data.type,
          document_url: [{ url: data.document_url }],
          department_id: data.department_id,
        };
      }
    };

    return new Promise(async (resolve, reject) => {
      const endpoint = ApiSupportInventory.addTicket;
      const body = getBody(data);
      await HttpClient.post(endpoint, body)
        .then((response) => {
          Toast.show({
            text2: 'Ticket raised successfully',
            position: 'bottom',
            type: 'success_toast',
            visibilityTime: 1500,
          });

          resolve(response);
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

  static async getSubjects() {
    return new Promise((resolve, reject) => {
      const endpoint = ApiSupportInventory.subjectList + '?page=1&limit=10';
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

  static async getDepartments() {
    return new Promise((resolve, reject) => {
      const endpoint = ApiUserInventory.departmentList;
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
}

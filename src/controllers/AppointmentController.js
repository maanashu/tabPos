import { ORDER_URL, ApiOrderInventory, ApiUserInventory, USER_URL } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { store } from '@/store';

export class AppointmentController {
  static async getAppointment(pageNumber = 1, posUserId) {
    return new Promise((resolve, reject) => {
      const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
      const defaultQueryParams = {
        seller_id: sellerId,
        need_upcoming: true,
      };

      const queryParams = {
        ...defaultQueryParams,
        page: pageNumber,
        limit: 10,
      };

      // Check if pos user id is available
      if (posUserId) {
        queryParams.pos_user_id = posUserId;
        queryParams.status = 0;
      }

      const stringifiedQueryParams = new URLSearchParams(queryParams);

      const endpoint = ORDER_URL + ApiOrderInventory.getAppointment + `?` + stringifiedQueryParams;

      HttpClient.get(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static async changeAppointmentAPI(appointmentId, status) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.changeAppointment + `${appointmentId}`;
      const body = {
        status: `${status}`,
      };
      HttpClient.put(endpoint, body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static async rescheduleAppointmentAPI(appointmentId, params) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.rescheduleAppointmentURL + `${appointmentId}`;

      HttpClient.put(endpoint, params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getAllStaffUsers(pageNumber = 1) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise(async (resolve, reject) => {
      const endpoint = `${USER_URL}${ApiUserInventory.getPosUsers}?page=${pageNumber}&limit=10&seller_id=${sellerId}&need_staff_member=true`;
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
  static async createPossUser(data) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise(async (resolve, reject) => {
      const endpoint = `${USER_URL}${ApiUserInventory.creatPosUsers}`;
      console.log('endpoint', endpoint);
      console.log('Data', data);
      // const body = {
      //   recipient_id: data,
      //   media_type: 'text',
      //   ...data,
      // };

      await HttpClient.post(endpoint, data)
        .then((response) => {
          console.log('dsfsdf', response);
          if (response?.status_code === 200) {
            resolve(response);
          }
        })
        .catch((error) => {
          console.log('error', error);

          reject(error);
        });
    });
  }
  static async getPosUserRoles(data) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise(async (resolve, reject) => {
      const endpoint = `${USER_URL}${ApiUserInventory.getPosUserRoles}?user_id=${data.user_id}`;
      // const endpoint = `${USER_URL}${ApiUserInventory.getPosUserRoles}?limit=${data.limit}&page=${data.page}&user_id=${data.user_id}`;
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

  static async sendCheckinOTPAPI(appointmentId) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise(async (resolve, reject) => {
      const endpoint = `${ORDER_URL}${ApiOrderInventory.sendCheckinOTP}${appointmentId}`;
      await HttpClient.post(endpoint)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static async verifyCheckinOTPAPI(params) {
    const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
    return new Promise(async (resolve, reject) => {
      const endpoint = `${ORDER_URL}${ApiOrderInventory.verifyCheckinOTP}`;
      await HttpClient.post(endpoint, params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

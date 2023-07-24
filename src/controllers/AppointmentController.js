import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';
import { store } from '@/store';

export class AppointmentController {
  static async getAppointment(pageNumber = 1) {
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
}

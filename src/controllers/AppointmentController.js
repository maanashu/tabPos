import { ORDER_URL, ApiOrderInventory } from '@/utils/APIinventory';
import { HttpClient } from './HttpClient';

export class AppointmentController {
  static async getAppointment() {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.getAppointment + `?page=1&limit=10`;
      HttpClient.get(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static async changeAppointmentAPI(appointmentId, status) {
    return new Promise((resolve, reject) => {
      const endpoint =
        ORDER_URL + ApiOrderInventory.changeAppointment + `${appointmentId}`;
      console.log(endpoint);
      const body = {
        status: `${status}`,
      };

      HttpClient.put(endpoint, body)
        .then(response => {
          console.log(JSON.stringify(response));
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

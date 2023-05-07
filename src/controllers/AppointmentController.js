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

  static async createOrder(orderParams) {
    return new Promise((resolve, reject) => {
      const endpoint = ORDER_URL + ApiOrderInventory.createAppointmentOrder;

      const body = {
        cart_id: '2',
        date: '2022-03-12',
        start_time: '02:00 PM',
        end_time: '03:00 PM',
        mode_of_payment: 'jbr',
      };
      HttpClient.post(endpoint, orderParams)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

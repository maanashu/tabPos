import { strings } from '@/localization';
import {
  USER_URL,
  PRODUCT_URL,
  ApiProductInventory,
  ApiUserInventory,
  ORDER_URL,
  ApiOrderInventory,
} from '@/utils/APIinventory';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HttpClient } from './HttpClient';


export class UserController {
  


  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}

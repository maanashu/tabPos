import { UserController } from '@/controllers';
import { TYPES } from "@/Types/Types";
import { LogBox } from 'react-native';






export const logout = () => async dispatch => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};

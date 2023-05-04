import { UserController } from '@/controllers';

export const logout = () => async dispatch => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};

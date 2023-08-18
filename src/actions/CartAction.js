import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers/UserController';
import { navigate } from '@/navigation/NavigationRef';
import { TYPES } from '@/Types/Types';

export const updateCartLength = (value) => ({
  type: TYPES.UPDATE_CART_LENGTH_REQUEST,
  payload: value,
});

export const addLocalCart = (value) => ({
  type: TYPES.ADD_LOCAL_CART_SUCCESS,
  payload: value,
});
export const clearLocalCart = (value) => ({
  type: TYPES.CLEAR_LOCAL_CART_SUCCESS,
  payload: null,
});

// export const loginPosUser = (data) => async (dispatch) => {
//   dispatch(loginPosUserRequest());
//   try {
//     const res = await UserController.loginPosUser(data);
//     dispatch(loginPosUserSuccess(res?.payload));
//   } catch (error) {
//     return dispatch(loginPosUserError(error));
//   }
// };


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
export const clearLocalCart = () => ({
  type: TYPES.CLEAR_LOCAL_CART_SUCCESS,
  payload: [],
});


export const updateServiceCartLength = (value) => ({
  type: TYPES.UPDATE_SERVICE_CART_LENGTH,
  payload: value,
});

export const addServiceLocalCart = (value) => ({
  type: TYPES.ADD_SERVICE_LOCAL_CART,
  payload: value,
});
export const clearServiceLocalCart = () => ({
  type: TYPES.CLEAR_SERVICE_LOCAL_CART,
  payload: [],
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


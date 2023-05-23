import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers/UserController';
import { navigate } from '@/navigation/NavigationRef';
import { TYPES } from '@/Types/Types';

const loginPosUserRequest = () => ({
  type: TYPES.LOGIN_POS_USER_REQUEST,
  payload: null,
});
const loginPosUserError = error => ({
  type: TYPES.LOGIN_POS_USER_ERROR,
  payload: { error },
});
const loginPosUserSuccess = posLoginData => ({
  type: TYPES.LOGIN_POS_USER_SUCCESS,
  payload: { posLoginData },
});

const clearStore = () => ({
  type: TYPES.POS_USER_CLEAR_STORE,
  payload: null,
});

export const loginPosUser = data => async dispatch => {
  dispatch(loginPosUserRequest());
  try {
    const res = await UserController.loginPosUser(data);
    dispatch(loginPosUserSuccess(res?.payload));
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};

export const logoutUserFunction = () => async dispatch => {
  dispatch(clearStore());
};

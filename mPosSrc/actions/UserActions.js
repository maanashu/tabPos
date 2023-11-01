import { TYPES } from '@mPOS/Types/Types';
import { UserController } from '@mPOS/controllers';

const loginPosUserRequest = () => ({
  type: TYPES.LOGIN_POS_REQUEST,
  payload: null,
});

const loginPosUserError = (error) => ({
  type: TYPES.LOGIN_POS_ERROR,
  payload: { error },
});

const loginPosUserSuccess = (posLoginData) => ({
  type: TYPES.LOGIN_POS_SUCCESS,
  payload: { posLoginData },
});

export const showSession = (value) => ({
  type: TYPES.SHOW_SESSION,
  payload: value,
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const loginPosUser = (data) => async (dispatch) => {
  dispatch(loginPosUserRequest());
  try {
    const res = await UserController.loginPosUser(data);
    dispatch(loginPosUserSuccess(res?.payload));
    dispatch(showSession(true));
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};

export const logoutFunction = () => async (dispatch) => {
  dispatch(clearStore());
};

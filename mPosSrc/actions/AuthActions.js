import { TYPES } from '@mPOS/Types/Types';
import { AuthController } from '@mPOS/controllers';

const verifyPhoneRequest = () => ({
  type: TYPES.VERIFY_PHONE_REQUEST,
  payload: null,
});

const savePhone = (phone) => ({
  type: TYPES.SAVE_PHONE,
  payload: phone,
});

const verifyPhoneError = (error) => ({
  type: TYPES.VERIFY_PHONE_ERROR,
  payload: { error },
});

const verifyPhoneSuccess = (otp) => ({
  type: TYPES.VERIFY_PHONE_SUCCESS,
  payload: { otp },
});

const merchantLoginRequest = () => ({
  type: TYPES.MERCHANT_LOGIN_REQUEST,
  payload: null,
});
const merchantLoginError = (error) => ({
  type: TYPES.MERCHANT_LOGIN_ERROR,
  payload: { error },
});
export const merchantLoginSuccess = (merchantLoginData) => ({
  type: TYPES.MERCHANT_LOGIN_SUCCESS,
  payload: { merchantLoginData },
});

const getAllPosUsersRequest = () => ({
  type: TYPES.GET_ALL_POS_USERS_REQUEST,
  payload: null,
});

const getAllPosUsersError = (error) => ({
  type: TYPES.GET_ALL_POS_USERS_ERROR,
  payload: { error },
});

const getAllPosUsersSuccess = (getAllPosUsers) => ({
  type: TYPES.GET_ALL_POS_USERS_SUCCESS,
  payload: { getAllPosUsers },
});
const getAllPosUsersReset = () => ({
  type: TYPES.GET_ALL_POS_USERS_RESET,
  payload: null,
});

const clearStore = () => ({
  type: TYPES.MERCHAT_CLEAR_STORE,
  payload: null,
});

export const verifyPhone = (data) => async (dispatch) => {
  dispatch(verifyPhoneRequest());
  try {
    dispatch(savePhone({ data }));
    const res = await AuthController.verifyPhone(data);
    dispatch(verifyPhoneSuccess(res));
  } catch (error) {
    dispatch(verifyPhoneError(error.message));
  }
};

export const merchantLogin = (data) => async (dispatch) => {
  dispatch(merchantLoginRequest());
  try {
    const res = await AuthController.merchantLogin(data);
    return dispatch(merchantLoginSuccess(res?.payload));
  } catch (error) {
    return dispatch(merchantLoginError(error));
  }
};

export const getAllPosUsers = (data) => async (dispatch) => {
  dispatch(getAllPosUsersRequest());
  try {
    const res = await AuthController.getAllPosUsers(data);
    dispatch(getAllPosUsersSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAllPosUsersReset());
    }
    dispatch(getAllPosUsersError(error.message));
    return error;
  }
};

export const logoutFunction = () => async (dispatch) => {
  dispatch(clearStore());
};

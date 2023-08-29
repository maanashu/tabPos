import { NAVIGATION } from '@/constants';
import { AuthController } from '@/controllers/AuthController';
import { navigate } from '@/navigation/NavigationRef';
import { TYPES } from '@/Types/Types';

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

const loginPosUserRequest = () => ({
  type: TYPES.LOGIN_POS_USER_REQUEST,
  payload: null,
});
const loginPosUserError = (error) => ({
  type: TYPES.LOGIN_POS_USER_ERROR,
  payload: { error },
});
const loginPosUserSuccess = (user) => ({
  type: TYPES.LOGIN_POS_USER_SUCCESS,
  payload: { user },
});

const getProfileRequest = () => ({
  type: TYPES.GET_PROFILE_REQUEST,
  payload: null,
});
const getProfileError = (error) => ({
  type: TYPES.GET_PROFILE_ERROR,
  payload: { error },
});
const getProfileSuccess = (getProfile) => ({
  type: TYPES.GET_PROFILE_SUCCESS,
  payload: { getProfile },
});

const registerRequest = () => ({
  type: TYPES.REGISTER_REQUEST,
  payload: null,
});

const registerError = (error) => ({
  type: TYPES.REGISTER_ERROR,
  payload: { error },
});

const registerSuccess = (register) => ({
  type: TYPES.REGISTER_SUCCESS,
  payload: { register },
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

export const verifyPhone = (phoneNumber, countryCode) => async (dispatch) => {
  dispatch(verifyPhoneRequest());
  try {
    dispatch(savePhone({ phoneNumber, countryCode }));
    const res = await AuthController.verifyPhone(phoneNumber, countryCode);
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

export const getProfile = (id) => async (dispatch) => {
  dispatch(getProfileRequest());
  try {
    const res = await AuthController.getProfile(id);
    dispatch(getProfileSuccess(res));
  } catch (error) {
    dispatch(getProfileError(error.message));
  }
};

export const register = (data, params) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const res = await AuthController.register(data, params);
    dispatch(registerSuccess(res));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

export const getAllPosUsers = (sellerID, search) => async (dispatch) => {
  dispatch(getAllPosUsersRequest());
  try {
    const res = await AuthController.getAllPosUsers(sellerID, search);
    dispatch(getAllPosUsersSuccess(res?.payload?.pos_staff));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAllPosUsersReset());
    }
    dispatch(getAllPosUsersError(error.message));
  }
};

export const logoutFunction = () => async (dispatch) => {
  dispatch(clearStore());
};

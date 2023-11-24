import { AuthController } from '@/controllers/AuthController';
import { store } from '@/store';
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

const changePinError = (error) => ({
  type: TYPES.CHANGE_PIN_ERROR,
  payload: { error },
});

const changePinSuccess = (otp) => ({
  type: TYPES.CHANGE_PIN_SUCCESS,
  payload: { otp },
});

const changePinRequest = () => ({
  type: TYPES.CHANGE_PIN_REQUEST,
  payload: null,
});

const verifyOldPinError = (error) => ({
  type: TYPES.VERIFY_OLD_PIN_ERROR,
  payload: { error },
});

const verifyOldSuccess = (otp) => ({
  type: TYPES.VERIFY_OLD_PIN_SUCCESS,
  payload: { otp },
});

const verifyOldRequest = () => ({
  type: TYPES.VERIFY_OLD_PIN_REQUEST,
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
const getAllPosUsersPageRequest = () => ({
  type: TYPES.GET_ALL_POS_USERS_PAGE,
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

export const changePin = (bodyParam) => async (dispatch) => {
  dispatch(changePinRequest());
  try {
    const res = await AuthController.changePin(bodyParam);
    dispatch(changePinSuccess(res));
    return res;
  } catch (error) {
    dispatch(changePinError(error.message));
    return res;
  }
};
export const verifyOldPin = (pin) => async (dispatch) => {
  dispatch(verifyOldRequest());
  try {
    const res = await AuthController.verifyOldPin(pin);
    console.log('asdasdasdadewqw', res);
    dispatch(verifyOldSuccess(res));
    return res;
  } catch (error) {
    dispatch(verifyOldPinError(error.msg));
    return error;
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
    let user = store.getState().user?.posLoginData?.id;
    const res = await AuthController.getProfile(id || user);
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

export const getAllPosUsers = (data, search) => async (dispatch, getState) => {
  data.page == 1 ? dispatch(getAllPosUsersRequest()) : dispatch(getAllPosUsersPageRequest());
  try {
    const state = getState();
    const res = await AuthController.getAllPosUsers(data, search);
    if (data.page == 1) {
      dispatch(getAllPosUsersSuccess(res?.payload));
    } else {
      const { current_page, total_pages, pos_staff } = res?.payload;
      const storeData = { ...state.auth.getAllPosUsersData };
      storeData.current_page = current_page;
      storeData.total_pages = total_pages;
      storeData.pos_staff = [...storeData.pos_staff, ...pos_staff];
      dispatch(getAllPosUsersSuccess(storeData));
    }
    return res.payload;
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

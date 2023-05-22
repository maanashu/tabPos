import { NAVIGATION } from '@/constants';
import { AuthController } from '@/controllers/AuthController';
import { navigate } from '@/navigation/NavigationRef';
import { TYPES } from '@/Types/Types';

const verifyPhoneRequest = () => ({
  type: TYPES.VERIFY_PHONE_REQUEST,
  payload: null,
});

const savePhone = phone => ({
  type: TYPES.SAVE_PHONE,
  payload: phone,
});

const verifyPhoneError = error => ({
  type: TYPES.VERIFY_PHONE_ERROR,
  payload: { error },
});

const verifyPhoneSuccess = otp => ({
  type: TYPES.VERIFY_PHONE_SUCCESS,
  payload: { otp },
});

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});
const loginError = error => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});
const loginSuccess = user => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginPosUserRequest = () => ({
  type: TYPES.LOGIN_POS_USER_REQUEST,
  payload: null,
});
const loginPosUserError = error => ({
  type: TYPES.LOGIN_POS_USER_ERROR,
  payload: { error },
});
const loginPosUserSuccess = user => ({
  type: TYPES.LOGIN_POS_USER_SUCCESS,
  payload: { user },
});

const getProfileRequest = () => ({
  type: TYPES.GET_PROFILE_REQUEST,
  payload: null,
});
const getProfileError = error => ({
  type: TYPES.GET_PROFILE_ERROR,
  payload: { error },
});
const getProfileSuccess = getProfile => ({
  type: TYPES.GET_PROFILE_SUCCESS,
  payload: { getProfile },
});

const registerRequest = () => ({
  type: TYPES.REGISTER_REQUEST,
  payload: null,
});

const registerError = error => ({
  type: TYPES.REGISTER_ERROR,
  payload: { error },
});

const registerSuccess = register => ({
  type: TYPES.REGISTER_SUCCESS,
  payload: { register },
});

const getAllPosUsersRequest = () => ({
  type: TYPES.GET_ALL_POS_USERS_REQUEST,
  payload: null,
});

const getAllPosUsersError = error => ({
  type: TYPES.GET_ALL_POS_USERS_ERROR,
  payload: { error },
});

const getAllPosUsersSuccess = getAllPosUsers => ({
  type: TYPES.GET_ALL_POS_USERS_SUCCESS,
  payload: { getAllPosUsers },
});
const getAllPosUsersReset = () => ({
  type: TYPES.GET_ALL_POS_USERS_RESET,
  payload: null,
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const verifyPhone = (phoneNumber, countryCode) => async dispatch => {
  dispatch(verifyPhoneRequest());
  try {
    dispatch(savePhone({ phoneNumber, countryCode }));
    const res = await AuthController.verifyPhone(phoneNumber, countryCode);
    dispatch(verifyPhoneSuccess(res));
  } catch (error) {
    dispatch(verifyPhoneError(error.message));
  }
};

export const login = data => async dispatch => {
  dispatch(loginRequest());
  try {
    const res = await AuthController.login(data);
    return dispatch(loginSuccess(res));
  } catch (error) {
    return dispatch(loginError(error));
  }
};

export const loginPosUser = (data, callback) => async dispatch => {
  dispatch(loginPosUserRequest());
  try {
    const res = await AuthController.loginPosUser(data);
    dispatch(loginPosUserSuccess(res));
    callback && callback(res);
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};
export const getProfile = id => async dispatch => {
  dispatch(getProfileRequest());
  try {
    const res = await AuthController.getProfile(id);
    dispatch(getProfileSuccess(res));
  } catch (error) {
    dispatch(getProfileError(error.message));
  }
};

export const register = (data, params) => async dispatch => {
  dispatch(registerRequest());
  try {
    const res = await AuthController.register(data, params);
    dispatch(registerSuccess(res));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

export const getAllPosUsers = () => async dispatch => {
  dispatch(getAllPosUsersRequest());
  try {
    const res = await AuthController.getAllPosUsers();
    dispatch(getAllPosUsersSuccess(res?.payload?.users));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAllPosUsersReset());
    }
    dispatch(getAllPosUsersError(error.message));
  }
};

export const logoutFunction = () => async dispatch => {
  dispatch(clearStore());
  navigate(NAVIGATION.verifyPhone);
};

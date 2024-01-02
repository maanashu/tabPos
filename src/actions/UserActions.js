import { UserController } from '@/controllers/UserController';
import { TYPES } from '@/Types/Types';
import { getSettings } from './SettingAction';
import { getProfile } from './AuthActions';
import { store } from '@/store';

const loginPosUserRequest = () => ({
  type: TYPES.LOGIN_POS_USER_REQUEST,
  payload: null,
});
const loginPosUserError = (error) => ({
  type: TYPES.LOGIN_POS_USER_ERROR,
  payload: { error },
});
export const loginPosUserSuccess = (posLoginData) => ({
  type: TYPES.LOGIN_POS_USER_SUCCESS,
  payload: { posLoginData },
});

const deviceRegisterRequest = () => ({
  type: TYPES.DEVICE_REGISTER_REQUEST,
  payload: null,
});
const deviceRegisterError = (error) => ({
  type: TYPES.DEVICE_REGISTER_ERROR,
  payload: { error },
});
const deviceRegisterSuccess = (deviceReg) => ({
  type: TYPES.DEVICE_REGISTER_SUCCESS,
  payload: { deviceReg },
});

const updateBioMetricPreferenceRequest = () => ({
  type: TYPES.UNREGISTER_DEVICE_REQUEST,
  payload: null,
});
const updateBioMetricPreferenceError = (error) => ({
  type: TYPES.UNREGISTER_DEVICE_ERROR,
  payload: { error },
});
const updateBioMetricPreferenceSuccess = (is_biometric) => ({
  type: TYPES.UNREGISTER_DEVICE_SUCCESS,
  payload: { is_biometric },
});

const verifyPinRequest = () => ({
  type: TYPES.VERIFY_PIN_REQUEST,
  payload: null,
});

const verifyPinError = (error) => ({
  type: TYPES.VERIFY_PIN_ERROR,
  payload: { error },
});

const verifyPinSuccess = (verifyPin) => ({
  type: TYPES.VERIFY_PIN_SUCCESS,
  payload: { verifyPin },
});

const changeOldPinRequest = () => ({
  type: TYPES.CHANGE_OLD_PIN_REQUEST,
  payload: null,
});

const changeOldPinError = (error) => ({
  type: TYPES.CHANGE_OLD_PIN_ERROR,
  payload: { error },
});

const changeOldPinSuccess = (changedOldPin) => ({
  type: TYPES.CHANGE_OLD_PIN_SUCCESS,
  payload: { changedOldPin },
});

export const saveDefaultScreen = (defaultScreen) => ({
  type: TYPES.SAVE_DEFAULT_SCREEN,
  payload: { defaultScreen },
});

const clearStore = () => ({
  type: TYPES.POS_USER_CLEAR_STORE,
  payload: null,
});

export const loginPosUser = (data) => async (dispatch) => {
  // dispatch(loginPosUserRequest());
  try {
    const res = await UserController.loginPosUser(data);
    // dispatch(loginPosUserSuccess(res?.payload));
    // dispatch(getSettings());
    // dispatch(getProfile(res?.payload?.id));
    return res?.payload;
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};
export const loginPosUserMPOS = (data) => async (dispatch) => {
  dispatch(loginPosUserRequest());
  try {
    const res = await UserController.loginPosUser(data);

    return res?.payload;
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};

export const deviceLogin = (id) => async (dispatch) => {
  dispatch(loginPosUserRequest());
  try {
    const res = await UserController.deviceLogin(id);
    dispatch(loginPosUserSuccess(res?.payload));
    dispatch(getSettings());
    dispatch(getProfile(res?.payload?.id));
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};

export const deviceRegister = () => async (dispatch) => {
  dispatch(deviceRegisterRequest());
  try {
    const res = await UserController.deviceRegister();
    dispatch(deviceRegisterSuccess());
    dispatch(getProfile());
    return;
  } catch (error) {
    dispatch(deviceRegisterError(error.message));
    throw error;
  }
};

export const updateBioMetricLoginPreference = () => async (dispatch) => {
  dispatch(updateBioMetricPreferenceRequest());
  try {
    const res = await UserController.updateBioMetricLoginPreference();
    dispatch(updateBioMetricPreferenceSuccess());
    dispatch(getProfile());
  } catch (error) {
    dispatch(updateBioMetricPreferenceError(error.message));
  }
};

export const verifyPin = (pin, callback) => async (dispatch) => {
  dispatch(verifyPinRequest());
  try {
    const res = await UserController.verifyPin(pin);
    dispatch(verifyPinSuccess(res));
    callback && callback();
  } catch (error) {
    dispatch(verifyPinError(error.message));
  }
};

export const changeOldPin = (data) => async (dispatch) => {
  dispatch(changeOldPinRequest());
  try {
    const res = await UserController.changeOldPin(data);
    dispatch(changeOldPinSuccess(res));
    dispatch(getProfile());
    return;
  } catch (error) {
    dispatch(changeOldPinError(error.message));
    throw error;
  }
};

export const logoutUserFunction = () => async (dispatch) => {
  dispatch(clearStore());
};

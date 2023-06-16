import { SettingController } from '@/controllers';
import { TYPES } from '@/Types/SettingTypes';

const getSettingRequest = () => ({
  type: TYPES.GET_SETTING_REQUEST,
  payload: null,
});
const getSettingSuccess = getSetting => ({
  type: TYPES.GET_SETTING_SUCCESS,
  payload: { getSetting },
});
const getSettingError = error => ({
  type: TYPES.GET_SETTING_ERROR,
  payload: { error },
});
const getShippingServiceReset = () => ({
  type: TYPES.GET_SHIPSERVICE_RESET,
  payload: null,
});

const upadteApiRequest = () => ({
  type: TYPES.UPDATE_API_REQUEST,
  payload: null,
});
const upadteApiSuccess = getSetting => ({
  type: TYPES.UPDATE_API_SUCCESS,
  payload: { getSetting },
});
const upadteApiError = error => ({
  type: TYPES.UPDATE_API_ERROR,
  payload: { error },
});

const getShippingPickupRequest = () => ({
  type: TYPES.GET_SHIPPICK_REQUEST,
  payload: null,
});
const getShippingPickupSuccess = getShippingPickup => ({
  type: TYPES.GET_SHIPPICK_SUCCESS,
  payload: { getShippingPickup },
});
const getShippingPickupError = error => ({
  type: TYPES.GET_SHIPPICK_ERROR,
  payload: { error },
});

const addressUpdateByIdRequest = () => ({
  type: TYPES.ADDRESS_UPDATE_REQUEST,
  payload: null,
});
const addressUpdateByIdSuccess = () => ({
  type: TYPES.ADDRESS_UPDATE_SUCCESS,
  payload: null,
});
const addressUpdateByIdError = error => ({
  type: TYPES.ADDRESS_UPDATE_ERROR,
  payload: { error },
});

const getUserAddressRequest = () => ({
  type: TYPES.GET_USER_ADD_REQUEST,
  payload: null,
});
const getUserAddressSuccess = getUserAddress => ({
  type: TYPES.GET_USER_ADD_SUCCESS,
  payload: { getUserAddress },
});
const getUserAddressError = error => ({
  type: TYPES.GET_USER_ADD_ERROR,
  payload: { error },
});
const getUserAddressReset = () => ({
  type: TYPES.GET_USER_ADD_RESET,
  payload: null,
});

export const getSettings = () => async dispatch => {
  dispatch(getSettingRequest());
  try {
    const res = await SettingController.getSetting();
    dispatch(getSettingSuccess(res?.payload));
  } catch (error) {
    dispatch(getSettingError(error.message));
  }
};

export const upadteApi = data => async dispatch => {
  dispatch(upadteApiRequest());
  try {
    const res = await SettingController.upadteApi(data);
    dispatch(upadteApiSuccess(res));
    dispatch(getSettings());
  } catch (error) {
    dispatch(upadteApiError(error.message));
  }
};

export const getShippingPickup = () => async dispatch => {
  dispatch(getShippingPickupRequest());
  try {
    const res = await SettingController.getShippingPickup();
    dispatch(getShippingPickupSuccess(res?.payload));
  } catch (error) {
    dispatch(getShippingPickupError(error.message));
  }
};

export const addressUpdateById = body => async dispatch => {
  dispatch(addressUpdateByIdRequest());
  try {
    const res = await SettingController.addressUpdateById(body);
    dispatch(addressUpdateByIdSuccess(res));
    dispatch(getShippingPickup());
  } catch (error) {
    dispatch(addressUpdateByIdError(error.message));
  }
};

export const getUserAddress = () => async dispatch => {
  dispatch(getUserAddressRequest());
  try {
    const res = await SettingController.getUserAddress();
    dispatch(getUserAddressSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getUserAddressReset());
    }
    dispatch(getUserAddressError(error.message));
  }
};

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

const getCountriesRequest = () => ({
  type: TYPES.GET_COUNTRIES_REQUEST,
  payload: null,
});
const getCountriesSuccess = getCountries => ({
  type: TYPES.GET_COUNTRIES_SUCCESS,
  payload: { getCountries },
});
const getCountriesError = error => ({
  type: TYPES.GET_COUNTRIES_ERROR,
  payload: { error },
});
const getCountriesReset = () => ({
  type: TYPES.GET_COUNTRIES_RESET,
  payload: null,
});

const getStateRequest = () => ({
  type: TYPES.GET_STATE_REQUEST,
  payload: null,
});
const getStateSuccess = getState => ({
  type: TYPES.GET_STATE_SUCCESS,
  payload: { getState },
});
const getStateError = error => ({
  type: TYPES.GET_STATE_ERROR,
  payload: { error },
});
const getStateReset = () => ({
  type: TYPES.GET_STATE_RESET,
  payload: null,
});

const staffDetailRequest = () => ({
  type: TYPES.STAFF_DETAIL_REQUEST,
  payload: null,
});
const staffDetailSuccess = staffDetail => ({
  type: TYPES.STAFF_DETAIL_SUCCESS,
  payload: { staffDetail },
});
const staffDetailError = error => ({
  type: TYPES.STAFF_DETAIL_ERROR,
  payload: { error },
});
const staffDetailReset = () => ({
  type: TYPES.STAFF_DETAIL_RESET,
  payload: null,
});

const getTaxRequest = () => ({
  type: TYPES.GET_TAX_REQUEST,
  payload: null,
});
const getTaxSuccess = getTax => ({
  type: TYPES.GET_TAX_SUCCESS,
  payload: { getTax },
});
const getTaxError = error => ({
  type: TYPES.GET_TAX_ERROR,
  payload: { error },
});
const getTaxReset = () => ({
  type: TYPES.GET_TAX_RESET,
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

export const getCountries = () => async dispatch => {
  dispatch(getCountriesRequest());
  try {
    const res = await SettingController.getCountries();
    dispatch(getCountriesSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getCountriesReset());
    }
    dispatch(getCountriesError(error.message));
  }
};
export const getState = id => async dispatch => {
  dispatch(getStateRequest());
  try {
    const res = await SettingController.getState(id);
    dispatch(getStateSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getStateReset());
    }
    dispatch(getStateError(error.message));
  }
};

export const getStaffDetail = () => async dispatch => {
  dispatch(staffDetailRequest());
  try {
    const res = await SettingController.staffDetail();
    return dispatch(staffDetailSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(staffDetailReset());
    }
    dispatch(staffDetailError(error.message));
  }
};
export const getTax = data => async dispatch => {
  dispatch(getTaxRequest());
  try {
    const res = await SettingController.getTax(data);
    return dispatch(getTaxSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTaxReset());
    }
    dispatch(getTaxError(error.message));
  }
};

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

export const getSettings = () => async dispatch => {
  dispatch(getSettingRequest());
  try {
    const res = await SettingController.getSetting();
    dispatch(getSettingSuccess(res?.payload));
    console.log('getSettingsres?.payload', res?.payload);
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

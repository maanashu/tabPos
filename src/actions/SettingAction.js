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

export const getSetting = () => async dispatch => {
  dispatch(getSettingRequest());
  try {
    const res = await SettingController.getSetting();
    console.log('res', res);
    dispatch(getSettingSuccess(res));
  } catch (error) {
    dispatch(getSettingError(error.message));
  }
};

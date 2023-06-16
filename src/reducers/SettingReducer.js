import { TYPES } from '@/Types/SettingTypes';

const INITIALSTATE = {
  getSetting: {},
  getShippingPickup: [],
  getUserAddress: [],
  getCountries: [],
  getState: [],
};

export const settingReducer = (state = { INITIALSTATE }, { payload, type }) => {
  switch (type) {
    case TYPES.GET_SETTING_SUCCESS:
      return {
        ...state,
        getSetting: payload.getSetting,
      };
    case TYPES.GET_SHIPPICK_SUCCESS:
      return {
        ...state,
        getShippingPickup: payload.getShippingPickup,
      };

    case TYPES.GET_USER_ADD_SUCCESS:
      return {
        ...state,
        getUserAddress: payload.getUserAddress,
      };
    case TYPES.GET_USER_ADD_RESET:
      return {
        ...state,
        getUserAddress: [],
      };

    case TYPES.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        getCountries: payload.getCountries,
      };
    case TYPES.GET_COUNTRIES_RESET:
      return {
        ...state,
        getCountries: [],
      };

    case TYPES.GET_STATE_SUCCESS:
      return {
        ...state,
        getState: payload.getState,
      };
    case TYPES.GET_STATE_RESET:
      return {
        ...state,
        getState: [],
      };
    default:
      return state;
  }
};

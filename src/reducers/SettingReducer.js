import { TYPES } from '@/Types/SettingTypes';

const INITIALSTATE = {
  getSetting: {},
  getShippingPickup: [],
  getUserAddress: [],
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
    default:
      return state;
  }
};

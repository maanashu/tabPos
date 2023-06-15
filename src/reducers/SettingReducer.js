import { TYPES } from '@/Types/SettingTypes';

const INITIALSTATE = {
  getSetting: {},
  getShippingPickup: [],
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

    default:
      return state;
  }
};

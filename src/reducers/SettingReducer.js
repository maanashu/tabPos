import { TYPES } from '@/Types/SettingTypes';

const INITIALSTATE = {
  getShippingService: [],
};

export const settingReducer = (state = { INITIALSTATE }, { payload, type }) => {
  switch (type) {
    case TYPES.GET_SHIPSERVICE_SUCCESS:
      return {
        ...state,
        getShippingService: payload.getShippingService,
      };
    case TYPES.GET_SHIPSERVICE_RESET:
      return {
        ...state,
        getShippingService: [],
      };

    default:
      return state;
  }
};

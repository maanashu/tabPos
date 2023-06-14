import { TYPES } from '@/Types/SettingTypes';

const INITIALSTATE = {
  getSetting: {},
};

export const settingReducer = (state = { INITIALSTATE }, { payload, type }) => {
  switch (type) {
    case TYPES.GET_SETTING_SUCCESS:
      return {
        ...state,
        getSetting: payload.getSetting,
      };

    default:
      return state;
  }
};

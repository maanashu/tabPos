import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  posLoginData: {},
  pendingOrders: {},
  defaultScreen: false,
};

export const userReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_POS_USER_SUCCESS:
      return {
        ...state,
        posLoginData: payload.posLoginData,
      };
    case TYPES.SAVE_DEFAULT_SCREEN:
      return {
        ...state,
        defaultScreen: payload.defaultScreen,
      };
    case TYPES.POS_USER_CLEAR_STORE:
      return INITIALSTATE;
    default:
      return state;
  }
};

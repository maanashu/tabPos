import { TYPES } from '@mPOS/Types/Types';

const INITIALSTATE = {
  posLoginData: {},
  showSession: false,
};

export const userReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_POS_SUCCESS:
      return {
        ...state,
        posLoginData: payload?.posLoginData,
      };
    case TYPES.SHOW_SESSION:
      return {
        ...state,
        showSession: true,
      };
    case TYPES.CLEAR_STORE:
      return INITIALSTATE;
    default:
      return state;
  }
};

import { TYPES } from '@mPOS/Types/Types';

const INITIALSTATE = {
  phoneData: {},
  merchantLoginData: {},
  getProfile: {},
  getAllPosUsers: [],
};

export const authReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.SAVE_PHONE:
      return {
        ...state,
        phoneData: payload,
      };
    case TYPES.MERCHANT_LOGIN_SUCCESS:
      return {
        ...state,
        merchantLoginData: payload?.merchantLoginData,
      };
    case TYPES.GET_ALL_POS_USERS_SUCCESS:
      return {
        ...state,
        getAllPosUsers: payload?.getAllPosUsers?.pos_staff,
      };
    case TYPES.GET_ALL_POS_USERS_RESET:
      return {
        ...state,
        getAllPosUsers: [],
      };
    case TYPES.MERCHAT_CLEAR_STORE:
      return {};
    default:
      return state;
  }
};

import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  phoneData: {},
  user: {},
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
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        getProfile: payload.getProfile.payload,
      };
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user.payload,
      };
    case TYPES.LOGIN_POS_USER_SUCCESS:
      return {
        ...state,
        posUserData: payload.user.payload,
      };

    case TYPES.GET_ALL_POS_USERS_SUCCESS:
      return {
        ...state,
        getAllPosUsers: payload.getAllPosUsers,
      };

    case TYPES.GET_ALL_POS_USERS_RESET:
      return {
        ...state,
        getAllPosUsers: [],
      };

    case TYPES.CLEAR_STORE:
      return INITIALSTATE;
    default:
      return state;
  }
};

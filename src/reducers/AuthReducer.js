import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  phoneData:{},
  user:{},
  getProfile:{}
 
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
     
    case TYPES.CLEAR_STORE:
      return INITIALSTATE;
    default:
      return state;
  }
};

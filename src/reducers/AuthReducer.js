import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
 
};

export const authReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.SAVE_PHONE:
      return {
        ...state,
        phoneData: payload,
      };
   
    case TYPES.GET_STATE_SUCCESS:
      return {
        ...state,
        stateList: payload.stateList.payload.data,
      };
    case TYPES.GET_CITIES_SUCCESS:
      return {
        ...state,
        citiesList: payload.citiesList.payload.data,
      };
    case TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        registered: payload.register.payload,
      };
      case TYPES.PERSONALINFORMATION_SUCCESS:
     
    case TYPES.CLEAR_STORE:
      return INITIALSTATE;
    default:
      return state;
  }
};

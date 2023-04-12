
import { TYPES } from '@/Types/CashtrackingTypes';

const INITIALSTATE = {
  getDrawerSession:{}
};

export const cashTrackingReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
    case TYPES.GET_DRAWER_SESSION_SUCCESS:
      return {
        ...state,
        getDrawerSession: payload.getDrawerSession,
      };
    


    default:
      return state;
  }
};

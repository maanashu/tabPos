
import { TYPES } from '@/Types/CashtrackingTypes';

const INITIALSTATE = {
  getDrawerSession:{},
  getSessionHistory:[]
};

export const cashTrackingReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
    case TYPES.GET_DRAWER_SESSION_SUCCESS:
      return {
        ...state,
        getDrawerSession: payload.getDrawerSession,
      };

      case TYPES.GET_SESSION_HISTORY_SUCCESS:
        return {
          ...state,
          getSessionHistory: payload.getSessionHistory,
        };
      
    


    default:
      return state;
  }
};

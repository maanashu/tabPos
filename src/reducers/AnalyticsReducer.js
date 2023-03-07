
import { TYPES } from '@/Types/AnalyticsTypes';

const INITIALSTATE = {
  getTotalGraph:{},
  getOrderGraph:{},
  getInventeryGraph:{},
  getRevenueGraph:{}
 
  
  
  
};

export const analyticsReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
    case TYPES.GET_TOTAL_GRAPH_SUCCESS:
      return {
        ...state,
        getTotalGraph: payload.getTotalGraph.payload,
      };
      case TYPES.GET_ORDER_GRAPH_SUCCESS:
        return {
          ...state,
          getOrderGraph: payload.getOrderGraph.payload,
        };
        case TYPES.GET_INVENTERY_GRAPH_SUCCESS:
          return {
            ...state,
            getInventeryGraph: payload.getInventeryGraph.payload,
          };
          case TYPES.GET_REVENUE_GRAPH_SUCCESS:
            return {
              ...state,
              getRevenueGraph: payload.getRevenueGraph.payload,
            };
    


    default:
      return state;
  }
};

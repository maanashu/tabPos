
import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  getOrderCount:{},
  orderList:[],
  getorderList:{}
  
  
};

export const deliveryReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
    case TYPES.GET_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        getOrderCount: payload.getOrderCount.payload.status_count,
      };
      case TYPES.GET_ORDER_SUCCESS:
        return {
          ...state,
          orderList: payload.orderList.payload.data,
        };
        case TYPES.GET_ORDER_LIST_SUCCESS:
          return {
            ...state,
            getorderList: payload.getorderList.payload,
          };

    
        
        
    default:
      return state;
  }
};

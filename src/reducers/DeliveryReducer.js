
import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  orderList:{},
  getorderList:{}
  
  
};

export const deliveryReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
      case TYPES.GET_ORDER_SUCCESS:
        return {
          ...state,
          orderList: payload.orderList.payload,
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

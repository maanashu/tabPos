
import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  orderList:{},
  
  
};

export const deliveryReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
      case TYPES.GET_ORDER_SUCCESS:
        return {
          ...state,
          orderList: payload.orderList.payload,
        };

    
        
        
    default:
      return state;
  }
};

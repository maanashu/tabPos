
import { TYPES } from '@/Types/CustomersTypes';

const INITIALSTATE = {
  getUserOrder:{},
  getOrderUser:[]
 
  
  
  
};

export const customersReducer = (state = {INITIALSTATE}, { payload, type }) => {
  // console.log('payload',payload);
  switch (type) {
    case TYPES.GET_USER_ORDER_SUCCESS:
      return {
        ...state,
        getUserOrder: payload.getUserOrder.payload.data,
      };
      case TYPES.GET_ORDER_USER_SUCCESS:
        return {
          ...state,
          getOrderUser: payload.getOrderUser.payload.data,
        };
        case TYPES.GET_ORDER_USER_RESET:
          return {
            ...state,
            getOrderUser: [],
          };
   
    
        
        
    default:
      return state;
  }
};


import { TYPES } from '@/Types/DeliveringOrderTypes';

const INITIALSTATE = {
  getOrderCount:{},
  orderList:[],
  getReviewDef:[],
  getorderList:{},
  deliveryOrd:{}
  
};

export const deliveryReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
    case TYPES.GET_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        getOrderCount: payload.getOrderCount.payload.status_count,
      };
      case TYPES.GET_REVIEW_DEF_SUCCESS:
        return {
          ...state,
          getReviewDef: payload.getReviewDef.payload.data,
        };
        case TYPES.GET_REVIEW_DEF_RESET:
          return {
            ...state,
            getReviewDef:[],
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
          case TYPES.DELIVERY_ORDER_SUCCESS:
            return {
              ...state,
              deliveryOrd: payload.deliveryOrd,
            };
            case TYPES.DELIVERY_ORDER_RESET:
              return {
                ...state,
                deliveryOrd:[],
              };

    
        
        // case TYPES.CLEAR_STORE :
        // return INITIALSTATE
        
    default:
      return state;
  }
};

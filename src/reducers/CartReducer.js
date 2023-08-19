import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  cartLength:0,
  localCartArray:[]
};

export const cartReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.UPDATE_CART_LENGTH_REQUEST:
      return {
        ...state,
        cartLength: payload,
      };
      case TYPES.ADD_LOCAL_CART_SUCCESS:
      return {
        ...state,
        localCartArray: payload,
      };
      case TYPES.CLEAR_LOCAL_CART_SUCCESS:
      return {
        ...state,
        localCartArray: [],
      };

    default:
      return state;
  }
};

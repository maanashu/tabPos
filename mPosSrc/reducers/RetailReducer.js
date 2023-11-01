import { RETAIL_TYPES } from '@mPOS/Types/RetailTypes';

const INITIALSTATE = {
  getProduct: {},
  getOneProduct: {},
  productCart: {},
};

export const retailReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case RETAIL_TYPES.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        getProduct: payload?.getProduct,
      };
    case RETAIL_TYPES.GET_PRODUCT_RESET:
      return {
        ...state,
        getProduct: {},
      };

    case RETAIL_TYPES.GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        getOneProduct: payload?.getOneProduct,
      };
    case RETAIL_TYPES.GET_ONE_PRODUCT_RESET:
      return {
        ...state,
        getOneProduct: {},
      };

    case RETAIL_TYPES.GET_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        productCart: payload?.productCart,
      };
    case RETAIL_TYPES.GET_PRODUCT_CART_RESET:
      return {
        ...state,
        productCart: {},
      };

    default:
      return state;
  }
};

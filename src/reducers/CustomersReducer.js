import { TYPES } from '@/Types/CustomersTypes';

const INITIALSTATE = {
  getUserOrder: {},
  getOrderUser: [],
  getCustomers: {},
};

export const customersReducer = (state = INITIALSTATE, { payload, type }) => {
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
    case TYPES.GET_USER_ORDER_RESET:
      return {
        ...state,
        getUserOrder: [],
      };
    case TYPES.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        getCustomers: payload.getCustomers,
      };

    default:
      return state;
  }
};

import { TYPES } from '@/Types/CustomersTypes';

const INITIALSTATE = {
  getUserOrder: {},
  getOrderUser: {},
  getCustomers: {},
  getAcceptMarketing: {},
};

export const customersReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_USER_ORDER_SUCCESS:
      return {
        ...state,
        getUserOrder: payload.getUserOrder,
      };
    case TYPES.GET_USER_ORDER_RESET:
      return {
        ...state,
        getUserOrder: {},
      };
    case TYPES.GET_ORDER_USER_SUCCESS:
      return {
        ...state,
        getOrderUser: payload.getOrderUser.payload,
      };
    case TYPES.GET_ORDER_USER_RESET:
      return {
        ...state,
        getOrderUser: {},
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
    case TYPES.GET_ACCEPTMARKETING_SUCCESS:
      return {
        ...state,
        getAcceptMarketing: payload.getAcceptMarketing,
      };
    case TYPES.GET_ACCEPTMARKETING_RESET:
      return {
        ...state,
        getAcceptMarketing: {},
      };

    default:
      return state;
  }
};

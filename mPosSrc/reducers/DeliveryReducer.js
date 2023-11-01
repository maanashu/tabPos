import { DELIVERY_TYPES } from '@mPOS/Types/DeliveryTypes';

const INITIALSTATE = {
  todayOrderStatus: {},
  deliveryTypesOrders: [],
  orders: [],
  graphOrders: {},
  getOrderstatistics: [],
  getOrderCount: {},
};

export const deliveryReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case DELIVERY_TYPES.TODAY_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        todayOrderStatus: payload?.orderStatus,
      };
    case DELIVERY_TYPES.GET_DELIVERY_TYPES_ORDERS_SUCCESS:
      return {
        ...state,
        deliveryTypesOrders: payload?.deliveryType,
      };
    case DELIVERY_TYPES.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload?.orders,
      };
    case DELIVERY_TYPES.GET_ORDERS_RESET:
      return {
        ...state,
        orders: [],
      };
    case DELIVERY_TYPES.GET_GRAPH_ORDERS_SUCCESS:
      return {
        ...state,
        graphOrders: payload?.graphOrders,
      };
    case DELIVERY_TYPES.GET_ORDER_STATISTICS_SUCCESS:
      return {
        ...state,
        getOrderstatistics: payload?.getOrderstatistics,
      };
    case DELIVERY_TYPES.GET_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        getOrderCount: payload?.getOrderCount?.status_count,
      };
    default:
      return state;
  }
};

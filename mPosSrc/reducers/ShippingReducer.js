import { SHIPPING_TYPES } from '@mPOS/Types/ShippingTypes';

const INITIALSTATE = {
  todayShippingStatus: {},
  todayCurrentStatus: [],
  orders: [],
  getOrderCount: {},
  graphOrders: {},
  getOrderstatistics: [],
  orderDetail: {},
};

export const shippingReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case SHIPPING_TYPES.TODAY_SHIPPING_STATUS_SUCCESS:
      return {
        ...state,
        todayShippingStatus: payload?.todayShippingStatus,
      };
    case SHIPPING_TYPES.TODAY_CURRENT_STATUS_SUCCESS:
      return {
        ...state,
        todayCurrentStatus: payload?.todayCurrentStatus,
      };
    case SHIPPING_TYPES.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload?.orders,
      };
    case SHIPPING_TYPES.GET_ORDERS_RESET:
      return {
        ...state,
        orders: [],
      };
    case SHIPPING_TYPES.GET_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        getOrderCount: payload?.getOrderCount?.status_count,
      };
    case SHIPPING_TYPES.GET_GRAPH_ORDERS_SUCCESS:
      return {
        ...state,
        graphOrders: payload?.graphOrders,
      };
    case SHIPPING_TYPES.GET_ORDER_STATISTICS_SUCCESS:
      return {
        ...state,
        getOrderstatistics: payload?.getOrderstatistics,
      };
    case SHIPPING_TYPES.GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: payload?.getOrderDetail,
      };
    default:
      return state;
  }
};

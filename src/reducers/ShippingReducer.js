import { TYPES } from '@/Types/ShippingOrderTypes';

const INITIALSTATE = {
  getOrderCount: {},
  orderList: [],
  getReviewDef: [],
  getorderList: {},
  deliveryOrd: {},
  getShippingService: [],
  shippingGraph: {},
  orderStatus: [],
  graphOrders: {},
  getOrderstatistics: [],
};

export const shippingReducer = (state = INITIALSTATE, { payload, type }) => {
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
        getReviewDef: [],
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

    case TYPES.DELIVERING_ORDER_SUCCESS:
      return {
        ...state,
        deliveryOrd: payload.deliveryOrd,
      };
    case TYPES.DELIVERING_ORDER_RESET:
      return {
        ...state,
        deliveryOrd: [],
      };
    case TYPES.GET_SHIPPING_ORDERS_SUCCESS:
      return {
        ...state,
        getOrderstatistics: payload.getShippingOrderstatistics,
      };
    case TYPES.GET_SHIPSERVICE_SUCCESS:
      return {
        ...state,
        getShippingService: payload.getShippingService,
      };
    case TYPES.GET_SHIPSERVICE_RESET:
      return {
        ...state,
        getShippingService: [],
      };

    case TYPES.SHIPPING_GRAPH_SUCCESS:
      return {
        ...state,
        shippingGraph: payload.shippingGraph,
      };
    case TYPES.TODAY_SHIPPING_STATUS_SUCCESS:
      return {
        ...state,
        todayShippingStatus: payload?.todayShippingStatus,
      };
    case TYPES.TODAY_CURRENT_STATUS_SUCCESS:
      return {
        ...state,
        todayCurrentStatus: payload?.todayCurrentStatus,
      };
    case TYPES.ORDER_STATUS_COUNT_SUCCESS:
      return {
        ...state,
        orderStatus: payload?.orderStatusCount,
      };
    case TYPES.GET_GRAPH_ORDERS_SUCCESS:
      return {
        ...state,
        graphOrders: payload?.getGraphOrders,
      };
    default:
      return state;
  }
};

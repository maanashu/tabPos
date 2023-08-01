import { TYPES } from '@/Types/DeliveringOrderTypes';

const INITIALSTATE = {
  getOrderCount: {},
  orderList: [],
  getReviewDef: [],
  getorderList: {},
  deliveryOrd: {},
  deliverygraph: {},
  deliveringOrder: [],
  todayOrderStatus: {},
  getOrderstatistics: [],
};

export const deliveryReducer = (state = INITIALSTATE, { payload, type }) => {
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
    case TYPES.DELIVERY_ORDER_SUCCESS:
      return {
        ...state,
        deliveryOrd: payload.deliveryOrd,
      };
    case TYPES.DELIVERY_ORDER_RESET:
      return {
        ...state,
        deliveryOrd: [],
      };
    case TYPES.DELIVERY_GRAPH_SUCCESS:
      return {
        ...state,
        deliverygraph: payload.deliverygraph,
      };
    case TYPES.DELIVERING_ORDER_SUCCESS:
      return {
        ...state,
        deliveringOrder: payload.deliveringOrder,
      };
    case TYPES.DELIVERING_ORDER:
      return {
        ...state,
        deliveringOrder: [],
      };
    case TYPES.TODAY_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        todayOrderStatus: payload?.orderStatus,
      };
    case TYPES.GET_ORDER_STATISTICS_SUCCESS:
      return {
        ...state,
        getOrderstatistics: payload.getOrderstatistics,
      };
    default:
      return state;
  }
};

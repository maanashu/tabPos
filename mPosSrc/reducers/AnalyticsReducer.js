import { TYPES } from '@mPOS/Types/AnalyticsTypes';

const INITIALSTATE = {
  getAnalyticStatistics: {},
  getAnalyticOrderGraphs: {},
  getTotalOrder: {},
  getTotalInventory: {},
  getSoldProduct: {},
};

export const analyticsReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_ANALYTIC_STATISTICS_SUCCESS:
      return {
        ...state,
        getAnalyticStatistics: payload?.getAnalyticStatistics,
      };
    case TYPES.GET_ANALYTIC_ORDER_GRAPHS_SUCCESS:
      return {
        ...state,
        getAnalyticOrderGraphs: payload?.getAnalyticOrderGraphs,
      };
    case TYPES.GET_TOTAL_ORDER_SUCCESS:
      return {
        ...state,
        getTotalOrder: payload?.getTotalOrder,
      };
    case TYPES.GET_TOTAL_INVENTORY_SUCCESS:
      return {
        ...state,
        getTotalInventory: payload?.getTotalInventory,
      };
    case TYPES.GET_SOLD_PRODUCT_SUCCESS:
      return {
        ...state,
        getSoldProduct: payload?.getSoldProduct,
      };
    default:
      return state;
  }
};

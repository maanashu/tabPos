import { TYPES } from '@/Types/DashboardTypes';

const INITIALSTATE = {
  getOrderDeliveries: [],
  getSesssion: {},
  getTotalSale: [],
  posLoginDetail: {},
  searchProductList: [],
  selection: {},
};

export const dashboardReducer = (
  state = { INITIALSTATE },
  { payload, type }
) => {
  switch (type) {
    case TYPES.GET_ORDER_DELIVERIES_SUCCESS:
      return {
        ...state,
        getOrderDeliveries: payload.getOrderDeliveries,
      };
    case TYPES.GET_ORDER_DELIVERIES_RESET:
      return {
        ...state,
        getOrderDeliveries: [],
      };

    case TYPES.GET_DRAWER_SESSION_SUCCESS:
      return {
        ...state,
        getSesssion: payload.getSesssion?.payload,
      };
    case TYPES.ADD_SELLING_SELECTION_SUCCESS:
      return {
        ...state,
        selection: payload?.selection,
      };
    case TYPES.GET_DRAWER_SESSION_RESET:
      return {
        ...state,
        getSesssion: {},
      };

    case TYPES.GET_TOTAL_SALE_SUCCESS:
      return {
        ...state,
        getTotalSale: payload.getTotalSale,
      };
    case TYPES.GET_TOTAL_SALE_RESET:
      return {
        ...state,
        getTotalSale: [],
      };

    case TYPES.POS_LOGIN_DETAIL_SUCCESS:
      return {
        ...state,
        posLoginDetail: payload.posLoginDetail,
      };
    case TYPES.POS_LOGIN_DETAIL_RESET:
      return {
        ...state,
        posLoginDetail: {},
      };

    case TYPES.SEARCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        searchProductList: payload.searchProductList,
      };
    case TYPES.SEARCH_PRODUCT_LIST_RESET:
      return {
        ...state,
        searchProductList: [],
      };

    default:
      return state;
  }
};

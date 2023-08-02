import { DASHBOARDTYPE } from '@/Types/DashboardTypes';

const INITIALSTATE = {
  getOrderDeliveries: [],
  getSesssion: {},
  getTotalSale: [],
  posLoginDetail: {},
  searchProductList: [],
  onLineOrders: {},
  selection: {},
};

export const dashboardReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case DASHBOARDTYPE.GET_ORDER_DELIVERIES_SUCCESS:
      return {
        ...state,
        getOrderDeliveries: payload.getOrderDeliveries,
      };
    case DASHBOARDTYPE.GET_ORDER_DELIVERIES_RESET:
      return {
        ...state,
        getOrderDeliveries: [],
      };

    case DASHBOARDTYPE.GET_DRAWER_SESSION_SUCCESS:
      return {
        ...state,
        getSesssion: payload.getSesssion?.payload,
      };
    case DASHBOARDTYPE.ADD_SELLING_SELECTION_SUCCESS:
      return {
        ...state,
        selection: payload?.selection,
      };
    case DASHBOARDTYPE.GET_DRAWER_SESSION_RESET:
      return {
        ...state,
        getSesssion: {},
      };

    case DASHBOARDTYPE.GET_TOTAL_SALE_SUCCESS:
      return {
        ...state,
        getTotalSale: payload.getTotalSale,
      };
    case DASHBOARDTYPE.GET_TOTAL_SALE_RESET:
      return {
        ...state,
        getTotalSale: [],
      };

    case DASHBOARDTYPE.POS_LOGIN_DETAIL_SUCCESS:
      return {
        ...state,
        posLoginDetail: payload.posLoginDetail,
      };
    case DASHBOARDTYPE.POS_LOGIN_DETAIL_RESET:
      return {
        ...state,
        posLoginDetail: {},
      };

    case DASHBOARDTYPE.SEARCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        searchProductList: payload.searchProductList,
      };
    case DASHBOARDTYPE.SEARCH_PRODUCT_LIST_RESET:
      return {
        ...state,
        searchProductList: [],
      };
    case DASHBOARDTYPE.ONLINE_ORDERS_SUCCESS:
      return {
        ...state,
        onLineOrders: payload,
      };

    default:
      return state;
  }
};

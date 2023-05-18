import { TYPES } from '@/Types/DashboardTypes';

const INITIALSTATE = {
  getOrderDeliveries: [],
  getSesssion: {},
  getTotalSale: [],
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

    default:
      return state;
  }
};

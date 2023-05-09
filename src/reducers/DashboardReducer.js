import { TYPES } from '@/Types/DashboardTypes';

const INITIALSTATE = {
  getOrderDeliveries: [],
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

    default:
      return state;
  }
};

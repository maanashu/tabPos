import { DashboardController } from '@/controllers';
import { TYPES } from '@/Types/DashboardTypes';

const getOrderDeliveriesRequest = () => ({
  type: TYPES.GET_ORDER_DELIVERIES_REQUEST,
  payload: null,
});
const getOrderDeliveriesSuccess = getOrderDeliveries => ({
  type: TYPES.GET_ORDER_DELIVERIES_SUCCESS,
  payload: { getOrderDeliveries },
});
const getOrderDeliveriesError = error => ({
  type: TYPES.GET_ORDER_DELIVERIES_ERROR,
  payload: { error },
});
const getOrderDeliveriesReset = () => ({
  type: TYPES.GET_ORDER_DELIVERIES_RESET,
  payload: null,
});

export const getOrderDeliveries = sellerID => async dispatch => {
  dispatch(getOrderDeliveriesRequest());
  try {
    const res = await DashboardController.getOrderDeliveries(sellerID);
    dispatch(getOrderDeliveriesSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOrderDeliveriesReset());
    }
    dispatch(getOrderDeliveriesError(error.message));
  }
};

import { DeliveryController } from '@/controllers';
import { TYPES } from "@/Types/Types";

const getOrdersRequest = () => ({
  type: TYPES.GET_ORDER_REQUEST,
  payload: null,
});
const getOrdersSuccess = orderList => ({
  type: TYPES.GET_ORDER_SUCCESS,
  payload: { orderList },
});
const getOrdersError = error => ({
  type: TYPES.GET_ORDER_ERROR,
  payload: { error },
});


export const getOrders = () => async dispatch => {
  dispatch(getOrdersRequest());
  try {
      const res = await DeliveryController.getOrders();
      dispatch(getOrdersSuccess(res));
  } catch (error) {
      dispatch(getOrdersError(error.message));
  }
};






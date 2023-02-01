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

const acceptOrderRequest = () => ({
  type: TYPES.ACCEPT_ORDER_REQUEST,
  payload: null,
});
const acceptOrderSuccess = () => ({
  type: TYPES.ACCEPT_ORDER_SUCCESS,
  payload: {  },
});
const acceptOrderError = error => ({
  type: TYPES.ACCEPT_ORDER_ERROR,
  payload: { error },
});


export const getOrders = (status) => async dispatch => {
  dispatch(getOrdersRequest());
  try {
      const res = await DeliveryController.getOrders(status);
      dispatch(getOrdersSuccess(res));
  } catch (error) {
      dispatch(getOrdersError(error.message));
  }
};

export const acceptOrder = (data) => async dispatch => {
  dispatch(acceptOrderRequest());
  try {
      const res = await DeliveryController.acceptOrder(data);
      dispatch(acceptOrderSuccess(res));
      dispatch(getOrders());
  } catch (error) {
      dispatch(acceptOrderError(error.message));
  }
};






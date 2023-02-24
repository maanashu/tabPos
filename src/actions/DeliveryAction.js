import { DeliveryController } from '@/controllers';
import { TYPES } from "@/Types/Types";
import { LogBox } from 'react-native';

const getOrderCountRequest = () => ({
  type: TYPES.GET_ORDER_COUNT_REQUEST,
  payload: null,
});
const getOrderCountSuccess = getOrderCount => ({
  type: TYPES.GET_ORDER_COUNT_SUCCESS,
  payload: { getOrderCount },
});
const getOrderCountError = error => ({
  type: TYPES.GET_ORDER_COUNT_ERROR,
  payload: { error },
});

const getOrderListRequest = () => ({
  type: TYPES.GET_ORDER_LIST_REQUEST,
  payload: null,
});
const getOrderListSuccess = getorderList => ({
  type: TYPES.GET_ORDER_LIST_SUCCESS,
  payload: { getorderList },
});
const getOrderListError = error => ({
  type: TYPES.GET_ORDER_LIST_ERROR,
  payload: { error },
});

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

export const getOrderCount = (status) => async dispatch => {
  dispatch(getOrderCountRequest());
  try {
      const res = await DeliveryController.getOrderCount(status);
      dispatch(getOrderCountSuccess(res));
  } catch (error) {
      dispatch(getOrderCountError(error.message));
  }
};

export const getOrderList = () => async dispatch => {
  dispatch(getOrderListRequest());
  try {
      const res = await DeliveryController.getOrderList();
      dispatch(getOrderListSuccess(res));
  } catch (error) {
      dispatch(getOrderListError(error.message));
  }
};

export const getOrders = (status, sellerID) => async dispatch => {
  dispatch(getOrdersRequest());
  try {
      const res = await DeliveryController.getOrders(status, sellerID);
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
      dispatch(getOrderCount(data.sellerID));
  } catch (error) {
      dispatch(acceptOrderError(error.message));
  }
};






import { DELIVERY_TYPES } from '@mPOS/Types/DeliveryTypes';
import { DeliveryController } from '@mPOS/controllers/DeliveryController';

const todayOrdersRequest = () => ({
  type: DELIVERY_TYPES.TODAY_ORDER_STATUS_REQUEST,
  payload: null,
});
const todayOrdersSuccess = (orderStatus) => ({
  type: DELIVERY_TYPES.TODAY_ORDER_STATUS_SUCCESS,
  payload: { orderStatus },
});
const todayOrdersError = (error) => ({
  type: DELIVERY_TYPES.TODAY_ORDER_STATUS_ERROR,
  payload: { error },
});
const todayOrdersReset = () => ({
  type: DELIVERY_TYPES.TODAY_ORDER_STATUS_RESET,
  payload: null,
});

const getDeliveryTypesOrdersRequest = () => ({
  type: DELIVERY_TYPES.GET_DELIVERY_TYPES_ORDERS_REQUEST,
  payload: null,
});
const getDeliveryTypesOrdersSuccess = (deliveryType) => ({
  type: DELIVERY_TYPES.GET_DELIVERY_TYPES_ORDERS_SUCCESS,
  payload: { deliveryType },
});
const getDeliveryTypesOrdersError = (error) => ({
  type: DELIVERY_TYPES.GET_DELIVERY_TYPES_ORDERS_ERROR,
  payload: { error },
});
const getDeliveryTypesOrdersReset = () => ({
  type: DELIVERY_TYPES.GET_DELIVERY_TYPES_ORDERS_RESET,
  payload: null,
});

const getOrdersRequest = () => ({
  type: DELIVERY_TYPES.GET_ORDERS_REQUEST,
  payload: null,
});
const getOrdersSuccess = (orders) => ({
  type: DELIVERY_TYPES.GET_ORDERS_SUCCESS,
  payload: { orders },
});
const getOrdersError = (error) => ({
  type: DELIVERY_TYPES.GET_ORDERS_ERROR,
  payload: { error },
});
const getOrdersReset = () => ({
  type: DELIVERY_TYPES.GET_ORDERS_RESET,
  payload: null,
});

const getGraphOrdersRequest = () => ({
  type: DELIVERY_TYPES.GET_GRAPH_ORDERS_REQUEST,
  payload: null,
});
const getGraphOrdersSuccess = (graphOrders) => ({
  type: DELIVERY_TYPES.GET_GRAPH_ORDERS_SUCCESS,
  payload: { graphOrders },
});
const getGraphOrdersError = (error) => ({
  type: DELIVERY_TYPES.GET_GRAPH_ORDERS_ERROR,
  payload: { error },
});

const getOrderstatisticsRequest = () => ({
  type: DELIVERY_TYPES.GET_ORDER_STATISTICS_REQUEST,
  payload: null,
});
const getOrderstatisticsSuccess = (getOrderstatistics) => ({
  type: DELIVERY_TYPES.GET_ORDER_STATISTICS_SUCCESS,
  payload: { getOrderstatistics },
});
const getOrderstatisticsError = (error) => ({
  type: DELIVERY_TYPES.GET_ORDER_STATISTICS_ERROR,
  payload: { error },
});

const getOrderCountRequest = () => ({
  type: DELIVERY_TYPES.GET_ORDER_COUNT_REQUEST,
  payload: null,
});
const getOrderCountSuccess = (getOrderCount) => ({
  type: DELIVERY_TYPES.GET_ORDER_COUNT_SUCCESS,
  payload: { getOrderCount },
});
const getOrderCountError = (error) => ({
  type: DELIVERY_TYPES.GET_ORDER_COUNT_ERROR,
  payload: { error },
});

const acceptOrderRequest = () => ({
  type: DELIVERY_TYPES.ACCEPT_ORDER_REQUEST,
  payload: null,
});
const acceptOrderSuccess = () => ({
  type: DELIVERY_TYPES.ACCEPT_ORDER_SUCCESS,
  payload: {},
});
const acceptOrderError = (error) => ({
  type: DELIVERY_TYPES.ACCEPT_ORDER_ERROR,
  payload: { error },
});

export const todayOrders = () => async (dispatch) => {
  dispatch(todayOrdersRequest());
  try {
    const res = await DeliveryController.todayOrders();
    dispatch(todayOrdersSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(todayOrdersReset());
    }
    dispatch(todayOrdersError(error.message));
  }
};

export const getDeliveryTypesOrders = () => async (dispatch) => {
  dispatch(getDeliveryTypesOrdersRequest());
  try {
    const res = await DeliveryController.getDeliveryTypesOrders();
    dispatch(getDeliveryTypesOrdersSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getDeliveryTypesOrdersReset());
    }
    dispatch(getDeliveryTypesOrdersError(error?.message));
  }
};

export const getOrders = (status) => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const res = await DeliveryController.getOrders(status);
    dispatch(getOrdersSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOrdersReset());
    }
    dispatch(getOrdersError(error?.message));
  }
};

export const getGraphOrders = () => async (dispatch) => {
  dispatch(getGraphOrdersRequest());
  try {
    const res = await DeliveryController.getGraphOrders();
    dispatch(getGraphOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(getGraphOrdersError(error.message));
  }
};

export const getOrderstatistics = () => async (dispatch) => {
  dispatch(getOrderstatisticsRequest());
  try {
    const res = await DeliveryController.getOrderstatistics();
    dispatch(getOrderstatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderstatisticsError(error.message));
  }
};

export const getOrderCount = () => async (dispatch) => {
  dispatch(getOrderCountRequest());
  try {
    const res = await DeliveryController.getOrderCount();
    dispatch(getOrderCountSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderCountError(error.message));
  }
};

export const acceptOrder = (data, openShippingOrders, callback) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    const res = await DeliveryController.acceptOrder(data);
    callback && callback(res);
    dispatch(acceptOrderSuccess(res));
    dispatch(getOrderCount());
    dispatch(getOrders(openShippingOrders));
  } catch (error) {
    dispatch(acceptOrderError(error.message));
  }
};

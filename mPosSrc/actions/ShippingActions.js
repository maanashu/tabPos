import { SHIPPING_TYPES } from '@mPOS/Types/ShippingTypes';
import { ShippingController } from '@mPOS/controllers';

const todayShippingStatusRequest = () => ({
  type: SHIPPING_TYPES.TODAY_SHIPPING_STATUS_REQUEST,
  payload: null,
});
const todayShippingStatusSuccess = (todayShippingStatus) => ({
  type: SHIPPING_TYPES.TODAY_SHIPPING_STATUS_SUCCESS,
  payload: { todayShippingStatus },
});
const todayShippingStatusError = (error) => ({
  type: SHIPPING_TYPES.TODAY_SHIPPING_STATUS_ERROR,
  payload: { error },
});

const todayCurrentStatusRequest = () => ({
  type: SHIPPING_TYPES.TODAY_CURRENT_STATUS_REQUEST,
  payload: null,
});
const todayCurrentStatusSuccess = (todayCurrentStatus) => ({
  type: SHIPPING_TYPES.TODAY_CURRENT_STATUS_SUCCESS,
  payload: { todayCurrentStatus },
});
const todayCurrentStatusError = (error) => ({
  type: SHIPPING_TYPES.TODAY_CURRENT_STATUS_ERROR,
  payload: { error },
});

const getOrdersRequest = () => ({
  type: SHIPPING_TYPES.GET_ORDERS_REQUEST,
  payload: null,
});
const getOrdersSuccess = (orders) => ({
  type: SHIPPING_TYPES.GET_ORDERS_SUCCESS,
  payload: { orders },
});
const getOrdersError = (error) => ({
  type: SHIPPING_TYPES.GET_ORDERS_ERROR,
  payload: { error },
});
const getOrdersReset = () => ({
  type: SHIPPING_TYPES.GET_ORDERS_RESET,
  payload: null,
});

const getOrderCountRequest = () => ({
  type: SHIPPING_TYPES.GET_ORDER_COUNT_REQUEST,
  payload: null,
});
const getOrderCountSuccess = (getOrderCount) => ({
  type: SHIPPING_TYPES.GET_ORDER_COUNT_SUCCESS,
  payload: { getOrderCount },
});
const getOrderCountError = (error) => ({
  type: SHIPPING_TYPES.GET_ORDER_COUNT_ERROR,
  payload: { error },
});

const getGraphOrdersRequest = () => ({
  type: SHIPPING_TYPES.GET_GRAPH_ORDERS_REQUEST,
  payload: null,
});
const getGraphOrdersSuccess = (graphOrders) => ({
  type: SHIPPING_TYPES.GET_GRAPH_ORDERS_SUCCESS,
  payload: { graphOrders },
});
const getGraphOrdersError = (error) => ({
  type: SHIPPING_TYPES.GET_GRAPH_ORDERS_ERROR,
  payload: { error },
});

const getOrderstatisticsRequest = () => ({
  type: SHIPPING_TYPES.GET_ORDER_STATISTICS_REQUEST,
  payload: null,
});
const getOrderstatisticsSuccess = (getOrderstatistics) => ({
  type: SHIPPING_TYPES.GET_ORDER_STATISTICS_SUCCESS,
  payload: { getOrderstatistics },
});
const getOrderstatisticsError = (error) => ({
  type: SHIPPING_TYPES.GET_ORDER_STATISTICS_ERROR,
  payload: { error },
});

const orderStatusCountRequest = () => ({
  type: SHIPPING_TYPES.ORDER_STATUS_COUNT_REQUEST,
  payload: null,
});
const orderStatusCountSuccess = (orderStatusCount) => ({
  type: SHIPPING_TYPES.ORDER_STATUS_COUNT_SUCCESS,
  payload: { orderStatusCount },
});
const orderStatusCountError = (error) => ({
  type: SHIPPING_TYPES.ORDER_STATUS_COUNT_ERROR,
  payload: { error },
});

const getOrderDetailRequest = () => ({
  type: SHIPPING_TYPES.GET_ORDER_DETAIL_REQUEST,
  payload: null,
});
const getOrderDetailSuccess = (getOrderDetail) => ({
  type: SHIPPING_TYPES.GET_ORDER_DETAIL_SUCCESS,
  payload: { getOrderDetail },
});
const getOrderDetailError = (error) => ({
  type: SHIPPING_TYPES.GET_ORDER_DETAIL_ERROR,
  payload: { error },
});

const acceptOrderRequest = () => ({
  type: SHIPPING_TYPES.ACCEPT_ORDER_REQUEST,
  payload: null,
});
const acceptOrderSuccess = () => ({
  type: SHIPPING_TYPES.ACCEPT_ORDER_SUCCESS,
  payload: {},
});
const acceptOrderError = (error) => ({
  type: SHIPPING_TYPES.ACCEPT_ORDER_ERROR,
  payload: { error },
});

export const todayShippingStatus = () => async (dispatch) => {
  dispatch(todayShippingStatusRequest());
  try {
    const res = await ShippingController.todayShippingStatus();
    dispatch(todayShippingStatusSuccess(res?.payload));
  } catch (error) {
    dispatch(todayShippingStatusError(error.message));
  }
};

export const todayCurrentStatus = () => async (dispatch) => {
  dispatch(todayCurrentStatusRequest());
  try {
    const res = await ShippingController.todayCurrentStatus();
    dispatch(todayCurrentStatusSuccess(res?.payload));
  } catch (error) {
    dispatch(todayCurrentStatusError(error.message));
  }
};

export const getOrders = (status) => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const res = await ShippingController.getOrders(status);
    dispatch(getOrdersSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOrdersReset());
    }
    dispatch(getOrdersError(error?.message));
  }
};

export const getOrderCount = () => async (dispatch) => {
  dispatch(getOrderCountRequest());
  try {
    const res = await ShippingController.getOrderCount();
    dispatch(getOrderCountSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderCountError(error.message));
  }
};

export const getGraphOrders = () => async (dispatch) => {
  dispatch(getGraphOrdersRequest());
  try {
    const res = await ShippingController.getGraphOrders();
    dispatch(getGraphOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(getGraphOrdersError(error.message));
  }
};

export const getOrderstatistics = () => async (dispatch) => {
  dispatch(getOrderstatisticsRequest());
  try {
    const res = await ShippingController.getOrderstatistics();
    dispatch(getOrderstatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderstatisticsError(error.message));
  }
};

export const orderStatusCount = () => async (dispatch) => {
  dispatch(orderStatusCountRequest());
  try {
    const res = await ShippingController.orderStatusCount();
    dispatch(orderStatusCountSuccess(res?.payload));
  } catch (error) {
    dispatch(orderStatusCountError(error.message));
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  dispatch(getOrderDetailRequest());
  try {
    const res = await ShippingController.getOrderDetail(id);
    dispatch(getOrderDetailSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderDetailError(error.message));
  }
};

export const acceptOrder = (data, openShippingOrders, callback) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    const res = await ShippingController.acceptOrder(data);
    callback && callback(res);
    dispatch(acceptOrderSuccess(res));
    dispatch(getOrderCount());
    dispatch(getOrders(openShippingOrders));
  } catch (error) {
    dispatch(acceptOrderError(error.message));
  }
};

import { ShippingController } from '@/controllers';
import { TYPES } from '@/Types/ShippingOrderTypes';
import { getPendingOrders } from './DashboardAction';

const getOrderCountRequest = () => ({
  type: TYPES.GET_ORDER_COUNT_REQUEST,
  payload: null,
});
const getOrderCountSuccess = (getOrderCount) => ({
  type: TYPES.GET_ORDER_COUNT_SUCCESS,
  payload: { getOrderCount },
});
const getOrderCountError = (error) => ({
  type: TYPES.GET_ORDER_COUNT_ERROR,
  payload: { error },
});

const getOrderListRequest = () => ({
  type: TYPES.GET_ORDER_LIST_REQUEST,
  payload: null,
});
const getOrderListSuccess = (getorderList) => ({
  type: TYPES.GET_ORDER_LIST_SUCCESS,
  payload: { getorderList },
});
const getOrderListError = (error) => ({
  type: TYPES.GET_ORDER_LIST_ERROR,
  payload: { error },
});

const getReviewDefRequest = () => ({
  type: TYPES.GET_REVIEW_DEF_REQUEST,
  payload: null,
});
const getReviewDefSuccess = (getReviewDef) => ({
  type: TYPES.GET_REVIEW_DEF_SUCCESS,
  payload: { getReviewDef },
});
const getReviewDefError = (error) => ({
  type: TYPES.GET_REVIEW_DEF_ERROR,
  payload: { error },
});
const getReviewDefReset = () => ({
  type: TYPES.GET_REVIEW_DEF_RESET,
  payload: null,
});

const getOrdersRequest = () => ({
  type: TYPES.GET_ORDER_REQUEST,
  payload: null,
});
const getOrdersSuccess = (orderList) => ({
  type: TYPES.GET_ORDER_SUCCESS,
  payload: { orderList },
});
const getOrdersError = (error) => ({
  type: TYPES.GET_ORDER_ERROR,
  payload: { error },
});

const acceptOrderRequest = () => ({
  type: TYPES.ACCEPT_ORDER_REQUEST,
  payload: null,
});
const acceptOrderSuccess = () => ({
  type: TYPES.ACCEPT_ORDER_SUCCESS,
  payload: {},
});
const acceptOrderError = (error) => ({
  type: TYPES.ACCEPT_ORDER_ERROR,
  payload: { error },
});

const deliveringOrdRequest = () => ({
  type: TYPES.DELIVERING_ORDER_REQUEST,
  payload: null,
});
const deliveringOrdSuccess = (deliveryOrd) => ({
  type: TYPES.DELIVERING_ORDER_SUCCESS,
  payload: { deliveryOrd },
});
const deliveringOrdError = (error) => ({
  type: TYPES.DELIVERING_ORDER_ERROR,
  payload: { error },
});
const deliveringOrdReset = () => ({
  type: TYPES.DELIVERING_ORDER_RESET,
  payload: null,
});

const getShippingServiceRequest = () => ({
  type: TYPES.GET_SHIPSERVICE_REQUEST,
  payload: null,
});
const getShippingServiceSuccess = (getShippingService) => ({
  type: TYPES.GET_SHIPSERVICE_SUCCESS,
  payload: { getShippingService },
});
const getShippingServiceError = (error) => ({
  type: TYPES.GET_SHIPSERVICE_ERROR,
  payload: { error },
});
const getShippingServiceReset = () => ({
  type: TYPES.GET_SHIPSERVICE_RESET,
  payload: null,
});

const shipServiceUpdateRequest = () => ({
  type: TYPES.SHIP_SERVICEUPDATE_REQUEST,
  payload: null,
});
const shipServiceUpdateSuccess = () => ({
  type: TYPES.SHIP_SERVICEUPDATE_SUCCESS,
  payload: null,
});
const shipServiceUpdateError = (error) => ({
  type: TYPES.SHIP_SERVICEUPDATE_ERROR,
  payload: { error },
});

const shippingGraphRequest = () => ({
  type: TYPES.SHIPPING_GRAPH_REQUEST,
  payload: null,
});
const shippingGraphSuccess = (shippingGraph) => ({
  type: TYPES.SHIPPING_GRAPH_SUCCESS,
  payload: { shippingGraph },
});
const shippingGraphError = (error) => ({
  type: TYPES.SHIPPING_GRAPH_ERROR,
  payload: { error },
});

const todayShippingStatusRequest = () => ({
  type: TYPES.TODAY_SHIPPING_STATUS_REQUEST,
  payload: null,
});
const todayShippingStatusSuccess = (todayShippingStatus) => ({
  type: TYPES.TODAY_SHIPPING_STATUS_SUCCESS,
  payload: { todayShippingStatus },
});
const todayShippingStatusError = (error) => ({
  type: TYPES.TODAY_SHIPPING_STATUS_ERROR,
  payload: { error },
});

const todayCurrentStatusRequest = () => ({
  type: TYPES.ORDER_STATUS_COUNT_REQUEST,
  payload: null,
});
const todayCurrentStatusSuccess = (todayCurrentStatus) => ({
  type: TYPES.TODAY_CURRENT_STATUS_SUCCESS,
  payload: { todayCurrentStatus },
});
const todayCurrentStatusError = (error) => ({
  type: TYPES.TODAY_CURRENT_STATUS_ERROR,
  payload: { error },
});

const orderStatusCountRequest = () => ({
  type: TYPES.ORDER_STATUS_COUNT_REQUEST,
  payload: null,
});
const orderStatusCountSuccess = (orderStatusCount) => ({
  type: TYPES.ORDER_STATUS_COUNT_SUCCESS,
  payload: { orderStatusCount },
});
const orderStatusCountError = (error) => ({
  type: TYPES.ORDER_STATUS_COUNT_ERROR,
  payload: { error },
});

const getGraphOrdersRequest = () => ({
  type: TYPES.GET_GRAPH_ORDERS_REQUEST,
  payload: null,
});
const getGraphOrdersSuccess = (getGraphOrders) => ({
  type: TYPES.GET_GRAPH_ORDERS_SUCCESS,
  payload: { getGraphOrders },
});
const getGraphOrdersError = (error) => ({
  type: TYPES.GET_GRAPH_ORDERS_ERROR,
  payload: { error },
});

const getShippingOrderstatisticsRequest = () => ({
  type: TYPES.GET_SHIPPING_ORDERS_REQUEST,
  payload: null,
});
const getShippingOrderstatisticsSuccess = (getShippingOrderstatistics) => ({
  type: TYPES.GET_SHIPPING_ORDERS_SUCCESS,
  payload: { getShippingOrderstatistics },
});
const getShippingOrderstatisticsError = (error) => ({
  type: TYPES.GET_SHIPPING_ORDERS_ERROR,
  payload: { error },
});

export const getOrderCount = (status) => async (dispatch) => {
  dispatch(getOrderCountRequest());
  try {
    const res = await ShippingController.getOrderCount(status);
    dispatch(getOrderCountSuccess(res));
  } catch (error) {
    dispatch(getOrderCountError(error.message));
  }
};
export const getReviewDefault = (status) => async (dispatch) => {
  dispatch(getReviewDefRequest());
  try {
    const res = await ShippingController.getReviewDefault(status);
    dispatch(getReviewDefSuccess(res));
    // dispatch(orderStatusCount());
    // dispatch(getOrderCount());
    // dispatch(getPendingOrders());
    // dispatch(getShippingOrderstatistics());
  } catch (error) {
    console.log('ERRORRR', JSON.stringify(error));
    if (error?.statusCode === 204) {
      dispatch(getReviewDefReset());
    }
    dispatch(getReviewDefError(error.message));
  }
};

export const getOrders = (status, sellerID) => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const res = await ShippingController.getOrders(status, sellerID);
    return dispatch(getOrdersSuccess(res));
  } catch (error) {
    dispatch(getOrdersError(error.message));
  }
};

export const acceptOrder = (data) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    const res = await ShippingController.acceptOrder(data);
    dispatch(acceptOrderSuccess(res));
    dispatch(getOrderCount(data.sellerID));
    dispatch(getReviewDefault(0));
  } catch (error) {
    dispatch(acceptOrderError(error.message));
  }
};

export const acceptOrderMPOS = (data) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    const res = await ShippingController.acceptOrder(data);
    dispatch(acceptOrderSuccess(res));
    dispatch(orderStatusCount());
    dispatch(getOrderCount(data.sellerID));

    // dispatch(orderStatusCount());
    // dispatch(orderStatusCount());
    // dispatch(getReviewDefault(0));
    return res;
  } catch (error) {
    dispatch(acceptOrderError(error.message));
  }
};

export const deliveringOrd = () => async (dispatch) => {
  dispatch(deliveringOrdRequest());
  try {
    const res = await ShippingController.deliveringOrd();
    dispatch(deliveringOrdSuccess(res?.payload?.shipping_type_Count));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(deliveringOrdReset());
    }
    dispatch(deliveringOrdError(error.message));
  }
};

export const getShippingService = () => async (dispatch) => {
  dispatch(getShippingServiceRequest());
  try {
    const res = await ShippingController.getShippingService();
    dispatch(getShippingServiceSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getShippingServiceReset());
    }
    dispatch(getShippingServiceError(error.message));
  }
};

export const shipServiceUpdate = (data) => async (dispatch) => {
  dispatch(shipServiceUpdateRequest());
  try {
    const res = await ShippingController.shipServiceUpdate(data);
    return dispatch(shipServiceUpdateSuccess(res));
  } catch (error) {
    dispatch(shipServiceUpdateError(error.message));
  }
};

export const shippingGraph = (sellerID) => async (dispatch) => {
  dispatch(shippingGraphRequest());
  try {
    const res = await ShippingController.shippingGraph(sellerID);
    dispatch(shippingGraphSuccess(res?.payload));
  } catch (error) {
    dispatch(shippingGraphError(error.message));
  }
};

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

export const orderStatusCount = (callback) => async (dispatch) => {
  dispatch(orderStatusCountRequest());
  try {
    const res = await ShippingController.orderStatusCount();
    callback && callback(res?.payload?.orderStatus);
    dispatch(orderStatusCountSuccess(res?.payload));
  } catch (error) {
    dispatch(orderStatusCountError(error.message));
  }
};

export const getGraphOrders = () => async (dispatch) => {
  dispatch(getGraphOrdersRequest());
  try {
    const res = await ShippingController.getGraphOrders();
    return dispatch(getGraphOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(getGraphOrdersError(error.message));
  }
};

export const getShippingOrderstatistics = () => async (dispatch) => {
  dispatch(getShippingOrderstatisticsRequest());
  try {
    const res = await ShippingController.getShippingOrderstatistics();
    dispatch(getShippingOrderstatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getShippingOrderstatisticsError(error.message));
  }
};

import { ShippingController } from '@/controllers';
import { TYPES } from '@/Types/ShippingOrderTypes';

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

const getReviewDefRequest = () => ({
  type: TYPES.GET_REVIEW_DEF_REQUEST,
  payload: null,
});
const getReviewDefSuccess = getReviewDef => ({
  type: TYPES.GET_REVIEW_DEF_SUCCESS,
  payload: { getReviewDef },
});
const getReviewDefError = error => ({
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
  payload: {},
});
const acceptOrderError = error => ({
  type: TYPES.ACCEPT_ORDER_ERROR,
  payload: { error },
});

const deliveringOrdRequest = () => ({
  type: TYPES.DELIVERING_ORDER_REQUEST,
  payload: null,
});
const deliveringOrdSuccess = deliveryOrd => ({
  type: TYPES.DELIVERING_ORDER_SUCCESS,
  payload: { deliveryOrd },
});
const deliveringOrdError = error => ({
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
const getShippingServiceSuccess = getShippingService => ({
  type: TYPES.GET_SHIPSERVICE_SUCCESS,
  payload: { getShippingService },
});
const getShippingServiceError = error => ({
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
const shipServiceUpdateError = error => ({
  type: TYPES.SHIP_SERVICEUPDATE_ERROR,
  payload: { error },
});
export const getOrderCount = status => async dispatch => {
  dispatch(getOrderCountRequest());
  try {
    const res = await ShippingController.getOrderCount(status);
    dispatch(getOrderCountSuccess(res));
  } catch (error) {
    dispatch(getOrderCountError(error.message));
  }
};
export const getReviewDefault = (status, sellerID) => async dispatch => {
  dispatch(getReviewDefRequest());
  try {
    const res = await ShippingController.getReviewDefault(status, sellerID);
    dispatch(getReviewDefSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getReviewDefReset());
    }
    dispatch(getReviewDefError(error.message));
  }
};

export const getOrders = (status, sellerID) => async dispatch => {
  dispatch(getOrdersRequest());
  try {
    const res = await ShippingController.getOrders(status, sellerID);
    return dispatch(getOrdersSuccess(res));
  } catch (error) {
    dispatch(getOrdersError(error.message));
  }
};

export const acceptOrder = data => async dispatch => {
  dispatch(acceptOrderRequest());
  try {
    const res = await ShippingController.acceptOrder(data);
    dispatch(acceptOrderSuccess(res));
    dispatch(getOrderCount(data.sellerID));
    dispatch(getReviewDefault(0, sellerID));
  } catch (error) {
    dispatch(acceptOrderError(error.message));
  }
};

export const deliveringOrd = () => async dispatch => {
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

export const getShippingService = () => async dispatch => {
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

export const shipServiceUpdate = data => async dispatch => {
  dispatch(shipServiceUpdateRequest());
  try {
    const res = await ShippingController.shipServiceUpdate(data);
    return dispatch(shipServiceUpdateSuccess(res));
  } catch (error) {
    dispatch(shipServiceUpdateError(error.message));
  }
};

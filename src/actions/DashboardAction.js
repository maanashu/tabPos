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

const getDrawerSessionRequest = () => ({
  type: TYPES.GET_DRAWER_SESSION_REQUEST,
  payload: null,
});
const getDrawerSessionSuccess = getSesssion => ({
  type: TYPES.GET_DRAWER_SESSION_SUCCESS,
  payload: { getSesssion },
});
const getDrawerSessionError = error => ({
  type: TYPES.GET_DRAWER_SESSION_ERROR,
  payload: { error },
});
const getDrawerSessionReset = () => ({
  type: TYPES.GET_DRAWER_SESSION_RESET,
  payload: null,
});

const getDrawerSessionPostRequest = () => ({
  type: TYPES.GET_DRAWER_SESSION_POST_REQUEST,
  payload: null,
});
const getDrawerSessionPostSuccess = () => ({
  type: TYPES.GET_DRAWER_SESSION_POST_SUCCESS,
  payload: {},
});
const getDrawerSessionPostError = error => ({
  type: TYPES.GET_DRAWER_SESSION_POST_ERROR,
  payload: { error },
});
const getDrawerSessionPostReset = () => ({
  type: TYPES.GET_DRAWER_SESSION_POST_RESET,
  payload: null,
});

const startstarckingSessionRequest = () => ({
  type: TYPES.START_TRACKING_SESSION_REQUEST,
  payload: null,
});
const startstarckingSessionSuccess = () => ({
  type: TYPES.START_TRACKING_SESSION_SUCCESS,
  payload: {},
});
const startstarckingSessionError = error => ({
  type: TYPES.START_TRACKING_SESSION_ERROR,
  payload: { error },
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
export const getDrawerSession = () => async dispatch => {
  dispatch(getDrawerSessionRequest());
  try {
    const res = await DashboardController.getDrawerSession();
    dispatch(getDrawerSessionSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getDrawerSessionReset());
    }
    dispatch(getDrawerSessionError(error.message));
  }
};
export const getDrawerSessionPost = data => async dispatch => {
  dispatch(getDrawerSessionPostRequest());
  try {
    const res = await DashboardController.getDrawerSessionPost(data);
    dispatch(getDrawerSessionPostSuccess(res));
    if (res) {
      const resData = {
        drawerID: res?.payload?.id,
        amount: data.amount,
        notes: data.notes,
      };
      dispatch(startstarckingSession(resData));
    }
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getDrawerSessionPostReset());
    }
    dispatch(getDrawerSessionPostError(error.message));
  }
};

export const startstarckingSession = resData => async dispatch => {
  dispatch(startstarckingSessionRequest());
  try {
    const res = await DashboardController.startstarckingSession(resData);
    dispatch(startstarckingSessionSuccess(res));
    dispatch(getDrawerSession());
  } catch (error) {
    dispatch(startstarckingSessionError(error.message));
  }
};

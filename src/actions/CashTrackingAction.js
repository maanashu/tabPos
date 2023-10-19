import { CashTrackingController } from '@/controllers';
import { TYPES } from '@/Types/CashtrackingTypes';

const getDrawerSessionRequest = () => ({
  type: TYPES.GET_DRAWER_SESSION_REQUEST,
  payload: null,
});
const getDrawerSessionSuccess = (getDrawerSession) => ({
  type: TYPES.GET_DRAWER_SESSION_SUCCESS,
  payload: { getDrawerSession },
});
const getDrawerSessionError = (error) => ({
  type: TYPES.GET_DRAWER_SESSION_ERROR,
  payload: { error },
});
const getPaymentDrawerHistoryRequest = () => ({
  type: TYPES.GET_DRAWER_HISTORY_REQUEST,
  payload: null,
});
const getPaymentDrawerHistorySuccess = (drawerHistory) => ({
  type: TYPES.GET_DRAWER_HISTORY_SUCCESS,
  payload: { drawerHistory },
});
const getPaymentDrawerHistoryError = (error) => ({
  type: TYPES.GET_DRAWER_HISTORY_ERROR,
  payload: { error },
});

const trackSessionSaveRequest = () => ({
  type: TYPES.TRACK_SESSION_SAVE_REQUEST,
  payload: null,
});
const trackSessionSaveSuccess = () => ({
  type: TYPES.TRACK_SESSION_SAVE_SUCCESS,
  payload: {},
});
const trackSessionSaveError = (error) => ({
  type: TYPES.TRACK_SESSION_SAVE_ERROR,
  payload: { error },
});

const getSessionHistoryRequest = () => ({
  type: TYPES.GET_SESSION_HISTORY_REQUEST,
  payload: null,
});
const getSessionHistorySuccess = (getSessionHistory) => ({
  type: TYPES.GET_SESSION_HISTORY_SUCCESS,
  payload: { getSessionHistory },
});
const getSessionHistoryError = (error) => ({
  type: TYPES.GET_SESSION_HISTORY_ERROR,
  payload: { error },
});
const getSessionHistoryReset = () => ({
  type: TYPES.GET_SESSION_HISTORY_RESET,
  payload: null,
});

const sendSessionHistoryRequest = () => ({
  type: TYPES.SEND_SESSION_HISTORY_REQUEST,
  payload: null,
});
const sendSessionHistorySuccess = (getSessionHistory) => ({
  type: TYPES.SEND_SESSION_HISTORY_SUCCESS,
  payload: { getSessionHistory },
});
const sendSessionHistoryError = (error) => ({
  type: TYPES.SEND_SESSION_HISTORY_ERROR,
  payload: { error },
});
const sendSessionHistoryReset = () => ({
  type: TYPES.SEND_SESSION_HISTORY_RESET,
  payload: null,
});

const endTrackingSessionRequest = () => ({
  type: TYPES.END_TRACKING_REQUEST,
  payload: null,
});
const endTrackingSessionSuccess = (getSessionHistory) => ({
  type: TYPES.END_TRACKING_SUCCESS,
  payload: { getSessionHistory },
});
const endTrackingSessionError = (error) => ({
  type: TYPES.END_TRACKING_ERROR,
  payload: { error },
});

const getDrawerSessionByIdRequest = () => ({
  type: TYPES.GET_SESSION_BYID_REQUEST,
  payload: null,
});
const getDrawerSessionByIdSuccess = (getDrawerSessionById) => ({
  type: TYPES.GET_SESSION_BYID_SUCCESS,
  payload: { getDrawerSessionById },
});
const getDrawerSessionByIdError = (error) => ({
  type: TYPES.GET_SESSION_BYID_ERROR,
  payload: { error },
});

export const getDrawerSessions = () => async (dispatch) => {
  dispatch(getDrawerSessionRequest());
  try {
    const res = await CashTrackingController.getDrawerSession();
    dispatch(getDrawerSessionSuccess(res?.payload));
  } catch (error) {
    dispatch(getDrawerSessionError(error.message));
  }
};
export const getPaymentDrawerSessions = (drawerId) => async (dispatch) => {
  dispatch(getPaymentDrawerHistoryRequest());
  try {
    const res = await CashTrackingController.getPaymentDrawerSessions(drawerId);
    dispatch(getPaymentDrawerHistorySuccess(res?.payload));
  } catch (error) {
    dispatch(getPaymentDrawerHistoryError(error.message));
  }
};
export const trackSessionSave = (data) => async (dispatch) => {
  dispatch(trackSessionSaveRequest());
  try {
    const res = await CashTrackingController.trackSessionSave(data);
    return dispatch(trackSessionSaveSuccess(res?.payload));
    //  dispatch(getDrawerSession())
  } catch (error) {
    dispatch(trackSessionSaveError(error.message));
  }
};

export const getSessionHistory = (data) => async (dispatch) => {
  dispatch(getSessionHistoryRequest());
  try {
    const res = await CashTrackingController.getSessionHistory(data);
    dispatch(getSessionHistorySuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getSessionHistoryReset());
    }
    dispatch(getSessionHistoryError(error.message));
  }
};
export const sendSessionHistory = (drawer_id) => async (dispatch) => {
  dispatch(sendSessionHistoryRequest());
  try {
    const res = await CashTrackingController.sendSessionHistory(drawer_id);
    dispatch(sendSessionHistorySuccess(res?.payload));
    return res;
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(sendSessionHistoryReset());
    }
    dispatch(sendSessionHistoryError(error.message));
  }
};
export const endTrackingSession = (data) => async (dispatch) => {
  dispatch(endTrackingSessionRequest());
  try {
    const res = await CashTrackingController.endTrackingSession(data);
    return dispatch(endTrackingSessionSuccess(res));
  } catch (error) {
    dispatch(endTrackingSessionError(error.message));
  }
};

export const getDrawerSessionById = (status) => async (dispatch) => {
  dispatch(getDrawerSessionByIdRequest());
  try {
    const res = await CashTrackingController.getDrawerSessionById(status);
    dispatch(getDrawerSessionByIdSuccess(res?.payload?.data));
  } catch (error) {
    dispatch(getDrawerSessionByIdError(error.message));
  }
};

import { CashTrackingController } from '@/controllers';
import { TYPES } from "@/Types/CashtrackingTypes";

const getDrawerSessionRequest = () => ({
  type: TYPES.GET_DRAWER_SESSION_REQUEST,
  payload: null,
});
const getDrawerSessionSuccess = getDrawerSession => ({
  type: TYPES.GET_DRAWER_SESSION_SUCCESS,
  payload: { getDrawerSession },
});
const getDrawerSessionError = error => ({
  type: TYPES.GET_DRAWER_SESSION_ERROR,
  payload: { error },
});

const trackSessionSaveRequest = () => ({
  type: TYPES.TRACK_SESSION_SAVE_REQUEST,
  payload: null,
});
const trackSessionSaveSuccess = () => ({
  type: TYPES.TRACK_SESSION_SAVE_SUCCESS,
  payload: {  },
});
const trackSessionSaveError = error => ({
  type: TYPES.TRACK_SESSION_SAVE_ERROR,
  payload: { error },
});




export const getDrawerSession = () => async dispatch => {
  dispatch(getDrawerSessionRequest());
  try {
      const res = await CashTrackingController.getDrawerSession();
      dispatch(getDrawerSessionSuccess(res?.payload));
  } catch (error) {
      dispatch(getDrawerSessionError(error.message));
  }
};
export const trackSessionSave = (data) => async dispatch => {
  dispatch(trackSessionSaveRequest());
  try {
      const res = await CashTrackingController.trackSessionSave(data);
      dispatch(trackSessionSaveSuccess(res));
      dispatch(getDrawerSessionSuccess(res?.payload));
  } catch (error) {
      dispatch(trackSessionSaveError(error.message));
  }
};










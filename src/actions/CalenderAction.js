import { CalenderController } from '@/controllers';
import { TYPES } from '@/Types/CalenderTypes';

const getAppointmentRequest = () => ({
  type: TYPES.GET_APPOINTMENTS_REQUEST,
  payload: null,
});
const getAppointmentSuccess = getAppointment => ({
  type: TYPES.GET_APPOINTMENTS_SUCCESS,
  payload: { getAppointment },
});
const getAppointmentError = error => ({
  type: TYPES.GET_APPOINTMENTS_ERROR,
  payload: { error },
});
const getAppointmentReset = () => ({
  type: TYPES.GET_APPOINTMENTS_RESET,
  payload: null,
});

export const getAppointment = () => async dispatch => {
  dispatch(getAppointmentRequest());
  try {
    const res = await CalenderController.getAppointment();
    dispatch(getAppointmentSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAppointmentReset());
    }
    dispatch(getAppointmentError(error.message));
  }
};

import { AppointmentController } from '@/controllers';
import { TYPES } from '@/Types/AppointmentTypes';

// get all appointments
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

//Create appointment order
const createOrderRequest = () => ({
  type: TYPES.CREATE_ORDER_REQUEST,
  payload: null,
});
const createOrderSuccess = orderData => ({
  type: TYPES.CREATE_ORDER_SUCCESS,
  payload: { orderData },
});
const createOrderError = error => ({
  type: TYPES.CREATE_ORDER_ERROR,
  payload: { error },
});
const createOrderReset = () => ({
  type: TYPES.CREATE_ORDER_RESET,
  payload: null,
});

export const getAppointment = () => async dispatch => {
  dispatch(getAppointmentRequest());
  try {
    const res = await AppointmentController.getAppointment();
    dispatch(getAppointmentSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAppointmentReset());
    }
    dispatch(getAppointmentError(error.message));
  }
};

export const createOrder = orderData => async dispatch => {
  dispatch(createOrderRequest());
  try {
    const res = await AppointmentController.createOrder(orderData);
    dispatch(createOrderSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(createOrderReset());
    }
    dispatch(createOrderError(error.message));
  }
};

import { APPOINTMENT_STATUS } from '@/constants/status';
import { AppointmentController } from '@/controllers';
import { TYPES } from '@/Types/AppointmentTypes';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

// get all appointments
const getAppointmentRequest = () => ({
  type: TYPES.GET_APPOINTMENTS_REQUEST,
  payload: null,
});
const getAppointmentSuccess = (appointments, pages) => ({
  type: TYPES.GET_APPOINTMENTS_SUCCESS,
  payload: { appointments, pages },
});
const getAppointmentError = (error) => ({
  type: TYPES.GET_APPOINTMENTS_ERROR,
  payload: { error },
});
const getAppointmentReset = () => ({
  type: TYPES.GET_APPOINTMENTS_RESET,
  payload: null,
});

// Get Staff users list
const getStaffUsersRequest = () => ({
  type: TYPES.GET_STAFF_USERS_REQUEST,
  payload: null,
});
const getStaffUsersSuccess = (staffUsersList, staffPages) => ({
  type: TYPES.GET_STAFF_USERS_SUCCESS,
  payload: { staffUsersList, staffPages },
});
const getStaffUsersError = (error) => ({
  type: TYPES.GET_STAFF_USERS_ERROR,
  payload: { error },
});
const getStaffUsersReset = () => ({
  type: TYPES.GET_STAFF_USERS_RESET,
  payload: null,
});

// Change appointments status
const changeAppointmentStatusRequest = () => ({
  type: TYPES.CHANGE_APPOINTMENT_STATUS_REQUEST,
  payload: null,
});
const changeAppointmentStatusSuccess = (status) => ({
  type: TYPES.CHANGE_APPOINTMENT_STATUS_SUCCESS,
  payload: { status },
});
const changeAppointmentStatusError = (error) => ({
  type: TYPES.CHANGE_APPOINTMENT_STATUS_ERROR,
  payload: { error },
});
const changeAppointmentStatusReset = () => ({
  type: TYPES.CHANGE_APPOINTMENT_STATUS_RESET,
  payload: null,
});

export const getAppointment = (pageNumber) => async (dispatch) => {
  dispatch(getAppointmentRequest());
  try {
    const res = await AppointmentController.getAppointment(pageNumber);

    const currentPages = res?.payload?.current_page;
    const totalPages = res?.payload?.total_pages;
    const pages = { currentPages: currentPages, totalPages: totalPages };
    dispatch(getAppointmentSuccess(res?.payload?.data, pages));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAppointmentReset());
    }
    dispatch(getAppointmentError(error.message));
  }
};

export const getStaffUsersList = (pageNumber) => async (dispatch) => {
  dispatch(getStaffUsersRequest());
  try {
    const res = await AppointmentController.getAllStaffUsers(pageNumber);

    const currentPages = res?.payload?.current_page;
    const totalPages = res?.payload?.total_pages;
    const pages = { currentPages: currentPages, totalPages: totalPages };
    dispatch(getStaffUsersSuccess(res?.payload?.pos_staff, pages));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getStaffUsersReset());
    }
    dispatch(getStaffUsersError(error.message));
  }
};

export const changeAppointmentStatus = (appointmentId, status) => async (dispatch) => {
  dispatch(changeAppointmentStatusRequest());
  try {
    const res = await AppointmentController.changeAppointmentAPI(appointmentId, status);
    dispatch(changeAppointmentStatusSuccess(res?.payload));
    dispatch(getAppointment());
    Toast.show({
      text2:
        status === APPOINTMENT_STATUS.ACCEPTED_BY_SELLER
          ? 'Appointment approved'
          : 'Appointment Rejected',
      position: 'bottom',
      type: 'success_toast',
      visibilityTime: 2500,
    });
  } catch (error) {
    Toast.show({
      text2: error.msg,
      position: 'bottom',
      type: 'error_toast',
      visibilityTime: 9000,
    });
    if (error?.statusCode === 204) {
      dispatch(changeAppointmentStatusReset());
    }
    dispatch(changeAppointmentStatusError(error.message));
  }
};

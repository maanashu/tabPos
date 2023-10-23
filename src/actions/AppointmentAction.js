import { APPOINTMENT_STATUS } from '@/constants/status';
import { AppointmentController } from '@/controllers';
import { TYPES } from '@/Types/AppointmentTypes';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getPendingOrders } from './DashboardAction';
import { store } from '@/store';

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

// get all appointments by staff id
const getAppointmentByStaffIdRequest = () => ({
  type: TYPES.GET_APPOINTMENTS_BY_STAFF_ID_REQUEST,
  payload: null,
});
const getAppointmentByStaffIdSuccess = (appointmentsById, staffAppointmentPages) => ({
  type: TYPES.GET_APPOINTMENTS_BY_STAFF_ID_SUCCESS,
  payload: { appointmentsById, staffAppointmentPages },
});
const getAppointmentByStaffIdError = (error) => ({
  type: TYPES.GET_APPOINTMENTS_BY_STAFF_ID_ERROR,
  payload: { error },
});
const getAppointmentByStaffIdReset = () => ({
  type: TYPES.GET_APPOINTMENTS_BY_STAFF_ID_RESET,
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

// Get Staff users list
const createPosUserRequest = () => ({
  type: TYPES.CREATE_POS_USER_REQUEST,
  payload: null,
});
const createPosUserSuccess = (data) => ({
  type: TYPES.CREATE_POS_USER_SUCCESS,
  payload: { data },
});
const createPosUserError = (error) => ({
  type: TYPES.CREATE_POS_USER_ERROR,
  payload: { error },
});
const createPosUserReset = () => ({
  type: TYPES.CREATE_POS_USER_RESET,
  payload: null,
});

// Get Staff users list
const getPosUserRoleRequest = () => ({
  type: TYPES.GET_POS_USER_ROLE_REQUEST,
  payload: null,
});
const getPosUserRoleSuccess = (data) => ({
  type: TYPES.GET_POS_USER_ROLE_SUCCESS,
  payload: { data },
});
const getPosUserRoleError = (error) => ({
  type: TYPES.GET_POS_USER_ROLE_ERROR,
  payload: { error },
});
const getPosUserRoleReset = () => ({
  type: TYPES.GET_POS_USER_ROLE_RESET,
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

// Reschedule Appointments
const resheduleAppointmentRequest = () => ({
  type: TYPES.RESCHEDULE_APPOINTMENT_REQUEST,
  payload: null,
});
const resheduleAppointmentSuccess = (status) => ({
  type: TYPES.RESCHEDULE_APPOINTMENT_SUCCESS,
  payload: { status },
});
const resheduleAppointmentError = (error) => ({
  type: TYPES.RESCHEDULE_APPOINTMENT_ERROR,
  payload: { error },
});

// Send Checkin OTP
const sendCheckinOTPRequest = () => ({
  type: TYPES.SEND_CHECKIN_OTP_REQUEST,
  payload: null,
});
const sendCheckinOTPSuccess = (status) => ({
  type: TYPES.SEND_CHECKIN_OTP_SUCCESS,
  payload: { status },
});
const sendCheckinOTPError = (error) => ({
  type: TYPES.SEND_CHECKIN_OTP_ERROR,
  payload: { error },
});

// Verify Checkin OTP
const verifyCheckinOTPRequest = () => ({
  type: TYPES.VERIFY_CHECKIN_OTP_REQUEST,
  payload: null,
});
const verifyCheckinOTPSuccess = (status) => ({
  type: TYPES.VERIFY_CHECKIN_OTP_SUCCESS,
  payload: { status },
});
const verifyCheckinOTPError = (error) => ({
  type: TYPES.VERIFY_CHECKIN_OTP_ERROR,
  payload: { error },
});

export const getAppointment =
  (pageNumber = 1) =>
  async (dispatch) => {
    dispatch(getAppointmentRequest());
    try {
      const sellerId = store.getState().auth?.merchantLoginData?.uniqe_id;
      const res = await AppointmentController.getAppointment(pageNumber);
      const currentPages = res?.payload?.current_page;
      const totalPages = res?.payload?.total_pages;
      const pages = { currentPages: currentPages, totalPages: totalPages };
      dispatch(getAppointmentSuccess(res?.payload?.data, pages));
      dispatch(getPendingOrders(sellerId));
    } catch (error) {
      if (error?.statusCode === 204) {
        dispatch(getAppointmentReset());
      }
      // Toast.show({
      //   text2: error?.msg || 'Something went wrong while fetching appointments',
      //   position: 'bottom',
      //   type: 'error_toast',
      //   visibilityTime: 9000,
      // });
      dispatch(getAppointmentError(error?.message));
    }
  };

export const searchAppointments =
  (pageNumber = 1, searchText = '', callback) =>
  async (dispatch) => {
    try {
      const res = await AppointmentController.getAppointment(pageNumber, null, searchText);
      callback && callback(res?.payload);
    } catch (error) {
      if (error?.statusCode === 204) {
        console.log('there is no data in search results');
      }
      console.log('Error in search results', error);
    }
  };

export const getAppointmentByStaffId = (pageNumber, posUserId) => async (dispatch) => {
  dispatch(getAppointmentByStaffIdRequest());
  try {
    const res = await AppointmentController.getAppointment(pageNumber, posUserId);

    const currentPages = res?.payload?.current_page;
    const totalPages = res?.payload?.total_pages;
    const pages = { currentPages: currentPages, totalPages: totalPages };
    dispatch(getAppointmentByStaffIdSuccess(res?.payload?.data, pages));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAppointmentByStaffIdReset());
    }
    dispatch(getAppointmentByStaffIdError(error.message));
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

export const creatPostUser = (data) => async (dispatch) => {
  dispatch(createPosUserRequest());
  try {
    const res = await AppointmentController.createPossUser(data);
    dispatch(createPosUserSuccess(res?.payload));
    return res?.payload;
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(createPosUserReset());
    }
    return error;
    dispatch(createPosUserError(error.message));
  }
};

export const getPosUserRole = (data) => async (dispatch) => {
  dispatch(getPosUserRoleRequest());
  try {
    const res = await AppointmentController.getPosUserRoles(data);
    dispatch(getPosUserRoleSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getPosUserRoleReset());
    }
    dispatch(getPosUserRoleError(error.message));
  }
};

const getAppointmentStatusMessage = (status) => {
  if (status === APPOINTMENT_STATUS.ACCEPTED_BY_SELLER) {
    return 'Appointment approved';
  } else if (status === APPOINTMENT_STATUS.REJECTED_BY_SELLER) {
    return 'Appointment Rejected';
  } else if (status === APPOINTMENT_STATUS.COMPLETED) {
    return 'Appointment Completed';
  } else if (status === APPOINTMENT_STATUS.CHECKED_IN) {
    return 'Appointment Checked In';
  }
};

export const changeAppointmentStatus = (appointmentId, status) => async (dispatch) => {
  dispatch(changeAppointmentStatusRequest());

  try {
    const res = await AppointmentController.changeAppointmentAPI(appointmentId, status);
    dispatch(changeAppointmentStatusSuccess(res?.payload));
    dispatch(getAppointment());
    dispatch(getStaffUsersList());
    Toast.show({
      text2: getAppointmentStatusMessage(status),
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

export const rescheduleAppointment = (appointmentId, params) => async (dispatch) => {
  dispatch(resheduleAppointmentRequest());
  try {
    const res = await AppointmentController.rescheduleAppointmentAPI(appointmentId, params);
    dispatch(resheduleAppointmentSuccess(res?.payload));
    dispatch(getAppointment());
    Toast.show({
      text2: 'Appointment Rescheduled',
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
    dispatch(resheduleAppointmentError(error.message));
  }
};

export const sendCheckinOTP = (appointmentId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(sendCheckinOTPRequest());
    try {
      const res = await AppointmentController.sendCheckinOTPAPI(appointmentId);
      dispatch(sendCheckinOTPSuccess(res));
      Toast.show({
        text2: res?.msg,
        position: 'bottom',
        type: 'success_toast',
        visibilityTime: 2500,
      });
      resolve(res);
    } catch (error) {
      Toast.show({
        text2: error.msg,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 9000,
      });
      dispatch(sendCheckinOTPError(error.message));
      reject(error);
    }
  });
};

export const verifyCheckinOTP = (params) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(verifyCheckinOTPRequest());
    try {
      const res = await AppointmentController.verifyCheckinOTPAPI(params);
      dispatch(verifyCheckinOTPSuccess(res));
      dispatch(getAppointment());
      Toast.show({
        text2: res?.msg,
        position: 'bottom',
        type: 'success_toast',
        visibilityTime: 2500,
      });
      resolve(res);
    } catch (error) {
      Toast.show({
        text2: error?.msg,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 9000,
      });
      dispatch(verifyCheckinOTPError(error?.msg));
      reject(error);
    }
  });
};

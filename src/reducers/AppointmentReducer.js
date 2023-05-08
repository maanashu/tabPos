import { TYPES } from '@/Types/AppointmentTypes';

const INITIALSTATE = {
  getAppointment: [],
  appointmentStatus: null,
};

export const appointmentReducer = (
  state = { INITIALSTATE },
  { payload, type }
) => {
  switch (type) {
    case TYPES.GET_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        getAppointment: payload.getAppointment,
      };
    case TYPES.GET_APPOINTMENTS_RESET:
      return {
        ...state,
        getAppointment: [],
      };
    case TYPES.CHANGE_APPOINTMENT_STATUS_SUCCESS:
      return {
        ...state,
        appointmentStatus: payload.status,
      };
    case TYPES.CHANGE_APPOINTMENT_STATUS_RESET:
      return {
        ...state,
        appointmentStatus: null,
      };

    default:
      return state;
  }
};

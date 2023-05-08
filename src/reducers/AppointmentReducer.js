import { TYPES } from '@/Types/AppointmentTypes';

const INITIALSTATE = {
  getAppointment: [],
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

    default:
      return state;
  }
};

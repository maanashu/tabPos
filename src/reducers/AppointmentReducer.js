import { TYPES } from '@/Types/AppointmentTypes';

const INITIALSTATE = {
  getAppointment: [],
  orderData: {},
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
    case TYPES.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderData: payload.orderData,
      };
    case TYPES.CREATE_ORDER_RESET:
      return {
        ...state,
        orderData: {},
      };

    default:
      return state;
  }
};

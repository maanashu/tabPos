import { TYPES } from '@/Types/AppointmentTypes';

const INITIALSTATE = {
  getAppointment: [],
  appointmentStatus: null,
};

export const appointmentReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_APPOINTMENTS_SUCCESS:
      const { getAppointment } = state;
      const { appointments, pages } = payload;

      // Merge the existing data with the new data based on the unique identifier 'id'
      const mergedAppointments = getAppointment.map(
        (existingItem) =>
          appointments.find((newItem) => existingItem.id === newItem.id) || existingItem
      );

      // Add any new unique appointments that were not in the existing data
      const newUniqueAppointments = appointments.filter(
        (newItem) => !getAppointment.some((existingItem) => existingItem.id === newItem.id)
      );

      return {
        ...state,
        getAppointment: [...mergedAppointments, ...newUniqueAppointments],
        pages: pages,
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

import { TYPES } from '@/Types/AppointmentTypes';

const INITIALSTATE = {
  getAppointment: [],
  geAppointmentById: [],
  appointmentStatus: null,
  staffUsers: [],
  posUserRole: null,
};

export const appointmentReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_APPOINTMENTS_SUCCESS:
      const { getAppointment } = state;
      const { appointments, pages } = payload;

      let updatedAppointments;

      // Check if the page number is 1
      if (pages?.currentPages === 1) {
        // If it's page 1, replace the existing data with the new data
        updatedAppointments = appointments;
      } else {
        // If it's not page 1, merge the existing data with the new data based on 'id'
        const mergedAppointments = getAppointment.map(
          (existingItem) =>
            appointments.find((newItem) => existingItem.id === newItem.id) || existingItem
        );

        // Add any new unique appointments that were not in the existing data
        const newUniqueAppointments = appointments.filter(
          (newItem) => !getAppointment.some((existingItem) => existingItem.id === newItem.id)
        );

        updatedAppointments = [...mergedAppointments, ...newUniqueAppointments];
      }

      return {
        ...state,
        getAppointment: updatedAppointments,
        pages: pages,
      };

    case TYPES.GET_APPOINTMENTS_RESET:
      return {
        ...state,
        getAppointment: [],
      };

    case TYPES.GET_APPOINTMENTS_BY_STAFF_ID_SUCCESS:
      const { appointmentsById, staffAppointmentPages } = payload;

      return {
        ...state,
        geAppointmentById: appointmentsById,
        staffAppointmentPages: staffAppointmentPages,
      };
    case TYPES.GET_APPOINTMENTS_BY_STAFF_ID_RESET:
      return {
        ...state,
        geAppointmentById: [],
      };
    case TYPES.GET_STAFF_USERS_SUCCESS:
      const { staffUsersList, staffPages } = payload;

      return {
        ...state,
        staffUsers: staffUsersList,
        staffPages: staffPages,
      };
    case TYPES.GET_STAFF_USERS_RESET:
      return {
        ...state,
        staffUsers: [],
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

    case TYPES.GET_POS_USER_ROLE_SUCCESS:
      return {
        ...state,
        posUserRole: payload.data,
      };
    default:
      return state;
  }
};

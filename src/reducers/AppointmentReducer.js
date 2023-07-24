import { TYPES } from '@/Types/AppointmentTypes';

const INITIALSTATE = {
  getAppointment: [],
  geAppointmentById: [],
  appointmentStatus: null,
  staffUsers: [],
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

    case TYPES.GET_APPOINTMENTS_BY_STAFF_ID_SUCCESS:
      const { geAppointmentById } = state;
      const { appointmentsById, staffAppointmentPages } = payload;

      // Merge the existing data with the new data based on the unique identifier 'id'
      const mergedAppointmentsByID = geAppointmentById.map(
        (existingItem) =>
          appointmentsById.find((newItem) => existingItem.id === newItem.id) || existingItem
      );

      // Add any new unique appointments that were not in the existing data
      const newUniqueAppointmentsByID = appointmentsById.filter(
        (newItem) => !geAppointmentById.some((existingItem) => existingItem.id === newItem.id)
      );

      return {
        ...state,
        geAppointmentById: [...mergedAppointmentsByID, ...newUniqueAppointmentsByID],
        staffAppointmentPages: staffAppointmentPages,
      };
    case TYPES.GET_APPOINTMENTS_BY_STAFF_ID_RESET:
      return {
        ...state,
        geAppointmentById: [],
      };
    case TYPES.GET_STAFF_USERS_SUCCESS:
      const { staffUsers } = state;
      const { staffUsersList, staffPages } = payload;

      // Merge the existing data with the new data based on the unique identifier 'id'
      const mergedStaffUsers = staffUsers.map(
        (existingItem) =>
          staffUsersList.find((newItem) => existingItem.id === newItem.id) || existingItem
      );

      // Add any new unique Staff users that were not in the existing data
      const newUniqueStaffUsers = staffUsersList.filter(
        (newItem) => !staffUsers.some((existingItem) => existingItem.id === newItem.id)
      );

      return {
        ...state,
        staffUsers: [...mergedStaffUsers, ...newUniqueStaffUsers],
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

    default:
      return state;
  }
};

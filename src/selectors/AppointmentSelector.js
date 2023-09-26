export const getAppointmentSelector = (state) => {
  return Object.keys(state.appointment).length > 0 ? state.appointment : null;
};

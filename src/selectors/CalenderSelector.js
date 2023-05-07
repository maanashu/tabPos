export const getCalender = state => {
  return Object.keys(state.calender).length > 0 ? state.calender : null;
};

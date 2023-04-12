export const getCashTracking = state => {
  return Object.keys(state.cashTracking).length > 0 ? state.cashTracking : null;
};

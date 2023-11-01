export const getDashboard = (state) => {
  return Object.keys(state.dashboard).length > 0 ? state.dashboard : null;
};

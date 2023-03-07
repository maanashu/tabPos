export const getAnalytics = state => {
  return Object.keys(state.analytics).length > 0 ? state.analytics : null;
};

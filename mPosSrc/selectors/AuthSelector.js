export const getAuthData = state => {
  return Object.keys(state.auth).length > 0 ? state.auth : null;
};

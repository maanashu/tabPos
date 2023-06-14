export const getSetting = state => {
  return Object.keys(state.setting).length > 0 ? state.setting : null;
};

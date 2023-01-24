export const getRetail = state => {
  return Object.keys(state.retail).length > 0 ? state.retail : null;
};

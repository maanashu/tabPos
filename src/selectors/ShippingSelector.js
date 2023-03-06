export const getShipping = state => {
  return Object.keys(state.shipping).length > 0 ? state.shipping : null;
};

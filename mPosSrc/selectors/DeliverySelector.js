export const getDelivery = (state) => {
  return Object.keys(state.delivery).length > 0 ? state.delivery : null;
};

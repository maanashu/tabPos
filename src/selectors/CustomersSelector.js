export const getCustomers = state => {
  return Object.keys(state.customers).length > 0 ? state.customers : null;
};

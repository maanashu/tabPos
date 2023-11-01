export const getWalletData = (state) => {
  return Object.keys(state.wallet).length > 0 ? state.wallet : null;
};

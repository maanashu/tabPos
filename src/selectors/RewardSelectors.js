export const getReward = state => {
  return Object.keys(state.reward).length > 0 ? state.reward : null;
};

export const getAllPlansData = (state) => {
  return Object.keys(state.plan).length > 0 ? state.plan : null;
};

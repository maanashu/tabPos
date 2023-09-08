export const getMessagesData = (state) => {
  return Object.keys(state.chat).length > 0 ? state.chat : null;
};

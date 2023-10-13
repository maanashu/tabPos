import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  sendChat: {},
  getMessages: [],
  deleteMessages: {},
  getOneManufactureDetails: {},
  getMessageHeads: [],
};
export const chatReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
    case TYPES.SEND_CHAT_SUCCESS:
      return {
        ...state,
        sendChat: payload.sendChat,
      };
    case TYPES.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        getMessages: payload.getMessages?.payload,
      };
    case TYPES.GET_MESSAGES_RESET:
      return {
        ...state,
        getMessages: [],
      };
    case TYPES.GET_MESSAGES_HEADS_SUCCESS:
      return {
        ...state,
        getMessageHeads: payload?.getMessageHeads?.payload?.data,
      };
  }
};

import { ChatController } from '@/controllers/ChatController';
import { TYPES } from '@/Types/Types';

const sendChatRequest = () => ({
  type: TYPES.SEND_CHAT_REQUEST,
  payload: null,
});

const sendChatSuccess = (sendChat) => ({
  type: TYPES.SEND_CHAT_SUCCESS,
  payload: { sendChat },
});

const sendChatError = (error) => ({
  type: TYPES.SEND_CHAT_ERROR,
  payload: { error },
});

const getMessagesRequest = () => ({
  type: TYPES.GET_MESSAGES_REQUEST,
  payload: null,
});

const getMessagesSuccess = (getMessages) => ({
  type: TYPES.GET_MESSAGES_SUCCESS,
  payload: { getMessages },
});

const getMessagesError = (error) => ({
  type: TYPES.GET_MESSAGES_ERROR,
  payload: { error },
});

export const getMessagesReset = () => ({
  type: TYPES.GET_MESSAGES_RESET,
  payload: null,
});

const getMessagesHeadsRequest = () => ({
  type: TYPES.GET_MESSAGES_HEADS_REQUEST,
  payload: null,
});

const getMessagesHeadsSuccess = (getMessageHeads) => ({
  type: TYPES.GET_MESSAGES_HEADS_SUCCESS,
  payload: { getMessageHeads },
});

const getMessagesHeadsError = (error) => ({
  type: TYPES.GET_MESSAGES_HEADS_ERROR,
  payload: { error },
});
export const sendChat = (data) => async (dispatch) => {
  dispatch(sendChatRequest());
  return ChatController.sendChat(data)
    .then((res) => {
      dispatch(sendChatSuccess(res?.payload));
      return res;
    })
    .catch((error) => {
      dispatch(sendChatError(error.message));
      throw error;
    });
};

export const getMessages = (id) => async (dispatch) => {
  dispatch(getMessagesRequest());
  return await ChatController.getMessages(id)
    .then((res) => {
      dispatch(getMessagesSuccess(res));
      return res;
    })
    .catch((error) => {
      if (error?.statusCode === 204) {
        dispatch(getMessagesReset());
      } else {
        dispatch(getMessagesError(error.message));
      }
      throw error;
    });
};
export const getMessageHeads = () => async (dispatch) => {
  dispatch(getMessagesHeadsRequest());
  try {
    const res = await ChatController.getMessageHeads();
    dispatch(getMessagesHeadsSuccess(res));
  } catch (error) {
    dispatch(getMessagesHeadsError(error.message));
  }
};

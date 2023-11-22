import { TYPES } from '@/Types/SupportTypes';
import { SupportController } from '@/controllers/SupportController';

const getSupportListRequest = () => ({
  type: TYPES.GET_SUPPORTLIST_REQUEST,
  payload: null,
});

const getSupportListError = (error) => ({
  type: TYPES.GET_SUPPORTLIST_ERROR,
  payload: { error },
});

const getSupportListSuccess = (ticketsList) => ({
  type: TYPES.GET_SUPPORTLIST_SUCCESS,
  payload: { ticketsList },
});

export const getSupportList = () => async (dispatch) => {
  dispatch(getSupportListRequest());
  try {
    const res = await SupportController.getSupportList();
    dispatch(getSupportListSuccess(res));
  } catch (error) {
    dispatch(getSupportListError(error.message));
  }
};

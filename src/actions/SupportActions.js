import { TYPES } from '@/Types/SupportTypes';
import { SupportController } from '@/controllers/SupportController';

const getSubjectsRequest = () => ({
  type: TYPES.GET_SUBJECT_REQUEST,
  payload: null,
});

const getSubjectsError = (error) => ({
  type: TYPES.GET_SUBJECT_ERROR,
  payload: { error },
});

const getSubjectsSuccess = (subject) => ({
  type: TYPES.GET_SUBJECT_SUCCESS,
  payload: { subject },
});

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
const getDepartmentsRequest = () => ({
  type: TYPES.GET_DEPARTMENTS_REQUEST,
  payload: null,
});

const getDepartmentsError = (error) => ({
  type: TYPES.GET_DEPARTMENTS_ERROR,
  payload: { error },
});

const getDepartmentsSuccess = (departments) => ({
  type: TYPES.GET_DEPARTMENTS_SUCCESS,
  payload: { departments },
});

const addNewTicketRequest = () => ({
  type: TYPES.ADD_NEW_TICKET_REQUEST,
  payload: null,
});
const getAddNewTicketError = (error) => ({
  type: TYPES.ADD_NEW_TICKET_ERROR,
  payload: { error },
});
const getAddNewTicketSuccess = (ticket) => ({
  type: TYPES.ADD_NEW_TICKET_SUCCESS,
  payload: { ticket },
});

export const getSubjects = () => async (dispatch) => {
  dispatch(getSubjectsRequest());
  try {
    const res = await SupportController.getSubjects();
    dispatch(getSubjectsSuccess(res));
  } catch (error) {
    dispatch(getSubjectsError(error.message));
  }
};
export const getDepartments = () => async (dispatch) => {
  dispatch(getDepartmentsRequest());
  try {
    const res = await SupportController.getDepartments();
    dispatch(getDepartmentsSuccess(res));
  } catch (error) {
    dispatch(getDepartmentsError(error.message));
  }
};

export const addNewTicket = (data, callback) => async (dispatch) => {
  dispatch(addNewTicketRequest());
  try {
    const res = await SupportController.addNewTicket(data);
    dispatch(getAddNewTicketSuccess(res));
    dispatch(getSupportList());
    callback && callback(res);
  } catch (error) {
    dispatch(getAddNewTicketError(error.message));
  }
};

export const getSupportList = () => async (dispatch) => {
  dispatch(getSupportListRequest());
  try {
    const res = await SupportController.getSupportList();
    dispatch(getSupportListSuccess(res));
  } catch (error) {
    dispatch(getSupportListError(error.message));
  }
};

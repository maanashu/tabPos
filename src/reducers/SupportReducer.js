import { TYPES } from '@/Types/SupportTypes';

const INITIALSTATE = {
  ticketsList: {},
  subjects: [],
  departments: [],
};

export const supportReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_SUPPORTLIST_SUCCESS:
      return {
        ...state,
        ticketsList: payload.ticketsList?.payload,
      };
    case TYPES.GET_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: payload.subject.payload.data,
      };
    case TYPES.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: payload.departments.payload,
      };
    default:
      return state;
  }
};

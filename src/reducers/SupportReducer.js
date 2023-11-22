import { TYPES } from '@/Types/SupportTypes';

const INITIALSTATE = {
  ticketsList: {},
};

export const supportReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_SUPPORTLIST_SUCCESS:
      return {
        ...state,
        ticketsList: payload.ticketsList?.payload,
      };

    default:
      return state;
  }
};

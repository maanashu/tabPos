import { TYPES } from '@/Types/WalletTypes';

const INITIALSTATE = {
  getTotalTra: {},
};

export const walletReducer = (state = { INITIALSTATE }, { payload, type }) => {
  switch (type) {
    case TYPES.GET_TOTAL_TRA_SUCCESS:
      return {
        ...state,
        getTotalTra: payload.getTotalTra,
      };
    case TYPES.GET_TOTAL_TRA_RESET:
      return {
        ...state,
        getTotalTra: {},
      };

    // case TYPES.CLEAR_STORE:
    //   return INITIALSTATE;

    default:
      return state;
  }
};

import { TYPES } from '@/Types/WalletTypes';

const INITIALSTATE = {
  getTotalTra: {},
  getTotakTraDetail:[],
  getTotalTraType:[]
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

      case TYPES.GET_TOTAL_TRA_DETAIL_SUCCESS:
        return {
          ...state,
          getTotakTraDetail: payload.getTotakTraDetail,
        };
      case TYPES.GET_TOTAL_TRA_DETAIL_RESET:
        return {
          ...state,
          getTotakTraDetail: [],
        };

        case TYPES.GET_TOTAL_TRA_TYPE_SUCCESS:
          return {
            ...state,
            getTotalTraType: payload.getTotalTraType,
          };
        case TYPES.GET_TOTAL_TRA_TYPE_RESET:
          return {
            ...state,
            getTotalTraType: [],
          };

 

    default:
      return state;
  }
};

import { WALLET_TYPES } from '@mPOS/Types/WalletTypes';

const INITIALSTATE = {
  walletAnalytics: {},
  transactionList: {},
  transactionType: {},
  invoiceSearchOrders: {},
};

export const walletReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case WALLET_TYPES.WALLET_ANALYTICS_SUCCESS:
      return {
        ...state,
        walletAnalytics: payload?.walletAnalytics,
      };
    case WALLET_TYPES.GET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        transactionList: payload?.transactionList,
      };
    case WALLET_TYPES.GET_TRANSACTION_LIST_RESET:
      return {
        ...state,
        transactionList: {},
      };
    case WALLET_TYPES.GET_TRANSACTION_TYPE_SUCCESS:
      return {
        ...state,
        transactionType: payload?.transactionType,
      };
    case WALLET_TYPES.GET_TRANSACTION_TYPE_RESET:
      return {
        ...state,
        transactionType: {},
      };
    case WALLET_TYPES.GET_ORDERS_BY_INVOICE_ID_SUCCESS:
      return {
        ...state,
        invoiceSearchOrders: payload?.invoiceSearchOrders,
      };
    case WALLET_TYPES.GET_ORDERS_BY_INVOICE_ID_RESET:
      return {
        ...state,
        invoiceSearchOrders: {},
      };

    default:
      return state;
  }
};

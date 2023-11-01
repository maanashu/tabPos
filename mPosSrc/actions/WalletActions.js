import { WALLET_TYPES } from '@mPOS/Types/WalletTypes';
import { WalletController } from '@mPOS/controllers/WalletController';

const walletAnalyticsRequest = () => ({
  type: WALLET_TYPES.WALLET_ANALYTICS_REQUEST,
  payload: null,
});
const walletAnalyticsSuccess = (walletAnalytics) => ({
  type: WALLET_TYPES.WALLET_ANALYTICS_SUCCESS,
  payload: { walletAnalytics },
});
const walletAnalyticsError = (error) => ({
  type: WALLET_TYPES.WALLET_ANALYTICS_ERROR,
  payload: { error },
});
const walletAnalyticsReset = () => ({
  type: WALLET_TYPES.WALLET_ANALYTICS_RESET,
  payload: null,
});
const TransactionListRequest = () => ({
  type: WALLET_TYPES.GET_TRANSACTION_LIST_REQUEST,
  payload: null,
});
const TransactionListSuccess = (transactionList) => ({
  type: WALLET_TYPES.GET_TRANSACTION_LIST_SUCCESS,
  payload: { transactionList },
});
const TransactionListError = (error) => ({
  type: WALLET_TYPES.GET_TRANSACTION_LIST_ERROR,
  payload: { error },
});
const TransactionListReset = () => ({
  type: WALLET_TYPES.GET_TRANSACTION_LIST_RESET,
  payload: null,
});
const TransactionTypesRequest = () => ({
  type: WALLET_TYPES.GET_TRANSACTION_TYPE_REQUEST,
  payload: null,
});
const TransactionTypesSuccess = (transactionType) => ({
  type: WALLET_TYPES.GET_TRANSACTION_TYPE_SUCCESS,
  payload: { transactionType },
});
const TransactionTypesError = (error) => ({
  type: WALLET_TYPES.GET_TRANSACTION_TYPE_ERROR,
  payload: { error },
});
const TransactionTypesReset = () => ({
  type: WALLET_TYPES.GET_TRANSACTION_TYPE_RESET,
  payload: null,
});
const getOrdersByInvoiceIdRequest = () => ({
  type: WALLET_TYPES.GET_ORDERS_BY_INVOICE_ID_REQUEST,
  payload: null,
});
export const getOrdersByInvoiceIdSuccess = (invoiceSearchOrders) => ({
  type: WALLET_TYPES.GET_ORDERS_BY_INVOICE_ID_SUCCESS,
  payload: { invoiceSearchOrders },
});
const getOrdersByInvoiceIdError = (error) => ({
  type: WALLET_TYPES.GET_ORDERS_BY_INVOICE_ID_ERROR,
  payload: { error },
});
const getOrdersByInvoiceIdReset = () => ({
  type: WALLET_TYPES.GET_ORDERS_BY_INVOICE_ID_RESET,
  payload: null,
});

export const walletAnalytics = (filterVal) => async (dispatch) => {
  dispatch(walletAnalyticsRequest());
  try {
    const res = await WalletController.walletAnalytics(filterVal);
    dispatch(walletAnalyticsSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(walletAnalyticsReset());
    }
    dispatch(walletAnalyticsError(error.message));
  }
};
export const TransactionDetails = (data) => async (dispatch) => {
  dispatch(TransactionListRequest());
  try {
    const res = await WalletController.TransactionDetails(data);
    dispatch(TransactionListSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(TransactionListReset());
    }
    dispatch(TransactionListError(error.message));
  }
};
export const TransactionTypes = (data) => async (dispatch) => {
  dispatch(TransactionTypesRequest());
  try {
    const res = await WalletController.TransactionTypes(data);
    dispatch(TransactionTypesSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(TransactionTypesReset());
    }
    dispatch(TransactionTypesError(error.message));
  }
};
export const getOrdersByInvoiceId = (invoice, callback) => async (dispatch) => {
  dispatch(getOrdersByInvoiceIdRequest());
  try {
    const res = await WalletController.getOrdersByInvoiceId(invoice);
    dispatch(getOrdersByInvoiceIdSuccess(res?.payload));
    callback && callback(res);
  } catch (error) {
    if (error?.msg === 'Invalid invoice number!') {
      dispatch(getOrdersByInvoiceIdReset());
    } else if (error?.statusCode == 204) {
      dispatch(getOrdersByInvoiceIdReset());
    }
    dispatch(getOrdersByInvoiceIdError(error.message));
  }
};

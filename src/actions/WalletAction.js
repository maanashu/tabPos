import { WalletController } from '@/controllers';
import { TYPES } from '@/Types/WalletTypes';

const getTotalTraRequest = () => ({
  type: TYPES.GET_TOTAL_TRA_REQUEST,
  payload: null,
});
const getTotalTraSuccess = (getTotalTra) => ({
  type: TYPES.GET_TOTAL_TRA_SUCCESS,
  payload: { getTotalTra },
});
const getTotalTraError = (error) => ({
  type: TYPES.GET_TOTAL_TRA_ERROR,
  payload: { error },
});
const getTotalTraReset = () => ({
  type: TYPES.GET_TOTAL_TRA_RESET,
  payload: null,
});

const getTotakTraDetailRequest = () => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_REQUEST,
  payload: null,
});
const getTotakTraDetailSuccess = (getTotakTraDetail) => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_SUCCESS,
  payload: { getTotakTraDetail },
});
const getTotakTraDetailError = (error) => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_ERROR,
  payload: { error },
});
const getTotakTraDetailReset = () => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_RESET,
  payload: null,
});

const getTotalTraTypeRequest = () => ({
  type: TYPES.GET_TOTAL_TRA_TYPE_REQUEST,
  payload: null,
});
const getTotalTraTypeSuccess = (getTotalTraType) => ({
  type: TYPES.GET_TOTAL_TRA_TYPE_SUCCESS,
  payload: { getTotalTraType },
});
const getTotalTraTypeError = (error) => ({
  type: TYPES.GET_TOTAL_TRA_TYPE_ERROR,
  payload: { error },
});
const getTotalTraTypeReset = () => ({
  type: TYPES.GET_TOTAL_TRA_TYPE_RESET,
  payload: null,
});

export const getTotalTra = (time, sellerID, date) => async (dispatch) => {
  dispatch(getTotalTraRequest());
  try {
    const res = await WalletController.getTotalTra(time, sellerID, date);
    dispatch(getTotalTraSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTotalTraReset());
    }
    dispatch(getTotalTraError(error.message));
  }
};
export const getTotakTraDetail = (sellerID, data) => async (dispatch) => {
  dispatch(getTotakTraDetailRequest());
  try {
    const res = await WalletController.getTotakTraDetail(sellerID, data);
    dispatch(getTotakTraDetailSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTotakTraDetailReset());
    }
    dispatch(getTotakTraDetailError(error.message));
  }
};
export const getTotalTraType = (data) => async (dispatch) => {
  dispatch(getTotalTraTypeRequest());
  try {
    const res = await WalletController.getTotalTraType(data);
    dispatch(getTotalTraTypeSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTotalTraTypeReset());
    }
    dispatch(getTotalTraTypeError(error.message));
  }
};

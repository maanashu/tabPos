import { WalletController } from '@/controllers';
import { TYPES } from "@/Types/WalletTypes";


const getTotalTraRequest = () => ({
  type: TYPES.GET_TOTAL_TRA_REQUEST,
  payload: null,
});
const getTotalTraSuccess = getTotalTra => ({
  type: TYPES.GET_TOTAL_TRA_SUCCESS,
  payload: { getTotalTra },
});
const getTotalTraError = error => ({
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
const getTotakTraDetailSuccess = getTotakTraDetail => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_SUCCESS,
  payload: { getTotakTraDetail },
});
const getTotakTraDetailError = error => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_ERROR,
  payload: { error },
});
const getTotakTraDetailReset = () => ({
  type: TYPES.GET_TOTAL_TRA_DETAIL_RESET,
  payload: null,
});

export const getTotalTra = (time, sellerID) => async dispatch => {
  dispatch(getTotalTraRequest());
  try {
      const res = await WalletController.getTotalTra(time, sellerID);
      dispatch(getTotalTraSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204){
      dispatch(getTotalTraReset());
    }
      dispatch(getTotalTraError(error.message));
  }
};

export const getTotakTraDetail = (time, sellerID,time3) => async dispatch => {
  dispatch(getTotakTraDetailRequest());
  try {
      const res = await WalletController.getTotakTraDetail(time, sellerID, time3);
      dispatch(getTotakTraDetailSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204){
      dispatch(getTotakTraDetailReset());
    }
      dispatch(getTotakTraDetailError(error.message));
  }
};




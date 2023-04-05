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




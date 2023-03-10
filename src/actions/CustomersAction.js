import { CustomersController } from '@/controllers';
import { TYPES } from "@/Types/CustomersTypes";

const getUserOrderRequest = () => ({
  type: TYPES.GET_USER_ORDER_REQUEST,
  payload: null,
});
const getUserOrderSuccess = getUserOrder => ({
  type: TYPES.GET_USER_ORDER_SUCCESS,
  payload: { getUserOrder },
});
const getUserOrderError = error => ({
  type: TYPES.GET_USER_ORDER_ERROR,
  payload: { error },
});

const getOrderUserRequest = () => ({
  type: TYPES.GET_ORDER_USER_REQUEST,
  payload: null,
});
const getOrderUserSuccess = getOrderUser => ({
  type: TYPES.GET_ORDER_USER_SUCCESS,
  payload: { getOrderUser },
});
const getOrderUserError = error => ({
  type: TYPES.GET_ORDER_USER_ERROR,
  payload: { error },
});
const getOrderUsertReset = () => ({
  type: TYPES.GET_ORDER_USER_RESET,
  payload: null,
});



export const getUserOrder = (sellerID) => async dispatch => {
  dispatch(getUserOrderRequest());
  try {
      const res = await CustomersController.getUserOrder(sellerID);
      dispatch(getUserOrderSuccess(res));
  } catch (error) {
      dispatch(getUserOrderError(error.message));
  }
};

export const getOrderUser = (status, sellerID) => async dispatch => {
  dispatch(getOrderUserRequest());
  try {
      const res = await CustomersController.getOrderUser(status, sellerID);
      dispatch(getOrderUserSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getOrderUsertReset());
      }
        dispatch(getOrderUserError(error.message));
    }
};






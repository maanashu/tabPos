import { CustomersController } from '@/controllers';
import { TYPES } from '@/Types/CustomersTypes';

const getUserOrderRequest = () => ({
  type: TYPES.GET_USER_ORDER_REQUEST,
  payload: null,
});
const getUserOrderSuccess = (getUserOrder) => ({
  type: TYPES.GET_USER_ORDER_SUCCESS,
  payload: { getUserOrder },
});
const getUserOrderError = (error) => ({
  type: TYPES.GET_USER_ORDER_ERROR,
  payload: { error },
});

const getOrderUserRequest = () => ({
  type: TYPES.GET_ORDER_USER_REQUEST,
  payload: null,
});
const getOrderUserSuccess = (getOrderUser) => ({
  type: TYPES.GET_ORDER_USER_SUCCESS,
  payload: { getOrderUser },
});
const getOrderUserError = (error) => ({
  type: TYPES.GET_ORDER_USER_ERROR,
  payload: { error },
});
const getOrderUsertReset = () => ({
  type: TYPES.GET_ORDER_USER_RESET,
  payload: null,
});

const getUserOrderReset = () => ({
  type: TYPES.GET_USER_ORDER_RESET,
  payload: null,
});
const getCustomersRequest = () => ({
  type: TYPES.GET_CUSTOMERS_REQUEST,
  payload: null,
});
const getCustomersSuccess = (getCustomers) => ({
  type: TYPES.GET_CUSTOMERS_SUCCESS,
  payload: { getCustomers },
});
const getCustomersError = (error) => ({
  type: TYPES.GET_CUSTOMERS_ERROR,
  payload: { error },
});

const getAcceptMarketingRequest = () => ({
  type: TYPES.GET_ACCEPTMARKETING_REQUEST,
  payload: null,
});
const getAcceptMarketingSuccess = (getAcceptMarketing) => ({
  type: TYPES.GET_ACCEPTMARKETING_SUCCESS,
  payload: { getAcceptMarketing },
});
const getAcceptMarketingError = (error) => ({
  type: TYPES.GET_ACCEPTMARKETING_ERROR,
  payload: { error },
});
const getAcceptMarketingReset = () => ({
  type: TYPES.GET_ACCEPTMARKETING_RESET,
  payload: null,
});

const marketingUpdateRequest = () => ({
  type: TYPES.GET_MARKETINGUPDATE_REQUEST,
  payload: null,
});
const marketingUpdateSuccess = () => ({
  type: TYPES.GET_MARKETINGUPDATE_SUCCESS,
  payload: null,
});
const marketingUpdateError = (error) => ({
  type: TYPES.GET_MARKETINGUPDATE_ERROR,
  payload: { error },
});

export const getUserOrder = (data) => async (dispatch) => {
  dispatch(getUserOrderRequest());
  try {
    const res = await CustomersController.getUserOrder(data);
    dispatch(getUserOrderSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getUserOrderReset());
    }
    dispatch(getUserOrderError(error.message));
  }
};

export const getOrderUser = (data) => async (dispatch) => {
  dispatch(getOrderUserRequest());
  try {
    const res = await CustomersController.getOrderUser(data);
    dispatch(getOrderUserSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOrderUsertReset());
    }
    dispatch(getOrderUserError(error.message));
  }
};
export const getCustomer = (time, sellerID) => async (dispatch) => {
  dispatch(getCustomersRequest());
  try {
    const res = await CustomersController.getCustomers(time, sellerID);
    dispatch(getCustomersSuccess(res?.payload));
  } catch (error) {
    dispatch(getCustomersError(error.message));
  }
};

export const getAcceptMarketing = (data) => async (dispatch) => {
  dispatch(getAcceptMarketingRequest());
  try {
    const res = await CustomersController.getAcceptMarketing(data);
    dispatch(getAcceptMarketingSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAcceptMarketingReset());
    }
    dispatch(getAcceptMarketingError(error.message));
  }
};

export const marketingUpdate = (data) => async (dispatch) => {
  dispatch(marketingUpdateRequest());
  try {
    const res = await CustomersController.marketingUpdate(data);
    return dispatch(marketingUpdateSuccess(res));
    // const data = {
    //   userid: res?.payload?.user_id,
    //   sellerid: res?.payload?.seller_id,
    // };
    // dispatch(getAcceptMarketing(data));
  } catch (error) {
    dispatch(marketingUpdateError(error.message));
  }
};

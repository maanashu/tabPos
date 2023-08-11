import { DashboardController } from '@/controllers';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';

const getOrderDeliveriesRequest = () => ({
  type: DASHBOARDTYPE.GET_ORDER_DELIVERIES_REQUEST,
  payload: null,
});
const getOrderDeliveriesSuccess = (getOrderDeliveries) => ({
  type: DASHBOARDTYPE.GET_ORDER_DELIVERIES_SUCCESS,
  payload: { getOrderDeliveries },
});
const getOrderDeliveriesError = (error) => ({
  type: DASHBOARDTYPE.GET_ORDER_DELIVERIES_ERROR,
  payload: { error },
});
const getOrderDeliveriesReset = () => ({
  type: DASHBOARDTYPE.GET_ORDER_DELIVERIES_RESET,
  payload: null,
});

const getDrawerSessionRequest = () => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_REQUEST,
  payload: null,
});
export const getDrawerSessionSuccess = (getSesssion) => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_SUCCESS,
  payload: { getSesssion },
});
const getDrawerSessionError = (error) => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_ERROR,
  payload: { error },
});
const getDrawerSessionReset = () => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_RESET,
  payload: null,
});

const getDrawerSessionPostRequest = () => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_POST_REQUEST,
  payload: null,
});
const getDrawerSessionPostSuccess = () => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_POST_SUCCESS,
  payload: {},
});
const getDrawerSessionPostError = (error) => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_POST_ERROR,
  payload: { error },
});
const getDrawerSessionPostReset = () => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_POST_RESET,
  payload: null,
});

const startstarckingSessionRequest = () => ({
  type: DASHBOARDTYPE.START_TRACKING_SESSION_REQUEST,
  payload: null,
});
const startstarckingSessionSuccess = () => ({
  type: DASHBOARDTYPE.START_TRACKING_SESSION_SUCCESS,
  payload: {},
});
const startstarckingSessionError = (error) => ({
  type: DASHBOARDTYPE.START_TRACKING_SESSION_ERROR,
  payload: { error },
});

const getTotalSaleRequest = () => ({
  type: DASHBOARDTYPE.GET_TOTAL_SALE_REQUEST,
  payload: null,
});
const getTotalSaleSuccess = (getTotalSale) => ({
  type: DASHBOARDTYPE.GET_TOTAL_SALE_SUCCESS,
  payload: { getTotalSale },
});
const getTotalSaleError = (error) => ({
  type: DASHBOARDTYPE.GET_TOTAL_SALE_ERROR,
  payload: { error },
});
const getTotalSaleReset = () => ({
  type: DASHBOARDTYPE.GET_TOTAL_SALE_RESET,
  payload: null,
});

const posLoginDetailRequest = () => ({
  type: DASHBOARDTYPE.POS_LOGIN_DETAIL_REQUEST,
  payload: null,
});
const posLoginDetailSuccess = (posLoginDetail) => ({
  type: DASHBOARDTYPE.POS_LOGIN_DETAIL_SUCCESS,
  payload: { posLoginDetail },
});
const posLoginDetailError = (error) => ({
  type: DASHBOARDTYPE.POS_LOGIN_DETAIL_ERROR,
  payload: { error },
});
const posLoginDetailReset = () => ({
  type: DASHBOARDTYPE.POS_LOGIN_DETAIL_RESET,
  payload: null,
});

const searchProductListRequest = () => ({
  type: DASHBOARDTYPE.SEARCH_PRODUCT_LIST_REQUEST,
  payload: null,
});
const searchProductListSuccess = (searchProductList) => ({
  type: DASHBOARDTYPE.SEARCH_PRODUCT_LIST_SUCCESS,
  payload: { searchProductList },
});
const searchProductListError = (error) => ({
  type: DASHBOARDTYPE.SEARCH_PRODUCT_LIST_ERROR,
  payload: { error },
});
const searchProductListReset = () => ({
  type: DASHBOARDTYPE.SEARCH_PRODUCT_LIST_RESET,
  payload: null,
});

const addSellingSelectionRequest = () => ({
  type: DASHBOARDTYPE.ADD_SELLING_SELECTION_REQUEST,
  payload: null,
});
const addSellingSelectionSuccess = (selection) => ({
  type: DASHBOARDTYPE.ADD_SELLING_SELECTION_SUCCESS,
  payload: { selection },
});
const addSellingSelectionError = (error) => ({
  type: DASHBOARDTYPE.ADD_SELLING_SELECTION_ERROR,
  payload: { error },
});

const onLineOrdersRequest = () => ({
  type: DASHBOARDTYPE.ONLINE_ORDERS_REQUEST,
  payload: null,
});
const onLineOrdersSuccess = (onLineOrders) => ({
  type: DASHBOARDTYPE.ONLINE_ORDERS_SUCCESS,
  payload: { onLineOrders },
});
const onLineOrdersError = (error) => ({
  type: DASHBOARDTYPE.ONLINE_ORDERS_ERROR,
  payload: { error },
});

const getPendingOrdersRequest = () => ({
  type: DASHBOARDTYPE.PENDING_ORDERS_REQUEST,
  payload: null,
});
const getPendingOrdersSuccess = (pendingOrders) => ({
  type: DASHBOARDTYPE.PENDING_ORDERS_SUCCESS,
  payload: { pendingOrders },
});
const getPendingOrdersError = (error) => ({
  type: DASHBOARDTYPE.PENDING_ORDERS_ERROR,
  payload: { error },
});

export const getOrderDeliveries = (sellerID, page) => async (dispatch) => {
  dispatch(getOrderDeliveriesRequest());
  try {
    const res = await DashboardController.getOrderDeliveries(sellerID, page);
    dispatch(getOrderDeliveriesSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOrderDeliveriesReset());
    }
    dispatch(getOrderDeliveriesError(error.message));
  }
};
export const getDrawerSession = () => async (dispatch) => {
  dispatch(getDrawerSessionRequest());
  try {
    const res = await DashboardController.getDrawerSession();
    return dispatch(getDrawerSessionSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getDrawerSessionReset());
    }
    dispatch(getDrawerSessionError(error.message));
  }
};
export const getDrawerSessionPost = (data) => async (dispatch) => {
  dispatch(getDrawerSessionPostRequest());
  try {
    const res = await DashboardController.getDrawerSessionPost(data);
    dispatch(getDrawerSessionPostSuccess(res));
    if (res) {
      const resData = {
        drawerID: res?.payload?.id,
        amount: data.amount,
        notes: data.notes,
      };
      dispatch(startstarckingSession(resData));
    }
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getDrawerSessionPostReset());
    }
    dispatch(getDrawerSessionPostError(error.message));
  }
};

export const startstarckingSession = (resData) => async (dispatch) => {
  dispatch(startstarckingSessionRequest());
  try {
    const res = await DashboardController.startstarckingSession(resData);
    dispatch(startstarckingSessionSuccess(res));
    dispatch(getDrawerSession());
  } catch (error) {
    dispatch(startstarckingSessionError(error.message));
  }
};

export const getTotalSaleAction = (sellerID) => async (dispatch) => {
  dispatch(getTotalSaleRequest());
  try {
    const res = await DashboardController.getTotalSale(sellerID);
    dispatch(getTotalSaleSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTotalSaleReset());
    }
    dispatch(getTotalSaleError(error.message));
  }
};

export const posLoginDetail = () => async (dispatch) => {
  dispatch(posLoginDetailRequest());
  try {
    const res = await DashboardController.posLoginDetail();
    dispatch(posLoginDetailSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(posLoginDetailReset());
    }
    dispatch(posLoginDetailError(error.message));
  }
};

export const searchProductList = (search, sellerID) => async (dispatch) => {
  dispatch(searchProductListRequest());
  try {
    const res = await DashboardController.searchProductList(search, sellerID);
    dispatch(searchProductListSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(searchProductListReset());
    }
    dispatch(searchProductListError(error.message));
  }
};

export const addSellingSelection = (data) => async (dispatch) => {
  dispatch(addSellingSelectionRequest());
  try {
    dispatch(addSellingSelectionSuccess(data));
  } catch (error) {
    dispatch(addSellingSelectionError(error.message));
  }
};

export const onLineOrders = (sellerID) => async (dispatch) => {
  dispatch(onLineOrdersRequest());
  try {
    const res = await DashboardController.onLineOrders(sellerID);
    dispatch(onLineOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(onLineOrdersError(error.message));
  }
};

export const getPendingOrders = (sellerID) => async (dispatch) => {
  dispatch(getPendingOrdersRequest());
  try {
    const res = await DashboardController.getPendingOrders(sellerID);
    dispatch(getPendingOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(getPendingOrdersError(error.message));
  }
};

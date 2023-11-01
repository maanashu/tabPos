import { TYPES } from '@mPOS/Types/AnalyticsTypes';
import { AnalyticsController } from '@mPOS/controllers/AnalyticsController';
import { store } from '@/store';

const getOrderDataRequest = () => ({
  type: TYPES.GET_ORDER_DATA_REQUEST,
  payload: null,
});
const getOrderDataSuccess = (getOrderData) => ({
  type: TYPES.GET_ORDER_DATA_SUCCESS,
  payload: { getOrderData },
});
const getOrderDataError = (error) => ({
  type: TYPES.GET_ORDER_DATA_ERROR,
  payload: { error },
});

const getAnalyticStatisticsRequest = () => ({
  type: TYPES.GET_ANALYTIC_STATISTICS_REQUEST,
  payload: null,
});
const getAnalyticStatisticsSuccess = (getAnalyticStatistics) => ({
  type: TYPES.GET_ANALYTIC_STATISTICS_SUCCESS,
  payload: { getAnalyticStatistics },
});
const getAnalyticStatisticsError = (error) => ({
  type: TYPES.GET_ANALYTIC_STATISTICS_ERROR,
  payload: { error },
});

const getAnalyticOrderGraphsRequest = () => ({
  type: TYPES.GET_ANALYTIC_ORDER_GRAPHS_REQUEST,
  payload: null,
});
const getAnalyticOrderGraphsSuccess = (getAnalyticOrderGraphs) => ({
  type: TYPES.GET_ANALYTIC_ORDER_GRAPHS_SUCCESS,
  payload: { getAnalyticOrderGraphs },
});
const getAnalyticOrderGraphsError = (error) => ({
  type: TYPES.GET_ANALYTIC_ORDER_GRAPHS_ERROR,
  payload: { error },
});

const getTotalOrderRequest = () => ({
  type: TYPES.GET_TOTAL_ORDER_REQUEST,
  payload: null,
});
const getTotalOrderSuccess = (getTotalOrder) => ({
  type: TYPES.GET_TOTAL_ORDER_SUCCESS,
  payload: { getTotalOrder },
});
const getTotalOrderError = (error) => ({
  type: TYPES.GET_TOTAL_ORDER_ERROR,
  payload: { error },
});

const getTotalInventoryRequest = () => ({
  type: TYPES.GET_TOTAL_INVENTORY_REQUEST,
  payload: null,
});
const getTotalInventorySuccess = (getTotalInventory) => ({
  type: TYPES.GET_TOTAL_INVENTORY_SUCCESS,
  payload: { getTotalInventory },
});
const getTotalInventoryError = (error) => ({
  type: TYPES.GET_TOTAL_INVENTORY_ERROR,
  payload: { error },
});

const getSoldProductRequest = () => ({
  type: TYPES.GET_SOLD_PRODUCT_REQUEST,
  payload: null,
});
const getSoldProductSuccess = (getSoldProduct) => ({
  type: TYPES.GET_SOLD_PRODUCT_SUCCESS,
  payload: { getSoldProduct },
});
const getSoldProductError = (error) => ({
  type: TYPES.GET_SOLD_PRODUCT_ERROR,
  payload: { error },
});

export const getOrderData = (orderID) => async (dispatch) => {
  dispatch(getOrderDataRequest());
  try {
    const res = await AnalyticsController.getOrderData(orderID);
    return dispatch(getOrderDataSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderDataError(error?.message));
  }
};
export const getAnalyticStatistics = (sellerID, data) => async (dispatch) => {
  dispatch(getAnalyticStatisticsRequest());
  try {
    const res = await AnalyticsController.getAnalyticStatistics(sellerID, data);
    dispatch(getAnalyticStatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getAnalyticStatisticsError(error.message));
  }
};

export const getAnalyticOrderGraphs = (sellerID, data) => async (dispatch) => {
  dispatch(getAnalyticOrderGraphsRequest());
  try {
    const res = await AnalyticsController.getAnalyticOrderGraphs(sellerID, data);
    dispatch(getAnalyticOrderGraphsSuccess(res?.payload));
  } catch (error) {
    dispatch(getAnalyticOrderGraphsError(error.message));
  }
};

export const getTotalOrder = (sellerID, data) => async (dispatch) => {
  dispatch(getTotalOrderRequest());
  try {
    const res = await AnalyticsController.getTotalOrder(sellerID, data);
    dispatch(getTotalOrderSuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalOrderError(error.message));
  }
};

export const getTotalInventory = (sellerID, data) => async (dispatch) => {
  dispatch(getTotalInventoryRequest());
  try {
    const res = await AnalyticsController.getTotalInventory(sellerID, data);
    dispatch(getTotalInventorySuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalInventoryError(error.message));
  }
};

export const getSoldProduct = (sellerID, data, page, callback) => async (dispatch) => {
  dispatch(getSoldProductRequest());
  const orderSoldProduct = store.getState()?.analytics?.getSoldProduct;
  try {
    const res = await AnalyticsController.getSoldProduct(sellerID, data, page);
    const prevorderSoldProduct = { ...orderSoldProduct };
    if (orderSoldProduct && Object.keys(orderSoldProduct).length > 0 && page > 1) {
      prevorderSoldProduct.totalProductSoldList.total = res?.payload?.totalProductSoldList?.total;
      prevorderSoldProduct.totalProductSoldList.current_page =
        res?.payload?.totalProductSoldList?.current_page;
      prevorderSoldProduct.totalProductSoldList.total_pages =
        res?.payload?.totalProductSoldList?.total_pages;
      prevorderSoldProduct.totalProductSoldList.per_page =
        res?.payload?.totalProductSoldList?.per_page;
      prevorderSoldProduct.totalProductSoldList.data =
        prevorderSoldProduct?.totalProductSoldList.data?.concat(
          res?.payload?.totalProductSoldList?.data
        );
      dispatch(getSoldProductSuccess(prevorderSoldProduct));
    } else {
      dispatch(getSoldProductSuccess(res?.payload));
    }
    callback && callback(res);
  } catch (error) {
    dispatch(getSoldProductError(error.message));
  }
};

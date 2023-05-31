import { AnalyticsController } from '@/controllers';
import { TYPES } from '@/Types/AnalyticsTypes';

const getTotalProGraphRequest = () => ({
  type: TYPES.GET_TOTAL_GRAPH_REQUEST,
  payload: null,
});
const getTotalProGraphSuccess = getTotalGraph => ({
  type: TYPES.GET_TOTAL_GRAPH_SUCCESS,
  payload: { getTotalGraph },
});
const getTotalProGraphError = error => ({
  type: TYPES.GET_TOTAL_GRAPH_ERROR,
  payload: { error },
});

const getTotalOrderGraphRequest = () => ({
  type: TYPES.GET_ORDER_GRAPH_REQUEST,
  payload: null,
});
const getTotalOrderGraphSuccess = getOrderGraph => ({
  type: TYPES.GET_ORDER_GRAPH_SUCCESS,
  payload: { getOrderGraph },
});
const getTotalOrderGraphError = error => ({
  type: TYPES.GET_ORDER_GRAPH_ERROR,
  payload: { error },
});

const getTotalInvernteryGraphRequest = () => ({
  type: TYPES.GET_INVENTERY_GRAPH_REQUEST,
  payload: null,
});
const getTotalInvernteryGraphSuccess = getInventeryGraph => ({
  type: TYPES.GET_INVENTERY_GRAPH_SUCCESS,
  payload: { getInventeryGraph },
});
const getTotalInvernteryGraphError = error => ({
  type: TYPES.GET_INVENTERY_GRAPH_ERROR,
  payload: { error },
});

const getTotalRevenueGraphRequest = () => ({
  type: TYPES.GET_REVENUE_GRAPH_REQUEST,
  payload: null,
});
const getTotalRevenueGraphSuccess = getRevenueGraph => ({
  type: TYPES.GET_REVENUE_GRAPH_SUCCESS,
  payload: { getRevenueGraph },
});
const getTotalRevenueGraphError = error => ({
  type: TYPES.GET_REVENUE_GRAPH_ERROR,
  payload: { error },
});

const getTotalProDetailRequest = () => ({
  type: TYPES.GET_TOTALPRO_DETAIL_REQUEST,
  payload: null,
});
const getTotalProDetailSuccess = getTotalProDetail => ({
  type: TYPES.GET_TOTALPRO_DETAIL_SUCCESS,
  payload: { getTotalProDetail },
});
const getTotalProDetailError = error => ({
  type: TYPES.GET_TOTALPRO_DETAIL_ERROR,
  payload: { error },
});

const catSubBrandDataRequest = () => ({
  type: TYPES.CAT_SUB_BRAND_REQUEST,
  payload: null,
});
const catSubBrandDataSuccess = catSubBrandData => ({
  type: TYPES.CAT_SUB_BRAND_SUCCESS,
  payload: { catSubBrandData },
});
const catSubBrandDataError = error => ({
  type: TYPES.CAT_SUB_BRAND_ERROR,
  payload: { error },
});
const catSubBrandDataReset = () => ({
  type: TYPES.CAT_SUB_BRAND_RESET,
  payload: null,
});

const getProductListRequest = () => ({
  type: TYPES.GET_PRODUCT_LIST_REQUEST,
  payload: null,
});
const getProductListSuccess = getProductList => ({
  type: TYPES.GET_PRODUCT_LIST_SUCCESS,
  payload: { getProductList },
});
const getProductListError = error => ({
  type: TYPES.GET_PRODUCT_LIST_ERROR,
  payload: { error },
});
const getProductListReset = () => ({
  type: TYPES.GET_PRODUCT_LIST_RESET,
  payload: null,
});

export const totalProGraph = sellerID => async dispatch => {
  dispatch(getTotalProGraphRequest());
  try {
    const res = await AnalyticsController.totalProGraph(sellerID);
    dispatch(getTotalProGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalProGraphError(error.message));
  }
};

export const totalOrderGraph = sellerID => async dispatch => {
  dispatch(getTotalOrderGraphRequest());
  try {
    const res = await AnalyticsController.totalOrderGraph(sellerID);
    dispatch(getTotalOrderGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalOrderGraphError(error.message));
  }
};
export const totalInvernteryGraph = sellerID => async dispatch => {
  dispatch(getTotalInvernteryGraphRequest());
  try {
    const res = await AnalyticsController.totalInvernteryGraph(sellerID);
    dispatch(getTotalInvernteryGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalInvernteryGraphError(error.message));
  }
};

export const totalRevenueGraph = sellerID => async dispatch => {
  dispatch(getTotalRevenueGraphRequest());
  try {
    const res = await AnalyticsController.totalRevenueGraph(sellerID);
    dispatch(getTotalRevenueGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalRevenueGraphError(error.message));
  }
};

export const getTotalProDetail = (sellerID, productTime) => async dispatch => {
  dispatch(getTotalProDetailRequest());
  try {
    const res = await AnalyticsController.getTotalProDetail(
      sellerID,
      productTime
    );
    dispatch(getTotalProDetailSuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalProDetailError(error.message));
  }
};

export const catSubBrandData = data => async dispatch => {
  dispatch(catSubBrandDataRequest());
  try {
    const res = await AnalyticsController.catSubBrandData(data);
    dispatch(catSubBrandDataSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(catSubBrandDataReset());
    }
    dispatch(catSubBrandDataError(error.message));
  }
};

export const getProductList = catId => async dispatch => {
  dispatch(getProductListRequest());
  try {
    const res = await AnalyticsController.getProductList(catId);
    dispatch(getProductListSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductListReset());
    }
    dispatch(getProductListError(error.message));
  }
};

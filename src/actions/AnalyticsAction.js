import { AnalyticsController } from '@/controllers';
import { TYPES } from "@/Types/AnalyticsTypes";

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



export const totalProGraph = (sellerID) => async dispatch => {
  dispatch(getTotalProGraphRequest());
  try {
      const res = await AnalyticsController.totalProGraph(sellerID);
      dispatch(getTotalProGraphSuccess(res));
  } catch (error) {
      dispatch(getTotalProGraphError(error.message));
  }
};

export const totalOrderGraph = (sellerID) => async dispatch => {
  dispatch(getTotalOrderGraphRequest());
  try {
      const res = await AnalyticsController.totalOrderGraph(sellerID);
      dispatch(getTotalOrderGraphSuccess(res));
  } catch (error) {
      dispatch(getTotalOrderGraphError(error.message));
  }
};
export const totalInvernteryGraph = (sellerID) => async dispatch => {
  dispatch(getTotalInvernteryGraphRequest());
  try {
      const res = await AnalyticsController.totalInvernteryGraph(sellerID);
      dispatch(getTotalInvernteryGraphSuccess(res));
  } catch (error) {
      dispatch(getTotalInvernteryGraphError(error.message));
  }
};

export const totalRevenueGraph = (sellerID) => async dispatch => {
  dispatch(getTotalRevenueGraphRequest());
  try {
      const res = await AnalyticsController.totalRevenueGraph(sellerID);
      dispatch(getTotalRevenueGraphSuccess(res));
  } catch (error) {
      dispatch(getTotalRevenueGraphError(error.message));
  }
};

export const getTotalProDetail = (sellerID,productTime ) => async dispatch => {
  dispatch(getTotalProDetailRequest());
  try {
      const res = await AnalyticsController.getTotalProDetail(sellerID,productTime );
      dispatch(getTotalProDetailSuccess(res?.payload));
  } catch (error) {
      dispatch(getTotalProDetailError(error.message));
  }
};





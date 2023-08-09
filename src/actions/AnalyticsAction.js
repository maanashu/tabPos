import { AnalyticsController } from '@/controllers';
import { TYPES } from '@/Types/AnalyticsTypes';

const getTotalProGraphRequest = () => ({
  type: TYPES.GET_TOTAL_GRAPH_REQUEST,
  payload: null,
});
const getTotalProGraphSuccess = (getTotalGraph) => ({
  type: TYPES.GET_TOTAL_GRAPH_SUCCESS,
  payload: { getTotalGraph },
});
const getTotalProGraphError = (error) => ({
  type: TYPES.GET_TOTAL_GRAPH_ERROR,
  payload: { error },
});

const getTotalOrderGraphRequest = () => ({
  type: TYPES.GET_ORDER_GRAPH_REQUEST,
  payload: null,
});
const getTotalOrderGraphSuccess = (getOrderGraph) => ({
  type: TYPES.GET_ORDER_GRAPH_SUCCESS,
  payload: { getOrderGraph },
});
const getTotalOrderGraphError = (error) => ({
  type: TYPES.GET_ORDER_GRAPH_ERROR,
  payload: { error },
});

const getTotalInvernteryGraphRequest = () => ({
  type: TYPES.GET_INVENTERY_GRAPH_REQUEST,
  payload: null,
});
const getTotalInvernteryGraphSuccess = (getInventeryGraph) => ({
  type: TYPES.GET_INVENTERY_GRAPH_SUCCESS,
  payload: { getInventeryGraph },
});
const getTotalInvernteryGraphError = (error) => ({
  type: TYPES.GET_INVENTERY_GRAPH_ERROR,
  payload: { error },
});

const getTotalRevenueGraphRequest = () => ({
  type: TYPES.GET_REVENUE_GRAPH_REQUEST,
  payload: null,
});
const getTotalRevenueGraphSuccess = (getRevenueGraph) => ({
  type: TYPES.GET_REVENUE_GRAPH_SUCCESS,
  payload: { getRevenueGraph },
});
const getTotalRevenueGraphError = (error) => ({
  type: TYPES.GET_REVENUE_GRAPH_ERROR,
  payload: { error },
});

const getTotalProDetailRequest = () => ({
  type: TYPES.GET_TOTALPRO_DETAIL_REQUEST,
  payload: null,
});
const getTotalProDetailSuccess = (getTotalProDetail) => ({
  type: TYPES.GET_TOTALPRO_DETAIL_SUCCESS,
  payload: { getTotalProDetail },
});
const getTotalProDetailError = (error) => ({
  type: TYPES.GET_TOTALPRO_DETAIL_ERROR,
  payload: { error },
});

const catSubBrandDataRequest = () => ({
  type: TYPES.CAT_SUB_BRAND_REQUEST,
  payload: null,
});
const catSubBrandDataSuccess = (catSubBrandData) => ({
  type: TYPES.CAT_SUB_BRAND_SUCCESS,
  payload: { catSubBrandData },
});
const catSubBrandDataError = (error) => ({
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
const getProductListSuccess = (getProductList) => ({
  type: TYPES.GET_PRODUCT_LIST_SUCCESS,
  payload: { getProductList },
});
const getProductListError = (error) => ({
  type: TYPES.GET_PRODUCT_LIST_ERROR,
  payload: { error },
});
const getProductListReset = () => ({
  type: TYPES.GET_PRODUCT_LIST_RESET,
  payload: null,
});

const getProductModalRequest = () => ({
  type: TYPES.GET_PRODUCT_MODAL_REQUEST,
  payload: null,
});
const getProductModalSuccess = (getProductModal) => ({
  type: TYPES.GET_PRODUCT_MODAL_SUCCESS,
  payload: { getProductModal },
});
const getProductModalError = (error) => ({
  type: TYPES.GET_PRODUCT_MODAL_ERROR,
  payload: { error },
});
const getProductModalReset = () => ({
  type: TYPES.GET_PRODUCT_MODAL_RESET,
  payload: null,
});
const getOrderstatisticsRequest = () => ({
  type: TYPES.GET_ORDER_STATISTICS_REQUEST,
  payload: null,
});
const getOrderstatisticsSuccess = (getOrderstatistics) => ({
  type: TYPES.GET_ORDER_STATISTICS_SUCCESS,
  payload: { getOrderstatistics },
});
const getOrderstatisticsError = (error) => ({
  type: TYPES.GET_ORDER_STATISTICS_ERROR,
  payload: { error },
});
const getOrderTypeListRequest = () => ({
  type: TYPES.GET_ORDER_TYPE_LIST_REQUEST,
  payload: null,
});
const getOrderTypeListSuccess = (getOrderTypeList) => ({
  type: TYPES.GET_ORDER_TYPE_LIST_SUCCESS,
  payload: { getOrderTypeList },
});
const getOrderTypeListError = (error) => ({
  type: TYPES.GET_ORDER_TYPE_LIST_ERROR,
  payload: { error },
});
const getOrderTypeListReset = () => ({
  type: TYPES.GET_ORDER_TYPE_LIST_RESET,
  payload: null,
});

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

const getOrdersRequest = () => ({
  type: TYPES.GET_ORDER_REQUEST,
  payload: null,
});
const getOrdersSuccess = (orderList) => ({
  type: TYPES.GET_ORDER_SUCCESS,
  payload: { orderList },
});
const getOrdersError = (error) => ({
  type: TYPES.GET_ORDER_ERROR,
  payload: { error },
});

const getTotalInventoryCostRequest = () => ({
  type: TYPES.GET_TOTAL_INVENTORY_COST_REQUEST,
  payload: null,
});

const getTotalInventoryCostSuccess = (getTotalInventoryCost) => ({
  type: TYPES.GET_TOTAL_INVENTORY_COST_SUCCESS,
  payload: { getTotalInventoryCost },
});

const getTotalInventoryCostError = (error) => ({
  type: TYPES.GET_TOTAL_INVENTORY_COST_ERROR,
  payload: { error },
});

const getSellerProductListRequest = () => ({
  type: TYPES.GET_SELLER_PRODUCT_LIST_REQUEST,
  payload: null,
});

const getSellerProductListSuccess = (getSellerProductList) => ({
  type: TYPES.GET_SELLER_PRODUCT_LIST_SUCCESS,
  payload: { getSellerProductList },
});

const getSellerProductListError = (error) => ({
  type: TYPES.GET_SELLER_PRODUCT_LIST_ERROR,
  payload: { error },
});
const getSellerProductListReset = () => ({
  type: TYPES.GET_SELLER_PRODUCT_LIST_RESET,
  payload: null,
});

const getSellerInfoRequest = () => ({
  type: TYPES.GET_SELLER_INFO_REQUEST,
  payload: null,
});

const getSellerInfoSuccess = (getSellerInfo) => ({
  type: TYPES.GET_SELLER_INFO_SUCCESS,
  payload: { getSellerInfo },
});

const getSellerInfoError = (error) => ({
  type: TYPES.GET_SELLER_INFO_ERROR,
  payload: { error },
});

const getSellerProductDetailsRequest = () => ({
  type: TYPES.GET_SELLER_PRODUCT_DETAILS_REQUEST,
  payload: null,
});

const getSellerProductDetailsSuccess = (getSellerProductDetails) => ({
  type: TYPES.GET_SELLER_PRODUCT_DETAILS_SUCCESS,
  payload: { getSellerProductDetails },
});

const getSellerProductDetailsError = (error) => ({
  type: TYPES.GET_SELLER_PRODUCT_DETAILS_ERROR,
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

export const totalProGraph = (sellerID) => async (dispatch) => {
  dispatch(getTotalProGraphRequest());
  try {
    const res = await AnalyticsController.totalProGraph(sellerID);
    dispatch(getTotalProGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalProGraphError(error.message));
  }
};

export const totalOrderGraph = (sellerID) => async (dispatch) => {
  dispatch(getTotalOrderGraphRequest());
  try {
    const res = await AnalyticsController.totalOrderGraph(sellerID);
    dispatch(getTotalOrderGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalOrderGraphError(error.message));
  }
};
export const totalInvernteryGraph = (sellerID) => async (dispatch) => {
  dispatch(getTotalInvernteryGraphRequest());
  try {
    const res = await AnalyticsController.totalInvernteryGraph(sellerID);
    dispatch(getTotalInvernteryGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalInvernteryGraphError(error.message));
  }
};

export const totalRevenueGraph = (sellerID) => async (dispatch) => {
  dispatch(getTotalRevenueGraphRequest());
  try {
    const res = await AnalyticsController.totalRevenueGraph(sellerID);
    dispatch(getTotalRevenueGraphSuccess(res));
  } catch (error) {
    dispatch(getTotalRevenueGraphError(error.message));
  }
};

export const getTotalProDetail = (sellerID, productTime) => async (dispatch) => {
  dispatch(getTotalProDetailRequest());
  try {
    const res = await AnalyticsController.getTotalProDetail(sellerID, productTime);
    dispatch(getTotalProDetailSuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalProDetailError(error.message));
  }
};

export const catSubBrandData = (data) => async (dispatch) => {
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

export const getProductList = (catId) => async (dispatch) => {
  dispatch(getProductListRequest());
  try {
    const res = await AnalyticsController.getProductList(catId);
    dispatch(getProductListSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductListReset());
    }
    dispatch(getProductListError(error.message));
  }
};

export const getProductModal = (productId) => async (dispatch) => {
  dispatch(getProductModalRequest());
  try {
    const res = await AnalyticsController.getProductModal(productId);
    return dispatch(getProductModalSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductModalReset());
    }
    dispatch(getProductModalError(error.message));
  }
};

export const getOrderstatistics = (sellerID, orderTime) => async (dispatch) => {
  dispatch(getOrderstatisticsRequest());
  try {
    const res = await AnalyticsController.getOrderstatistics(sellerID, orderTime);
    return dispatch(getOrderstatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderstatisticsError(error.message));
  }
};

export const getOrderTypeList = (sellerID, data, orderTime) => async (dispatch) => {
  dispatch(getOrderTypeListRequest());
  try {
    const res = await AnalyticsController.getOrderTypeList(sellerID, data, orderTime);
    return dispatch(getOrderTypeListSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOrderTypeListReset());
    }
    dispatch(getOrderTypeListError(error?.message));
  }
};

export const getOrderData = (orderID) => async (dispatch) => {
  dispatch(getOrderDataRequest());
  try {
    const res = await AnalyticsController.getOrderData(orderID);
    return dispatch(getOrderDataSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderDataError(error?.message));
  }
};

export const getOrders = (orderID) => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const res = await AnalyticsController.getOrders(orderID);
    return dispatch(getOrdersSuccess(res));
  } catch (error) {
    dispatch(getOrdersError(error.message));
  }
};

export const getTotalInventoryCost = (sellerID, inventoryTime) => async (dispatch) => {
  dispatch(getTotalInventoryCostRequest());
  try {
    const res = await AnalyticsController.getTotalInventoryCost(sellerID, inventoryTime);
    return dispatch(getTotalInventoryCostSuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalInventoryCostError(error.message));
  }
};

export const getSellerProductList = (sellerID, data) => async (dispatch) => {
  dispatch(getSellerProductListRequest());
  try {
    const res = await AnalyticsController.getSellerProductList(sellerID, data);
    dispatch(getSellerProductListSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getSellerProductListReset());
    }
    dispatch(getSellerProductListError(error.message));
  }
};

export const getSellerInfo = (productID, data) => async (dispatch) => {
  dispatch(getSellerInfoRequest());
  try {
    const res = await AnalyticsController.getSellerInfo(productID, data);
    dispatch(getSellerInfoSuccess(res?.payload?.data));
  } catch (error) {
    dispatch(getSellerInfoError(error.message));
  }
};

export const getSellerProductDetails = (sellerID) => async (dispatch) => {
  dispatch(getSellerProductDetailsRequest());
  try {
    const res = await AnalyticsController.getSellerProductDetails(sellerID);
    dispatch(getSellerProductDetailsSuccess(res?.payload));
  } catch (error) {
    dispatch(getSellerProductDetailsError(error.message));
  }
};

export const getAnalyticStatistics = (sellerID, filter) => async (dispatch) => {
  dispatch(getAnalyticStatisticsRequest());
  try {
    const res = await AnalyticsController.getAnalyticStatistics(sellerID, filter);
    dispatch(getAnalyticStatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getAnalyticStatisticsError(error.message));
  }
};

export const getAnalyticOrderGraphs = (sellerID, filter) => async (dispatch) => {
  dispatch(getAnalyticOrderGraphsRequest());
  try {
    const res = await AnalyticsController.getAnalyticOrderGraphs(sellerID, filter);
    dispatch(getAnalyticOrderGraphsSuccess(res?.payload));
  } catch (error) {
    dispatch(getAnalyticOrderGraphsError(error.message));
  }
};

export const getTotalOrder = (sellerID, filter) => async (dispatch) => {
  dispatch(getTotalOrderRequest());
  try {
    const res = await AnalyticsController.getTotalOrder(sellerID, filter);
    dispatch(getTotalOrderSuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalOrderError(error.message));
  }
};

export const getTotalInventory = (sellerID, filter) => async (dispatch) => {
  dispatch(getTotalInventoryRequest());
  try {
    const res = await AnalyticsController.getTotalInventory(sellerID, filter);
    dispatch(getTotalInventorySuccess(res?.payload));
  } catch (error) {
    dispatch(getTotalInventoryError(error.message));
  }
};

export const getSoldProduct = (sellerID, filter) => async (dispatch) => {
  dispatch(getSoldProductRequest());
  try {
    const res = await AnalyticsController.getSoldProduct(sellerID, filter);
    dispatch(getSoldProductSuccess(res?.payload));
  } catch (error) {
    dispatch(getSoldProductError(error.message));
  }
};

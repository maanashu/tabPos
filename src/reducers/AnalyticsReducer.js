import { TYPES } from '@/Types/AnalyticsTypes';

const INITIALSTATE = {
  getTotalGraph: {},
  getOrderGraph: {},
  getInventeryGraph: {},
  getRevenueGraph: {},
  getTotalProDetail: {},
  catSubBrandData: [],
  getProductList: [],
  getProductModal: {},
  getOrderstatistics: [],
  getOrderTypeList: [],
  getOrderData: {},
  orderList: {},
  getTotalInventoryCost: {},
  getSellerProductList: [],
  getSellerInfo: [],
  getSellerProductDetails: {},
  getAnalyticStatistics: {},
  getAnalyticOrderGraphs: {},
  getTotalOrder: {},
  getTotalInventory: {},
};

export const analyticsReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_TOTAL_GRAPH_SUCCESS:
      return {
        ...state,
        getTotalGraph: payload.getTotalGraph.payload,
      };
    case TYPES.GET_ORDER_GRAPH_SUCCESS:
      return {
        ...state,
        getOrderGraph: payload.getOrderGraph.payload,
      };
    case TYPES.GET_INVENTERY_GRAPH_SUCCESS:
      return {
        ...state,
        getInventeryGraph: payload.getInventeryGraph.payload,
      };
    case TYPES.GET_REVENUE_GRAPH_SUCCESS:
      return {
        ...state,
        getRevenueGraph: payload.getRevenueGraph.payload,
      };
    case TYPES.GET_TOTALPRO_DETAIL_SUCCESS:
      return {
        ...state,
        getTotalProDetail: payload.getTotalProDetail,
      };

    case TYPES.CAT_SUB_BRAND_SUCCESS:
      return {
        ...state,
        catSubBrandData: payload.catSubBrandData,
      };
    case TYPES.CAT_SUB_BRAND_RESET:
      return {
        ...state,
        catSubBrandData: [],
      };

    case TYPES.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        getProductList: payload.getProductList,
      };
    case TYPES.GET_PRODUCT_LIST_RESET:
      return {
        ...state,
        getProductList: [],
      };
    case TYPES.GET_PRODUCT_MODAL_SUCCESS:
      return {
        ...state,
        getProductModal: payload.getProductModal,
      };
    case TYPES.GET_PRODUCT_MODAL_RESET:
      return {
        ...state,
        getProductModal: {},
      };

    case TYPES.GET_ORDER_STATISTICS_SUCCESS:
      return {
        ...state,
        getOrderstatistics: payload.getOrderstatistics,
      };
    case TYPES.GET_ORDER_TYPE_LIST_SUCCESS:
      return {
        ...state,
        getOrderTypeList: payload?.getOrderTypeList,
      };
    case TYPES.GET_ORDER_TYPE_LIST_RESET:
      return {
        ...state,
        getOrderTypeList: [],
      };
    case TYPES.GET_ORDER_DATA_SUCCESS:
      return {
        ...state,
        getOrderData: payload?.getOrderData,
      };
    case TYPES.GET_ORDER_SUCCESS:
      return {
        ...state,
        orderList: payload?.orderList.payload,
      };
    case TYPES.GET_TOTAL_INVENTORY_COST_SUCCESS:
      return {
        ...state,
        getTotalInventoryCost: payload?.getTotalInventoryCost,
      };
    case TYPES.GET_SELLER_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        getSellerProductList: payload?.getSellerProductList,
      };
    case TYPES.GET_SELLER_PRODUCT_LIST_RESET:
      return {
        ...state,
        getSellerProductList: [],
      };
    case TYPES.GET_SELLER_INFO_SUCCESS:
      return {
        ...state,
        getSellerInfo: payload?.getSellerInfo,
      };
    case TYPES.GET_SELLER_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        getSellerProductDetails: payload?.getSellerProductDetails,
      };
    case TYPES.GET_ANALYTIC_STATISTICS_SUCCESS:
      return {
        ...state,
        getAnalyticStatistics: payload?.getAnalyticStatistics,
      };
    case TYPES.GET_ANALYTIC_ORDER_GRAPHS_SUCCESS:
      return {
        ...state,
        getAnalyticOrderGraphs: payload?.getAnalyticOrderGraphs,
      };
    case TYPES.GET_TOTAL_ORDER_SUCCESS:
      return {
        ...state,
        getTotalOrder: payload?.getTotalOrder,
      };
    case TYPES.GET_TOTAL_INVENTORY_SUCCESS:
      return {
        ...state,
        getTotalInventory: payload?.getTotalInventory,
      };
    default:
      return state;
  }
};

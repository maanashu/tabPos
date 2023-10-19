import { DashboardController } from '@/controllers';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { getOrderData } from './AnalyticsAction';
import { store } from '@/store';

const getOrderDeliveriesRequest = () => ({
  type: DASHBOARDTYPE.GET_ORDER_DELIVERIES_REQUEST,
  payload: null,
});
export const getOrderDeliveriesSuccess = (getOrderDeliveries) => ({
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
const getDrawerSessionPostSuccess = (drawerSession) => ({
  type: DASHBOARDTYPE.GET_DRAWER_SESSION_POST_SUCCESS,
  payload: { drawerSession },
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

const getOrdersByInvoiceIdRequest = () => ({
  type: DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID_REQUEST,
  payload: null,
});
export const getOrdersByInvoiceIdSuccess = (invoiceSearchOrders) => ({
  type: DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID_SUCCESS,
  payload: { invoiceSearchOrders },
});
const getOrdersByInvoiceIdError = (error) => ({
  type: DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID_ERROR,
  payload: { error },
});
const getOrdersByInvoiceIdReset = () => ({
  type: DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID_RESET,
  payload: null,
});

const getProductsBySkuRequest = () => ({
  type: DASHBOARDTYPE.GET_PRODUCTS_BY_SKU__REQUEST,
  payload: null,
});
export const getProductsBySkuSuccess = (skuOrders) => ({
  type: DASHBOARDTYPE.GET_PRODUCTS_BY_SKU__SUCCESS,
  payload: { skuOrders },
});
const getProductsBySkuError = (error) => ({
  type: DASHBOARDTYPE.GET_PRODUCTS_BY_SKU__ERROR,
  payload: { error },
});
const getProductsBySkuReset = () => ({
  type: DASHBOARDTYPE.GET_PRODUCTS_BY_SKU_RESET,
  payload: null,
});

const returnProductRequest = () => ({
  type: DASHBOARDTYPE.RETURN_PRODUCTS__REQUEST,
  payload: null,
});
export const returnProductSuccess = (returnOrder) => ({
  type: DASHBOARDTYPE.RETURN_PRODUCTS__SUCCESS,
  payload: { returnOrder },
});
const returnProductError = (error) => ({
  type: DASHBOARDTYPE.RETURN_PRODUCTS__ERROR,
  payload: { error },
});

const scanBarCodeRequest = () => ({
  type: DASHBOARDTYPE.SCAN_BARCODE__REQUEST,
  payload: null,
});

export const getOrderDeliveries = (sellerID, page, callback) => async (dispatch, getState) => {
  dispatch(getOrderDeliveriesRequest());
  const orderDeleveriesProduct = store.getState()?.dashboard?.getOrderDeliveries;
  try {
    const res = await DashboardController.getOrderDeliveries(sellerID, page);
    const prevorderDeleveriesProduct = { ...orderDeleveriesProduct };
    if (orderDeleveriesProduct && Object.keys(orderDeleveriesProduct).length > 0 && page > 1) {
      prevorderDeleveriesProduct.total = res?.payload?.total;
      prevorderDeleveriesProduct.current_page = res?.payload?.current_page;
      prevorderDeleveriesProduct.total_pages = res?.payload?.total_pages;
      prevorderDeleveriesProduct.per_page = res?.payload?.per_page;
      prevorderDeleveriesProduct.data = prevorderDeleveriesProduct.data.concat(res?.payload?.data);
      dispatch(getOrderDeliveriesSuccess(prevorderDeleveriesProduct));
    } else {
      dispatch(getOrderDeliveriesSuccess(res?.payload));
    }
    callback && callback(res);
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
    dispatch(getDrawerSessionPostSuccess(res?.payload));
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

export const getPendingOrders = () => async (dispatch) => {
  const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
  dispatch(getPendingOrdersRequest());
  try {
    const res = await DashboardController.getPendingOrders(sellerID);
    dispatch(getPendingOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(getPendingOrdersError(error.message));
  }
};

export const getOrdersByInvoiceId = (invoice) => async (dispatch) => {
  dispatch(getOrdersByInvoiceIdRequest());
  try {
    const res = await DashboardController.getOrdersByInvoiceId(invoice);
    dispatch(getOrdersByInvoiceIdSuccess(res?.payload));
  } catch (error) {
    if (error?.msg === 'Invalid invoice number!') {
      dispatch(getOrdersByInvoiceIdReset());
    }
    dispatch(getOrdersByInvoiceIdError(error.message));
  }
};

export const getProductsBySku = (sku) => async (dispatch) => {
  dispatch(getProductsBySkuRequest());
  try {
    const res = await DashboardController.getProductsBySku(sku);
    dispatch(getProductsBySkuSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductsBySkuReset());
    }
    dispatch(getProductsBySkuError(error.message));
  }
};

export const returnProduct = (data, screen, callback) => async (dispatch) => {
  dispatch(returnProductRequest());
  try {
    const res = await DashboardController.returnProduct(data, screen);
    callback && callback(res);
    dispatch(returnProductSuccess(res?.payload));
  } catch (error) {
    callback && callback(false);
    dispatch(returnProductError(error.message));
  }
};

export const scanBarCode = (data) => async (dispatch) => {
  dispatch(scanBarCodeRequest());
  try {
    const res = await DashboardController.scanBarCode(data);
    dispatch(getOrdersByInvoiceIdSuccess(res?.payload));
  } catch (error) {
    if (error?.msg === 'Invalid code!') {
      dispatch(getOrdersByInvoiceIdReset());
    }
    dispatch(getOrdersByInvoiceIdError(error.message));
  }
};

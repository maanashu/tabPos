import { DashboardController } from '@mPOS/controllers';
import { DASHBOARD_TYPES } from '@mPOS/Types/DashboardTypes';
import { getOrderData } from './AnalyticsAction';
import { store } from '@/store';

// const getOrderDeliveriesRequest = () => ({
//   type: DASHBOARD_TYPES.GET_ORDER_DELIVERIES_REQUEST,
//   payload: null,
// });
// export const getOrderDeliveriesSuccess = (getOrderDeliveries) => ({
//   type: DASHBOARD_TYPES.GET_ORDER_DELIVERIES_SUCCESS,
//   payload: { getOrderDeliveries },
// });
// const getOrderDeliveriesError = (error) => ({
//   type: DASHBOARD_TYPES.GET_ORDER_DELIVERIES_ERROR,
//   payload: { error },
// });
// const getOrderDeliveriesReset = () => ({
//   type: DASHBOARD_TYPES.GET_ORDER_DELIVERIES_RESET,
//   payload: null,
// });

// const getDrawerSessionRequest = () => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_REQUEST,
//   payload: null,
// });
// export const getDrawerSessionSuccess = (getSesssion) => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_SUCCESS,
//   payload: { getSesssion },
// });
// const getDrawerSessionError = (error) => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_ERROR,
//   payload: { error },
// });
// const getDrawerSessionReset = () => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_RESET,
//   payload: null,
// });

// const getDrawerSessionPostRequest = () => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_POST_REQUEST,
//   payload: null,
// });
// const getDrawerSessionPostSuccess = (drawerSession) => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_POST_SUCCESS,
//   payload: { drawerSession },
// });
// const getDrawerSessionPostError = (error) => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_POST_ERROR,
//   payload: { error },
// });
// const getDrawerSessionPostReset = () => ({
//   type: DASHBOARD_TYPES.GET_DRAWER_SESSION_POST_RESET,
//   payload: null,
// });

// const startstarckingSessionRequest = () => ({
//   type: DASHBOARD_TYPES.START_TRACKING_SESSION_REQUEST,
//   payload: null,
// });
// const startstarckingSessionSuccess = () => ({
//   type: DASHBOARD_TYPES.START_TRACKING_SESSION_SUCCESS,
//   payload: {},
// });
// const startstarckingSessionError = (error) => ({
//   type: DASHBOARD_TYPES.START_TRACKING_SESSION_ERROR,
//   payload: { error },
// });

// const getTotalSaleRequest = () => ({
//   type: DASHBOARD_TYPES.GET_TOTAL_SALE_REQUEST,
//   payload: null,
// });
// const getTotalSaleSuccess = (getTotalSale) => ({
//   type: DASHBOARD_TYPES.GET_TOTAL_SALE_SUCCESS,
//   payload: { getTotalSale },
// });
// const getTotalSaleError = (error) => ({
//   type: DASHBOARD_TYPES.GET_TOTAL_SALE_ERROR,
//   payload: { error },
// });
// const getTotalSaleReset = () => ({
//   type: DASHBOARD_TYPES.GET_TOTAL_SALE_RESET,
//   payload: null,
// });

// const posLoginDetailRequest = () => ({
//   type: DASHBOARD_TYPES.POS_LOGIN_DETAIL_REQUEST,
//   payload: null,
// });
// const posLoginDetailSuccess = (posLoginDetail) => ({
//   type: DASHBOARD_TYPES.POS_LOGIN_DETAIL_SUCCESS,
//   payload: { posLoginDetail },
// });
// const posLoginDetailError = (error) => ({
//   type: DASHBOARD_TYPES.POS_LOGIN_DETAIL_ERROR,
//   payload: { error },
// });
// const posLoginDetailReset = () => ({
//   type: DASHBOARD_TYPES.POS_LOGIN_DETAIL_RESET,
//   payload: null,
// });

// const searchProductListRequest = () => ({
//   type: DASHBOARD_TYPES.SEARCH_PRODUCT_LIST_REQUEST,
//   payload: null,
// });
// const searchProductListSuccess = (searchProductList) => ({
//   type: DASHBOARD_TYPES.SEARCH_PRODUCT_LIST_SUCCESS,
//   payload: { searchProductList },
// });
// const searchProductListError = (error) => ({
//   type: DASHBOARD_TYPES.SEARCH_PRODUCT_LIST_ERROR,
//   payload: { error },
// });
// const searchProductListReset = () => ({
//   type: DASHBOARD_TYPES.SEARCH_PRODUCT_LIST_RESET,
//   payload: null,
// });

// const addSellingSelectionRequest = () => ({
//   type: DASHBOARD_TYPES.ADD_SELLING_SELECTION_REQUEST,
//   payload: null,
// });
// const addSellingSelectionSuccess = (selection) => ({
//   type: DASHBOARD_TYPES.ADD_SELLING_SELECTION_SUCCESS,
//   payload: { selection },
// });
// const addSellingSelectionError = (error) => ({
//   type: DASHBOARD_TYPES.ADD_SELLING_SELECTION_ERROR,
//   payload: { error },
// });

// const onLineOrdersRequest = () => ({
//   type: DASHBOARD_TYPES.ONLINE_ORDERS_REQUEST,
//   payload: null,
// });
// const onLineOrdersSuccess = (onLineOrders) => ({
//   type: DASHBOARD_TYPES.ONLINE_ORDERS_SUCCESS,
//   payload: { onLineOrders },
// });
// const onLineOrdersError = (error) => ({
//   type: DASHBOARD_TYPES.ONLINE_ORDERS_ERROR,
//   payload: { error },
// });

// const getPendingOrdersRequest = () => ({
//   type: DASHBOARD_TYPES.PENDING_ORDERS_REQUEST,
//   payload: null,
// });
// const getPendingOrdersSuccess = (pendingOrders) => ({
//   type: DASHBOARD_TYPES.PENDING_ORDERS_SUCCESS,
//   payload: { pendingOrders },
// });
// const getPendingOrdersError = (error) => ({
//   type: DASHBOARD_TYPES.PENDING_ORDERS_ERROR,
//   payload: { error },
// });

const getOrdersByInvoiceIdRequest = () => ({
  type: DASHBOARD_TYPES.GET_ORDERS_BY_INVOICE_ID_REQUEST,
  payload: null,
});
export const getOrdersByInvoiceIdSuccess = (invoiceSearchOrders) => ({
  type: DASHBOARD_TYPES.GET_ORDERS_BY_INVOICE_ID_SUCCESS,
  payload: { invoiceSearchOrders },
});
const getOrdersByInvoiceIdError = (error) => ({
  type: DASHBOARD_TYPES.GET_ORDERS_BY_INVOICE_ID_ERROR,
  payload: { error },
});
const getOrdersByInvoiceIdReset = () => ({
  type: DASHBOARD_TYPES.GET_ORDERS_BY_INVOICE_ID_RESET,
  payload: null,
});

// const getProductsBySkuRequest = () => ({
//   type: DASHBOARD_TYPES.GET_PRODUCTS_BY_SKU__REQUEST,
//   payload: null,
// });
// export const getProductsBySkuSuccess = (skuOrders) => ({
//   type: DASHBOARD_TYPES.GET_PRODUCTS_BY_SKU__SUCCESS,
//   payload: { skuOrders },
// });
// const getProductsBySkuError = (error) => ({
//   type: DASHBOARD_TYPES.GET_PRODUCTS_BY_SKU__ERROR,
//   payload: { error },
// });
// const getProductsBySkuReset = () => ({
//   type: DASHBOARD_TYPES.GET_PRODUCTS_BY_SKU_RESET,
//   payload: null,
// });

// const returnProductRequest = () => ({
//   type: DASHBOARD_TYPES.RETURN_PRODUCTS__REQUEST,
//   payload: null,
// });
// export const returnProductSuccess = (returnOrder) => ({
//   type: DASHBOARD_TYPES.RETURN_PRODUCTS__SUCCESS,
//   payload: { returnOrder },
// });
// const returnProductError = (error) => ({
//   type: DASHBOARD_TYPES.RETURN_PRODUCTS__ERROR,
//   payload: { error },
// });

const scanBarCodeRequest = () => ({
  type: DASHBOARD_TYPES.SCAN_BARCODE__REQUEST,
  payload: null,
});

// export const getOrderDeliveries =
//   (sellerID, page, callback) => async (dispatch, getState) => {
//     dispatch(getOrderDeliveriesRequest());
//     const orderDeleveriesProduct =
//       store.getState()?.dashboard?.getOrderDeliveries;
//     try {
//       const res = await DashboardController.getOrderDeliveries(sellerID, page);
//       const prevorderDeleveriesProduct = { ...orderDeleveriesProduct };
//       if (
//         orderDeleveriesProduct &&
//         Object.keys(orderDeleveriesProduct).length > 0 &&
//         page > 1
//       ) {
//         prevorderDeleveriesProduct.total = res?.payload?.total;
//         prevorderDeleveriesProduct.current_page = res?.payload?.current_page;
//         prevorderDeleveriesProduct.total_pages = res?.payload?.total_pages;
//         prevorderDeleveriesProduct.per_page = res?.payload?.per_page;
//         prevorderDeleveriesProduct.data =
//           prevorderDeleveriesProduct.data.concat(res?.payload?.data);
//         dispatch(getOrderDeliveriesSuccess(prevorderDeleveriesProduct));
//       } else {
//         dispatch(getOrderDeliveriesSuccess(res?.payload));
//       }
//       callback && callback(res);
//     } catch (error) {
//       if (error?.statusCode === 204) {
//         dispatch(getOrderDeliveriesReset());
//       }
//       dispatch(getOrderDeliveriesError(error.message));
//     }
//   };
// export const getDrawerSession = () => async (dispatch) => {
//   dispatch(getDrawerSessionRequest());
//   try {
//     const res = await DashboardController.getDrawerSession();
//     return dispatch(getDrawerSessionSuccess(res));
//   } catch (error) {
//     if (error?.statusCode === 204) {
//       dispatch(getDrawerSessionReset());
//     }
//     dispatch(getDrawerSessionError(error.message));
//   }
// };
// export const getDrawerSessionPost = (data) => async (dispatch) => {
//   dispatch(getDrawerSessionPostRequest());
//   try {
//     const res = await DashboardController.getDrawerSessionPost(data);
//     dispatch(getDrawerSessionPostSuccess(res?.payload));
//     if (res) {
//       const resData = {
//         drawerID: res?.payload?.id,
//         amount: data.amount,
//         notes: data.notes,
//       };
//       dispatch(startstarckingSession(resData));
//     }
//   } catch (error) {
//     if (error?.statusCode === 204) {
//       dispatch(getDrawerSessionPostReset());
//     }
//     dispatch(getDrawerSessionPostError(error.message));
//   }
// };

// export const startstarckingSession = (resData) => async (dispatch) => {
//   dispatch(startstarckingSessionRequest());
//   try {
//     const res = await DashboardController.startstarckingSession(resData);
//     dispatch(startstarckingSessionSuccess(res));
//     dispatch(getDrawerSession());
//   } catch (error) {
//     dispatch(startstarckingSessionError(error.message));
//   }
// };

// export const getTotalSaleAction = (sellerID) => async (dispatch) => {
//   dispatch(getTotalSaleRequest());
//   try {
//     const res = await DashboardController.getTotalSale(sellerID);
//     dispatch(getTotalSaleSuccess(res?.payload));
//   } catch (error) {
//     if (error?.statusCode === 204) {
//       dispatch(getTotalSaleReset());
//     }
//     dispatch(getTotalSaleError(error.message));
//   }
// };

// export const posLoginDetail = () => async (dispatch) => {
//   dispatch(posLoginDetailRequest());
//   try {
//     const res = await DashboardController.posLoginDetail();
//     dispatch(posLoginDetailSuccess(res?.payload));
//   } catch (error) {
//     if (error?.statusCode === 204) {
//       dispatch(posLoginDetailReset());
//     }
//     dispatch(posLoginDetailError(error.message));
//   }
// };

// export const searchProductList = (search, sellerID) => async (dispatch) => {
//   dispatch(searchProductListRequest());
//   try {
//     const res = await DashboardController.searchProductList(search, sellerID);
//     dispatch(searchProductListSuccess(res?.payload?.data));
//   } catch (error) {
//     if (error?.statusCode === 204) {
//       dispatch(searchProductListReset());
//     }
//     dispatch(searchProductListError(error.message));
//   }
// };

// export const addSellingSelection = (data) => async (dispatch) => {
//   dispatch(addSellingSelectionRequest());
//   try {
//     dispatch(addSellingSelectionSuccess(data));
//   } catch (error) {
//     dispatch(addSellingSelectionError(error.message));
//   }
// };

// export const onLineOrders = (sellerID) => async (dispatch) => {
//   dispatch(onLineOrdersRequest());
//   try {
//     const res = await DashboardController.onLineOrders(sellerID);
//     dispatch(onLineOrdersSuccess(res?.payload));
//   } catch (error) {
//     dispatch(onLineOrdersError(error.message));
//   }
// };

// export const getPendingOrders = () => async (dispatch) => {
//   const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
//   dispatch(getPendingOrdersRequest());
//   try {
//     const res = await DashboardController.getPendingOrders(sellerID);
//     dispatch(getPendingOrdersSuccess(res?.payload));
//   } catch (error) {
//     dispatch(getPendingOrdersError(error.message));
//   }
// };

export const getOrdersByInvoiceId = (invoice) => async (dispatch) => {
  dispatch(getOrdersByInvoiceIdRequest());
  try {
    const res = await DashboardController.getOrdersByInvoiceId(invoice);
    if (res?.payload?.order) {
      if (res?.payload?.order?.status === 9) {
        await dispatch(getOrderData(res?.payload?.order?.id));
      }
      dispatch(getOrdersByInvoiceIdSuccess(res?.payload));
    }
  } catch (error) {
    if (error?.msg === 'Invalid invoice number!') {
      dispatch(getOrdersByInvoiceIdReset());
    }
    dispatch(getOrdersByInvoiceIdError(error.message));
  }
};

// export const getProductsBySku = (sku) => async (dispatch) => {
//   dispatch(getProductsBySkuRequest());
//   try {
//     const res = await DashboardController.getProductsBySku(sku);
//     dispatch(getProductsBySkuSuccess(res?.payload));
//   } catch (error) {
//     if (error?.statusCode === 204) {
//       dispatch(getProductsBySkuReset());
//     }
//     dispatch(getProductsBySkuError(error.message));
//   }
// };

// export const returnProduct = (data, screen, callback) => async (dispatch) => {
//   dispatch(returnProductRequest());
//   try {
//     const res = await DashboardController.returnProduct(data, screen);
//     callback && callback(res);
//     dispatch(returnProductSuccess(res?.payload));
//   } catch (error) {
//     callback && callback(false);
//     dispatch(returnProductError(error.message));
//   }
// };

export const scanBarCode = (data) => async (dispatch) => {
  dispatch(scanBarCodeRequest());
  try {
    const res = await DashboardController.scanBarCode(data);
    if (res?.payload?.order) {
      if (res?.payload?.order?.status === 9) {
        dispatch(getOrderData(res?.payload?.order?.id));
      }
      dispatch(getOrdersByInvoiceIdSuccess(res?.payload));
    }
  } catch (error) {
    console.log(error);
    if (error?.msg === 'Invalid code!') {
      dispatch(getOrdersByInvoiceIdReset());
    }
    dispatch(getOrdersByInvoiceIdError(error.message));
  }
};

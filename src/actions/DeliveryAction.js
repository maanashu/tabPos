import { DeliveryController } from '@/controllers';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getPendingOrders } from './DashboardAction';
import { orderStatusCount } from './ShippingAction';

const getOrderCountRequest = () => ({
  type: TYPES.GET_ORDER_COUNT_REQUEST,
  payload: null,
});
const getOrderCountSuccess = (getOrderCount) => ({
  type: TYPES.GET_ORDER_COUNT_SUCCESS,
  payload: { getOrderCount },
});
const getOrderCountError = (error) => ({
  type: TYPES.GET_ORDER_COUNT_ERROR,
  payload: { error },
});

const getOrderListRequest = () => ({
  type: TYPES.GET_ORDER_LIST_REQUEST,
  payload: null,
});
const getOrderListSuccess = (getorderList) => ({
  type: TYPES.GET_ORDER_LIST_SUCCESS,
  payload: { getorderList },
});
const getOrderListError = (error) => ({
  type: TYPES.GET_ORDER_LIST_ERROR,
  payload: { error },
});

const getReviewDefRequest = () => ({
  type: TYPES.GET_REVIEW_DEF_REQUEST,
  payload: null,
});
const getReviewDefSuccess = (getReviewDef) => ({
  type: TYPES.GET_REVIEW_DEF_SUCCESS,
  payload: { getReviewDef },
});
const getReviewDefError = (error) => ({
  type: TYPES.GET_REVIEW_DEF_ERROR,
  payload: { error },
});
const getReviewDefReset = () => ({
  type: TYPES.GET_REVIEW_DEF_RESET,
  payload: null,
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

const acceptOrderRequest = () => ({
  type: TYPES.ACCEPT_ORDER_REQUEST,
  payload: null,
});
const acceptOrderSuccess = () => ({
  type: TYPES.ACCEPT_ORDER_SUCCESS,
  payload: {},
});
const acceptOrderError = (error) => ({
  type: TYPES.ACCEPT_ORDER_ERROR,
  payload: { error },
});

const verifyPickupOtpRequest = () => ({
  type: TYPES.VERIFY_PICKUP_OTP_REQUEST,
  payload: null,
});
const verifyPickupOtpSuccess = () => ({
  type: TYPES.VERIFY_PICKUP_OTP_SUCCESS,
  payload: {},
});
const verifyPickupOtpError = (error) => ({
  type: TYPES.VERIFY_PICKUP_OTP_ERROR,
  payload: { error },
});

const deliveryOrdRequest = () => ({
  type: TYPES.DELIVERY_ORDER_REQUEST,
  payload: null,
});
const deliveryOrdSuccess = (deliveryOrd) => ({
  type: TYPES.DELIVERY_ORDER_SUCCESS,
  payload: { deliveryOrd },
});
const deliveryOrdError = (error) => ({
  type: TYPES.DELIVERY_ORDER_ERROR,
  payload: { error },
});
const deliveryOrdReset = () => ({
  type: TYPES.DELIVERY_ORDER_RESET,
  payload: null,
});

const deliverygraphRequest = () => ({
  type: TYPES.DELIVERY_GRAPH_REQUEST,
  payload: null,
});
const deliverygraphSuccess = (deliverygraph) => ({
  type: TYPES.DELIVERY_GRAPH_SUCCESS,
  payload: { deliverygraph },
});
const deliverygraphError = (error) => ({
  type: TYPES.DELIVERY_GRAPH_ERROR,
  payload: { error },
});

const deliveringOrderRequest = () => ({
  type: TYPES.DELIVERING_ORDER_REQUEST,
  payload: null,
});
const deliveringOrderSuccess = (deliveringOrder) => ({
  type: TYPES.DELIVERING_ORDER_SUCCESS,
  payload: { deliveringOrder },
});
const deliveringOrderError = (error) => ({
  type: TYPES.DELIVERING_ORDER_ERROR,
  payload: { error },
});
const deliveringOrderReset = () => ({
  type: TYPES.DELIVERING_ORDER_RESET,
  payload: null,
});

const todayOrdersRequest = () => ({
  type: TYPES.TODAY_ORDER_STATUS_REQUEST,
  payload: null,
});
const todayOrdersSuccess = (orderStatus) => ({
  type: TYPES.TODAY_ORDER_STATUS_SUCCESS,
  payload: { orderStatus },
});
const todayOrdersError = (error) => ({
  type: TYPES.TODAY_ORDER_STATUS_ERROR,
  payload: { error },
});
const todayOrdersReset = () => ({
  type: TYPES.TODAY_ORDER_STATUS_RESET,
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

const getGraphOrdersRequest = () => ({
  type: TYPES.GET_GRAPH_ORDERS_REQUEST,
  payload: null,
});
const getGraphOrdersSuccess = (getGraphOrders) => ({
  type: TYPES.GET_GRAPH_ORDERS_SUCCESS,
  payload: { getGraphOrders },
});
const getGraphOrdersError = (error) => ({
  type: TYPES.GET_GRAPH_ORDERS_ERROR,
  payload: { error },
});

const getSellerDriverListRequest = () => ({
  type: TYPES.GET_SELLER_DRIVERS_REQUEST,
  payload: null,
});
const getSellerDriverListSuccess = (getSellerDriverList) => ({
  type: TYPES.GET_SELLER_DRIVERS_SUCCESS,
  payload: { getSellerDriverList },
});
const getSellerDriverListError = (error) => ({
  type: TYPES.GET_SELLER_DRIVERS_ERROR,
  payload: { error },
});

const getProductByUpcRequest = () => ({
  type: TYPES.GET_PRODUCT_BY_UPC_REQUEST,
  payload: null,
});
const getProductByUpcSuccess = (getProductByUpc) => ({
  type: TYPES.GET_PRODUCT_BY_UPC_SUCCESS,
  payload: { getProductByUpc },
});
const getProductByUpcError = (error) => ({
  type: TYPES.GET_PRODUCT_BY_UPC_ERROR,
  payload: { error },
});

export const getOrderCount = (callback) => async (dispatch) => {
  dispatch(getOrderCountRequest());
  try {
    const res = await DeliveryController.getOrderCount();
    callback && callback(res?.payload?.status_count);
    dispatch(getOrderCountSuccess(res));
  } catch (error) {
    dispatch(getOrderCountError(error.message));
  }
};
export const getReviewDefault = (status) => async (dispatch) => {
  dispatch(getReviewDefRequest());
  try {
    const res = await DeliveryController.getReviewDefault(status);
    dispatch(getReviewDefSuccess(res));
    dispatch(deliOrder());
    dispatch(getPendingOrders());
    dispatch(getOrderCount());
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getReviewDefReset());
    }
    dispatch(getReviewDefError(error.message));
  }
};

export const getOrders = (status) => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const res = await DeliveryController.getOrders(status);
    return dispatch(getOrdersSuccess(res));
  } catch (error) {
    dispatch(getOrdersError(error.message));
  }
};

export const acceptOrder = (data, openShippingOrders, delivery, callback) => async (dispatch) => {
  dispatch(acceptOrderRequest());
  try {
    const res = await DeliveryController.acceptOrder(data);
    await dispatch(getOrderCount());
    callback && callback(res);
    dispatch(acceptOrderSuccess(res));
    dispatch(getPendingOrders());
  } catch (error) {
    dispatch(acceptOrderError(error.message));
    return error;
  }
};

export const verifyPickupOtp = (data, callback) => async (dispatch) => {
  dispatch(verifyPickupOtpRequest());
  try {
    const res = await DeliveryController.verifyPickupOtp(data);
    dispatch(verifyPickupOtpSuccess(res));

    return res;
    // await dispatch(getOrderCount());
    // callback && callback(res);
    // dispatch(getPendingOrders());
  } catch (error) {
    console.log('error', JSON.stringify(error));

    dispatch(verifyPickupOtpError(error.message));
  }
};
export const deliveryOrd = () => async (dispatch) => {
  dispatch(deliveryOrdRequest());
  try {
    const res = await DeliveryController.deliveryOrd();
    dispatch(deliveryOrdSuccess(res?.payload?.shipping_type_Count));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(deliveryOrdReset());
    }
    dispatch(deliveryOrdError(error.message));
  }
};

export const deliverygraph = () => async (dispatch) => {
  dispatch(deliverygraphRequest());
  try {
    const res = await DeliveryController.deliverygraph();
    dispatch(deliverygraphSuccess(res?.payload));
  } catch (error) {
    dispatch(deliverygraphError(error.message));
  }
};

export const deliOrder = () => async (dispatch) => {
  dispatch(deliveringOrderRequest());
  try {
    const res = await DeliveryController.deliveringOrder();
    dispatch(deliveringOrderSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(deliveringOrderReset());
    }
    dispatch(deliveringOrderError(error.message));
  }
};

export const todayOrders = () => async (dispatch) => {
  dispatch(todayOrdersRequest());
  try {
    const res = await DeliveryController.todayOrders();
    dispatch(todayOrdersSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(todayOrdersReset());
    }
    dispatch(todayOrdersError(error.message));
  }
};

export const getOrderstatistics = (delivery) => async (dispatch) => {
  dispatch(getOrderstatisticsRequest());
  try {
    const res = await DeliveryController.getOrderstatistics(delivery);
    return dispatch(getOrderstatisticsSuccess(res?.payload));
  } catch (error) {
    dispatch(getOrderstatisticsError(error.message));
  }
};

export const getGraphOrders = () => async (dispatch) => {
  dispatch(getGraphOrdersRequest());
  try {
    const res = await DeliveryController.getGraphOrders();
    return dispatch(getGraphOrdersSuccess(res?.payload));
  } catch (error) {
    dispatch(getGraphOrdersError(error.message));
  }
};

export const getSellerDriverList = () => async (dispatch) => {
  dispatch(getSellerDriverListRequest());
  try {
    const res = await DeliveryController.getSellerDriverList();
    return dispatch(getSellerDriverListSuccess(res?.payload));
  } catch (error) {
    dispatch(getSellerDriverListError(error.message));
  }
};

export const getProductByUpc = (upc, callback) => async (dispatch) => {
  dispatch(getProductByUpcRequest());
  try {
    const res = await DeliveryController.getProductByUpc(upc);
    callback && callback(res?.payload?.product_detail?.id);
    return dispatch(getProductByUpcSuccess(res?.payload));
  } catch (error) {
    dispatch(getProductByUpcError(error.message));
  }
};

import { RETAIL_TYPES } from '@mPOS/Types/RetailTypes';
import { RetailController } from '@mPOS/controllers/RetailController';
import { store } from '@/store';

const getProductRequest = () => ({
  type: RETAIL_TYPES.GET_PRODUCT_REQUEST,
  payload: null,
});
const getProductSuccess = (getProduct) => ({
  type: RETAIL_TYPES.GET_PRODUCT_SUCCESS,
  payload: { getProduct },
});
const getProductError = (error) => ({
  type: RETAIL_TYPES.GET_PRODUCT_ERROR,
  payload: { error },
});
const getProductReset = () => ({
  type: RETAIL_TYPES.GET_PRODUCT_RESET,
  payload: null,
});

const getOneProductRequest = () => ({
  type: RETAIL_TYPES.GET_ONE_PRODUCT_REQUEST,
  payload: null,
});
const getOneProductSuccess = (getOneProduct) => ({
  type: RETAIL_TYPES.GET_ONE_PRODUCT_SUCCESS,
  payload: { getOneProduct },
});
const getOneProductError = (error) => ({
  type: RETAIL_TYPES.GET_ONE_PRODUCT_ERROR,
  payload: { error },
});
const getOneProductReset = () => ({
  type: RETAIL_TYPES.GET_ONE_PRODUCT_RESET,
  payload: null,
});

// add product cart
const addProductCartRequest = () => ({
  type: RETAIL_TYPES.ADD_PRODUCT_CART_REQUEST,
  payload: null,
});
const addProductCartSuccess = () => ({
  type: RETAIL_TYPES.ADD_PRODUCT_CART_SUCCESS,
  payload: {},
});
const addProductCartError = (error) => ({
  type: RETAIL_TYPES.ADD_PRODUCT_CART_ERROR,
  payload: { error },
});

// supply variant check
const checkSuppliedVariantRequest = () => ({
  type: RETAIL_TYPES.CHECK_SUPPLIES_VARIANT_REQUEST,
  payload: null,
});
const checkSuppliedVariantSuccess = () => ({
  type: RETAIL_TYPES.CHECK_SUPPLIES_VARIANT_SUCCESS,
  payload: null,
});
const checkSuppliedVariantError = (error) => ({
  type: RETAIL_TYPES.CHECK_SUPPLIES_VARIANT_ERROR,
  payload: { error },
});
const checkSuppliedVariantReset = () => ({
  type: RETAIL_TYPES.CHECK_SUPPLIES_VARIANT_RESET,
  payload: null,
});

// get product cart
const getProductCartRequest = () => ({
  type: RETAIL_TYPES.GET_PRODUCT_CART_REQUEST,
  payload: null,
});
const getProductCartSuccess = (productCart) => ({
  type: RETAIL_TYPES.GET_PRODUCT_CART_SUCCESS,
  payload: { productCart },
});
const getProductCartError = (error) => ({
  type: RETAIL_TYPES.GET_PRODUCT_CART_ERROR,
  payload: { error },
});
const getProductCartReset = () => ({
  type: RETAIL_TYPES.GET_PRODUCT_CART_RESET,
  payload: null,
});

//clear product cart
const clearProductCartRequest = () => ({
  type: RETAIL_TYPES.CLEAR_PRODUCT_CART_REQUEST,
  payload: null,
});
const clearProductCartSuccess = () => ({
  type: RETAIL_TYPES.CLEAR_PRODUCT_CART_SUCCESS,
  payload: null,
});
const clearProductCartError = (error) => ({
  type: RETAIL_TYPES.CLEAR_PRODUCT_CART_ERROR,
  payload: { error },
});
const clearProductCartReset = () => ({
  type: RETAIL_TYPES.CLEAR_PRODUCT_CART_RESET,
  payload: null,
});

export const getProduct = (productTypeID, page) => async (dispatch) => {
  dispatch(getProductRequest());
  const mainProduct = store.getState()?.retail?.getProduct;
  try {
    const res = await RetailController.getProduct(productTypeID, page);
    // const prevMainProduct = { ...mainProduct };
    // if (mainProduct && Object.keys(mainProduct)?.length > 0 && page > 1) {
    //   prevMainProduct.total = res?.payload?.total;
    //   prevMainProduct.current_page = res?.payload?.current_page;
    //   prevMainProduct.total_pages = res?.payload?.total_pages;
    //   prevMainProduct.per_page = res?.payload?.per_page;
    //   prevMainProduct.data = prevMainProduct.data.concat(res?.payload?.data);
    //   dispatch(getProductSuccess(prevMainProduct));
    // } else {
    //   dispatch(getProductSuccess(res?.payload));
    // }
    // callback && callback(res);
    dispatch(getProductSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductReset());
    }
    dispatch(getProductError(error.message));
  }
};

export const getOneProduct = (productId, callback) => async (dispatch) => {
  dispatch(getOneProductRequest());
  try {
    const res = await RetailController.getOneProduct(productId);
    callback && callback(res?.msg);
    dispatch(getOneProductSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOneProductReset());
    }
    dispatch(getOneProductError(error.message));
  }
};

export const addProductCart = (data) => async (dispatch) => {
  dispatch(addProductCartRequest());
  try {
    const res = await RetailController.addProductCart(data);
    dispatch(addProductCartSuccess(res));
    dispatch(getProductCart());
    return res;
  } catch (error) {
    dispatch(addProductCartError(error.message));
    return error;
  }
};

export const checkSuppliedVariant = (data, callback) => async (dispatch) => {
  dispatch(checkSuppliedVariantRequest());
  try {
    const res = await RetailController.checkSuppliedVariant(data);
    callback && callback(res?.payload);
    dispatch(checkSuppliedVariantSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(checkSuppliedVariantReset());
    }
    dispatch(checkSuppliedVariantError(error.message));
    return error;
  }
};

export const getProductCart = () => async (dispatch) => {
  dispatch(getProductCartRequest());
  try {
    const res = await RetailController.getProductCart();
    dispatch(getProductCartSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductCartReset());
    }
    dispatch(getProductCartError(error.message));
    return error;
  }
};

export const clearProductCart = () => async (dispatch) => {
  dispatch(clearProductCartRequest());
  try {
    const res = await RetailController.clearProductCart();
    dispatch(clearProductCartSuccess(res));
    dispatch(getProductCart());
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(clearProductCartReset());
    }
    dispatch(clearProductCartError(error.message));
    return error;
  }
};

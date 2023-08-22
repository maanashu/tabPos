import { RetailController } from '@/controllers';
import { TYPES } from '@/Types/Types';
import { addLocalCart, clearLocalCart, updateCartLength } from './CartAction';

const getCategoryRequest = () => ({
  type: TYPES.GET_CATEGORY_REQUEST,
  payload: null,
});

const getCategorySuccess = (categoryList) => ({
  type: TYPES.GET_CATEGORY_SUCCESS,
  payload: { categoryList },
});

const getCategoryError = (error) => ({
  type: TYPES.GET_CATEGORY_ERROR,
  payload: { error },
});
const getCategoryReset = () => ({
  type: TYPES.GET_CATEGORY_RESET,
  payload: null,
});

const getServiceCategoryRequest = () => ({
  type: TYPES.GET_SERVICE_CATEGORY_REQUEST,
  payload: null,
});

const getServiceCategorySuccess = (serviceCategoryList) => ({
  type: TYPES.GET_SERVICE_CATEGORY_SUCCESS,
  payload: { serviceCategoryList },
});

const getServiceCategoryError = (error) => ({
  type: TYPES.GET_SERVICE_CATEGORY_ERROR,
  payload: { error },
});
const getServiceCategoryReset = () => ({
  type: TYPES.GET_SERVICE_CATEGORY_RESET,
  payload: null,
});

const getSubCategoryRequest = () => ({
  type: TYPES.GET_SUB_CATEGORY_REQUEST,
  payload: null,
});
const getSubCategorySuccess = (subCategoryList) => ({
  type: TYPES.GET_SUB_CATEGORY_SUCCESS,
  payload: { subCategoryList },
});
const getSubCategoryError = (error) => ({
  type: TYPES.GET_SUB_CATEGORY_ERROR,
  payload: { error },
});
const getSubCategoryReset = () => ({
  type: TYPES.GET_SUB_CATEGORY_RESET,
  payload: null,
});

const getServiceSubCategoryRequest = () => ({
  type: TYPES.GET_SERVICE_SUB_CATEGORY_REQUEST,
  payload: null,
});
const getServiceSubCategorySuccess = (serviceSubCategoryList) => ({
  type: TYPES.GET_SERVICE_SUB_CATEGORY_SUCCESS,
  payload: { serviceSubCategoryList },
});
const getServiceSubCategoryError = (error) => ({
  type: TYPES.GET_SERVICE_SUB_CATEGORY_ERROR,
  payload: { error },
});
const getServiceSubCategoryReset = () => ({
  type: TYPES.GET_SERVICE_SUB_CATEGORY_RESET,
  payload: null,
});

const getBrandRequest = () => ({
  type: TYPES.GET_BRAND_REQUEST,
  payload: null,
});

const getBrandSuccess = (brandList) => ({
  type: TYPES.GET_BRAND_SUCCESS,
  payload: { brandList },
});

const getBrandError = (error) => ({
  type: TYPES.GET_BRAND_ERROR,
  payload: { error },
});

const getBrandReset = () => ({
  type: TYPES.GET_BRAND_RESET,
  payload: null,
});

const getProductRequest = () => ({
  type: TYPES.GET_PRODUCT_REQUEST,
  payload: null,
});

const getProductSuccess = (productList) => ({
  type: TYPES.GET_PRODUCT_SUCCESS,
  payload: { productList },
});

const getProductError = (error) => ({
  type: TYPES.GET_PRODUCT_ERROR,
  payload: { error },
});

const getProductReset = () => ({
  type: TYPES.GET_PRODUCT_RESET,
  payload: null,
});

const getProductDefRequest = () => ({
  type: TYPES.GET_PRODUCT_DEF_REQUEST,
  payload: null,
});

const getProductDefSuccess = (getProductDefault) => ({
  type: TYPES.GET_PRODUCT_DEF_SUCCESS,
  payload: { getProductDefault },
});

const getProductDefError = (error) => ({
  type: TYPES.GET_PRODUCT_DEF_ERROR,
  payload: { error },
});

const getProductDefReset = () => ({
  type: TYPES.GET_PRODUCT_DEF_RESET,
  payload: null,
});

const getSeaProductRequest = () => ({
  type: TYPES.GET_SEAPRODUCT_REQUEST,
  payload: null,
});

const getSeaProductSuccess = (SeaProductList) => ({
  type: TYPES.GET_SEAPRODUCT_SUCCESS,
  payload: { SeaProductList },
});

const getSeaProductError = (error) => ({
  type: TYPES.GET_SEAPRODUCT_ERROR,
  payload: { error },
});

const getAllCartRequest = () => ({
  type: TYPES.GET_ALL_CART_REQUEST,
  payload: null,
});

export const getAllCartSuccess = (getAllCart) => ({
  type: TYPES.GET_ALL_CART_SUCCESS,
  payload: getAllCart,
});

const getAllCartError = (error) => ({
  type: TYPES.GET_ALL_CART_ERROR,
  payload: { error },
});

const getAllCartReset = () => ({
  type: TYPES.GET_ALL_CART_RESET,
  payload: null,
});

const getClearAllCartRequest = () => ({
  type: TYPES.GET_CLEAR_ALL_CART_REQUEST,
  payload: null,
});
const getClearAllCartSuccess = () => ({
  type: TYPES.GET_CLEAR_ALL_CART_SUCCESS,
  payload: {},
});
const getClearAllCartError = (error) => ({
  type: TYPES.GET_CLEAR_ALL_CART_ERROR,
  payload: { error },
});

const clearServiceAllCartRequest = () => ({
  type: TYPES.CLEAR_SERVICE_ALL_CART_REQUEST,
  payload: null,
});
export const clearServiceAllCartSuccess = () => ({
  type: TYPES.CLEAR_SERVICE_ALL_CART_SUCCESS,
  payload: {},
});
const clearServiceAllCartError = (error) => ({
  type: TYPES.CLEAR_SERVICE_ALL_CART_ERROR,
  payload: { error },
});

const getClearAllCartReset = () => ({
  type: TYPES.GET_CLEAR_ALL_CART_RESET,
  payload: null,
});

const ClearOneCartRequest = () => ({
  type: TYPES.GET_CLEAR_ONE_CART_REQUEST,
  payload: null,
});

const clearOneCartSuccess = () => ({
  type: TYPES.GET_CLEAR_ONE_CART_SUCCESS,
  payload: {},
});

const clearOneCartError = (error) => ({
  type: TYPES.GET_CLEAR_ONE_CART_ERROR,
  payload: { error },
});
const getOneCartReset = () => ({
  type: TYPES.GET_CLEAR_ONE_CART_RESET,
  payload: null,
});

const addTocartRequest = () => ({
  type: TYPES.ADDCART_REQUEST,
  payload: null,
});
const addTocartSuccess = () => ({
  type: TYPES.ADDCART_SUCCESS,
  payload: {},
});
const addTocartError = (error) => ({
  type: TYPES.ADDCART_ERROR,
  payload: { error },
});

const addToServiceCartRequest = () => ({
  type: TYPES.ADD_SERVICE_CART_REQUEST,
  payload: null,
});
const addToServiceCartSuccess = () => ({
  type: TYPES.ADD_SERVICE_CART_SUCCESS,
  payload: {},
});
const addToServiceCartError = (error) => ({
  type: TYPES.ADD_SERVICE_CART_ERROR,
  payload: { error },
});

const updateCartQtyRequest = () => ({
  type: TYPES.UPDATE_CART_QTY_REQUEST,
  payload: null,
});

const updateCartQtySuccess = (data) => ({
  type: TYPES.UPDATE_CART_QTY_SUCCESS,
  payload: { data },
});

const updateCartQtyError = (error) => ({
  type: TYPES.UPDATE_CART_QTY_ERROR,
  payload: { error },
});

const addNotesRequest = () => ({
  type: TYPES.ADDNOTES_REQUEST,
  payload: null,
});

const addNotesSuccess = () => ({
  type: TYPES.ADDNOTES_SUCCESS,
  payload: {},
});

const addNotesError = (error) => ({
  type: TYPES.ADDNOTES_ERROR,
  payload: { error },
});

const addDiscountRequest = () => ({
  type: TYPES.ADD_DISCOUNT_REQUEST,
  payload: null,
});

const addDiscountSuccess = () => ({
  type: TYPES.ADD_DISCOUNT_SUCCESS,
  payload: {},
});

const addDiscountError = (error) => ({
  type: TYPES.ADD_DISCOUNT_ERROR,
  payload: { error },
});

const addServiceDiscountToCartRequest = () => ({
  type: TYPES.ADD_SERVICE_DISCOUNT_REQUEST,
  payload: null,
});

const addServiceDiscountToCartSuccess = () => ({
  type: TYPES.ADD_SERVICE_DISCOUNT_SUCCESS,
  payload: {},
});

const addServiceDiscountToCartError = (error) => ({
  type: TYPES.ADD_SERVICE_DISCOUNT_ERROR,
  payload: { error },
});

const getProductBundleRequest = () => ({
  type: TYPES.GET_BUNDLEOFFER_REQUEST,
  payload: null,
});

const getProductBundleSuccess = (productbunList) => ({
  type: TYPES.GET_BUNDLEOFFER_SUCCESS,
  payload: { productbunList },
});

const getProductBundleError = (error) => ({
  type: TYPES.GET_BUNDLEOFFER_ERROR,
  payload: { error },
});

const getProductBundleReset = () => ({
  type: TYPES.GET_BUNDLEOFFER_RESET,
  payload: null,
});

const getUserDetailRequest = () => ({
  type: TYPES.GET_USERDETAIL_REQUEST,
  payload: null,
});

export const getUserDetailSuccess = (getUserDetail) => ({
  type: TYPES.GET_USERDETAIL_SUCCESS,
  payload: { getUserDetail },
});

const getUserDetailError = (error) => ({
  type: TYPES.GET_USERDETAIL_ERROR,
  payload: { error },
});

const getUserDetailReset = () => ({
  type: TYPES.GET_USERDETAIL_RESET,
  payload: null,
});

const sendInvitationRequest = () => ({
  type: TYPES.SEND_INVITATION_REQUEST,
  payload: null,
});

const sendInvitationSuccess = () => ({
  type: TYPES.SEND_INVITATION_SUCCESS,
  payload: {},
});

const sendInvitationError = (error) => ({
  type: TYPES.SEND_INVITATION_ERROR,
  payload: { error },
});

const createOrderRequest = () => ({
  type: TYPES.CREATE_ORDER_REQUEST,
  payload: null,
});

const createOrderSuccess = () => ({
  type: TYPES.CREATE_ORDER_SUCCESS,
  payload: {},
});

const createOrderError = (error) => ({
  type: TYPES.CREATE_ORDER_ERROR,
  payload: { error },
});

const createServiceOrderRequest = () => ({
  type: TYPES.CREATE_SERVICE_ORDER_REQUEST,
  payload: null,
});

const createServiceOrderSuccess = () => ({
  type: TYPES.CREATE_SERVICE_ORDER_SUCCESS,
  payload: {},
});

const createServiceOrderError = (error) => ({
  type: TYPES.CREATE_SERVICE_ORDER_ERROR,
  payload: { error },
});

const clearRetailStore = () => ({
  type: TYPES.CLEAR_RETAIL_STORE,
  payload: null,
});

const getWalletIdRequest = () => ({
  type: TYPES.GET_WALLET_REQUEST,
  payload: null,
});

const getWalletIdSuccess = (getWallet) => ({
  type: TYPES.GET_WALLET_SUCCESS,
  payload: { getWallet },
});

const getWalletIdError = (error) => ({
  type: TYPES.GET_WALLET_ERROR,
  payload: { error },
});

const getWalletIdReset = () => ({
  type: TYPES.GET_WALLET_RESET,
  payload: null,
});

const walletGetByPhoneRequest = () => ({
  type: TYPES.GET_WALLET_PHONE_REQUEST,
  payload: null,
});

const walletGetByPhoneSuccess = (walletGetByPhone) => ({
  type: TYPES.GET_WALLET_PHONE_SUCCESS,
  payload: { walletGetByPhone },
});

const walletGetByPhoneError = (error) => ({
  type: TYPES.GET_WALLET_PHONE_ERROR,
  payload: { error },
});

const walletGetByPhoneReset = () => ({
  type: TYPES.GET_WALLET_PHONE_RESET,
  payload: null,
});

const requestMoneyRequest = () => ({
  type: TYPES.REQUEST_MONEY_REQUEST,
  payload: null,
});

export const requestMoneySuccess = (requestMoney) => ({
  type: TYPES.REQUEST_MONEY_SUCCESS,
  payload: requestMoney,
});

const requestMoneyError = (error) => ({
  type: TYPES.REQUEST_MONEY_ERROR,
  payload: { error },
});

const getTipsRequest = () => ({
  type: TYPES.GET_TIPS_REQUEST,
  payload: null,
});

const getTipsSuccess = (getTips) => ({
  type: TYPES.GET_TIPS_SUCCESS,
  payload: { getTips },
});

const getTipsError = (error) => ({
  type: TYPES.GET_TIPS_ERROR,
  payload: { error },
});

const getTipsReset = () => ({
  type: TYPES.GET_TIPS_RESET,
  payload: null,
});

const getOneProductRequest = () => ({
  type: TYPES.GET_ONE_PRODUCT_REQUEST,
  payload: null,
});

const getOneProductSuccess = (getOneProduct) => ({
  type: TYPES.GET_ONE_PRODUCT_SUCCESS,
  payload: { getOneProduct },
});

const getOneProductError = (error) => ({
  type: TYPES.GET_ONE_PRODUCT_ERROR,
  payload: { error },
});

const getOneServiceRequest = () => ({
  type: TYPES.GET_ONE_SERVICE_REQUEST,
  payload: null,
});

const getOneServiceSuccess = (getOneService) => ({
  type: TYPES.GET_ONE_SERVICE_SUCCESS,
  payload: { getOneService },
});

const getOneServiceError = (error) => ({
  type: TYPES.GET_ONE_SERVICE_ERROR,
  payload: { error },
});

const checkSuppliedVariantRequest = () => ({
  type: TYPES.CHECK_SUPPLIES_VARIANT_REQUEST,
  payload: null,
});

const checkSuppliedVariantSuccess = (checkSuppliedVariant) => ({
  type: TYPES.CHECK_SUPPLIES_VARIANT_SUCCESS,
  payload: checkSuppliedVariant,
});

const checkSuppliedVariantReset = () => ({
  type: TYPES.CHECK_SUPPLIES_VARIANT_RESET,
  payload: null,
});

const checkSuppliedVariantError = (error) => ({
  type: TYPES.CHECK_SUPPLIES_VARIANT_ERROR,
  payload: { error },
});

const requestCheckRequest = () => ({
  type: TYPES.REQUEST_CHECK_REQUEST,
  payload: null,
});

export const requestCheckSuccess = (requestCheck) => ({
  type: TYPES.REQUEST_CHECK_SUCCESS,
  payload: requestCheck,
});

const requestCheckError = (error) => ({
  type: TYPES.REQUEST_CHECK_ERROR,
  payload: { error },
});

const qrCodeStatusRequest = () => ({
  type: TYPES.QR_CODE_STATUS_REQUEST,
  payload: null,
});

export const qrCodeStatusSuccess = (check) => ({
  type: TYPES.QR_CODE_STATUS_SUCCESS,
  payload: check,
});

const qrcodestatusError = (error) => ({
  type: TYPES.QR_CODE_STATUS_ERROR,
  payload: { error },
});

const clearCheckStore = () => ({
  type: TYPES.CLEAR_CHECK_STORE,
  payload: null,
});
export const cartScreenTrue = (trueCart) => ({
  type: TYPES.CART_SCREEN_TRUE,
  payload: { trueCart },
});
export const customerTrue = (trueCustomer) => ({
  type: TYPES.TURE_CUSTOMER,
  payload: { trueCustomer },
});
export const customerNumber = (customerNumber) => ({
  type: TYPES.CUSTOMER_NUMBER,
  payload: { customerNumber },
});

const scanProductAddRequest = () => ({
  type: TYPES.SCAN_PRODUCT_ADD_REQUEST,
  payload: null,
});

const scanProductAddSuccess = (scanProductAdd) => ({
  type: TYPES.SCAN_PRODUCT_ADD_SUCCESS,
  payload: scanProductAdd,
});

const scanProductAddError = (error) => ({
  type: TYPES.SCAN_PRODUCT_ADD_ERROR,
  payload: { error },
});

const getMainProductRequest = () => ({
  type: TYPES.GET_MAIN_PRODUCT_REQUEST,
  payload: null,
});

export const getMainProductSuccess = (getMainProduct) => ({
  type: TYPES.GET_MAIN_PRODUCT_SUCCESS,
  payload: getMainProduct,
});

const getMainProductReset = () => ({
  type: TYPES.GET_MAIN_PRODUCT_RESET,
  payload: null,
});

const getMainProductError = (error) => ({
  type: TYPES.GET_MAIN_PRODUCT_ERROR,
  payload: { error },
});

const getMainServicesRequest = () => ({
  type: TYPES.GET_MAIN_SERVICES_REQUEST,
  payload: null,
});

const getMainServicesSuccess = (getMainServices) => ({
  type: TYPES.GET_MAIN_SERVICES_SUCCESS,
  payload: getMainServices,
});

const getMainServicesReset = () => ({
  type: TYPES.GET_MAIN_SERVICES_RESET,
  payload: null,
});

const getMainServicesError = (error) => ({
  type: TYPES.GET_MAIN_SERVICES_ERROR,
  payload: { error },
});

const createBulkCartRequest = () => ({
  type: TYPES.CREATE_BULK_CART_REQUEST,
  payload: null,
});

const createBulkcartSuccess = (bulkCreate) => ({
  type: TYPES.CREATE_BULK_CART_SUCCESS,
  payload: { bulkCreate },
});

const createBulkCartError = (error) => ({
  type: TYPES.CREATE_BULK_CART_ERROR,
  payload: { error },
});
export const saveBulkOrderData = (bulkData) => ({
  type: TYPES.SAVE_BULK_DATA_SUCCESS,
  payload: { bulkData },
});
export const saveBulkOrderDataReset = () => ({
  type: TYPES.SAVE_BULK_DATA_RESET,
  payload: null,
});

const attachCustomerRequest = () => ({
  type: TYPES.ATTACH_CUSTOMER_REQUEST,
  payload: null,
});

const attachCustomerSuccess = (attachCustomer) => ({
  type: TYPES.ATTACH_CUSTOMER_SUCCESS,
  payload: attachCustomer,
});

const attachCustomerReset = () => ({
  type: TYPES.ATTACH_CUSTOMER_RESET,
  payload: null,
});

const attachCustomerError = (error) => ({
  type: TYPES.ATTACH_CUSTOMER_ERROR,
  payload: { error },
});

const attachServiceCustomerRequest = () => ({
  type: TYPES.ATTACH_SERVICE_CUSTOMER_REQUEST,
  payload: null,
});

const attachServiceCustomerSuccess = () => ({
  type: TYPES.ATTACH_SERVICE_CUSTOMER_SUCCESS,
  payload: {},
});

const attachServiceCustomerReset = () => ({
  type: TYPES.ATTACH_SERVICE_CUSTOMER_RESET,
  payload: null,
});

const attachServiceCustomerError = (error) => ({
  type: TYPES.ATTACH_SERVICE_CUSTOMER_ERROR,
  payload: { error },
});

const getServiceCartRequest = () => ({
  type: TYPES.GET_SERVICE_CART_REQUEST,
  payload: null,
});

export const getServiceCartSuccess = (getserviceCart) => ({
  type: TYPES.GET_SERVICE_CART_SUCCESS,
  payload: getserviceCart,
});

const getServiceCartError = (error) => ({
  type: TYPES.GET_SERVICE_CART_ERROR,
  payload: { error },
});

const getServiceCartReset = () => ({
  type: TYPES.GET_SERVICE_CART_RESET,
  payload: null,
});

const getAllProductCartRequest = () => ({
  type: TYPES.GET_ALL_PRODUCT_CART_REQUEST,
  payload: null,
});
export const getAllProductCartSuccess = (getAllProductCart) => ({
  type: TYPES.GET_ALL_PRODUCT_CART_SUCCESS,
  payload: getAllProductCart,
});
const getAllProductCartError = (error) => ({
  type: TYPES.GET_ALL_PRODUCT_CART_ERROR,
  payload: { error },
});
const getAllProductCartReset = () => ({
  type: TYPES.GET_ALL_PRODUCT_CART_RESET,
  payload: null,
});

const getAllServiceCartRequest = () => ({
  type: TYPES.GET_ALL_SERVICE_CART_REQUEST,
  payload: null,
});
export const getAllServiceCartSuccess = (getAllServiceCart) => ({
  type: TYPES.GET_ALL_SERVICE_CART_SUCCESS,
  payload: getAllServiceCart,
});
const getAllServiceCartError = (error) => ({
  type: TYPES.GET_ALL_SERVICE_CART_ERROR,
  payload: { error },
});
const getAllServiceCartReset = () => ({
  type: TYPES.GET_ALL_SERVICE_CART_RESET,
  payload: null,
});

const getQrCodeRequest = () => ({
  type: TYPES.GET_QR_CODE_REQUEST,
  payload: null,
});

const getQrCodeSuccess = (qr) => ({
  type: TYPES.GET_QR_CODE_SUCCESS,
  payload: { qr },
});
const getQrCodeError = (error) => ({
  type: TYPES.GET_QR_CODE_ERROR,
  payload: { error },
});
const getQrcodeReset = () => ({
  type: TYPES.GET_QR_CODE_RESET,
  payload: null,
});

const changeStatusProductCartRequest = () => ({
  type: TYPES.CHANGE_STATUS_PRODUCT_CART_REQUEST,
  payload: null,
});
const changeStatusProductCartSuccess = () => ({
  type: TYPES.CHANGE_STATUS_PRODUCT_CART_SUCCESS,
  payload: {},
});
const changeStatusProductCartError = (error) => ({
  type: TYPES.CHANGE_STATUS_PRODUCT_CART_ERROR,
  payload: { error },
});

const addServiceNotescartRequest = () => ({
  type: TYPES.ADD_SERVICE_NOTES_CART_REQUEST,
  payload: null,
});

const addServiceNotescartSuccess = () => ({
  type: TYPES.ADD_SERVICE_NOTES_CART_SUCCESS,
  payload: {},
});
const addServiceNotescartError = (error) => ({
  type: TYPES.ADD_SERVICE_NOTES_CART_ERROR,
  payload: { error },
});

const changeStatusServiceCartRequest = () => ({
  type: TYPES.CHANGE_STATUS_SERVICE_CART_REQUEST,
  payload: null,
});
const changeStatusServiceCartSuccess = () => ({
  type: TYPES.CHANGE_STATUS_SERVICE_CART_SUCCESS,
  payload: {},
});
const changeStatusServiceCartError = (error) => ({
  type: TYPES.CHANGE_STATUS_SERVICE_CART_ERROR,
  payload: { error },
});

//Get time slots
const getTimeSlotsRequest = () => ({
  type: TYPES.GET_TIME_SLOTS_REQUEST,
  payload: null,
});

const getTimeSlotsSuccess = (data) => ({
  type: TYPES.GET_TIME_SLOTS_SUCCESS,
  payload: { data },
});
const getTimeSlotsError = (error) => ({
  type: TYPES.GET_TIME_SLOTS_ERROR,
  payload: { error },
});
const getTimeSlotsReset = () => ({
  type: TYPES.GET_TIME_SLOTS_RESET,
  payload: null,
});

//updateCartByTip
const updateCartByTipRequest = () => ({
  type: TYPES.UPDATE_CART_BY_TIP_REQUEST,
  payload: null,
});

const updateCartByTipSuccess = (data) => ({
  type: TYPES.UPDATE_CART_BY_TIP_SUCCESS,
  payload: { data },
});
const updateCartByTipError = (error) => ({
  type: TYPES.UPDATE_CART_BY_TIP_ERROR,
  payload: { error },
});
const updateCartByTipReset = () => ({
  type: TYPES.UPDATE_CART_BY_TIP_RESET,
  payload: null,
});

//Get Available offer
const getAvailableOfferRequest = () => ({
  type: TYPES.GET_AVAILABLE_OFFER_REQUEST,
  payload: null,
});
const getAvailableOfferSuccess = (availableOffer) => ({
  type: TYPES.GET_AVAILABLE_OFFER_SUCCESS,
  payload: { availableOffer },
});
const getAvailableOfferError = (error) => ({
  type: TYPES.GET_AVAILABLE_OFFER_ERROR,
  payload: { error },
});
const getAvailableOfferReset = () => ({
  type: TYPES.GET_AVAILABLE_OFFER_RESET,
  payload: null,
});

//Product pagination
export const getAllProductPaginationSuccess = (post) => ({
  type: TYPES.GET_ALL_PRODUCT_PAGINATION_SUCCESS,
  payload: { product },
});
const getAllProductPaginationRequest = () => ({
  type: TYPES.GET_ALL_PRODUCT_PAGINATION_REQUEST,
  payload: null,
});

const getAllProductPaginationError = (error) => ({
  type: TYPES.GET_ALL_PRODUCT_PAGINATION_ERROR,
  payload: { error },
});

export const getCategory = (sellerID, search) => async (dispatch) => {
  dispatch(getCategoryRequest());
  try {
    const res = await RetailController.getCategory(sellerID, search);
    dispatch(getCategorySuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getCategoryReset());
    }
    dispatch(getCategoryError(error.message));
  }
};

export const getServiceCategory = (sellerID, search) => async (dispatch) => {
  dispatch(getServiceCategoryRequest());
  try {
    const res = await RetailController.getServiceCategory(sellerID, search);
    dispatch(getServiceCategorySuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getServiceCategoryReset());
    }
    dispatch(getServiceCategoryError(error.message));
  }
};

export const getSubCategory = (sellerID, search) => async (dispatch) => {
  dispatch(getSubCategoryRequest());
  try {
    const res = await RetailController.getSubCategory(sellerID, search);
    dispatch(getSubCategorySuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getSubCategoryReset());
    }
    dispatch(getSubCategoryError(error.message));
  }
};

export const getServiceSubCategory = (sellerID, search) => async (dispatch) => {
  dispatch(getServiceSubCategoryRequest());
  try {
    const res = await RetailController.getServiceSubCategory(sellerID, search);
    dispatch(getServiceSubCategorySuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getServiceSubCategoryReset());
    }
    dispatch(getServiceSubCategoryError(error.message));
  }
};

export const getBrand = (sellerID, search) => async (dispatch) => {
  dispatch(getBrandRequest());
  try {
    const res = await RetailController.getBrand(sellerID, search);
    dispatch(getBrandSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getBrandReset());
    }
    dispatch(getBrandError(error.message));
  }
};

export const getProduct =
  (selectedId, subSelectedId, brandSelectedId, sellerID) => async (dispatch) => {
    dispatch(getProductRequest());
    try {
      const res = await RetailController.getProduct(
        selectedId,
        subSelectedId,
        brandSelectedId,
        sellerID
      );
      dispatch(getProductSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204) {
        dispatch(getProductReset());
      }
      dispatch(getProductError(error.message));
    }
  };

export const getProductDefault = (sellerID, page) => async (dispatch) => {
  dispatch(getProductDefRequest());
  try {
    const res = await RetailController.getProductDefault(sellerID, page);
    dispatch(getProductDefSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductDefReset());
    }
    dispatch(getProductDefError(error.message));
  }
};

export const getMainProductPagination = (page) => async (dispatch) => {
  dispatch(getAllProductPaginationRequest());
  try {
    const res = await RetailController.getMainProductPagination(page);
    dispatch(getAllProductPaginationSuccess(res?.payload?.data));
  } catch (error) {
    dispatch(getAllProductPaginationError(error.message));
  }
};

export const getSearchProduct = (search, sellerID) => async (dispatch) => {
  dispatch(getSeaProductRequest());
  try {
    const res = await RetailController.getSearchProduct(search, sellerID);
    dispatch(getSeaProductSuccess(res));
  } catch (error) {
    dispatch(getSeaProductError(error.message));
  }
};

export const getAllCart = () => async (dispatch) => {
  dispatch(getAllCartRequest());
  try {
    const res = await RetailController.getAllCart();
    dispatch(getAllCartSuccess(res));
    dispatch(updateCartLength(res?.payload?.poscart_products?.length));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAllCartReset());
      dispatch(updateCartLength(0));
    }
    dispatch(getAllCartError(error.message));
  }
};

export const getServiceCart = () => async (dispatch) => {
  dispatch(getServiceCartRequest());
  try {
    const res = await RetailController.getServiceCart();
    dispatch(getServiceCartSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getServiceCartReset());
    }
    dispatch(getServiceCartError(error.message));
  }
};

export const getAllProductCart = () => async (dispatch) => {
  dispatch(getAllProductCartRequest());
  try {
    const res = await RetailController.getAllProductCart();
    dispatch(getAllProductCartSuccess(res?.payload));
    console.log('sdsdsdsdsdsd', res?.payload);
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAllProductCartReset());
    }
    dispatch(getAllProductCartError(error.message));
  }
};

export const getAllServiceCart = () => async (dispatch) => {
  dispatch(getAllServiceCartRequest());
  try {
    const res = await RetailController.getAllServiceCart();
    dispatch(getAllServiceCartSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAllServiceCartReset());
    }
    dispatch(getAllServiceCartError(error.message));
  }
};

export const clearAllCart = () => async (dispatch) => {
  dispatch(getClearAllCartRequest());
  try {
    const res = await RetailController.clearAllCart();
    dispatch(getClearAllCartSuccess(res));
    dispatch(getAllCart());
    // dispatch(updateCartLength(0))
    // dispatch(clearLocalCart())
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getClearAllCartReset());
    }
    dispatch(getClearAllCartError(error.message));
  }
};

export const clearServiceAllCart = () => async (dispatch) => {
  dispatch(clearServiceAllCartRequest());
  try {
    const res = await RetailController.clearServiceAllCart();
    dispatch(clearServiceAllCartSuccess(res));
    dispatch(getServiceCart());
    dispatch(updateCartLength(0));
    dispatch(clearLocalCart());
  } catch (error) {
    dispatch(clearServiceAllCartError(error.message));
  }
};

export const clearOneCart = (data) => async (dispatch) => {
  dispatch(ClearOneCartRequest());
  try {
    const res = await RetailController.clearOneCart(data);
    dispatch(clearOneCartSuccess(res));
    dispatch(updateCartLength(0));
    dispatch(getAllCart());
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getOneCartReset());
    }
    dispatch(clearOneCartError(error.message));
  }
};

export const addTocart = (data) => async (dispatch) => {
  dispatch(addTocartRequest());
  try {
    const res = await RetailController.addTocart(data);
    dispatch(addTocartSuccess(res));
    dispatch(getAllCart());
  } catch (error) {
    dispatch(addTocartError(error.message));
  }
};

export const createBulkcart = (data) => async (dispatch) => {
  dispatch(createBulkCartRequest());
  try {
    const res = await RetailController.createBulkCart(data);
    dispatch(createBulkcartSuccess(res));
    dispatch(getAllCart());
  } catch (error) {
    dispatch(createBulkCartError(error.message));
  }
};

export const addToServiceCart = (data) => async (dispatch) => {
  dispatch(addToServiceCartRequest());
  try {
    const res = await RetailController.addToServiceCart(data);
    dispatch(addToServiceCartSuccess(res));
    dispatch(getServiceCart());
  } catch (error) {
    dispatch(addToServiceCartError(error.message));
  }
};

export const updateCartQty = (data, cartId) => async (dispatch) => {
  dispatch(updateCartQtyRequest());
  try {
    const res = await RetailController.updateCartQtyy(data, cartId);

    dispatch(updateCartQtySuccess(res));

    // dispatch(getAllCart());
  } catch (error) {
    dispatch(updateCartQtyError(error));
  }
};

export const addNotescart = (data) => async (dispatch) => {
  dispatch(addNotesRequest());
  try {
    const res = await RetailController.addNotes(data);
    dispatch(addNotesSuccess(res));
    dispatch(getAllCart());
  } catch (error) {
    dispatch(addNotesError(error.message));
  }
};

export const addDiscountToCart = (data) => async (dispatch) => {
  dispatch(addDiscountRequest());
  try {
    const res = await RetailController.addDiscountToCart(data);
    dispatch(addDiscountSuccess(res));
    dispatch(getAllCart());
  } catch (error) {
    dispatch(getAllCart());
    dispatch(addDiscountError(error.message));
  }
};

export const addServiceDiscountToCart = (data) => async (dispatch) => {
  dispatch(addServiceDiscountToCartRequest());
  try {
    const res = await RetailController.addServiceDiscountToCart(data);
    dispatch(addServiceDiscountToCartSuccess(res));
    dispatch(getServiceCart());
  } catch (error) {
    dispatch(getServiceCart());
    dispatch(addServiceDiscountToCartError(error.message));
  }
};

export const getProductBundle = (id) => async (dispatch) => {
  dispatch(getProductBundleRequest());
  try {
    const res = await RetailController.getProductBundle(id);
    dispatch(getProductBundleSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getProductBundleReset());
    }
    dispatch(getProductBundleError(error.message));
  }
};

export const getUserDetail = (customerPhoneNo) => async (dispatch) => {
  dispatch(getUserDetailRequest());
  try {
    const res = await RetailController.getUserDetail(customerPhoneNo);
    dispatch(getUserDetailSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getUserDetailReset());
    }
    dispatch(getUserDetailError(error.message));
  }
};

export const sendInvitation = (data) => async (dispatch) => {
  dispatch(sendInvitationRequest());
  try {
    const res = await RetailController.sendInvitation(data);
    dispatch(sendInvitationSuccess(res));
  } catch (error) {
    dispatch(sendInvitationError(error.message));
  }
};

export const createOrder = (data, callback) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const res = await RetailController.createOrder(data);
    dispatch(createOrderSuccess(res));
    dispatch(clearAllCart());
    dispatch(getAllCart());

    callback && callback(res);
  } catch (error) {
    dispatch(createOrderError(error.message));
  }
};

export const createServiceOrder = (data, callback) => async (dispatch) => {
  dispatch(createServiceOrderRequest());
  try {
    const res = await RetailController.createServiceOrder(data);
    dispatch(createServiceOrderSuccess(res));
    dispatch(clearServiceAllCart());
    dispatch(getServiceCart());
    callback && callback(res);
  } catch (error) {
    dispatch(createServiceOrderError(error.message));
  }
};

export const getWalletId = (sellerID) => async (dispatch) => {
  dispatch(getWalletIdRequest());
  try {
    const res = await RetailController.getWalletId(sellerID);
    dispatch(getWalletIdSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getWalletIdReset());
    }
    dispatch(getWalletIdError(error.message));
  }
};

export const walletGetByPhone = (walletIdInp) => async (dispatch) => {
  dispatch(walletGetByPhoneRequest());
  try {
    const res = await RetailController.walletGetByPhone(walletIdInp);
    dispatch(walletGetByPhoneSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(walletGetByPhoneReset());
    }
    dispatch(walletGetByPhoneError(error.message));
  }
};

export const requestMoney = (data) => async (dispatch) => {
  dispatch(requestMoneyRequest());
  try {
    const res = await RetailController.requestMoney(data);
    return dispatch(requestMoneySuccess(res?.payload));
  } catch (error) {
    dispatch(requestMoneyError(error.message));
    throw error;
  }
};

export const getTip = (sellerID) => async (dispatch) => {
  dispatch(getTipsRequest());
  try {
    const res = await RetailController.getTips(sellerID);
    dispatch(getTipsSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTipsReset());
    }
    dispatch(getTipsError(error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await RetailController.logout();
  } finally {
    dispatch(clearStore());
  }
};

export const getOneProduct = (sellerID, productId) => async (dispatch) => {
  dispatch(getOneProductRequest());
  try {
    const res = await RetailController.getOneProduct(sellerID, productId);
    return dispatch(getOneProductSuccess(res?.payload));
  } catch (error) {
    dispatch(getOneProductError(error.message));
  }
};

export const getOneService = (sellerID, serviceId) => async (dispatch) => {
  dispatch(getOneServiceRequest());
  try {
    const res = await RetailController.getOneService(sellerID, serviceId);
    return dispatch(getOneServiceSuccess(res?.payload));
  } catch (error) {
    dispatch(getOneServiceError(error.message));
  }
};

export const getOneAppoinment = (sellerID, productId) => async (dispatch) => {
  dispatch(getOneProductRequest());
  try {
    const res = await RetailController.getOneProduct(sellerID, productId);
    return dispatch(getOneProductSuccess(res?.payload));
  } catch (error) {
    dispatch(getOneProductError(error.message));
  }
};

export const checkSuppliedVariant = (data) => async (dispatch) => {
  dispatch(checkSuppliedVariantRequest());
  try {
    const res = await RetailController.checkSuppliedVariant(data);
    return dispatch(checkSuppliedVariantSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(checkSuppliedVariantReset());
    }
    dispatch(checkSuppliedVariantError(error.message));
  }
};

export const requestCheck = (data) => async (dispatch) => {
  dispatch(requestCheckRequest());
  try {
    const res = await RetailController.requestCheck(data);
    return dispatch(requestCheckSuccess(res?.payload?.status));
  } catch (error) {
    dispatch(requestCheckError(error.message));
  }
};

export const qrcodestatus = (id) => async (dispatch) => {
  dispatch(qrCodeStatusRequest());
  try {
    const res = await RetailController.qrCodePaymentStatus(id);
    return dispatch(qrCodeStatusSuccess(res.payload));
  } catch (error) {
    dispatch(qrcodestatusError(error.message));
  }
};

export const Servicesqrcodestatus = (id) => async (dispatch) => {
  dispatch(qrCodeStatusRequest());
  try {
    const res = await RetailController.ServicesqrCodePaymentStatus(id);
    return dispatch(qrCodeStatusSuccess(res.payload));
  } catch (error) {
    dispatch(qrcodestatusError(error.message));
  }
};
export const scanProductAdd = (data) => async (dispatch) => {
  dispatch(scanProductAddRequest());
  try {
    const res = await RetailController.scanProductAdd(data);
    return dispatch(scanProductAddSuccess(res?.payload));
  } catch (error) {
    dispatch(scanProductAddError(error.message));
    throw error;
  }
};

export const clearCheck = () => async (dispatch) => {
  dispatch(clearCheckStore());
};

export const retailclearstore = () => async (dispatch) => {
  dispatch(clearRetailStore());
};

export const getMainProduct = (productTypeId) => async (dispatch) => {
  dispatch(getMainProductRequest());
  try {
    const res = await RetailController.getDynamicProducts(productTypeId);
    dispatch(getMainProductSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getMainProductReset());
    }
    dispatch(getMainProductError(error.message));
  }
};

export const getMainServices = (productTypeId) => async (dispatch) => {
  dispatch(getMainServicesRequest());
  try {
    const res = await RetailController.getMainServices(productTypeId);
    dispatch(getMainServicesSuccess(res?.payload));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getMainServicesReset());
    }
    dispatch(getMainServicesError(error.message));
  }
};

export const attachCustomer = (data) => async (dispatch) => {
  dispatch(attachCustomerRequest());
  try {
    const res = await RetailController.attachCustomer(data);
    return dispatch(attachCustomerSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(attachCustomerReset());
    }
    dispatch(attachCustomerError(error.message));
  }
};

export const attachServiceCustomer = (data) => async (dispatch) => {
  dispatch(attachServiceCustomerRequest());
  try {
    const res = await RetailController.attachServiceCustomer(data);
    return dispatch(attachServiceCustomerSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(attachServiceCustomerReset());
    }
    dispatch(attachServiceCustomerError(error.message));
  }
};

export const getQrCodee = (cartId, data) => async (dispatch) => {
  dispatch(getQrCodeRequest());
  try {
    const res = await RetailController.getQrCode(cartId, data);
    return dispatch(getQrCodeSuccess(res));
  } catch (error) {
    dispatch(getQrCodeError(error.message));
  }
};

export const updateCartByTip = (data) => async (dispatch) => {
  dispatch(updateCartByTipRequest());
  try {
    const res = await RetailController.getTip(data);
    return dispatch(updateCartByTipSuccess(res));
  } catch (error) {
    dispatch(updateCartByTipError(error.message));
  }
};

export const changeStatusProductCart = (data) => async (dispatch) => {
  dispatch(changeStatusProductCartRequest());
  try {
    const res = await RetailController.changeStatusProductCart(data);
    dispatch(changeStatusProductCartSuccess(res));
    dispatch(getAllCart());
    dispatch(getAllProductCart());
  } catch (error) {
    dispatch(changeStatusProductCartError(error.message));
  }
};

export const changeStatusServiceCart = (data) => async (dispatch) => {
  dispatch(changeStatusServiceCartRequest());
  try {
    const res = await RetailController.changeStatusServiceCart(data);
    dispatch(changeStatusServiceCartSuccess(res));
    dispatch(getServiceCart());
    dispatch(getAllServiceCart());
  } catch (error) {
    dispatch(changeStatusServiceCartError(error.message));
  }
};

export const addServiceNotescart = (data) => async (dispatch) => {
  dispatch(addServiceNotescartRequest());
  try {
    const res = await RetailController.addServiceNotescart(data);
    dispatch(addServiceNotescartSuccess(res));
    dispatch(getServiceCart());
  } catch (error) {
    dispatch(addServiceNotescartError(error.message));
  }
};
export const getTimeSlots = (params) => async (dispatch) => {
  dispatch(getTimeSlotsRequest());
  try {
    const res = await RetailController.getTimeSlotsAPI(params);
    return dispatch(getTimeSlotsSuccess(res));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getTimeSlotsReset());
    }
    dispatch(getTimeSlotsError(error.message));
  }
};

export const getAvailableOffer = (data) => async (dispatch) => {
  dispatch(getAvailableOfferRequest());
  try {
    const res = await RetailController.getAvailableOffer(data);
    dispatch(getAvailableOfferSuccess(res?.payload?.data));
  } catch (error) {
    if (error?.statusCode === 204) {
      dispatch(getAvailableOfferReset());
    }
    dispatch(getAvailableOfferError(error.message));
  }
};

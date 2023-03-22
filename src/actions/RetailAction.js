import { RetailController } from '@/controllers';
import { TYPES } from "@/Types/Types";

const getCategoryRequest = () => ({
  type: TYPES.GET_CATEGORY_REQUEST,
  payload: null,
});
const getCategorySuccess = categoryList => ({
  type: TYPES.GET_CATEGORY_SUCCESS,
  payload: { categoryList },
});
const getCategoryError = error => ({
  type: TYPES.GET_CATEGORY_ERROR,
  payload: { error },
});

const getSubCategoryRequest = () => ({
  type: TYPES.GET_SUB_CATEGORY_REQUEST,
  payload: null,
});
const getSubCategorySuccess = subCategoryList => ({
  type: TYPES.GET_SUB_CATEGORY_SUCCESS,
  payload: { subCategoryList },
});
const getSubCategoryError = error => ({
  type: TYPES.GET_SUB_CATEGORY_ERROR,
  payload: { error },
});
const getSubCategoryReset = () => ({
  type: TYPES.GET_SUB_CATEGORY_RESET,
  payload: null,
});


const getBrandRequest = () => ({
  type: TYPES.GET_BRAND_REQUEST,
  payload: null,
});
const getBrandSuccess = brandList => ({
  type: TYPES.GET_BRAND_SUCCESS,
  payload: { brandList },
});
const getBrandError = error => ({
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
const getProductSuccess = productList => ({
  type: TYPES.GET_PRODUCT_SUCCESS,
  payload: { productList },
});
const getProductError = error => ({
  type: TYPES.GET_PRODUCT_ERROR,
  payload: { error },
});
const getProductReset = () => ({
  type: TYPES.GET_PRODUCT_RESET,
  payload: null,
});

const getProductDefRequest = () => ({
  type: TYPES.GET_PRODUCTDEF_REQUEST,
  payload: null,
});
const getProductDefSuccess = productList => ({
  type: TYPES.GET_PRODUCTDEF_SUCCESS,
  payload: { productList },
});
const getProductDefError = error => ({
  type: TYPES.GET_PRODUCTDEF_ERROR,
  payload: { error },
});
const getProductDefReset = () => ({
  type: TYPES.GET_PRODUCTDEF_RESET,
  payload: null,
});

const getSeaProductRequest = () => ({
  type: TYPES.GET_SEAPRODUCT_REQUEST,
  payload: null,
});
const getSeaProductSuccess = SeaProductList => ({
  type: TYPES.GET_SEAPRODUCT_SUCCESS,
  payload: { SeaProductList },
});
const getSeaProductError = error => ({
  type: TYPES.GET_SEAPRODUCT_ERROR,
  payload: { error },
});

const getAllCartRequest = () => ({
  type: TYPES.GET_ALL_CART_REQUEST,
  payload: null,
});
const getAllCartSuccess = getAllCart => ({
  type: TYPES.GET_ALL_CART_SUCCESS,
  payload: { getAllCart },
});
const getAllCartError = error => ({
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
const getClearAllCartSuccess = ()  => ({
  type: TYPES.GET_CLEAR_ALL_CART_SUCCESS,
  payload: {  },
});
const getClearAllCartError = error => ({
  type: TYPES.GET_CLEAR_ALL_CART_ERROR,
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
const clearOneCartSuccess = ()  => ({
  type: TYPES.GET_CLEAR_ONE_CART_SUCCESS,
  payload: {  },
});
const clearOneCartError = error => ({
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
const addTocartSuccess = ()  => ({
  type: TYPES.ADDCART_SUCCESS,
  payload: {  },
});
const addTocartError = error => ({
  type: TYPES.ADDCART_ERROR,
  payload: { error },
});

const addNotesRequest = () => ({
  type: TYPES.ADDNOTES_REQUEST,
  payload: null,
});
const addNotesSuccess = ()  => ({
  type: TYPES.ADDNOTES_SUCCESS,
  payload: {  },
});
const addNotesError = error => ({
  type: TYPES.ADDNOTES_ERROR,
  payload: { error },
});

const addDiscountRequest = () => ({
  type: TYPES.ADD_DISCOUNT_REQUEST,
  payload: null,
});
const addDiscountSuccess = ()  => ({
  type: TYPES.ADD_DISCOUNT_SUCCESS,
  payload: {  },
});
const addDiscountError = error => ({
  type: TYPES.ADD_DISCOUNT_ERROR,
  payload: { error },
});

const getProductBundleRequest = () => ({
  type: TYPES.GET_BUNDLEOFFER_REQUEST,
  payload: null,
});
const getProductBundleSuccess = (productbunList)  => ({
  type: TYPES.GET_BUNDLEOFFER_SUCCESS,
  payload: { productbunList },
});
const getProductBundleError = error => ({
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
export const getUserDetailSuccess = (getUserDetail)  => ({
  type: TYPES.GET_USERDETAIL_SUCCESS,
  payload: { getUserDetail },
});
const getUserDetailError = error => ({
  type: TYPES.GET_USERDETAIL_ERROR,
  payload: { error },
});

const sendInvitationRequest = () => ({
  type: TYPES.SEND_INVITATION_REQUEST,
  payload: null,
});
const sendInvitationSuccess = ()  => ({
  type: TYPES.SEND_INVITATION_SUCCESS,
  payload: {  },
});
const sendInvitationError = error => ({
  type: TYPES.SEND_INVITATION_ERROR,
  payload: { error },
});

const createOrderRequest = () => ({
  type: TYPES.CREATE_ORDER_REQUEST,
  payload: null,
});
const createOrderSuccess = ()  => ({
  type: TYPES.CREATE_ORDER_SUCCESS,
  payload: {  },
});
const createOrderError = error => ({
  type: TYPES.CREATE_ORDER_ERROR,
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
const getWalletIdSuccess = getWallet => ({
  type: TYPES.GET_WALLET_SUCCESS,
  payload: { getWallet },
});
const getWalletIdError = error => ({
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
const walletGetByPhoneSuccess = walletGetByPhone => ({
  type: TYPES.GET_WALLET_PHONE_SUCCESS,
  payload: { walletGetByPhone },
});
const walletGetByPhoneError = error => ({
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
const requestMoneySuccess = ()  => ({
  type: TYPES.REQUEST_MONEY_SUCCESS,
  payload: {  },
});
const requestMoneyError = error => ({
  type: TYPES.REQUEST_MONEY_ERROR,
  payload: { error },
});


const getTipsRequest = () => ({
  type: TYPES.GET_TIPS_REQUEST,
  payload: null,
});
const getTipsSuccess = getTips => ({
  type: TYPES.GET_TIPS_SUCCESS,
  payload: { getTips },
});
const getTipsError = error => ({
  type: TYPES.GET_TIPS_ERROR,
  payload: { error },
});
const getTipsReset = () => ({
  type: TYPES.GET_TIPS_RESET,
  payload: null,
});

export const getCategory = (sellerID) => async dispatch => {
  dispatch(getCategoryRequest());
  try {
      const res = await RetailController.getCategory(sellerID);
      dispatch(getCategorySuccess(res));
  } catch (error) {
      dispatch(getCategoryError(error.message));
  }
};

export const getSubCategory = (sellerID, selectedId) => async dispatch => {
  dispatch(getSubCategoryRequest());
  try {
      const res = await RetailController.getSubCategory(sellerID, selectedId);
      dispatch(getSubCategorySuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getSubCategoryReset());
      }
        dispatch(getSubCategoryError(error.message));
    }
};

export const getBrand = (sellerID, selectedId) => async dispatch => {
  dispatch(getBrandRequest());
  try {
      const res = await RetailController.getBrand(sellerID, selectedId);
      dispatch(getBrandSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getBrandReset());
      }
        dispatch(getBrandError(error.message));
    }
};
export const getProduct = (selectedId ,subSelectedId ,brandSelectedId ,sellerID) => async dispatch => {
  dispatch(getProductRequest());
  try {
      const res = await RetailController.getProduct(selectedId ,subSelectedId ,brandSelectedId ,sellerID);
      dispatch(getProductSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getProductReset());
      }
        dispatch(getProductError(error.message));
    }
};

export const getProductDefault = (sellerID) => async dispatch => {
  dispatch(getProductDefRequest());
  try {
      const res = await RetailController.getProductDefault(sellerID);
      dispatch(getProductDefSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getProductDefReset());
      }
        dispatch(getProductDefError(error.message));
    }
};

export const getSearchProduct = (search,sellerID) => async dispatch => {
  dispatch(getSeaProductRequest());
  try {
      const res = await RetailController.getSearchProduct(search,sellerID);
      dispatch(getSeaProductSuccess(res));
  } catch (error) {
      dispatch(getSeaProductError(error.message));
  }
};

export const getAllCart = () => async dispatch => {
  dispatch(getAllCartRequest());
  try {
      const res = await RetailController.getAllCartCategory();
      dispatch(getAllCartSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getAllCartReset());
      }
        dispatch(getAllCartError(error.message));
    }
};

export const clearAllCart = () => async dispatch => {
  dispatch(getClearAllCartRequest());
  try {
      const res = await RetailController.clearAllCart();
      dispatch(getClearAllCartSuccess(res));
      dispatch(getAllCart())
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getClearAllCartReset());
      }
        dispatch(getClearAllCartError(error.message));
    }
};
export const clearOneCart = (data) => async dispatch => {
  dispatch(ClearOneCartRequest());
  try {
      const res = await RetailController.clearOneCart(data);
      dispatch(clearOneCartSuccess(res));
      dispatch(getAllCart())
} catch (error) {
  if (error?.statusCode === 204){
    dispatch(getOneCartReset());
  }
    dispatch(clearOneCartError(error.message));
}
};

export const addTocart = (data) => async dispatch => {
  dispatch(addTocartRequest());
  try {
      const res = await RetailController.addTocart(data);
      dispatch(addTocartSuccess(res));
      dispatch(getAllCart())
  } catch (error) {
      dispatch(addTocartError(error.message));
  }
};

export const addNotescart = (data) => async dispatch => {
  dispatch(addNotesRequest());
  try {
      const res = await RetailController.addNotes(data);
      dispatch(addNotesSuccess(res));
  } catch (error) {
      dispatch(addNotesError(error.message));
  }
};

export const addDiscountToCart = (data) => async dispatch => {
  dispatch(addDiscountRequest());
  try {
      const res = await RetailController.addDiscountToCart(data);
      dispatch(addDiscountSuccess(res));
  } catch (error) {
      dispatch(addDiscountError(error.message));
  }
};

export const getProductBundle = (id) => async dispatch => {
  dispatch(getProductBundleRequest());
  try {
      const res = await RetailController.getProductBundle(id);
      dispatch(getProductBundleSuccess(res));
} catch (error) {
  if (error?.statusCode === 204){
    dispatch(getProductBundleReset());
  }
    dispatch(getProductBundleError(error.message));
}
};

export const getUserDetail = (customerPhoneNo) => async dispatch => {
  dispatch(getUserDetailRequest());
  try {
      const res = await RetailController.getUserDetail(customerPhoneNo);
      dispatch(getUserDetailSuccess(res));
  } catch (error) {
      dispatch(getUserDetailError(error.message));
  }
};

export const sendInvitation = (data) => async dispatch => {
  dispatch(sendInvitationRequest());
  try {
      const res = await RetailController.sendInvitation(data);
      dispatch(sendInvitationSuccess(res));
  } catch (error) {
      dispatch(sendInvitationError(error.message));
  }
};

export const createOrder = (data) => async dispatch => {
  dispatch(createOrderRequest());
  try {
      const res = await RetailController.createOrder(data);
      dispatch(createOrderSuccess(res));
      dispatch(clearAllCart());
      dispatch(getAllCart())
  } catch (error) {
      dispatch(createOrderError(error.message));
  }
};

export const getWalletId = (sellerID) => async dispatch => {
  dispatch(getWalletIdRequest());
  try {
      const res = await RetailController.getWalletId(sellerID);
      dispatch(getWalletIdSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getWalletIdReset());
      }
        dispatch(getWalletIdError(error.message));
    }
};

export const walletGetByPhone = (walletIdInp) => async dispatch => {
  dispatch(walletGetByPhoneRequest());
  try {
      const res = await RetailController.walletGetByPhone(walletIdInp);
      dispatch(walletGetByPhoneSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(walletGetByPhoneReset());
      }
        dispatch(walletGetByPhoneError(error.message));
    }
};

export const requestMoney = (data) => async dispatch => {
  dispatch(requestMoneyRequest());
  try {
      const res = await RetailController.requestMoney(data);
      dispatch(requestMoneySuccess(res));
  } catch (error) {
      dispatch(requestMoneyError(error.message));
  }
};

export const getTip = (sellerID) => async dispatch => {
  dispatch(getTipsRequest());
  try {
      const res = await RetailController.getTips(sellerID);
      dispatch(getTipsSuccess(res));
    } catch (error) {
      if (error?.statusCode === 204){
        dispatch(getTipsReset());
      }
        dispatch(getTipsError(error.message));
    }
};


export const logout = () => async dispatch => {
  try {
    await RetailController.logout();
  } finally {
    dispatch(clearStore());
  }
};



export const retailclearstore = () => async dispatch => {
    dispatch(clearRetailStore());
}

import { UserController } from '@/controllers';
import { TYPES } from "@/Types/Types";
import { LogBox } from 'react-native';


// const loginRequest = () => ({
//   type: TYPES.LOGIN_REQUEST,
//   payload: null,
// });



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


// export const login = (username, password) => async dispatch => {
//   dispatch(loginRequest());
//   try {
//     const user = await UserController.login(username, password);
//     dispatch(loginSuccess(user));
//   } catch (error) {
//     dispatch(loginError(error.message));
//   }
// };

export const getCategory = () => async dispatch => {
  dispatch(getCategoryRequest());
  try {
      const res = await UserController.getCategory();
      dispatch(getCategorySuccess(res));
  } catch (error) {
      dispatch(getCategoryError(error.message));
  }
};

export const getSubCategory = (selectedId) => async dispatch => {
  dispatch(getSubCategoryRequest());
  try {
      const res = await UserController.getSubCategory(selectedId);
      dispatch(getSubCategorySuccess(res));
  } catch (error) {
      dispatch(getSubCategoryError(error.message));
  }
};

export const getBrand = (selectedId) => async dispatch => {
  dispatch(getBrandRequest());
  try {
      const res = await UserController.getBrand(selectedId);
      dispatch(getBrandSuccess(res));
  } catch (error) {
      dispatch(getBrandError(error.message));
  }
};

export const getProduct = (brandSelectedId , selectedId, search, subSelectedId) => async dispatch => {
  dispatch(getProductRequest());
  try {
      const res = await UserController.getProduct(brandSelectedId , selectedId, search, subSelectedId);
      dispatch(getProductSuccess(res));
  } catch (error) {
      dispatch(getProductError(error.message));
  }
};

export const getSearchProduct = (search) => async dispatch => {
  dispatch(getSeaProductRequest());
  try {
      const res = await UserController.getSearchProduct(search);
      dispatch(getSeaProductSuccess(res));
  } catch (error) {
      dispatch(getSeaProductError(error.message));
  }
};

export const getAllCart = () => async dispatch => {
  dispatch(getAllCartRequest());
  try {
      const res = await UserController.getAllCartCategory();
      dispatch(getAllCartSuccess(res));
  } catch (error) {
      dispatch(getAllCartError(error.message));
  }
};

export const clearAllCart = () => async dispatch => {
  dispatch(getClearAllCartRequest());
  try {
      const res = await UserController.clearAllCart();
      dispatch(getClearAllCartSuccess('res', res));
      dispatch(getAllCart())
  } catch (error) {
      dispatch(getClearAllCartError(error.message));
  }
};
export const clearOneCart = (data) => async dispatch => {
  dispatch(ClearOneCartRequest());
  try {
      const res = await UserController.clearOneCart(data);
      dispatch(clearOneCartSuccess(res));
      dispatch(getAllCart())
  } catch (error) {
      dispatch(clearOneCartError(error.message));
  }
};

export const addTocart = (data) => async dispatch => {
  dispatch(addTocartRequest());
  try {
      const res = await UserController.addTocart(data);
      dispatch(addTocartSuccess(res));
      dispatch(getAllCart())
  } catch (error) {
      dispatch(addTocartError(error.message));
  }
};

export const addNotescart = (data) => async dispatch => {
  dispatch(addNotesRequest());
  try {
      const res = await UserController.addNotes(data);
      dispatch(addNotesSuccess(res));
  } catch (error) {
      dispatch(addNotesError(error.message));
  }
};

export const addDiscountToCart = (data) => async dispatch => {
  dispatch(addDiscountRequest());
  try {
      const res = await UserController.addDiscountToCart(data);
      dispatch(addDiscountSuccess(res));
      console.log('res', res)
  } catch (error) {
      dispatch(addDiscountError(error.message));
  }
};

export const logout = () => async dispatch => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};

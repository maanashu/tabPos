import { UserController } from '@/controllers';
import { TYPES } from "@/Types/Types";


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

export const getProduct = (selectedId, subSelectedId,brandSelectedId) => async dispatch => {
  dispatch(getProductRequest());
  try {
      const res = await UserController.getProduct(selectedId, subSelectedId,brandSelectedId);
      dispatch(getProductSuccess(res));
  } catch (error) {
      dispatch(getProductError(error.message));
  }
};


export const logout = () => async dispatch => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};

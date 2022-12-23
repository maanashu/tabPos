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

export const getBrand = () => async dispatch => {
  dispatch(getBrandRequest());
  try {
      const res = await UserController.getBrand();
      dispatch(getBrandSuccess(res));
  } catch (error) {
      dispatch(getBrandError(error.message));
  }
};
export const logout = () => async dispatch => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};

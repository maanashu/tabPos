import { UserController } from '@/controllers/UserController';
import { TYPES } from '@/Types/Types';
import { getSettings } from './SettingAction';

const loginPosUserRequest = () => ({
  type: TYPES.LOGIN_POS_USER_REQUEST,
  payload: null,
});
const loginPosUserError = (error) => ({
  type: TYPES.LOGIN_POS_USER_ERROR,
  payload: { error },
});
const loginPosUserSuccess = (posLoginData) => ({
  type: TYPES.LOGIN_POS_USER_SUCCESS,
  payload: { posLoginData },
});
export const saveDefaultScreen = (defaultScreen) => ({
  type: TYPES.SAVE_DEFAULT_SCREEN,
  payload: { defaultScreen },
});

const getPendingOrdersRequest = () => ({
  type: TYPES.PENDING_ORDERS_REQUEST,
  payload: null,
});
const getPendingOrdersSuccess = (pendingOrders) => ({
  type: TYPES.PENDING_ORDERS_SUCCESS,
  payload: { pendingOrders },
});
const getPendingOrdersError = (error) => ({
  type: TYPES.PENDING_ORDERS_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.POS_USER_CLEAR_STORE,
  payload: null,
});

export const loginPosUser = (data) => async (dispatch) => {
  dispatch(loginPosUserRequest());
  try {
    const res = await UserController.loginPosUser(data);
    dispatch(loginPosUserSuccess(res?.payload));
    dispatch(getSettings());
  } catch (error) {
    return dispatch(loginPosUserError(error));
  }
};

export const logoutUserFunction = () => async (dispatch) => {
  dispatch(clearStore());
};

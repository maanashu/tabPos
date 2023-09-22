import { SubscriptionController } from '@/controllers';
import { TYPES } from '@/Types/SubscriptionTypes';

const getAllPlanRequest = () => ({
  type: TYPES.GET_ALL_PLANS_REQUEST,
  payload: null,
});
const getAllPlanSuccess = (plans) => ({
  type: TYPES.GET_ALL_PLANS_SUCCESS,
  payload: { plans },
});
const getAllPlanError = (error) => ({
  type: TYPES.GET_ALL_PLANS_ERROR,
  payload: { error },
});

const getPlanByIdRequest = () => ({
  type: TYPES.GET_PLAN_BY_ID_REQUEST,
  payload: null,
});
const getPlanByIdSuccess = (plan) => ({
  type: TYPES.GET_PLAN_BY_ID_SUCCESS,
  payload: { plan },
});
const getPlanByIdError = (error) => ({
  type: TYPES.GET_PLAN_BY_ID_ERROR,
  payload: { error },
});

const getActiveSubscriptionRequest = () => ({
  type: TYPES.GET_ACTIVE_SUBSCRIPTION_REQUEST,
  payload: null,
});
const getActiveSubscriptionSuccess = (plan) => ({
  type: TYPES.GET_ACTIVE_SUBSCRIPTION_SUCCESS,
  payload: { plan },
});
const getActiveSubscriptionError = (error) => ({
  type: TYPES.GET_ACTIVE_SUBSCRIPTION_ERROR,
  payload: { error },
});

const buySubscriptionRequest = () => ({
  type: TYPES.BUY_SUBSCRIPTION_REQUEST,
  payload: null,
});
const buySubscriptionSuccess = (plan) => ({
  type: TYPES.BUY_SUBSCRIPTION_SUCCESS,
  payload: { plan },
});
const buySubscriptionError = (error) => ({
  type: TYPES.BUY_SUBSCRIPTION_ERROR,
  payload: { error },
});

const creatPlanRequest = () => ({
  type: TYPES.CREATE_PLAN_REQUEST,
  payload: null,
});
const createPlanSuccess = (plan) => ({
  type: TYPES.CREATE_PLAN_SUCCESS,
  payload: { plan },
});
const createPlanError = (error) => ({
  type: TYPES.CREATE_PLAN_ERROR,
  payload: { error },
});

const deletePlanRequest = () => ({
  type: TYPES.DELETE_PLAN_REQUEST,
  payload: null,
});
const deletePlanSuccess = (plan) => ({
  type: TYPES.DELETE_PLAN_SUCCESS,
  payload: { plan },
});
const deletePlanError = (error) => ({
  type: TYPES.DELETE_PLAN_ERROR,
  payload: { error },
});

const updatePlanRequest = () => ({
  type: TYPES.UPDATE_PLAN_REQUEST,
  payload: null,
});
const updatePlanSuccess = (plan) => ({
  type: TYPES.UPDATE_PLAN_SUCCESS,
  payload: { plan },
});
const updatePlanError = (error) => ({
  type: TYPES.UPDATE_PLAN_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.SETTING_CLEAR_STORE,
  payload: null,
});

export const getAllPlans = () => async (dispatch) => {
  dispatch(getAllPlanRequest());
  try {
    const res = await SubscriptionController.getAllPlans();
    dispatch(getAllPlanSuccess(res?.payload));
    return res.payload;
  } catch (error) {
    dispatch(getAllPlanError(error.message));
  }
};
export const getPlanById = () => async (dispatch) => {
  dispatch(getPlanByIdRequest());
  try {
    const res = await SubscriptionController.getPlanById();
    dispatch(getPlanByIdSuccess(res?.payload));
    return res.payload;
  } catch (error) {
    dispatch(getPlanByIdError(error.message));
  }
};

export const getActiveSubscription = () => async (dispatch) => {
  dispatch(getActiveSubscriptionRequest());
  try {
    const res = await SubscriptionController.getActiveSubscription();
    dispatch(getActiveSubscriptionSuccess(res?.payload));
    return res.payload;
  } catch (error) {
    dispatch(getActiveSubscriptionError(error.message));
  }
};

export const buySubscription = (plan_id) => async (dispatch) => {
  dispatch(buySubscriptionRequest());
  try {
    const res = await SubscriptionController.buySubscription(plan_id);
    dispatch(buySubscriptionSuccess(res?.payload));
    return res.payload;
  } catch (error) {
    dispatch(buySubscriptionError(error.message));
  }
};

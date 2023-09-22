import { TYPES } from '@/Types/SubscriptionTypes';

const INITIALSTATE = {
  allPlans: {},
  activeSubscription: {},
};

export const subscriptionReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.GET_ALL_PLANS_SUCCESS:
      return {
        ...state,
        allPlans: payload.plans,
      };
    case TYPES.GET_ACTIVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        activeSubscription: payload.plan,
      };
    default:
      return state;
  }
};

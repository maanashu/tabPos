import { TYPES } from '@/Types/RewardTypes';

const INITIALSTATE = {
  rewardGraphData: {},
  rewardedUsersData: {},
  getRewardUser: [],
};

export const rewardReducer = (state = { INITIALSTATE }, { payload, type }) => {
  switch (type) {
    case TYPES.GET_REWARD_GRAPH_SUCCESS:
      return {
        ...state,
        rewardGraphData: payload.rewardGraph,
      };

    case TYPES.GET_REWARDED_USERS_SUCCESS:
      return {
        ...state,
        rewardedUsersData: payload.rewardedUsers,
      };
    case TYPES.GET_REWARDED_USERS_RESET:
      return {
        ...state,
        rewardedUsersData: [],
      };

    case TYPES.GET_REWARD_USER_SUCCESS:
      return {
        ...state,
        getRewardUser: payload.getRewardUser,
      };

    case TYPES.GET_REWARD_USER_SUCCESS:
      return {
        ...state,
        getRewardUser: payload.getRewardUser,
      };

    case TYPES.GET_REWARD_USER_RESET:
      return {
        ...state,
        getRewardUser: [],
      };

    default:
      return state;
  }
};

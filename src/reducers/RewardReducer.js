import { TYPES } from '@/Types/RewardTypes';

const INITIALSTATE = {
  rewardGraphData: {},
  rewardedUsersData: {},
};

export const RewardReducer = (state = { INITIALSTATE }, { payload, type }) => {
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

    default:
      return state;
  }
};

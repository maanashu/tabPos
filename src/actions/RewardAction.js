import { TYPES } from '@/Types/RewardTypes';
import { RewardController } from '@/controllers/RewardController';

// Graph
const getRewardGraphRequest = () => ({
  type: TYPES.GET_REWARD_GRAPH_REQUEST,
  payload: null,
});

const getRewardGraphSuccess = rewardGraph => ({
  type: TYPES.GET_REWARD_GRAPH_SUCCESS,
  payload: { rewardGraph },
});

const getRewardGraphError = error => ({
  type: TYPES.GET_REWARD_GRAPH_ERROR,
  payload: { error },
});

// Rewarded Users
const getRewardedUsersRequest = () => ({
  type: TYPES.GET_REWARDED_USERS_REQUEST,
  payload: null,
});

const getRewardedUsersSuccess = rewardedUsers => ({
  type: TYPES.GET_REWARDED_USERS_SUCCESS,
  payload: { rewardedUsers },
});

const getRewardedUsersError = error => ({
  type: TYPES.GET_REWARDED_USERS_ERROR,
  payload: { error },
});

export const getRewardGraph = sellerID => async dispatch => {
  dispatch(getRewardGraphRequest());
  try {
    const res = await RewardController.getGraphDataAPI(sellerID);
    dispatch(getRewardGraphSuccess(res?.payload));
  } catch (error) {
    dispatch(getRewardGraphError(error.message));
  }
};

export const getRewardedUsersList = () => async dispatch => {
  dispatch(getRewardedUsersRequest());
  try {
    const res = await RewardController.getRewardedUsersAPI();
    dispatch(getRewardedUsersSuccess(res?.payload));
  } catch (error) {
    dispatch(getRewardedUsersError(error.message));
  }
};

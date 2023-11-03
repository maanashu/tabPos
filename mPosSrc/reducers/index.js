import { combineReducers } from 'redux';
import { errorReducer } from './ErrorReducer';
import { statusReducer } from './StatusReducer';
import { userReducer } from './UserReducer';
import { authReducer } from './AuthReducer';
import { deliveryReducer } from './DeliveryReducer';
import { retailReducer } from './RetailReducer';
import { shippingReducer } from './ShippingReducer';
import { TYPES } from '@mPOS/Types/Types';
import { analyticsReducer } from './AnalyticsReducer';
import { dashboardReducer } from './DashboardReducer';

export const appReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  auth: authReducer,
  delivery: deliveryReducer,
  analytics: analyticsReducer,
  retail: retailReducer,
  shipping: shippingReducer,
  dashboard: dashboardReducer,
});
export const rootReducer = (state, action) => {
  if (action.type === TYPES.MERCHAT_CLEAR_STORE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

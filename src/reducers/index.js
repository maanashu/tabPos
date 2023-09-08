import { combineReducers } from 'redux';
import { errorReducer } from '@/reducers/ErrorReducer';
import { statusReducer } from '@/reducers/StatusReducer';
import { userReducer } from '@/reducers/UserReducer';
import { authReducer } from './AuthReducer';
import { retailReducer } from '@/reducers/RetailReducer';
import { deliveryReducer } from '@/reducers/DeliveryReducer';
import { shippingReducer } from '@/reducers/ShippingReducer';
import { analyticsReducer } from '@/reducers/AnalyticsReducer';
import { customersReducer } from '@/reducers/CustomersReducer';
import { walletReducer } from '@/reducers/WalletReducer';
import { cashTrackingReducer } from '@/reducers/CashTrackingReducer';
import { rewardReducer } from '@/reducers/RewardReducer';
import { appointmentReducer } from '@/reducers/AppointmentReducer';
import { dashboardReducer } from '@/reducers/DashboardReducer';
import { settingReducer } from '@/reducers/SettingReducer';
import { cartReducer } from './CartReducer';
import { TYPES } from '@/Types/Types';
import { chatReducer } from './ChatReducer';

export const appReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  auth: authReducer,
  retail: retailReducer,
  delivery: deliveryReducer,
  shipping: shippingReducer,
  analytics: analyticsReducer,
  customers: customersReducer,
  wallet: walletReducer,
  cashTracking: cashTrackingReducer,
  reward: rewardReducer,
  appointment: appointmentReducer,
  dashboard: dashboardReducer,
  setting: settingReducer,
  cartReducer: cartReducer,
  chat: chatReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === TYPES.MERCHAT_CLEAR_STORE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

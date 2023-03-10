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

export const rootReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  auth: authReducer,
  retail : retailReducer,
  delivery : deliveryReducer,
  shipping : shippingReducer,
  analytics : analyticsReducer,
  customers : customersReducer
});

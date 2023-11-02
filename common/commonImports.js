import { NAVIGATION as tabPosNavigationName } from '@/constants';
import { NAVIGATION as mPosNavigationName } from '@mPOS/constants';
import { navigate as tabPOSNavigate } from '@/navigation/NavigationRef';
import { navigate as mPOSNavigate } from '@mPOS/navigation/NavigationRef';
import { isTablet } from 'react-native-device-info';

export const isTab = isTablet();

export const commonNavigate = (name, params) =>
  isTab ? tabPOSNavigate(name, params) : mPOSNavigate(name, params);

export const MPOS_NAVIGATION = mPosNavigationName;

export const TABPOS_NAVIGATION = tabPosNavigationName;

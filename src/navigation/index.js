import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { UserNavigator } from '@/navigation/UserNavigator';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { getUser } from '@/selectors/UserSelectors';
import { navigationRef } from './NavigationRef';
import { getAuthData } from '@/selectors/AuthSelector';
import { getDashboard } from '@/selectors/DashboardSelector';
import { endTrackingSession } from '@/actions/CashTrackingAction';
import { getDrawerSessionSuccess } from '@/actions/DashboardAction';
import { logoutUserFunction } from '@/actions/UserActions';
import { AppState } from 'react-native';
import { getSetting } from '@/selectors/SettingSelector';

export function RootNavigator() {
  const dispatch = useDispatch();
  const auth = useSelector(getAuthData);
  const posUser = useSelector(getUser);
  const getDashboardData = useSelector(getDashboard);
  const getSettingData = useSelector(getSetting);
  const merchantToken = auth?.merchantLoginData?.token;
  const posUserToken = posUser?.posLoginData?.token;

  const getLoginDeatil = getDashboardData?.posLoginDetail;
  const getSessionObj = getDashboardData?.getSesssion;
  const settingData = getSettingData?.getSetting;
  const ShiftTime = parseFloat(settingData?.staff_shift_hrs);
  const [state, setState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState == 'active') {
        setState(!state);
      }
    };
    const subs = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subs.remove();
    };
  }, []);

  useEffect(() => {
    if (getLoginDeatil?.updated_at) {
      const timeString1 = getLoginDeatil?.updated_at;
      const timeString2 = new Date();

      const date1 = new Date(timeString1);
      const date2 = new Date(timeString2);

      const timeDifference = Math.abs(date2 - date1);
      const eightHoursInMilliseconds = ShiftTime * 60 * 60 * 1000;
      if (timeDifference >= eightHoursInMilliseconds) {
        endSession();
      } else {
      }
    }
  }, [state]);

  const endSession = async () => {
    const data = {
      amount: parseInt(getSessionObj?.cash_balance),
      drawerId: getSessionObj?.id,
      transactionType: 'end_tracking_session',
      modeOfcash: 'cash_out',
    };

    const res = await dispatch(endTrackingSession(data));
    if (res?.type === 'END_TRACKING_SUCCESS') {
      dispatch(getDrawerSessionSuccess(null));
      dispatch(logoutUserFunction());
    } else {
      alert('something went wrong');
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {merchantToken && !posUserToken ? (
        <UserNavigator />
      ) : merchantToken && posUserToken ? (
        <HomeNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

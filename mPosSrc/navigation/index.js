import React from 'react';

import { useSelector } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';

import { UserNavigator } from './UserNavigator';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { AppNavigator } from '@mPOS/navigation/AppNavigator';
import { navigationRef } from '@mPOS/navigation/NavigationRef';
import { AuthNavigator } from '@mPOS/navigation/AuthNavigator';

export function RootNavigator() {
  const auth = useSelector(getAuthData);
  const posUser = useSelector(getUser);
  const merchantToken = auth?.merchantLoginData?.token;
  const posUserToken = posUser?.posLoginData?.token;

  return (
    <NavigationContainer ref={navigationRef} onReady={() => RNBootSplash.hide()}>
      {merchantToken && !posUserToken ? (
        <UserNavigator />
      ) : merchantToken && posUserToken ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

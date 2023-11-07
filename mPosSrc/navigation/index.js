import React from 'react';
import { useSelector } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './UserNavigator';
import { AppNavigator } from '@mPOS/navigation/AppNavigator';
import { navigationRef } from '@mPOS/navigation/NavigationRef';
import { AuthNavigator } from '@mPOS/navigation/AuthNavigator';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { ProfileNavigator } from './ProfileNavigator';

export function RootNavigator() {
  const auth = useSelector(getAuthData);
  const posUser = useSelector(getUser);
  const merchantToken = auth?.merchantLoginData?.token;
  const posUserToken = posUser?.posLoginData?.token;
  const defaultScreen = posUser?.defaultScreen;

  const getNavigator = () => {
    if (merchantToken && !posUserToken) {
      return <UserNavigator />;
    } else if (merchantToken && posUserToken && !defaultScreen) {
      return <ProfileNavigator />;
    } else if (merchantToken && posUserToken && defaultScreen) {
      return <AppNavigator />;
    } else {
      return <AuthNavigator />;
    }
  };
  return (
    <NavigationContainer ref={navigationRef} onReady={() => RNBootSplash.hide()}>
      {getNavigator()}
    </NavigationContainer>
  );
}

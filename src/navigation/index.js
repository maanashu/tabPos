import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { UserNavigator } from '@/navigation/UserNavigator';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { getUser } from '@/selectors/UserSelectors';
import { navigationRef } from './NavigationRef';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getAuthData } from '@/selectors/AuthSelector';
const Drawer = createDrawerNavigator();

export function RootNavigator() {
  const auth = useSelector(getAuthData);
  const posUser = useSelector(getUser);
  const merchantToken = auth?.merchantLoginData?.token;
  const posUserToken = posUser?.posLoginData?.token;
  console.log('posUserToken', posUserToken);
  const scheme = useColorScheme();
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

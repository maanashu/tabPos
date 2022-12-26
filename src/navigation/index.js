import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { getUser } from '@/selectors/UserSelectors';
import { navigationRef } from './NavigationRef';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigator } from '@/navigation/DrawerNavigator';
import { COLORS, SF, SH, SW } from '@/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Drawer = createDrawerNavigator();

export function RootNavigator() {
  const user = useSelector(getUser);
  // console.log('----------------user', user)
  const scheme = useColorScheme();
  return (
    <NavigationContainer ref={navigationRef}>
      {user?.id ? <HomeNavigator /> : <AuthNavigator />}
      {/* <HomeNavigator /> */}
    </NavigationContainer>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NAVIGATION } from '@/constants';
import {
  Login,
  VerifyPhone,
  VerifyOtp,
  Passcode,
  VerifySucess,
  POSUsers,
  LoginIntial,
  MerchantPasscode,
  PosUserPasscode,
} from '@/screens';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { Notification } from '@/screens/Setting/Components';
import NotificationsList from '@/screens/Notifications/NotificationsList';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function UserNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="posUsers">
      <Stack.Screen
        component={POSUsers}
        name={NAVIGATION.posUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={LoginIntial}
        name={NAVIGATION.loginIntial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={PosUserPasscode}
        name={NAVIGATION.posUserPasscode}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={HomeNavigator} name={'HOME'} options={{ headerShown: false }} />
      {/* <Stack.Screen
        component={HomeNavigator}
        name={NAVIGATION.retails}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

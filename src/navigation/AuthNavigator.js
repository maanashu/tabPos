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
  Retails,
  POSUsers,
} from '@/screens';
import { HomeNavigator } from '@/navigation/HomeNavigator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function AuthNavigator(props) {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.verifyPhone}>
      <Stack.Screen
        component={VerifyPhone}
        name={NAVIGATION.verifyPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifyOtp}
        name={NAVIGATION.verifyOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Passcode}
        name={NAVIGATION.passcode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifySucess}
        name={NAVIGATION.verifySucess}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        component={HomeNavigator}
        name={NAVIGATION.retails}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

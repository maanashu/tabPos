import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { POSUsers, LoginIntial, PosUserPasscode, WeeklyTransaction } from '@/screens';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { TwoFactorLogin } from '@/screens/Auth/PosUserPasscode/Components/TwoFactorLogin';

const Stack = createNativeStackNavigator();

export function UserNavigator() {
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
      <Stack.Screen
        component={TwoFactorLogin}
        name={NAVIGATION.twoFactorLogin}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen component={HomeNavigator} name={'HOME'} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen
        name={NAVIGATION.weeklyTransaction}
        component={WeeklyTransaction}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { LoginIntial, POSUsers, Passcode, Profile } from '@/screens';
import { HomeNavigator } from './HomeNavigator';

const Stack = createNativeStackNavigator();

export function InitialNav() {
  return (
    <Stack.Navigator>
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
        component={Passcode}
        name={NAVIGATION.passcode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={HomeNavigator}
        name={'HOME'}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

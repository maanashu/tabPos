import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATION } from '@mPOS/constants';
import { VerifyOtp, EnterPhoneNumber } from '@mPOS/screens';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        component={EnterPhoneNumber}
        name={NAVIGATION.enterPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifyOtp}
        name={NAVIGATION.verifyOtp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

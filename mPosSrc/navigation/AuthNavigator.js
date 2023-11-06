import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MPOS_NAVIGATION } from '@common/commonImports';
import { VerifyOtp, EnterPhoneNumber } from '@mPOS/screens';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        component={EnterPhoneNumber}
        name={MPOS_NAVIGATION.enterPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifyOtp}
        name={MPOS_NAVIGATION.verifyOtp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

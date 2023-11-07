import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MPOS_NAVIGATION } from '@common/commonImports';
import { VerifyOtp, EnterPhoneNumber, PosUserProfile } from '@mPOS/screens';

const Stack = createNativeStackNavigator();

export function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        component={PosUserProfile}
        name={MPOS_NAVIGATION.posUserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

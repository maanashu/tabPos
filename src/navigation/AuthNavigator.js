import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { VerifyPhone, VerifyOtp, VerifySucess, MerchantPasscode } from '@/screens';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.verifyPhone}>
      <Stack.Screen
        component={VerifyPhone}
        name={NAVIGATION.verifyPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={MerchantPasscode}
        name={NAVIGATION.merchantPasscode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifyOtp}
        name={NAVIGATION.verifyOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifySucess}
        name={NAVIGATION.verifySucess}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

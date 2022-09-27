import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { Login, VerifyPhone } from '@/screens';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName= "VerifyPhone">
      <Stack.Screen
        component={Login}
        name={NAVIGATION.login}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={VerifyPhone}
        name={NAVIGATION.verifyPhone}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@mPOS/constants';
import { Login, PosUsers } from '@mPOS/screens';

const Stack = createNativeStackNavigator();

export function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={PosUsers}
        name={NAVIGATION.posUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={Login} name={NAVIGATION.login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

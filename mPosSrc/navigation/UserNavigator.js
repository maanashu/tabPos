import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { Login, PosUserProfile, PosUsers } from '@mPOS/screens';

const Stack = createNativeStackNavigator();

export function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={PosUsers}
        name={MPOS_NAVIGATION.posUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Login}
        name={MPOS_NAVIGATION.login}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        component={PosUserProfile}
        name={MPOS_NAVIGATION.posUserProfile}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

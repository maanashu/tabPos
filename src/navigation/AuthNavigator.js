import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NAVIGATION } from '@/constants';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import {
  crossButton,
} from '@/assets';
import {
  Login,
  VerifyPhone,
  VerifyOtp,
  Passcode,
  LoginIntial,
  Retails,
  DeliveryOrder
} from '@/screens';
import { HomeNavigator } from '@/navigation/HomeNavigator'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function AuthNavigator(props) {

  return (
    <Stack.Navigator initialRouteName="VerifyPhone">
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
        component={LoginIntial}
        name={NAVIGATION.loginIntial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={HomeNavigator}
        name={NAVIGATION.retails}
        options={{ headerShown: false }}
      />
       
    </Stack.Navigator>
  );
}

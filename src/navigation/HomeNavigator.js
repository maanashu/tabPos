import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Retails, DeliveryOrder } from '@/screens';
import { DrawerNavigator } from '@/navigation/DrawerNavigator';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function HomeNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Retails"
      defaultStatus='open'
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: Platform.OS === 'android' ? SW(20) : SW(20),
          alignItems: 'center',
        },
        drawerPosition: 'left',
        drawerType: 'permanent',
      }}
      drawerContent={props => <DrawerNavigator {...props} />}
    >
      <Drawer.Screen
        component={Retails}
        name={NAVIGATION.retails}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={DeliveryOrder}
        name={NAVIGATION.deliveryOrder}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

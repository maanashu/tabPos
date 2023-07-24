import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, SW } from '@/theme';
import {
  Retails,
  DeliveryOrder,
  ShippingOrders,
  Wallet,
  Management,
  Customers,
  Calender,
  Analytics,
  ShippingOrder,
  LoginIntial,
  Reward,
  Setting,
  DashBoard,
  PosRetail,
  PosRetail2,
  ShippingOrder2,
  Analytics2,
} from '@/screens';
import { DrawerNavigator } from '@/navigation/DrawerNavigator';
import { Platform } from 'react-native';
import { CartAmountTips } from '@/screens/PosRetail/Components';
import NotificationsList from '@/screens/Notifications/NotificationsList';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function HomeNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      defaultStatus="open"
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: Platform.OS === 'android' ? SW(22) : SW(25),
          alignItems: 'center',
        },
        drawerPosition: 'left',
        drawerType: 'permanent',
      }}
      drawerContent={props => <DrawerNavigator {...props} />}
    >
      <Drawer.Screen
        component={DashBoard}
        name={NAVIGATION.dashBoard}
        options={{ headerShown: false }}
      />
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
      <Drawer.Screen
        component={ShippingOrder}
        name={NAVIGATION.shippingOrder}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Wallet}
        name={NAVIGATION.wallet}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Management}
        name={NAVIGATION.management}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Customers}
        name={NAVIGATION.customers}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Calender}
        name={NAVIGATION.calender}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Analytics}
        name={NAVIGATION.analytics}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Reward}
        name={NAVIGATION.reward}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Setting}
        name={NAVIGATION.setting}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={PosRetail}
        name={NAVIGATION.posRetail}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={CartAmountTips}
        name={NAVIGATION.CartAmountTips}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={NotificationsList}
        name={NAVIGATION.notificationsList}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={PosRetail2}
        name={NAVIGATION.posRetail2}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={ShippingOrder2}
        name={NAVIGATION.shippingOrder2}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Analytics2}
        name={NAVIGATION.analytics2}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

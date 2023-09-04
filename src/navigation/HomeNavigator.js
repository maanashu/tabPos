import React from 'react';
import { NAVIGATION } from '@/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, SW } from '@/theme';
import {
  Wallet,
  Management,
  Customers,
  Calender,
  Reward,
  Setting,
  DashBoard,
  ShippingOrder2,
  Analytics2,
  DeliveryOrders2,
  PosRetail3,
  Refund,
  Customers2,
  Wallet2,
} from '@/screens';
import { DrawerNavigator } from '@/navigation/DrawerNavigator';
import { Platform } from 'react-native';
import NotificationsList from '@/screens/Notifications/NotificationsList';

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
      drawerContent={(props) => <DrawerNavigator {...props} />}
    >
      <Drawer.Screen
        component={DashBoard}
        name={NAVIGATION.dashBoard}
        options={{ headerShown: false }}
      />
      <Drawer.Screen component={Wallet} name={NAVIGATION.wallet} options={{ headerShown: false }} />
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
      <Drawer.Screen component={Reward} name={NAVIGATION.reward} options={{ headerShown: false }} />
      <Drawer.Screen
        component={Setting}
        name={NAVIGATION.setting}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={NotificationsList}
        name={NAVIGATION.notificationsList}
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
      <Drawer.Screen
        component={DeliveryOrders2}
        name={NAVIGATION.deliveryOrders2}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={PosRetail3}
        name={NAVIGATION.posRetail3}
        options={{ headerShown: false }}
      />
      <Drawer.Screen component={Refund} name={NAVIGATION.refund} options={{ headerShown: false }} />
      <Drawer.Screen
        component={Customers2}
        name={NAVIGATION.customers2}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Wallet2}
        name={NAVIGATION.wallet2}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

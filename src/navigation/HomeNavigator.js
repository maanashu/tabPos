import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, SW } from '@/theme';
import { Retails, DeliveryOrder, ShippingOrders, Wallet, Management, Customers, Calender } from '@/screens';
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
          width: Platform.OS === 'android' ? SW(22) : SW(30),
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
      <Drawer.Screen
        component={ShippingOrders}
        name={NAVIGATION.shippingOrders}
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
    </Drawer.Navigator>
  );
}

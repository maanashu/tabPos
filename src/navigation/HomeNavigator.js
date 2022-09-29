import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import {  Retails,
  DeliveryOrder } from '@/screens';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Retails">
      {/* <Stack.Screen 
      name={NAVIGATION.home} 
      component={Home} /> */}
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: COLORS.white,
            width: SW(20),
            paddingLeft: 2,
          },
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
    </Stack.Navigator>
  );
}

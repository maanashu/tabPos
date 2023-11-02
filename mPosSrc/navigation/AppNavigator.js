import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Analytics,
  Cart,
  Checkout,
  Delivery,
  DeliveryStatus,
  OrderDetail,
  OrderList,
  PosUserProfile,
  Products,
  Profile,
  ProfileQRCode,
  RetailProducts,
  Services,
  SubCategory,
  TransactionList,
  Shipping,
  ShippingOrderList,
  ShippingOrderDetail,
  // ReturnOrderDetail,
  SearchScreen,
  DeliveryReturnOrderDetail,
} from '@mPOS/screens';
import { NAVIGATION } from '@mPOS/constants';
import BottomTabNavigator from '@mPOS/navigation/BottomTabNavigator';
import { TrackOrder } from '@mPOS/screens/HomeTab/Shipping/TrackOrder/TrackOrder';
import { Invoice } from '@mPOS/components';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}
      initialRouteName={NAVIGATION.bottomTab}
    >
      <Stack.Screen
        name={NAVIGATION.bottomTab}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.checkout}
        component={Checkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.subCategory}
        component={SubCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.products}
        component={Products}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.profileQRCode}
        component={ProfileQRCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={NAVIGATION.cart} component={Cart} options={{ headerShown: false }} />
      <Stack.Screen
        name={NAVIGATION.retailProducts}
        component={RetailProducts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.services}
        component={Services}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.transactionList}
        component={TransactionList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.delivery}
        component={Delivery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.orderList}
        component={OrderList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.orderDetail}
        component={OrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.deliveryStatus}
        component={DeliveryStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.deliveryReturnOrderDetail}
        component={DeliveryReturnOrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.posUserProfile}
        component={PosUserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.shipping}
        component={Shipping}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.shippingOrderList}
        component={ShippingOrderList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.shippingOrderDetail}
        component={ShippingOrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.analytics}
        component={Analytics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.trackOrder}
        options={{ headerShown: false }}
        component={TrackOrder}
      />
      <Stack.Screen
        name={NAVIGATION.searchScreen}
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Stack.Screen
        name={NAVIGATION.invoice}
        options={{ headerShown: false }}
        component={Invoice}
      />
      {/* <Stack.Screen
        name={NAVIGATION.returnOrderDetail}
        options={{ headerShown: false }}
        component={ReturnOrderDetail}
      /> */}
    </Stack.Navigator>
  );
}

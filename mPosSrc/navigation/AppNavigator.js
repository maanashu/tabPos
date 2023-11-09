import React, { useState, useEffect } from 'react';
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
  ReturnOrderDetail,
  SearchScreen,
  DeliveryReturnOrderDetail,
  Booking,
  ProductRefund,
  Settings,
  Locations,
  Receipts,
  WalletSettings,
  StaffSettings,
} from '@mPOS/screens';
import { MPOS_NAVIGATION } from '@common/commonImports';
import BottomTabNavigator from '@mPOS/navigation/BottomTabNavigator';
import { TrackOrder } from '@mPOS/screens/HomeTab/Shipping/TrackOrder/TrackOrder';
import { Invoice } from '@mPOS/components';

const Stack = createNativeStackNavigator();

export function AppNavigator(navigation) {
  const [profileScreenVis, setProfileScreenVis] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProfileScreenVis(true);
    }, 1500);
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}
      initialRouteName={MPOS_NAVIGATION.bottomTab}
    >
      <Stack.Screen
        name={MPOS_NAVIGATION.bottomTab}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.checkout}
        component={Checkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.subCategory}
        component={SubCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.products}
        component={Products}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.profileQRCode}
        component={ProfileQRCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={MPOS_NAVIGATION.cart} component={Cart} options={{ headerShown: false }} />
      <Stack.Screen
        name={MPOS_NAVIGATION.retailProducts}
        component={RetailProducts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.services}
        component={Services}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.transactionList}
        component={TransactionList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.delivery}
        component={Delivery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.orderList}
        component={OrderList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.orderDetail}
        component={OrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.deliveryStatus}
        component={DeliveryStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.deliveryReturnOrderDetail}
        component={DeliveryReturnOrderDetail}
        options={{ headerShown: false }}
      />
      {profileScreenVis && (
        <Stack.Screen
          name={MPOS_NAVIGATION.posUserProfile}
          component={PosUserProfile}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name={MPOS_NAVIGATION.shipping}
        component={Shipping}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.shippingOrderList}
        component={ShippingOrderList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.shippingOrderDetail}
        component={ShippingOrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.analytics}
        component={Analytics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.trackOrder}
        options={{ headerShown: false }}
        component={TrackOrder}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.searchScreen}
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.invoice}
        options={{ headerShown: false }}
        component={Invoice}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.returnOrderDetail}
        options={{ headerShown: false }}
        component={ReturnOrderDetail}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.booking}
        options={{ headerShown: false }}
        component={Booking}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.productRefund}
        options={{ headerShown: false }}
        component={ProductRefund}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.settings}
        options={{ headerShown: false }}
        component={Settings}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.locations}
        options={{ headerShown: false }}
        component={Locations}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.receipts}
        options={{ headerShown: false }}
        component={Receipts}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.walletSettings}
        options={{ headerShown: false }}
        component={WalletSettings}
      />
      <Stack.Screen
        name={MPOS_NAVIGATION.staffSettings}
        options={{ headerShown: false }}
        component={StaffSettings}
      />
    </Stack.Navigator>
  );
}

import React, { useState, useEffect } from 'react';

import { View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {
  Cart,
  task,
  timer,
  NoCard,
  Delivery,
  ReturnTruck,
  drawerdeliveryTruck,
  Group,
} from '@/assets';
import {
  orderStatusCount,
  todayCurrentStatus,
  todayShippingStatus,
} from '@/actions/ShippingAction';
import { getGraphOrders, getReviewDefault, getOrderstatistics } from '@/actions/DeliveryAction';
import Graph from './Components/Graph';
import { COLORS, SH } from '@/theme';
import Orders from './Components/Orders';
import RightDrawer from './Components/RightDrawer';
import { Spacer } from '@/components';
import { getAuthData } from '@/selectors/AuthSelector';
import { getOrderData } from '@/actions/AnalyticsAction';
import OrderConversion from './Components/OrderConversion';
import { getShipping } from '@/selectors/ShippingSelector';
import { getDelivery } from '@/selectors/DeliverySelector';
import TodayShippingStatus from './Components/TodayShippingStatus';
import CurrentShippingStatus from './Components/CurrentShippingStatus';

import styles from './ShippingOrder2.styles';
import OrderList from './Components/OrderList';
import Header from './Components/Header';
import { ms } from 'react-native-size-matters';
import OrderDetail from './Components/OrderDetail';

const height = Dimensions.get('window').height;

export function ShippingOrder2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getGraphOrderData = useSelector(getDelivery);
  const ordersList = getGraphOrderData?.getReviewDef;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const [userDetail, setUserDetail] = useState(ordersList?.[0] ?? []);
  const [orderDetail, setOrderDetail] = useState(ordersList?.[0]?.order_details ?? []);
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState('0');
  const [getOrderDetail, setGetOrderDetail] = useState('');
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id);

  useEffect(() => {
    dispatch(todayShippingStatus(sellerID));
    dispatch(todayCurrentStatus(sellerID));
    dispatch(getReviewDefault(0, 4));
    dispatch(getGraphOrders(4));
    dispatch(getOrderstatistics(4));
    dispatch(orderStatusCount(sellerID));
  }, []);

  useEffect(() => {
    if (ordersList?.length > 0) {
      const interval = setInterval(() => {
        dispatch(getOrderData(orderId || ordersList?.[0]?.id));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
  }, [viewAllOrders && getOrderDetail === 'ViewAllScreen']);

  useEffect(() => {
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
  }, [openShippingOrders, viewAllOrders, getGraphOrderData?.getReviewDef]);

  const onPressDrawerHandler = (key) => {
    setOpenShippingOrders(key);
    dispatch(getReviewDefault(key, 4));
  };

  const onpressViewHandler = (id) => {
    setViewAllOrders(true);
  };

  return (
    <>
      {!viewAllOrders ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.leftMainViewStyle}>
            <View style={styles.todayShippingViewStyle}>
              <TodayShippingStatus />
            </View>

            <View style={styles.currentShippingViewStyle}>
              <CurrentShippingStatus />
            </View>

            <View style={styles.orderConversionViewStyle}>
              <OrderConversion />
            </View>
          </View>

          <View style={styles.centerMainViewStyle}>
            <Graph />

            <Orders
              selectedStatus={openShippingOrders}
              onViewAllHandler={() => onpressViewHandler()}
            />
          </View>

          <View style={styles.drawerMainViewStyle}>
            <RightDrawer {...{ onPressDrawerHandler, openShippingOrders }} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1, borderWidth: 3, borderColor: 'green' }}>
          <Header {...{ viewAllOrders, setViewAllOrders }} />

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderWidth: 3,
              borderColor: 'red',
              paddingBottom: ms(10),
              // justifyContent: 'space-between',
            }}
          >
            <View style={styles.orderListMainView}>
              <OrderList selectedStatus={openShippingOrders} />
            </View>

            <View style={styles.orderDetailMainView}>
              <OrderDetail />
            </View>

            <View style={styles.drawerMainViewStyle}>
              <RightDrawer {...{ onPressDrawerHandler, openShippingOrders }} />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

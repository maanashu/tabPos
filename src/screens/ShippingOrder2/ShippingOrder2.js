import React, { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import {
  getGraphOrders,
  orderStatusCount,
  todayCurrentStatus,
  todayShippingStatus,
} from '@/actions/ShippingAction';
import { backArrow2 } from '@/assets';
import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import Graph from './Components/Graph';
import Header from './Components/Header';
import { strings } from '@/localization';
import Orders from './Components/Orders';
import OrderList from './Components/OrderList';
import OrderDetail from './Components/OrderDetail';
import RightDrawer from './Components/RightDrawer';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getAuthData } from '@/selectors/AuthSelector';
import { getOrderData } from '@/actions/AnalyticsAction';
import OrderConversion from './Components/OrderConversion';
import { getDelivery } from '@/selectors/DeliverySelector';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import TodayShippingStatus from './Components/TodayShippingStatus';
import CurrentShippingStatus from './Components/CurrentShippingStatus';
import { getReviewDefault, getOrderstatistics, acceptOrder } from '@/actions/DeliveryAction';

import styles from './ShippingOrder2.styles';

export function ShippingOrder2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getGraphOrderData = useSelector(getDelivery);
  const getAnalyticsData = useSelector(getAnalytics);
  const ordersList = getGraphOrderData?.getReviewDef;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const [userDetail, setUserDetail] = useState(ordersList?.[0] ?? []);
  const [orderDetail, setOrderDetail] = useState(ordersList?.[0]?.order_details ?? []);
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState('0');
  const [getOrderDetail, setGetOrderDetail] = useState('');
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id);
  const [openWebView, setOpenWebView] = useState(false);

  useEffect(() => {
    dispatch(todayShippingStatus(sellerID));
    dispatch(todayCurrentStatus(sellerID));
    dispatch(getReviewDefault(0, 4));
    dispatch(getGraphOrders());
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

  const acceptOrderLoading = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const onPressDrawerHandler = (key) => {
    setOpenShippingOrders(key);
    dispatch(getReviewDefault(key, 4));
  };

  const onpressViewHandler = (id) => {
    setViewAllOrders(true);
    dispatch(getOrderData(id));
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
  };

  const trackOrderHandler = (info) => {
    if (info) {
      setOpenWebView(true);
    }
  };

  const acceptHandler = (id, status) => {
    const data = {
      orderId: id,
      status: status,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, openShippingOrders, 4, (res) => {
        if (res?.msg) {
          dispatch(getReviewDefault(openShippingOrders, 4));
          dispatch(orderStatusCount(sellerID));
          setGetOrderDetail('ViewAllScreen');
          setUserDetail(ordersList?.[0] ?? []);
          setViewAllOrders(true);
          setOrderDetail(ordersList?.[0]?.order_details ?? []);
        }
      })
    );
  };

  const declineHandler = (id) => {
    const data = {
      orderId: id,
      status: 7,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, () => {
        alert('Order declined successfully');
        setViewAllOrders(false);
        dispatch(getReviewDefault(0, 4));
      })
    );
  };

  return (
    <>
      {!openWebView ? (
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

                <Orders selectedStatus={openShippingOrders} onViewAllHandler={onpressViewHandler} />
              </View>

              <View style={styles.drawerMainViewStyle}>
                <RightDrawer {...{ onPressDrawerHandler, openShippingOrders }} />
              </View>
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <Header {...{ viewAllOrders, setViewAllOrders }} />

              <View style={styles.centerViewStyle}>
                {ordersList?.length > 0 ? (
                  <>
                    <View style={styles.orderListMainView}>
                      <OrderList
                        selectedStatus={openShippingOrders}
                        onViewAllHandler={onpressViewHandler}
                      />
                    </View>

                    <View style={styles.orderDetailMainView}>
                      <OrderDetail
                        {...{
                          openShippingOrders,
                          userDetail,
                          orderDetail,
                          declineHandler,
                          acceptHandler,
                          trackOrderHandler,
                        }}
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyOrderView}>
                    <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
                  </View>
                )}

                <View style={styles.drawerMainViewStyle}>
                  <RightDrawer {...{ onPressDrawerHandler, openShippingOrders }} />
                </View>
              </View>
            </SafeAreaView>
          )}
        </>
      ) : (
        <View style={[styles.container, { flexDirection: 'column' }]}>
          <TouchableOpacity
            style={styles.backView}
            onPress={() => {
              setOpenWebView(false);
              dispatch(getReviewDefault(openShippingOrders, 4));
            }}
          >
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
              {strings.deliveryOrders.back}
            </Text>
          </TouchableOpacity>

          <Spacer space={SH(20)} />

          <WebView
            source={{ uri: getAnalyticsData?.getOrderData?.tracking_info?.url }}
            style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loader}>
                <ActivityIndicator size={'large'} color={COLORS.primary} style={styles.loader} />
              </View>
            )}
          />
        </View>
      )}

      {acceptOrderLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0,0.2)' }]}>
          <ActivityIndicator color={COLORS.primary} size={'small'} style={styles.loader} />
        </View>
      ) : null}
    </>
  );
}

import React, { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

import WebView from 'react-native-webview';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  getGraphOrders,
  getReviewDefault,
  getShippingOrderstatistics,
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
import { acceptOrder } from '@/actions/DeliveryAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getOrderData } from '@/actions/AnalyticsAction';
import OrderConversion from './Components/OrderConversion';
import { getShipping } from '@/selectors/ShippingSelector';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import TodayShippingStatus from './Components/TodayShippingStatus';
import CurrentShippingStatus from './Components/CurrentShippingStatus';

import styles from './ShippingOrder2.styles';

export function ShippingOrder2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getGraphOrderData = useSelector(getShipping);
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
  const [showLabelPdf, setShowLabelPdf] = useState(false);
  const source = {
    uri: 'https://wwwtest.fedex.com/document/v1/cache/retrieve/SH,f86b5c1af8edd0aa794980020268_Merge?isLabel=true&autoPrint=false',
    cache: true,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(orderStatusCount(sellerID));
      dispatch(todayShippingStatus(sellerID));
      dispatch(todayCurrentStatus(sellerID));
      dispatch(getReviewDefault(0, sellerID));
      dispatch(getGraphOrders());
      dispatch(getShippingOrderstatistics(sellerID));
    }, [])
  );

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
    dispatch(getReviewDefault(key, sellerID));
    dispatch(orderStatusCount(sellerID));
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

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

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
        dispatch(getReviewDefault(0, sellerID));
      })
    );
  };

  const renderOrderProducts = ({ item }) => (
    <View style={styles.orderproductView}>
      <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
        <Image source={{ uri: item?.product_image }} style={styles.userImageStyle} />
        <View style={{ paddingLeft: 10, width: ms(100) }}>
          <Text style={styles.nameTextStyle}>{item?.product_name}</Text>
          {/* <Text style={styles.varientTextStyle}>{item?.product_details?.sku}</Text> */}
        </View>
      </View>
      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
        ${Number(item?.price).toFixed(2)}
      </Text>
      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.qty}</Text>
      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
        ${Number(item?.price).toFixed(2)}
      </Text>
    </View>
  );

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
                        selectedOrderDetail={(value) => setUserDetail(value)}
                        selectedOrderProducts={(value) => setOrderDetail(value)}
                      />
                    </View>

                    <View style={styles.orderDetailMainView}>
                      <OrderDetail
                        {...{
                          openShippingOrders,
                          userDetail,
                          orderDetail,
                          renderOrderProducts,
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
              dispatch(getReviewDefault(openShippingOrders, sellerID));
            }}
          >
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { color: COLORS.white, paddingLeft: 0 }]}>
              {strings.deliveryOrders.back}
            </Text>
          </TouchableOpacity>

          <Spacer space={SH(20)} />

          {/* <Pdf
            trustAllCerts={false}
            activityIndicatorProps={{
              color: COLORS.primary,
              progressTintColor: COLORS.primary,
            }}
            source={{
              uri: 'data:application/pdf;base64,/https://wwwtest.fedex.com/document/v1/cache/retrieve/SH,f86b5c1af8edd0aa794980020268_Merge?isLabel=true&autoPrint=false',
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              flex: 1,
            }}
          /> */}

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

      {isOrderLoading && viewAllOrders ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.2)' }]}>
          <ActivityIndicator size={'small'} color={COLORS.primary} style={styles.loader} />
        </View>
      ) : null}

      {/* {showLabelPdf && (
        <ReactNativeModal
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <WebView
            source={{ uri: getAnalyticsData?.getOrderData?.shipping_labal?.url }}
            style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loader}>
                <ActivityIndicator size={'large'} color={COLORS.primary} style={styles.loader} />
              </View>
            )}
          />
        </ReactNativeModal>
      )} */}
    </>
  );
}

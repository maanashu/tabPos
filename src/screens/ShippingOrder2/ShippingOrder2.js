import React, { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';
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
import { backArrow2, incomingMarked, printer } from '@/assets';
import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import Graph from './Components/Graph';
import Header from './Components/Header';
import { default as NewHeader } from '@/components/Header';
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
import { getPendingOrders } from '@/actions/DashboardAction';
import { getOrderstatistics } from '@mPOS/actions/ShippingActions';
import Modal from 'react-native-modal';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import moment from 'moment';

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
  const [pdfUrl, setPdfUrl] = useState('');
  const [showMiniCalendar, setshowMiniCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(moment());
  const maxDate = new Date(2030, 6, 3);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(orderStatusCount());
      dispatch(todayShippingStatus());
      dispatch(todayCurrentStatus());
      dispatch(getReviewDefault(0));
      dispatch(getGraphOrders());
      dispatch(getPendingOrders());
      dispatch(getShippingOrderstatistics());
    }, [])
  );

  useEffect(() => {
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
    dispatch(getOrderData(ordersList?.[0]?.id));
    setOrderId(ordersList?.[0]?.id);
  }, [viewAllOrders && getOrderDetail === 'ViewAllScreen']);

  useEffect(() => {
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
    dispatch(getOrderData(ordersList?.[0]?.id));
    setOrderId(ordersList?.[0]?.id);
  }, [openShippingOrders, viewAllOrders, getGraphOrderData?.getReviewDef]);

  const acceptOrderLoading = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const onPressDrawerHandler = (key) => {
    setOpenShippingOrders(key);
    dispatch(getReviewDefault(key));
    dispatch(orderStatusCount());
  };

  const onpressViewHandler = (id) => {
    setViewAllOrders(true);
    dispatch(getOrderData(id));
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
  };

  const trackOrderHandler = (info) => {
    if (info) {
      setShowLabelPdf(false);
      setPdfUrl('');
      setOpenWebView(true);
    }
  };

  const printLabelHandler = (item) => {
    if (item?.label_url) {
      setShowLabelPdf(true);
      setPdfUrl(item?.label_url);
      setOpenWebView(true);
      acceptHandler(item?.id, 4);
    }
  };

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  const getUpdatedCount = (count) => {
    if (count) {
      for (let index = 0; index < count?.length; index++) {
        const item = count[index];
        if (item.count > 0) {
          setOpenShippingOrders(index.toString());
          dispatch(getReviewDefault(index));
          dispatch(orderStatusCount());
          dispatch(todayShippingStatus());
          dispatch(getOrderstatistics());
          dispatch(getGraphOrders());
          setGetOrderDetail('ViewAllScreen');
          setUserDetail(ordersList?.[0] ?? []);
          setViewAllOrders(true);
          setOrderDetail(ordersList?.[0]?.order_details ?? []);
          return;
        }
      }
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
          if (
            getDeliveryData?.getReviewDef?.length > 0 &&
            getDeliveryData?.getReviewDef?.length === 1
          ) {
            dispatch(orderStatusCount(getUpdatedCount));
          } else {
            dispatch(getReviewDefault(openShippingOrders));
            dispatch(orderStatusCount());
            setGetOrderDetail('ViewAllScreen');
            setUserDetail(ordersList?.[0] ?? []);
            setViewAllOrders(true);
            setOrderDetail(ordersList?.[0]?.order_details ?? []);
          }
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
        dispatch(getReviewDefault(0));
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

      {/* {openShippingOrders < 4 && (
        <Image source={incomingMarked} style={[styles.checkboxIconStyle]} />
      )} */}
    </View>
  );

  const printPdf = async () => {
    await RNPrint.print({ filePath: pdfUrl });
  };

  return (
    <>
      {!openWebView ? (
        <>
          <Spacer space={SH(15)} />
          <NewHeader />
          {!viewAllOrders ? (
            <SafeAreaView style={[styles.container, { justifyContent: 'space-evenly' }]}>
              <View style={styles.leftMainViewStyle}>
                <View style={styles.todayShippingViewStyle}>
                  <TodayShippingStatus />
                </View>
                <View style={styles.gapView} />
                <View style={styles.currentShippingViewStyle}>
                  <CurrentShippingStatus />
                </View>
                <View style={styles.gapView} />
                <View style={styles.orderConversionViewStyle}>
                  <OrderConversion />
                </View>
              </View>

              <View style={styles.centerMainViewStyle}>
                <Graph />
                <View style={{ flex: 0.01 }} />
                <Orders selectedStatus={openShippingOrders} onViewAllHandler={onpressViewHandler} />
              </View>

              <View style={styles.drawerMainViewStyle}>
                <RightDrawer {...{ onPressDrawerHandler, openShippingOrders }} />
              </View>
            </SafeAreaView>
          ) : (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: COLORS.textInputBackground,
                justifyContent: 'space-evenly',
              }}
            >
              {/* <Header {...{ viewAllOrders, setViewAllOrders }} /> */}

              <View style={styles.centerViewStyle}>
                {ordersList?.length > 0 ? (
                  <>
                    <View style={styles.orderListMainView}>
                      <OrderList
                        setCalendarDate={setCalendarDate}
                        selectedDate={calendarDate}
                        onPressCalendar={setshowMiniCalendar}
                        setViewAllOrders={setViewAllOrders}
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
                          printLabelHandler,
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
              <Modal
                isVisible={showMiniCalendar}
                statusBarTranslucent
                animationIn={'slideInRight'}
                animationInTiming={600}
                animationOutTiming={300}
              >
                <View style={styles.calendarModalView}>
                  <CalendarPickerModal
                    allowRangeSelection={false}
                    maxDate={maxDate}
                    selectedStartDate={calendarDate}
                    onPress={() => setshowMiniCalendar(false)}
                    onSelectedDate={(date) => {
                      setCalendarDate(moment(date));
                      setshowMiniCalendar(false);
                    }}
                    onCancelPress={() => {
                      setshowMiniCalendar(false);
                    }}
                  />
                </View>
              </Modal>
            </SafeAreaView>
          )}
        </>
      ) : (
        <View style={[styles.container, { flexDirection: 'column' }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}
          >
            <TouchableOpacity
              style={styles.backView}
              onPress={() => {
                setOpenWebView(false);
                dispatch(getReviewDefault(openShippingOrders));
              }}
            >
              <Image source={backArrow2} style={styles.backImageStyle} />
              <Text style={[styles.currentStatusText, { color: COLORS.white, paddingLeft: 0 }]}>
                {strings.deliveryOrders.back}
              </Text>
            </TouchableOpacity>

            {showLabelPdf && pdfUrl ? (
              <TouchableOpacity style={styles.backView} onPress={printPdf}>
                <Image source={printer} style={styles.backImageStyle} />
                <Text style={[styles.currentStatusText, { color: COLORS.white, paddingLeft: 5 }]}>
                  {'Print'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Spacer space={SH(20)} />

          {!showLabelPdf ? (
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
          ) : null}

          {showLabelPdf && pdfUrl && (
            <Pdf
              trustAllCerts={false}
              activityIndicatorProps={{
                color: COLORS.primary,
                progressTintColor: COLORS.primary,
              }}
              source={{
                uri: pdfUrl,
                cache: true,
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
            />
          )}
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
    </>
  );
}

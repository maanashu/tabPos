import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  acceptOrder,
  deliOrder,
  getGraphOrders,
  getOrderCount,
  getOrderstatistics,
  getReviewDefault,
  getSellerDriverList,
  todayOrders,
} from '@/actions/DeliveryAction';
import { Spacer } from '@/components';
import Graph from './Components/Graph';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import Header from './Components/Header';
import OrderDetail from './Components/OrderDetail';
import OrderReview from './Components/OrderReview';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import RightSideBar from './Components/RightSideBar';
import { getAuthData } from '@/selectors/AuthSelector';
import CurrentStatus from './Components/CurrentStatus';
import ReturnInvoice from './Components/ReturnInvoice';
import { getOrderData } from '@/actions/AnalyticsAction';
import InvoiceDetails from './Components/InvoiceDetails';
import { getDelivery } from '@/selectors/DeliverySelector';
import OrderConvertion from './Components/OrderConvertion';
import { orderStatusCount } from '@/actions/ShippingAction';
import { getPendingOrders } from '@/actions/DashboardAction';
import TodayOrderStatus from './Components/TodayOrderStatus';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import ReturnConfirmation from './Components/ReturnConfirmation';
import ReturnedOrderDetail from './Components/ReturnedOrderDetail';
import { pay, pin, clock, rightIcon, backArrow2, Fonts } from '@/assets';

import styles from './styles';

export function DeliveryOrders2({ route }) {
  const mapRef = useRef(null);
  var screen;
  if (route?.params && route?.params.screen) {
    screen = route.params.screen;
  }
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const oneOrderDetail = useSelector(getAnalytics);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const location = getAuth?.merchantLoginData?.user?.user_profiles?.current_address;
  const ordersList = getDeliveryData?.getReviewDef;
  const singleOrderDetail = oneOrderDetail?.getOrderData;

  const latitude = parseFloat(location?.latitude);
  const longitude = parseFloat(location?.longitude);

  const sourceCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };

  const destinationCoordinate = {
    latitude: singleOrderDetail?.coordinates?.[0],
    longitude: singleOrderDetail?.coordinates?.[1],
  };

  const [openShippingOrders, setOpenShippingOrders] = useState('0');
  const [userDetail, setUserDetail] = useState(getDeliveryData?.getReviewDef?.[0] ?? []);
  const [isBack, setIsBack] = useState();
  const [selectedProductId, setSelectedProductId] = useState();
  const [orderDetail, setOrderDetail] = useState(
    getDeliveryData?.getReviewDef?.[0]?.order_details ?? []
  );
  const [getOrderDetail, setGetOrderDetail] = useState('');
  const [orderId, setOrderId] = useState(getDeliveryData?.getReviewDef?.[0]?.id);
  const [trackingView, setTrackingView] = useState(false);
  const [viewAllOrder, setViewAllOrder] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);
  const [changeViewToRecheck, setChangeViewToRecheck] = useState();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getReviewDefault(0, 1));
      dispatch(getPendingOrders(sellerID));
      dispatch(todayOrders());
      dispatch(deliOrder());
      dispatch(getOrderCount());
      dispatch(getOrderstatistics(1));
      dispatch(getGraphOrders(1));
      dispatch(getSellerDriverList());
    }, [])
  );

  useEffect(() => {
    setViewAllOrder(false);
    setTrackingView(false);
    setChangeViewToRecheck(false);
    dispatch(getReviewDefault(0, 1));
    dispatch(getOrderCount());
    setOpenShippingOrders('0');
  }, [screen]);

  useEffect(() => {
    setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
    setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
    dispatch(getOrderData(getDeliveryData?.getReviewDef?.[0]?.id));
    setOrderId(getDeliveryData?.getReviewDef?.[0]?.id);
  }, [viewAllOrder && getOrderDetail === 'ViewAllScreen']);

  useEffect(() => {
    setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
    setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
    dispatch(getOrderData(getDeliveryData?.getReviewDef?.[0]?.id));
    setOrderId(getDeliveryData?.getReviewDef?.[0]?.id);
  }, [openShippingOrders, viewAllOrder, getDeliveryData?.getReviewDef]);

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  const isAcceptOrder = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const trackHandler = () => setTrackingView(true);

  const showBadge = (item) => {
    if (item?.title === 'Delivered') {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[
              styles.sideBarImage,
              {
                tintColor: openShippingOrders === item?.key ? COLORS.primary : COLORS.darkGray,
              },
            ]}
          />
          <View
            style={[
              styles.bucketBadge,
              { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
          </View>
        </View>
      );
    } else if (item?.title === 'Rejected/Cancelled') {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[
              styles.sideBarImage,
              {
                tintColor:
                  item?.title === 'Rejected/Cancelled' && openShippingOrders === item?.key
                    ? COLORS.pink
                    : COLORS.darkGray,
              },
            ]}
          />
          <View
            style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
          </View>
        </View>
      );
    } else if (item?.title === 'Returned') {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[
              styles.sideBarImage,
              {
                tintColor:
                  item?.title === 'Returned' && openShippingOrders === item?.key
                    ? COLORS.yellowTweet
                    : COLORS.darkGray,
              },
            ]}
          />
          <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.yellowTweet,
                borderColor: COLORS.yellowTweet,
              },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[
              styles.sideBarImage,
              {
                tintColor:
                  openShippingOrders === item?.key
                    ? COLORS.primary
                    : item?.title === 'Rejected/Cancelled' && openShippingOrders === item?.key
                    ? COLORS.pink
                    : item?.title === 'Returned' && openShippingOrders === item?.key
                    ? COLORS.yellowTweet
                    : COLORS.darkGray,
              },
            ]}
          />
          <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.white,
                borderColor: openShippingOrders === item?.key ? COLORS.primary : COLORS.darkGray,
                borderWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.badgetext,
                { color: openShippingOrders === item?.key ? COLORS.primary : COLORS.darkGray },
              ]}
            >
              {item?.count ?? 0}
            </Text>
          </View>
        </View>
      );
    }
  };

  const onPressConfirmHandler = () => {};

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      disabled={item?.count > 0 ? false : true}
      onPress={() => {
        setOpenShippingOrders(item?.key);
        dispatch(getReviewDefault(item?.key, 1));
        setTrackingView(false);
        dispatch(getOrderCount(sellerID));
        dispatch(todayOrders());
      }}
      style={styles.firstIconStyle}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );

  const renderOrderToReview = ({ item }) => {
    const isSelected = viewAllOrder && item?.id === userDetail?.id;
    const orderDetails = item?.order_details || [];
    const deliveryDate = moment(item?.invoices?.delivery_date).format('DD MMM YYYY') || '';
    const startTime = item?.preffered_delivery_start_time || '00.00';
    const endTime = item?.preffered_delivery_end_time || '00.00';
    const formattedTime = `${startTime} - ${endTime}`;

    const handlePress = () => {
      setViewAllOrder(true);
      setSelectedProductId(orderDetails[0]?.id);
      setUserDetail(item);
      setOrderDetail(orderDetails);
      dispatch(getOrderData(item?.id));
      setOrderId(item?.id);
      setChangeViewToRecheck(false);
    };

    const handleExpandPress = () => {
      setUserDetail(item);
      setOrderDetail(orderDetails);
      setViewAllOrder(true);
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          viewAllOrder ? styles.showAllOrdersView : styles.orderRowStyle,
          {
            backgroundColor: isSelected ? COLORS.textInputBackground : COLORS.transparent,
            borderColor: isSelected ? COLORS.primary : COLORS.blue_shade,
          },
        ]}
      >
        <View style={{ width: SW(12), alignItems: 'center', alignSelf: 'center' }}>
          <Text
            style={{
              fontFamily: Fonts.SemiBold,
              fontSize: ms(6),
              textAlignVertical: 'center',
              color: COLORS.dark_grey,
            }}
          >
            {`#${item?.id}`}
          </Text>
        </View>

        <View style={styles.orderDetailStyle}>
          <Text style={styles.nameTextStyle}>{item?.user_details?.firstname || 'user name'}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={pin} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>
              {item?.distance ? `${item.distance} miles` : '0'}
            </Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
          <Text style={styles.nameTextStyle}>
            {orderDetails.length > 1
              ? `${orderDetails.length} Items`
              : `${orderDetails.length} Item`}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image source={pay} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.payable_amount || '00'}</Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { width: SW(42) }]}>
          <Text style={styles.timeTextStyle}>{deliveryDate}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{formattedTime}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleExpandPress}
          style={[styles.orderDetailStyle, { width: SH(24) }]}
        >
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const headerComponent = () => (
    <View style={styles.headingRowStyle}>
      <Text style={styles.ordersToReviewText}>{getHeaderText(openShippingOrders)}</Text>

      {getDeliveryData?.getReviewDef?.length > 0 ? (
        <TouchableOpacity onPress={() => setViewAllOrder(true)} style={styles.viewAllButtonStyle}>
          <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
    </View>
  );

  const renderOrderProducts = ({ item }) => {
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image source={{ uri: item?.product_image }} style={styles.userImageStyle} />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text style={styles.nameTextStyle}>{item?.product_name}</Text>
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          ${Number(item?.price).toFixed(2)}
        </Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{`X ${item?.qty}`}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          ${Number(item?.price).toFixed(2) * item?.qty}
        </Text>
      </View>
    );
  };

  const acceptHandler = (id) => {
    const data = {
      orderId: id,
      status: parseInt(openShippingOrders) + 1,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, openShippingOrders, 1, (res) => {
        if (res?.msg) {
          dispatch(getReviewDefault(openShippingOrders, 1));
          dispatch(orderStatusCount(sellerID));
          dispatch(todayOrders());
          dispatch(getOrderstatistics(1));
          dispatch(getGraphOrders(1));
          setGetOrderDetail('ViewAllScreen');
          setUserDetail(ordersList?.[0] ?? []);
          setViewAllOrder(true);
          setOrderDetail(ordersList?.[0]?.order_details ?? []);
        }
      })
    );
  };

  const declineHandler = (id) => {
    const data = {
      orderId: id,
      status: 8,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, openShippingOrders, 1, (res) => {
        if (res?.msg) {
          setViewAllOrder(true);
          dispatch(getReviewDefault(openShippingOrders, 1));
          dispatch(orderStatusCount(sellerID));
          dispatch(todayOrders());
          dispatch(getOrderstatistics(1));
          dispatch(getGraphOrders(1));
          setGetOrderDetail('ViewAllScreen');
          setUserDetail(ordersList?.[0] ?? []);
          setOrderDetail(ordersList?.[0]?.order_details ?? []);
        }
      })
    );
  };

  const getHeaderText = (openShippingOrders) => {
    switch (openShippingOrders) {
      case '0':
        return strings.orderStatus.reviewOrders;
      case '1':
        return 'Orders to Accepted';
      case '2':
        return 'Orders to Prepared';
      case '3':
        return 'Assigned Orders to driver';
      case '4':
        return 'Orders Picked Up';
      case '5':
        return 'Orders Delivered';
      case '7,8':
        return 'Orders Rejected/Cancelled';
      default:
        return 'Delivery Returns';
    }
  };

  const changeMapState = (state) => {
    if (state) {
      setTrackingView(true);
    }
  };

  const onRefresh = () => {
    dispatch(getReviewDefault(openShippingOrders, 1));
    dispatch(getOrderCount(sellerID));
  };

  const recheckHandler = () => {
    setChangeViewToRecheck(true);
    setIsReturnModalVisible(false);
  };

  const onPressShop = () => {
    setIsReturnModalVisible(true);
    setTrackingView(false);
  };

  return (
    <>
      {!trackingView ? (
        <SafeAreaView style={styles.container}>
          <Header {...{ viewAllOrder, setViewAllOrder, setIsBack }} />

          <Spacer space={SH(20)} />

          {viewAllOrder ? (
            <SafeAreaView style={styles.firstRowStyle}>
              <>
                {getDeliveryData?.getReviewDef?.length > 0 ? (
                  <>
                    <View
                      style={[
                        styles.orderToReviewView,
                        { height: Dimensions.get('window').height - 80, paddingBottom: ms(10) },
                      ]}
                    >
                      <FlatList
                        renderItem={renderOrderToReview}
                        showsVerticalScrollIndicator={false}
                        data={getDeliveryData?.getReviewDef ?? []}
                        ListHeaderComponent={() => (
                          <View style={styles.headingRowStyle}>
                            <Text style={styles.ordersToReviewText}>
                              {getHeaderText(openShippingOrders)}
                            </Text>
                          </View>
                        )}
                        refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        contentContainerStyle={styles.contentContainerStyle}
                      />
                    </View>

                    {changeViewToRecheck ? (
                      <ReturnedOrderDetail
                        orderDetail={singleOrderDetail}
                        onPressBackHandler={() => setChangeViewToRecheck(false)}
                      />
                    ) : (
                      <OrderDetail
                        {...{
                          userDetail,
                          orderDetail,
                          renderOrderProducts,
                          acceptHandler,
                          declineHandler,
                          openShippingOrders,
                          trackHandler,
                          latitude,
                          longitude,
                          location,
                          sourceCoordinate,
                          destinationCoordinate,
                          changeMapState,
                          mapRef,
                          onPressShop,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <View style={styles.emptyView}>
                    <Text style={styles.noOrdersText}>{'No orders found'}</Text>
                  </View>
                )}
              </>

              <RightSideBar
                {...{
                  renderDrawer,
                  viewAllOrder,
                }}
              />
            </SafeAreaView>
          ) : (
            <SafeAreaView style={styles.firstRowStyle}>
              <View>
                <TodayOrderStatus />

                <Spacer space={ms(10)} />

                <CurrentStatus />

                <Spacer space={ms(10)} />

                <OrderConvertion />
              </View>

              <View style={{ height: Dimensions.get('window').height - 80 }}>
                <Graph />

                <Spacer space={SH(15)} />

                <OrderReview
                  {...{
                    renderOrderToReview,
                    emptyComponent,
                    headerComponent,
                    getDeliveryData,
                    isOrderLoading,
                  }}
                />
              </View>

              <RightSideBar
                {...{
                  renderDrawer,
                  viewAllOrder,
                }}
              />
            </SafeAreaView>
          )}

          {isAcceptOrder ? (
            <View style={[styles.percentageView, { backgroundColor: 'rgba(0,0,0, 0.2)' }]}>
              <ActivityIndicator
                size={'small'}
                color={COLORS.primary}
                style={styles.percentageView}
              />
            </View>
          ) : null}
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={() => setTrackingView(false)} style={styles.backView}>
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
              {strings.deliveryOrders.back}
            </Text>
          </TouchableOpacity>

          <View style={styles.firstRowStyle}>
            {openShippingOrders === '9' ? (
              <ReturnInvoice
                trackingView={() => {
                  setTrackingView(false);
                  dispatch(getReviewDefault(openShippingOrders, 1));
                }}
                mapRef={mapRef}
                orderList={orderDetail}
                orderData={singleOrderDetail}
              />
            ) : (
              <InvoiceDetails
                trackingView={() => {
                  setTrackingView(false);
                  dispatch(getReviewDefault(openShippingOrders, 1));
                }}
                mapRef={mapRef}
                orderList={orderDetail}
                orderData={singleOrderDetail}
              />
            )}
            <RightSideBar
              {...{
                renderDrawer,
                viewAllOrder,
              }}
            />
          </View>
        </SafeAreaView>
      )}

      {isOrderLoading && viewAllOrder ? (
        <View style={[styles.percentageView, { backgroundColor: 'rgba(0,0,0, 0.2)' }]}>
          <ActivityIndicator size={'small'} color={COLORS.primary} style={styles.percentageView} />
        </View>
      ) : null}

      <ReturnConfirmation
        isVisible={isReturnModalVisible}
        setIsVisible={setIsReturnModalVisible}
        onPressRecheck={recheckHandler}
        orderDetail={singleOrderDetail}
        onPressConfirm={onPressConfirmHandler}
      />
    </>
  );
}

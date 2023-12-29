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
import Modal from 'react-native-modal';
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
import { COLORS, SF, SH, SW } from '@/theme';
// import Header from './Components/Header';
import { default as NewHeader } from '@/components/Header';

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
import {
  pay,
  pin,
  clock,
  rightIcon,
  backArrow2,
  Fonts,
  arrowRightTop,
  arrowLeftUp,
  Maximize,
  Minimize,
  filterShippingNew,
  dropdown2,
  newCalendarIcon,
  LocationPurple,
  TimeSky,
} from '@/assets';

import styles from './styles';
import Header from './Components/Header';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { CustomHeader } from '../PosRetail3/Components';
import VerifyPickupOtpModal from './Components/VerifyPickupOtpModal';

export function DeliveryOrders2({ route }) {
  var screen;
  var ORDER_DATA;
  if (route?.params && route?.params.screen) {
    screen = route.params.screen;
  }
  if (route?.params && route?.params?.ORDER_DETAIL) {
    ORDER_DATA = route?.params?.ORDER_DETAIL;
  }
  const todayDate = moment.utc();

  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const oneOrderDetail = useSelector(getAnalytics);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const location = getAuth?.merchantLoginData?.user?.user_profiles?.current_address;
  const ordersList = getDeliveryData?.getReviewDef;
  const singleOrderDetail = oneOrderDetail?.getOrderData;
  const [calendarDate, setCalendarDate] = useState(moment());
  const latitude = parseFloat(location?.latitude);
  const longitude = parseFloat(location?.longitude);
  const maxDate = new Date(2030, 6, 3);
  const [showMiniCalendar, setshowMiniCalendar] = useState(false);
  const sourceCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };

  const destinationCoordinate = {
    latitude: singleOrderDetail?.coordinates?.[0],
    longitude: singleOrderDetail?.coordinates?.[1],
  };

  const [openShippingOrders, setOpenShippingOrders] = useState(ORDER_DATA?.status ?? '0');

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
  const [isMaximizeStatusView, SetIsMaximizeStatusView] = useState(false);
  const [pickupModalVisible, setPickupModalVisible] = useState(false);

  // useEffect(() => {
  //   if (ORDER_DATA) {
  //     setOpenShippingOrders(ORDER_DATA?.status?.toString());
  //     setOrderId(ORDER_DATA?.id);
  //     dispatch(getReviewDefault(ORDER_DATA?.status));
  //     setTrackingView(false);
  //   }
  // }, [ORDER_DATA]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(getReviewDefault(0));
  //     dispatch(getPendingOrders());
  //     dispatch(todayOrders());
  //     dispatch(deliOrder());
  //     dispatch(getOrderCount());
  //     dispatch(getOrderstatistics(1));
  //     dispatch(getGraphOrders(1));
  //     dispatch(getSellerDriverList());
  //   }, [])
  // );

  // useEffect(() => {
  //   if (screen) {
  //     setViewAllOrder(false);
  //     setTrackingView(false);
  //     setChangeViewToRecheck(false);
  //     dispatch(getReviewDefault(0));
  //     dispatch(getOrderCount());
  //     setOpenShippingOrders('0');
  //   }
  // }, [screen]);

  // useEffect(() => {
  //   setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
  //   setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
  //   dispatch(getOrderData(getDeliveryData?.getReviewDef?.[0]?.id));
  //   setOrderId(getDeliveryData?.getReviewDef?.[0]?.id);
  // }, [viewAllOrder && getOrderDetail === 'ViewAllScreen']);

  // useEffect(() => {
  //   setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
  //   setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
  //   dispatch(getOrderData(getDeliveryData?.getReviewDef?.[0]?.id));
  //   setOrderId(getDeliveryData?.getReviewDef?.[0]?.id);
  // }, [openShippingOrders, viewAllOrder, getDeliveryData?.getReviewDef]);
  // Effect to handle changes in ORDER_DATA
  useEffect(() => {
    if (ORDER_DATA) {
      setOpenShippingOrders(ORDER_DATA?.status?.toString());
      setOrderId(ORDER_DATA?.id);
      dispatch(getReviewDefault(ORDER_DATA?.status));
      setTrackingView(false);
    }
  }, [ORDER_DATA]);

  // Focus effect for initial data fetching
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getReviewDefault(0));
      dispatch(getPendingOrders());
      dispatch(todayOrders());
      dispatch(deliOrder());
      dispatch(getOrderCount());
      dispatch(getOrderstatistics('1,3'));
      dispatch(getGraphOrders('1,3'));
      dispatch(getSellerDriverList());
    }, [])
  );

  // Effect to handle changes in 'screen'
  useEffect(() => {
    if (screen) {
      setViewAllOrder(false);
      setTrackingView(false);
      setChangeViewToRecheck(false);
      dispatch(getReviewDefault(0));
      dispatch(getOrderCount());
      setOpenShippingOrders('0');
    }
  }, [screen]);

  // Function to update user and order details
  const updateDeliveryDetails = () => {
    setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
    setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
    dispatch(getOrderData(getDeliveryData?.getReviewDef?.[0]?.id));
    setOrderId(getDeliveryData?.getReviewDef?.[0]?.id);
  };

  // Effect to handle changes in 'viewAllOrder' and 'getOrderDetail'
  useEffect(() => {
    if (viewAllOrder && getOrderDetail === 'ViewAllScreen') {
      updateDeliveryDetails();
    }
  }, [viewAllOrder, getOrderDetail]);

  // Effect to handle changes in 'openShippingOrders', 'viewAllOrder', and 'getDeliveryData'
  useEffect(() => {
    if (openShippingOrders || viewAllOrder || getDeliveryData?.getReviewDef) {
      updateDeliveryDetails();
    }
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
                tintColor: openShippingOrders === item?.key ? COLORS.primary : item.tintColor,
              },
            ]}
          />
          {/* <View
            style={[
              styles.bucketBadge,
              { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
          </View> */}
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
                    : item.tintColor,
              },
            ]}
          />
          {/* <View
            style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
          </View> */}
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
                    : item.tintColor,
              },
            ]}
          />
          {/* <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.yellowTweet,
                borderColor: COLORS.yellowTweet,
              },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
          </View> */}
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
                    : item.tintColor,
              },
            ]}
          />
          {/* <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.white,
                borderColor: openShippingOrders === item?.key ? COLORS.primary : item.tintColor,
                borderWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.badgetext,
                { color: openShippingOrders === item?.key ? COLORS.primary : item.tintColor },
              ]}
            >
              {item?.count ?? 0}
            </Text>
          </View> */}
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
        dispatch(getReviewDefault(item?.key));
        setTrackingView(false);
        dispatch(getOrderCount());
        dispatch(todayOrders());
      }}
      style={styles.firstIconStyle}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );
  const fullDrawerPress = (item) => {
    setOpenShippingOrders(item?.key);
    dispatch(getReviewDefault(item?.key));
    setTrackingView(false);
    dispatch(getOrderCount());
    dispatch(todayOrders());
  };

  const renderOrderToReview = ({ item }) => {
    const isSelected = viewAllOrder && item?.id === userDetail?.id;
    const orderDetails = item?.order_details || [];
    const deliveryDate =
      item?.delivery_option == '3'
        ? moment.utc(item?.created_at).format('DD MMM YYYY')
        : moment.utc(item?.date).format('DD MMM YYYY');
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
            backgroundColor: isSelected ? COLORS.transparent : COLORS.transparent,
            borderColor: isSelected ? COLORS.blue2 : COLORS.neutral_blue,
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
          <View
            style={[
              styles.locationViewStyle,
              { backgroundColor: COLORS.tip_back, borderRadius: 100 },
            ]}
          >
            <Image
              source={LocationPurple}
              style={[styles.pinImageStyle, { tintColor: COLORS.tip_blue }]}
            />
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
          <View
            style={[
              styles.locationViewStyle,
              { backgroundColor: COLORS.alarm_success_50, borderRadius: 100 },
            ]}
          >
            <Image
              source={pay}
              style={[styles.pinImageStyle, { tintColor: COLORS.success_green }]}
            />
            <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
              {item?.payable_amount || '00'}
            </Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { width: SW(42) }]}>
          <Text
            style={[
              styles.timeTextStyle,
              { color: COLORS.black, fontFamily: Fonts.Regular, fontSize: SF(10) },
            ]}
          >
            {deliveryDate}
          </Text>
          <View
            style={[styles.locationViewStyle, { backgroundColor: '#EFFBFF', borderRadius: ms(20) }]}
          >
            <Image
              source={TimeSky}
              style={[styles.pinImageStyle, { tintColor: COLORS.dark_skyblue }]}
            />
            <Text style={[styles.distanceTextStyle, { color: COLORS.dark_skyblue }]}>
              {formattedTime}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleExpandPress}
          style={[styles.orderDetailStyle, { width: SH(24) }]}
        >
          <Image source={arrowRightTop} style={styles.rightIconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const headerComponent = () => (
    <View style={styles.headingRowStyle}>
      <Text style={styles.ordersToReviewText}>{getHeaderText(openShippingOrders)}</Text>

      {getDeliveryData?.getReviewDef?.length > 0 ? (
        <TouchableOpacity onPress={() => setViewAllOrder(true)} style={styles.viewAllButtonStyle}>
          <Text style={styles.viewallTextStyle}>{strings.reward.seeAll}</Text>

          <Image
            source={arrowRightTop}
            style={{ height: ms(13), width: ms(13), tintColor: COLORS.lavenders }}
          />
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

  const getUpdatedCount = (count) => {
    if (count) {
      for (let index = 0; index < count?.length; index++) {
        const item = count[index];
        if (item.count > 0) {
          setOpenShippingOrders(index.toString());
          dispatch(getReviewDefault(index));
          dispatch(orderStatusCount());
          dispatch(todayOrders());
          dispatch(getOrderstatistics(1));
          dispatch(getGraphOrders(1));
          setGetOrderDetail('ViewAllScreen');
          setUserDetail(ordersList?.[0] ?? []);
          setViewAllOrder(true);
          setOrderDetail(ordersList?.[0]?.order_details ?? []);
          return;
        }
      }
    }
  };

  const acceptHandler = (id) => {
    if (userDetail?.delivery_option == '3' && openShippingOrders == '2') {
      setPickupModalVisible(true);
    } else {
      const data = {
        orderId: id,
        status: parseInt(openShippingOrders) + 1,
        sellerID: sellerID,
      };
      dispatch(
        acceptOrder(data, openShippingOrders, 1, (res) => {
          if (res?.msg) {
            if (
              getDeliveryData?.getReviewDef?.length > 0 &&
              getDeliveryData?.getReviewDef?.length === 1
            ) {
              dispatch(getOrderCount(getUpdatedCount));
            } else {
              dispatch(getReviewDefault(openShippingOrders));
              dispatch(orderStatusCount());
              dispatch(todayOrders());
              dispatch(getOrderstatistics(1));
              dispatch(getGraphOrders(1));
              setGetOrderDetail('ViewAllScreen');
              setUserDetail(ordersList?.[0] ?? []);
              setViewAllOrder(true);
              setOrderDetail(ordersList?.[0]?.order_details ?? []);
            }
          }
        })
      );
    }
  };

  const changeOrderStatusAfterPickup = (id) => {
    setPickupModalVisible(false);
    const data = {
      orderId: id,
      status: 5,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, openShippingOrders, 1, (res) => {
        if (res?.msg) {
          if (
            getDeliveryData?.getReviewDef?.length > 0 &&
            getDeliveryData?.getReviewDef?.length === 1
          ) {
            dispatch(getOrderCount(getUpdatedCount));
          } else {
            dispatch(getReviewDefault(openShippingOrders));
            dispatch(orderStatusCount());
            dispatch(todayOrders());
            dispatch(getOrderstatistics('1,3'));
            dispatch(getGraphOrders('1,3'));
            setGetOrderDetail('ViewAllScreen');
            setUserDetail(ordersList?.[0] ?? []);
            setViewAllOrder(true);
            setOrderDetail(ordersList?.[0]?.order_details ?? []);
          }
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
          dispatch(getReviewDefault(openShippingOrders));
          dispatch(orderStatusCount());
          dispatch(todayOrders());
          dispatch(getOrderstatistics('1,3'));
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
    dispatch(getReviewDefault(openShippingOrders));
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
  const showMaxButton = (data) => {
    if (
      data?.status === 3 ||
      data?.status === 4 ||
      data?.status === 5 ||
      data?.status === 7 ||
      data?.status === 9
    )
      return (
        <TouchableOpacity
          onPress={() => SetIsMaximizeStatusView(!isMaximizeStatusView)}
          style={styles.maximizeButton}
        >
          <Image
            source={isMaximizeStatusView ? Minimize : Maximize}
            style={{ height: ms(22), width: ms(22) }}
          />
        </TouchableOpacity>
      );
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.sky_grey,
        flex: 1,
        paddingRight: ms(6),
      }}
    >
      <VerifyPickupOtpModal
        visible={pickupModalVisible}
        orderData={userDetail}
        changeOrderStatus={() => changeOrderStatusAfterPickup(userDetail?.id)}
        onClose={() => setPickupModalVisible(!pickupModalVisible)}
      />
      {!trackingView ? (
        <>
          <Spacer space={SH(15)} backgroundColor={COLORS.sky_grey} />
          <CustomHeader iconShow={false} />
          <Spacer space={SH(5)} backgroundColor={COLORS.sky_grey} />
          {viewAllOrder ? (
            <SafeAreaView style={[styles.container, { justifyContent: 'space-evenly' }]}>
              <>
                {getDeliveryData?.getReviewDef?.length == 0 && (
                  <>
                    {
                      <View style={{ position: 'absolute', left: ms(20) }}>
                        <Header {...{ viewAllOrder, setViewAllOrder, setIsBack }} />
                      </View>
                    }
                    {}
                  </>
                )}
                {getDeliveryData?.getReviewDef?.length > 0 ? (
                  <>
                    {/* <View style={styles.orderListMainView}> */}
                    <View style={[styles.orderToReviewView]}>
                      <FlatList
                        renderItem={renderOrderToReview}
                        showsVerticalScrollIndicator={false}
                        data={getDeliveryData?.getReviewDef ?? []}
                        ListHeaderComponent={() => (
                          <>
                            <View style={styles.headingRowStyleNew}>
                              <TouchableOpacity onPress={() => setViewAllOrder(false)}>
                                <Image
                                  source={arrowLeftUp}
                                  style={{ width: ms(15), height: ms(15), marginRight: ms(5) }}
                                />
                              </TouchableOpacity>
                              <Text style={styles.ordersToReviewText}>
                                {getHeaderText(openShippingOrders)}
                              </Text>
                              {openShippingOrders == '7,8' && (
                                <TouchableOpacity style={[styles.filterButtonStyle]}>
                                  <Text style={styles.calenderTextStyle}>Filters</Text>
                                  <Image
                                    source={filterShippingNew}
                                    style={styles.filterIconStyle}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                            {openShippingOrders == '7,8' && (
                              <TouchableOpacity
                                onPress={() => setshowMiniCalendar(true)}
                                style={[styles.calendarDropContainer]}
                              >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Image source={newCalendarIcon} style={styles.calenderImage} />
                                  <Text style={styles.calenderTextStyle}>
                                    {calendarDate?.format('DD MMM YYYY') ==
                                    todayDate.format('DD MMM YYYY')
                                      ? 'Today'
                                      : calendarDate?.format('DD MMM YYYY')}
                                  </Text>
                                </View>
                                <Image
                                  source={dropdown2}
                                  style={{
                                    height: ms(10),
                                    width: ms(10),
                                    tintColor: COLORS.lavender,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                          </>
                        )}
                        refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        contentContainerStyle={styles.contentContainerStyle}
                      />
                      {/* </View> */}
                    </View>
                    <View style={styles.orderDetailMainNew}>
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
                            isMaximizeStatusView,
                          }}
                        />
                      )}
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyView}>
                    <Text style={styles.noOrdersText}>{'No orders found'}</Text>
                  </View>
                )}

                <View
                  style={[
                    styles.drawerMainViewStyle,
                    getDeliveryData?.getReviewDef?.length == 0 && {
                      position: 'absolute',
                      right: ms(10),
                    },
                    // {
                    //   // marginLeft: ms(12),
                    //   justifyContent: 'space-between',
                    //   position: 'absolute',
                    //   right: ms(10),
                    // },
                  ]}
                >
                  <RightSideBar
                    {...{
                      renderDrawer,
                      viewAllOrder,
                      fullDrawerPress,
                    }}
                  />
                </View>
                {showMaxButton(userDetail)}
              </>
            </SafeAreaView>
          ) : (
            <SafeAreaView
              style={[
                styles.container,
                {
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                },
              ]}
            >
              <View style={styles.leftMainViewStyle}>
                <View style={styles.todayShippingViewStyle}>
                  <TodayOrderStatus />
                </View>
                <View style={styles.gapView} />
                <View style={styles.currentShippingViewStyle}>
                  <CurrentStatus />
                </View>
                <View style={styles.gapView} />
                <View style={styles.orderConversionViewStyle}>
                  <OrderConvertion />
                </View>
              </View>

              <View style={styles.centerMainViewStyleNew}>
                <View style={styles.graphViewContainer}>
                  <Graph />
                </View>
                <View style={{ flex: 0.01 }} />
                <View style={styles.graphViewContainer}>
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
              </View>

              <View style={styles.drawerMainViewStyle}>
                <RightSideBar
                  {...{
                    renderDrawer,
                    viewAllOrder,
                    fullDrawerPress,
                  }}
                />
              </View>
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
        </>
      ) : (
        <>
          <Spacer space={SH(15)} backgroundColor={COLORS.sky_grey} />
          <NewHeader invoiceNo={userDetail?.invoices?.invoice_number ?? 0} />

          <SafeAreaView
            style={[
              styles.containerFull,
              { flexDirection: 'row', justifyContent: 'space-evenly', marginRight: ms(6) },
            ]}
          >
            <View style={[styles.firstRowStyleMain]}>
              <InvoiceDetails
                trackingView={() => {
                  setTrackingView(false);
                  dispatch(getReviewDefault(openShippingOrders));
                }}
                mapRef={mapRef}
                orderList={orderDetail}
                orderData={singleOrderDetail}
              />
            </View>
            <View style={[styles.drawerMainViewStyle]}>
              <Spacer space={SH(15)} backgroundColor={COLORS.sky_grey} />
              <RightSideBar
                {...{
                  renderDrawer,
                  viewAllOrder,
                  fullDrawerPress,
                }}
              />
            </View>
          </SafeAreaView>
        </>
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
              setCalendarDate(moment.utc(date));
              setshowMiniCalendar(false);
            }}
            onCancelPress={() => {
              setshowMiniCalendar(false);
              setCalendarDate(todayDate);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

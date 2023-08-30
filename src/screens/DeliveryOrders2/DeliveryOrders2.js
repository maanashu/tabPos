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
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  pay,
  pin,
  clock,
  rightIcon,
  expressType,
  oneHourType,
  twoHourType,
  customType,
  task,
  timer,
  NoCard,
  returnShipping,
  deliveryShipping,
  deliveryorderProducts,
  Fonts,
  deliveryDriver,
  backArrow2,
} from '@/assets';
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
import Graph from './Components/Graph';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import Header from './Components/Header';
import OrderDetail from './Components/OrderDetail';
import OrderReview from './Components/OrderReview';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { ScreenWrapper, Spacer } from '@/components';
import RightSideBar from './Components/RightSideBar';
import { getAuthData } from '@/selectors/AuthSelector';
import CurrentStatus from './Components/CurrentStatus';
import { getOrderData } from '@/actions/AnalyticsAction';
import InvoiceDetails from './Components/InvoiceDetails';
import { getDelivery } from '@/selectors/DeliverySelector';
import OrderConvertion from './Components/OrderConvertion';
import { orderStatusCount } from '@/actions/ShippingAction';
import TodayOrderStatus from './Components/TodayOrderStatus';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES as ANALYTICSTYPES } from '@/Types/AnalyticsTypes';

import styles from './styles';

export function DeliveryOrders2({ route }) {
  const mapRef = useRef(null);
  var isViewAll;
  var ORDER_DETAIL;
  if (route.params && route.params.isViewAll) {
    isViewAll = route.params.isViewAll;
    ORDER_DETAIL = route.params.ORDER_DETAIL;
  } else {
    isViewAll = false;
    ORDER_DETAIL = null;
  }
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const oneOrderDetail = useSelector(getAnalytics);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const pieChartData = getDeliveryData?.getOrderstatistics?.data;
  const location = getAuth?.merchantLoginData?.user?.user_profiles?.current_address;
  const ordersList = getDeliveryData?.getReviewDef;
  const singleOrderDetail = oneOrderDetail?.getOrderData;
  const widthAndHeight = 180;
  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
  ];

  const latitude = parseFloat(location?.latitude);
  const longitude = parseFloat(location?.longitude);

  let sum = 0;

  series.forEach((num) => {
    sum += num;
  });

  const sourceCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };

  const destinationCoordinate = {
    latitude: singleOrderDetail?.coordinates?.[0],
    longitude: singleOrderDetail?.coordinates?.[1],
  };

  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const [deliverytypes, setDeliveryTypes] = useState();
  const [viewAllOrders, setViewAllOrders] = useState(isViewAll);
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
  // const [isEnableDriverList, setIsEnableDriverList] = useState(false);

  useEffect(() => {
    if (ordersList?.length > 0) {
      const interval = setInterval(() => {
        dispatch(getOrderData(orderId || ordersList?.[0]?.id));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (ORDER_DETAIL !== null) {
        setSelectedProductId(ORDER_DETAIL?.order_details[0]?.id);
        setUserDetail(ORDER_DETAIL);
        setOrderDetail(ORDER_DETAIL?.order_details);
      }
      if (!isBack) {
        setSelectedProductId(ORDER_DETAIL?.order_details[0]?.id);
        setViewAllOrders(isViewAll);
      }
      return () => {
        setIsBack(false);
        setViewAllOrders(false);
        setOrderDetail([]);
        setSelectedProductId(null);
      };
    }, [isViewAll, ORDER_DETAIL])
  );

  const deliveryDrawer = [
    {
      key: '0',
      image: task,
      title: 'Orders to Review',
      count: getDeliveryData?.getOrderCount?.[0]?.count ?? 0,
    },
    {
      key: '1',
      image: deliveryorderProducts,
      title: 'Accepted',
      count: getDeliveryData?.getOrderCount?.[1]?.count ?? 0,
    },
    {
      key: '2',
      image: timer,
      title: 'Order Preparing ',
      count: getDeliveryData?.getOrderCount?.[2]?.count ?? 0,
    },
    {
      key: '3',
      image: deliveryDriver,
      title: 'Ready to Pickup',
      count: getDeliveryData?.getOrderCount?.[3]?.count ?? 0,
    },
    {
      key: '4',
      image: deliveryShipping,
      title: 'Picked Up',
      count: getDeliveryData?.getOrderCount?.[4]?.count ?? 0,
    },
    {
      key: '5',
      image: deliveryorderProducts,
      title: 'Delivered',
      count: getDeliveryData?.getOrderCount?.[5]?.count ?? 0,
    },
    {
      key: '7,8',
      image: NoCard,
      title: 'Rejected/Cancelled',
      count: getDeliveryData?.getOrderCount?.[7]?.count ?? 0,
    },
    {
      key: '9',
      image: returnShipping,
      title: 'Returned',
      count: 0,
    },
  ];

  useEffect(() => {
    dispatch(todayOrders());
    dispatch(deliOrder());
    dispatch(getOrderCount());
    dispatch(getReviewDefault(0, 1));
    dispatch(getOrderstatistics(1));
    dispatch(getGraphOrders(1));
    dispatch(getSellerDriverList());

    const deliveryTypes = [
      {
        key: '1',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[0]?.delivery_type_title ?? 'Express Delivery',
        count: getDeliveryData?.deliveringOrder?.[0]?.count ?? 0,
        image: expressType,
      },
      {
        key: '2',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[1]?.delivery_type_title ?? '1 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[1]?.count ?? 0,
        image: oneHourType,
      },
      {
        key: '3',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[2]?.delivery_type_title ?? '2 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[2]?.count ?? 0,
        image: twoHourType,
      },
      {
        key: '4',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[3]?.delivery_type_title ?? 'Customer Pickups',
        count: getDeliveryData?.deliveringOrder?.[3]?.count ?? 0,
        image: customType,
      },
    ];
    setDeliveryTypes(deliveryTypes);
  }, []);

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

  const isProductDetailLoading = useSelector((state) =>
    isLoadingSelector([ANALYTICSTYPES.GET_ORDER_DATA], state)
  );

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  const isAcceptOrder = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

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

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setOpenShippingOrders(item?.key);
        dispatch(getReviewDefault(item?.key, 1));
        setTrackingView(false);
        dispatch(getOrderCount(sellerID));
      }}
      style={styles.firstIconStyle}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );

  const renderShippingDrawer = ({ item }) => (
    <View style={styles.shippingDrawerView}>
      <Image source={item?.image} style={styles.sideBarImage} />
      <View style={{ paddingLeft: 15, justifyContent: 'center' }}>
        <Text
          style={[
            styles.shippingDrawerCountText,
            {
              color:
                item?.title === 'Delivered'
                  ? COLORS.primary
                  : item?.title === 'Rejected/Cancelled'
                  ? COLORS.pink
                  : item?.title === 'Returned'
                  ? COLORS.yellowTweet
                  : COLORS.solid_grey,
            },
          ]}
        >
          {item?.count ?? 0}
        </Text>
        <Text
          style={[
            styles.shippingDrawerTitleText,
            {
              color:
                item?.title === 'Delivered'
                  ? COLORS.primary
                  : item?.title === 'Rejected/Cancelled'
                  ? COLORS.pink
                  : item?.title === 'Returned'
                  ? COLORS.yellowTweet
                  : COLORS.solid_grey,
            },
          ]}
        >
          {item?.title}
        </Text>
      </View>
    </View>
  );

  const renderOrderToReview = ({ item }) => {
    const isSelected = viewAllOrder && item?.id === userDetail?.id;
    const orderDetails = item?.order_details || [];
    const deliveryDate = item?.invoice?.delivery_date || '';
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

        <View style={[styles.orderDetailStyle, { width: SW(47) }]}>
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

  const renderOrderProducts = ({ item }) => (
    <View style={styles.orderproductView}>
      <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
        <Image source={{ uri: item?.product_image }} style={styles.userImageStyle} />
        <View style={{ paddingLeft: 10, width: ms(100) }}>
          <Text style={styles.nameTextStyle}>{item?.product_name}</Text>
          <Text style={styles.varientTextStyle}>{'Box'}</Text>
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

  const acceptHandler = (id) => {
    // if (openShippingOrders === '2') {
    //   setIsEnableDriverList(true);
    // } else {
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
    // }
  };

  const declineHandler = (id) => {
    const data = {
      orderId: id,
      status: 7,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, () => {
        setViewAllOrder(false);
        dispatch(getReviewDefault(0, 1));
      })
    );
  };

  const getHeaderText = (openShippingOrders) => {
    switch (openShippingOrders) {
      case '0':
        return strings.shipingOrder.orderOfReview;
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

  const renderOrderDetailProducts = ({ item }) => {
    return (
      <View
        style={[
          styles.orderproductView,
          { width: Dimensions.get('window').width / 3.3, paddingVertical: ms(10) },
        ]}
      >
        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: ms(6),
            color: COLORS.dark_grey,
          }}
        >
          {item?.qty ?? '0'}
        </Text>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: ms(6),
              color: COLORS.dark_grey,
            }}
          >
            {item?.product_name ?? ''}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: ms(6),
            color: COLORS.dark_grey,
          }}
        >
          {item?.price ?? '00'}
        </Text>
      </View>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getReviewDefault(3, 1));
    dispatch(getOrderCount(sellerID));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScreenWrapper>
      {!trackingView ? (
        <>
          <View style={styles.container}>
            <Header
              {...{ viewAllOrder, setViewAllOrder, setIsBack, openShippingOrders, sellerID }}
            />

            <Spacer space={SH(20)} />

            {viewAllOrder ? (
              <View style={styles.firstRowStyle}>
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

                    <OrderDetail
                      {...{
                        userDetail,
                        orderDetail,
                        renderOrderProducts,
                        acceptHandler,
                        declineHandler,
                        openShippingOrders,
                        trackHandler,
                        isProductDetailLoading,
                        latitude,
                        longitude,
                        location,
                        sourceCoordinate,
                        destinationCoordinate,
                        changeMapState,
                        mapRef,
                      }}
                    />
                  </>
                ) : (
                  <View style={[styles.modalStyle, { justifyContent: 'center' }]}>
                    <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
                  </View>
                )}

                <RightSideBar
                  {...{
                    deliveryDrawer,
                    renderDrawer,
                    viewAllOrder,
                  }}
                />
              </View>
            ) : (
              <View style={styles.firstRowStyle}>
                <View style={{ height: Dimensions.get('window').height - 80 }}>
                  <TodayOrderStatus />

                  <Spacer space={ms(10)} />

                  <CurrentStatus {...{ deliverytypes }} />

                  <Spacer space={ms(10)} />

                  <OrderConvertion
                    {...{
                      series,
                      sliceColor,
                      widthAndHeight,
                      pieChartData,
                      sum,
                      orderConversionLoading,
                    }}
                  />
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
                    deliveryDrawer,
                    renderDrawer,
                    viewAllOrder,
                  }}
                />
              </View>
            )}
          </View>

          {isAcceptOrder ? (
            <View style={[styles.percentageView, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
              <ActivityIndicator
                size={'small'}
                color={COLORS.primary}
                style={styles.percentageView}
              />
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setTrackingView(false)} style={styles.backView}>
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
              {strings.deliveryOrders.back}
            </Text>
          </TouchableOpacity>

          <View style={styles.firstRowStyle}>
            <InvoiceDetails
              {...{
                setTrackingView,
                singleOrderDetail,
                latitude,
                longitude,
                sourceCoordinate,
                destinationCoordinate,
                openShippingOrders,
                sellerID,
                renderOrderDetailProducts,
                location,
                mapRef,
              }}
            />
            <RightSideBar
              {...{
                deliveryDrawer,
                openShippingOrders,
                renderShippingDrawer,
                setOpenShippingOrders,
                renderDrawer,
              }}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}

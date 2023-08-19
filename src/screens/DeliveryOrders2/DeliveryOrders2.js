import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {
  pay,
  pin,
  clock,
  rightIcon,
  expressType,
  oneHourType,
  twoHourType,
  customType,
  blankCheckBox,
  incomingOrders,
  cancelledOrders,
  task,
  timer,
  NoCard,
  returnedOrders,
  deliveryParcel,
  returnShipping,
  deliveryShipping,
  checkedCheckboxSquare,
  deliveryorderProducts,
  backArrow,
  deliveryHomeIcon,
  Fonts,
  scooter,
  deliveryDriver,
  backArrow2,
  barcode,
  cross,
  cancleIc,
  crossButton,
} from '@/assets';
import {
  acceptOrder,
  deliOrder,
  getGraphOrders,
  getOrderCount,
  getOrderstatistics,
  getReviewDefault,
  todayOrders,
} from '@/actions/DeliveryAction';
import Graph from './Components/Graph';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import Header from './Components/Header';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import OrderDetail from './Components/OrderDetail';
import OrderReview from './Components/OrderReview';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { ScreenWrapper, Spacer } from '@/components';
import RightSideBar from './Components/RightSideBar';
import { graphOptions } from '@/constants/staticData';
import { getAuthData } from '@/selectors/AuthSelector';
import CurrentStatus from './Components/CurrentStatus';
import { getOrderData } from '@/actions/AnalyticsAction';
import { getDelivery } from '@/selectors/DeliverySelector';
import OrderConvertion from './Components/OrderConvertion';
import { orderStatusCount } from '@/actions/ShippingAction';
import TodayOrderStatus from './Components/TodayOrderStatus';
import ShipmentTracking from './Components/ShipmentTracking';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES as ANALYTICSTYPES } from '@/Types/AnalyticsTypes';

import styles from './styles';
import moment from 'moment';

export function DeliveryOrders2({ route }) {
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
  const todayOrderStatusData = getDeliveryData?.todayOrderStatus;
  const pieChartData = getDeliveryData?.getOrderstatistics?.data;
  const location = getAuth?.merchantLoginData?.user?.user_profiles?.current_address;
  const ordersList = getDeliveryData?.getReviewDef;
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
    latitude: oneOrderDetail?.getOrderData?.coordinates?.[0],
    longitude: oneOrderDetail?.getOrderData?.coordinates?.[1],
  };

  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const [deliverytypes, setDeliveryTypes] = useState();
  const [graphData, setGraphData] = useState(graphOptions);
  const [viewAllOrders, setViewAllOrders] = useState(isViewAll);
  const [openShippingOrders, setOpenShippingOrders] = useState('0');
  const [isOpenSideBarDrawer, setIsOpenSideBarDrawer] = useState(false);
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
      key: '6',
      image: NoCard,
      title: 'Rejected/Cancelled',
      count: getDeliveryData?.getOrderCount?.[6]?.count ?? 0,
    },
    {
      key: '7',
      image: returnShipping,
      title: 'Returned',
      count: getDeliveryData?.getOrderCount?.[7]?.count ?? 0,
    },
  ];

  useEffect(() => {
    dispatch(todayOrders(sellerID));
    dispatch(deliOrder(sellerID));
    dispatch(getOrderCount(sellerID));
    dispatch(getReviewDefault(0, sellerID, 1));
    dispatch(getOrderstatistics(sellerID, 1));
    dispatch(getGraphOrders(sellerID, 1));

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
  }, [viewAllOrder && getOrderDetail === 'ViewAllScreen']);

  useEffect(() => {
    setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
    setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
  }, [openShippingOrders, viewAllOrder, getDeliveryData?.getReviewDef]);

  const isProductDetailLoading = useSelector((state) =>
    isLoadingSelector([ANALYTICSTYPES.GET_ORDER_DATA], state)
  );

  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.DELIVERING_ORDER, TYPES.GET_GRAPH_ORDERS], state)
  );

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  const isAcceptOrder = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.shippingTypeImage} />
      {isDeliveryOrder ? (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <View style={styles.shippingTypeDetails}>
          <Text style={styles.shippingTypeText}>{item?.delivery_type_title}</Text>
          <Text style={styles.totalTextStyle}>{item?.count}</Text>
        </View>
      )}
    </View>
  );

  const trackHandler = () => setTrackingView(true);

  const showBadge = (item) => {
    if (item?.title === 'Delivered') {
      return (
        <View
          style={[
            styles.bucketBadge,
            { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
          ]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
        </View>
      );
    } else if (item?.title === 'Rejected/Cancelled') {
      return (
        <View
          style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count ?? 0}</Text>
        </View>
      );
    } else if (item?.title === 'Returned') {
      return (
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
      );
    } else {
      return (
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
      );
    }
  };

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setOpenShippingOrders(item?.key);
        dispatch(getReviewDefault(item?.key, sellerID, 1));
      }}
      style={styles.firstIconStyle}
    >
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
        {showBadge(item)}
      </View>
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

  const renderOrderToReview = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setViewAllOrder(true);
        setSelectedProductId(item?.order_details[0]?.id);
        setUserDetail(item);
        setOrderDetail(item?.order_details);
        dispatch(getOrderData(item?.id));
        setOrderId(item?.id);
      }}
      style={[
        viewAllOrder ? styles.showAllOrdersView : styles.orderRowStyle,
        {
          backgroundColor:
            viewAllOrder && item?.id === userDetail?.id
              ? COLORS.textInputBackground
              : COLORS.transparent,
          borderColor:
            viewAllOrder && item?.id === userDetail?.id ? COLORS.primary : COLORS.blue_shade,
        },
      ]}
    >
      <View style={styles.orderDetailStyle}>
        <Text style={styles.nameTextStyle}>
          {item?.user_details?.firstname ? item?.user_details?.firstname : 'user name'}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={pin} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>{item?.distance ? item?.distance : '0'}</Text>
        </View>
      </View>

      <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
        <Text style={styles.nameTextStyle}>
          {item?.order_details?.length > 1
            ? item?.order_details?.length + ' Items'
            : item?.order_details?.length + ' Item'}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={pay} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {item?.payable_amount ? item?.payable_amount : '00'}
          </Text>
        </View>
      </View>

      <View style={[styles.orderDetailStyle, { width: SW(47) }]}>
        <Text style={styles.timeTextStyle}>
          {item?.invoice?.delivery_date ? item?.invoice?.delivery_date : ''}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={clock} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {' '}
            {item?.preffered_delivery_start_time ? item?.preffered_delivery_start_time : '00.00'}
            {'-'} {item?.preffered_delivery_end_time ? item?.preffered_delivery_end_time : '00.00'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setUserDetail(item);
          setOrderDetail(item?.order_details);
          setViewAllOrder(true);
        }}
        style={[styles.orderDetailStyle, { width: SH(24) }]}
      >
        <Image source={rightIcon} style={styles.rightIconStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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

  const changeValue = (index) => {
    setGraphData((prev) => {
      let list = [...prev];
      list[index].checked = !list[index].checked;
      return list;
    });
  };

  const renderGraphItem = ({ item, index }) => (
    <View style={styles.shippingDrawerView}>
      {item?.checked ? (
        <TouchableOpacity onPress={() => changeValue(index)}>
          <Image
            source={
              item?.title === 'In Coming Orders'
                ? incomingOrders
                : item?.title === 'Cancelled Orders'
                ? cancelledOrders
                : item?.title === 'Returned Orders'
                ? returnedOrders
                : checkedCheckboxSquare
            }
            style={styles.rightIconStyle}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => changeValue(index)}>
          <Image
            source={blankCheckBox}
            style={[
              styles.rightIconStyle,
              {
                tintColor:
                  item?.title === 'In Coming Orders'
                    ? COLORS.bluish_green
                    : item?.title === 'Cancelled Orders'
                    ? COLORS.pink
                    : item?.title === 'Returned Orders'
                    ? COLORS.yellowTweet
                    : COLORS.primary,
              },
            ]}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.varientTextStyle}>
        {item?.title === 'In Coming Orders'
          ? 'Incoming Orders'
          : item?.title === 'Cancelled Orders'
          ? 'Order Processing'
          : item?.title === 'Returned Orders'
          ? 'Ready For Pickup'
          : 'Completed'}
      </Text>
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
    const data = {
      orderId: id,
      status: parseInt(openShippingOrders) + 1,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, openShippingOrders, 1, (res) => {
        if (res?.msg) {
          dispatch(getReviewDefault(openShippingOrders, sellerID, 1));
          dispatch(orderStatusCount(sellerID));
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
      status: 7,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, () => {
        setViewAllOrder(false);
        dispatch(getReviewDefault(0, sellerID));
      })
    );
  };

  const checkedIndices = graphData
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => parseInt(checkbox.key) - 1);

  // Initialize an array to store the summed values
  const summedValues = Array(getDeliveryData?.graphOrders?.labels?.length).fill(0);

  // Sum the values from checked datasets for each day
  for (const index of checkedIndices) {
    const dataset = getDeliveryData?.graphOrders?.datasets?.[index].data;
    for (let i = 0; i < dataset?.length; i++) {
      summedValues[i] += dataset[i];
    }
  }

  // Transform the summed values into the desired format with labels
  const outputData = summedValues.map((value, index) => ({
    label: getDeliveryData?.graphOrders?.labels?.[index],
    value,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11, fontFamily: Fonts.Regular },
    spacing: Platform.OS == 'ios' ? 38 : 62,
    initialSpace: 0,
    frontColor:
      index === 0
        ? COLORS.bluish_green
        : index === 1
        ? COLORS.pink
        : index === 2
        ? COLORS.yellowTweet
        : COLORS.primary,
  }));

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
      case '6':
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

  const renderOrderDetailProducts = ({ item, index }) => (
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
          {item?.product_name ?? 'jgssjdgjsdhsdsdj'}
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

  return (
    <ScreenWrapper>
      {!trackingView ? (
        <>
          <View style={styles.container}>
            <Header {...{ viewAllOrder, setViewAllOrder, setIsBack }} />

            <Spacer space={SH(20)} />

            {viewAllOrder ? (
              <View style={styles.firstRowStyle}>
                {getDeliveryData?.getReviewDef?.length > 0 ? (
                  <>
                    <View style={[styles.orderToReviewView, { paddingBottom: ms(30) }]}>
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
                        oneOrderDetail,
                        changeMapState,
                      }}
                    />
                  </>
                ) : (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
                  </View>
                )}

                <RightSideBar
                  {...{
                    deliveryDrawer,
                    openShippingOrders,
                    isOpenSideBarDrawer,
                    renderShippingDrawer,
                    setOpenShippingOrders,
                    renderDrawer,
                    setIsOpenSideBarDrawer,
                  }}
                />
              </View>
            ) : (
              <View style={styles.firstRowStyle}>
                <View>
                  <TodayOrderStatus {...{ todayOrderStatusData }} />

                  <Spacer space={ms(10)} />

                  <CurrentStatus {...{ deliverytypes, renderItem }} />

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

                <View>
                  <Graph
                    {...{
                      graphData,
                      renderGraphItem,
                      isDeliveryOrder,
                      outputData,
                    }}
                  />

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
                    openShippingOrders,
                    renderShippingDrawer,
                    setOpenShippingOrders,
                    renderDrawer,
                  }}
                />
              </View>
            )}
          </View>

          {isAcceptOrder ? (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0, 0.3)',
              }}
            >
              <ActivityIndicator
                color={COLORS.primary}
                size={'small'}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
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
            <View
              style={{
                width: Dimensions.get('window').width / 3,
                marginTop: ms(10),
                backgroundColor: COLORS.white,
                borderRadius: 15,
                paddingBottom: 80,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.SemiBold,
                  fontSize: ms(12),
                  color: COLORS.dark_grey,
                  paddingTop: ms(15),
                  textAlign: 'center',
                }}
              >
                {userDetail?.user_details?.firstname ?? 'sdfsd'}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  color: COLORS.dark_grey,
                  paddingTop: ms(5),
                  textAlign: 'center',
                }}
              >
                {userDetail?.user_details?.current_address?.street_address +
                  ', ' +
                  userDetail?.user_details?.current_address?.city +
                  ', ' +
                  userDetail?.user_details?.current_address?.country +
                  ' ' +
                  userDetail?.user_details?.current_address?.zipcode ?? 'sdfsd'}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  color: COLORS.dark_grey,
                  paddingTop: ms(5),
                  textAlign: 'center',
                }}
              >
                {userDetail?.user_details?.phone_number ?? 'sdfsd'}
              </Text>
              <Spacer space={SH(40)} />
              <FlatList data={orderDetail} renderItem={renderOrderDetailProducts} />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={[
                    styles.subTotalView,
                    { backgroundColor: COLORS.white, width: Dimensions.get('window').width / 3 },
                  ]}
                >
                  <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
                    <Text style={styles.countTextStyle}>{strings.deliveryOrders.subTotal}</Text>
                    <Text
                      style={[
                        styles.totalTextStyle,
                        { paddingTop: 0, fontFamily: Fonts.MaisonBold },
                      ]}
                    >
                      {userDetail?.actual_amount
                        ? Number(userDetail?.actual_amount).toFixed(2)
                        : '0'}
                    </Text>
                  </View>

                  <View style={styles.orderDetailsView}>
                    <Text style={styles.countTextStyle}>{'Discount ( MIDApril100)'}</Text>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.totalTextStyle2}>{'$'}</Text>
                      <Text
                        style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}
                      >
                        {userDetail?.discount ? Number(userDetail?.discount).toFixed(2) : '0'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderDetailsView}>
                    <Text style={styles.countTextStyle}>{'Shipping Charges'}</Text>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.totalTextStyle2}>{'$'}</Text>
                      <Text
                        style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}
                      >
                        {'0.00'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.solidGrey,
                      borderStyle: 'dashed',
                      marginTop: ms(5),
                    }}
                  />
                  <View style={styles.orderDetailsView}>
                    <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
                    <View style={styles.flexDirectionRow}>
                      <Text
                        style={[
                          styles.totalTextStyle2,
                          {
                            fontFamily: Fonts.MaisonBold,
                            fontSize: SF(13),
                            color: COLORS.solid_grey,
                          },
                        ]}
                      >
                        {'$'}
                      </Text>
                      <Text style={[styles.totalText, { paddingTop: 0 }]}>
                        {Number(userDetail?.payable_amount).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <Spacer space={SH(15)} />
                </View>
              </View>

              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingLeft: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Regular,
                    fontSize: ms(9),
                    color: COLORS.dark_grey,
                  }}
                >
                  {'Payment Option: '}
                </Text>
                <Text
                  style={{ fontFamily: Fonts.SemiBold, fontSize: ms(9), color: COLORS.dark_grey }}
                >
                  {userDetail?.mode_of_payment?.toUpperCase()}
                </Text>
              </View>

              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  paddingTop: ms(5),
                  color: COLORS.dark_grey,
                }}
              >
                {moment(userDetail?.invoice?.delivery_date).format('llll')}
              </Text>

              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  paddingTop: ms(5),
                  color: COLORS.dark_grey,
                }}
              >
                {'Walk-In'}
              </Text>

              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  paddingTop: ms(5),
                  color: COLORS.dark_grey,
                }}
              >
                {`Invoice No. #${userDetail?.invoice?.invoice_id}`}
              </Text>

              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  paddingTop: ms(5),
                  color: COLORS.dark_grey,
                }}
              >
                {`POS No. #Front-CC01`}
              </Text>

              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: Fonts.Regular,
                  fontSize: ms(9),
                  paddingTop: ms(5),
                  color: COLORS.dark_grey,
                }}
              >
                {`User ID: ****128`}
              </Text>

              <Spacer space={SH(45)} />
              <Text
                style={{
                  fontFamily: Fonts.MaisonBold,
                  fontSize: ms(16),
                  textAlign: 'center',
                  color: COLORS.dark_grey,
                }}
              >
                {`Thank You`}
              </Text>

              <Spacer space={SH(15)} />
              <Image source={barcode} style={{ alignSelf: 'center', height: 50 }} />

              {/* <Spacer space={SH(5)} /> */}
              <Text
                style={{
                  fontFamily: Fonts.Bold,
                  fontSize: ms(16),
                  textAlign: 'center',
                  color: COLORS.primary,
                }}
              >
                {`JOBR`}
              </Text>
            </View>

            <View
              style={{
                width: Dimensions.get('window').width / 2.2,
                marginTop: ms(10),
                borderRadius: 15,
              }}
            >
              <MapView
                provider={PROVIDER_GOOGLE}
                showCompass
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0992,
                  longitudeDelta: 0.0421,
                }}
                initialRegion={{
                  latitude: latitude ?? 0.0,
                  longitude: longitude ?? 0.0,
                  latitudeDelta: 0.0992,
                  longitudeDelta: 0.0421,
                }}
                style={styles.detailMap}
              >
                <MapViewDirections
                  key={location?.latitude}
                  origin={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  destination={{
                    latitude: oneOrderDetail?.getOrderData?.coordinates?.[0],
                    longitude: oneOrderDetail?.getOrderData?.coordinates?.[1],
                  }}
                  apikey={GOOGLE_MAP.API_KEYS}
                  strokeWidth={6}
                  strokeColor={COLORS.primary}
                />
                <Marker coordinate={sourceCoordinate}>
                  <View>
                    <Image
                      source={scooter}
                      style={{ height: ms(30), width: ms(30), resizeMode: 'contain' }}
                    />
                  </View>
                </Marker>
                <Marker coordinate={destinationCoordinate}>
                  <View>
                    <Image
                      source={deliveryHomeIcon}
                      style={{ height: ms(30), width: ms(30), resizeMode: 'contain' }}
                    />
                  </View>
                </Marker>
              </MapView>
              <TouchableOpacity
                onPress={() => {
                  setTrackingView(false),
                    dispatch(getReviewDefault(openShippingOrders, sellerID, 1));
                }}
                style={[
                  styles.expandButtonStyle,
                  { borderColor: COLORS.dark_grey, borderWidth: 1, backgroundColor: COLORS.white },
                ]}
              >
                <Image source={crossButton} style={styles.rightIconStyle} />
                <Text
                  style={[
                    styles.acceptTextStyle,
                    { color: COLORS.dark_grey, paddingHorizontal: 12 },
                  ]}
                >
                  {'Close'}
                </Text>
              </TouchableOpacity>
              <ShipmentTracking props={{ status: oneOrderDetail?.getOrderData?.status }} />
            </View>
            <RightSideBar
              {...{
                deliveryDrawer,
                openShippingOrders,
                isOpenSideBarDrawer,
                renderShippingDrawer,
                setOpenShippingOrders,
                renderDrawer,
                setIsOpenSideBarDrawer,
              }}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}

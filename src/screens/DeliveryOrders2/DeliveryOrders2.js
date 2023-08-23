import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
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
  blankCheckBox,
  incomingOrders,
  cancelledOrders,
  task,
  timer,
  NoCard,
  returnedOrders,
  returnShipping,
  deliveryShipping,
  checkedCheckboxSquare,
  deliveryorderProducts,
  Fonts,
  deliveryDriver,
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
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import Header from './Components/Header';
import OrderDetail from './Components/OrderDetail';
import OrderReview from './Components/OrderReview';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { ScreenWrapper, Spacer } from '@/components';
import RightSideBar from './Components/RightSideBar';
import { graphOptions } from '@/constants/staticData';
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
import ReactNativeModal from 'react-native-modal';

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
    dispatch(todayOrders(sellerID));
    dispatch(deliOrder(sellerID));
    dispatch(getOrderCount(sellerID));
    dispatch(getReviewDefault(0, sellerID, 1));
    dispatch(getOrderstatistics(sellerID, 1));
    dispatch(getGraphOrders(sellerID, 1));
    dispatch(getSellerDriverList(sellerID));

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

  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.DELIVERING_ORDER, TYPES.GET_GRAPH_ORDERS], state)
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
        dispatch(getReviewDefault(item?.key, sellerID, 1));
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
          dispatch(getReviewDefault(openShippingOrders, sellerID, 1));
          dispatch(orderStatusCount(sellerID));
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

  const renderOrderDetailProducts = ({ item, index }) => {
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
    dispatch(getReviewDefault(openShippingOrders, sellerID, 1));
    dispatch(getOrderCount(sellerID));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderDriverItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.textInputBackground,
          marginHorizontal: 20,
          borderRadius: 15,
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: item?.user_profiles?.profile_photo }}
            style={styles.driverProfileStyle}
          />

          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={styles.totalText}
            >{`${item?.user_profiles?.firstname} ${item?.user_profiles?.lastname}`}</Text>
            <Text style={[styles.viewallTextStyle, { color: COLORS.darkGray, paddingTop: 4 }]}>
              {`${item?.user_profiles?.current_address?.street_address}, ${item?.user_profiles?.current_address?.city}, ${item?.user_profiles?.current_address?.state}, ${item?.user_profiles?.current_address?.country}, ${item?.user_profiles?.current_address?.zipcode}`}
            </Text>

            <Text
              style={[styles.viewallTextStyle, { color: COLORS.darkGray, paddingTop: 4 }]}
            >{`${item?.user_profiles?.full_phone_number}`}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: ms(90),
            borderRadius: 5,
            alignItems: 'center',
            backgroundColor: COLORS.primary,
            height: ms(30),
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={[styles.viewallTextStyle, { fontFamily: Fonts.SemiBold, color: COLORS.white }]}
          >
            {'Assign'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
                        oneOrderDetail,
                        changeMapState,
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

      {/* {isEnableDriverList ? (
        <ReactNativeModal
          animationIn={'slideInUp'}
          isVisible={isEnableDriverList}
          style={styles.driverModalStyle}
          onBackdropPress={() => setIsEnableDriverList(false)}
        >
          <FlatList
            data={getDeliveryData?.getSellerDriverList}
            renderItem={renderDriverItem}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}
              >
                <View />

                <Text style={styles.driverListHeadingText}>
                  {strings.deliveryOrders2.selectDriver}
                </Text>

                <TouchableOpacity onPress={() => setIsEnableDriverList(false)}>
                  <Text
                    style={[
                      styles.driverListHeadingText,
                      { fontSize: SF(18), fontFamily: Fonts.SemiBold, color: COLORS.primary },
                    ]}
                  >
                    {'Skip'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </ReactNativeModal>
      ) : null} */}
    </ScreenWrapper>
  );
}

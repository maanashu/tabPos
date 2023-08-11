import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

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
  removeProduct,
  returnedOrders,
  deliveryParcel,
  returnShipping,
  deliveryShipping,
  checkedCheckboxSquare,
  deliveryorderProducts,
  storeTracker,
  backArrow,
  deliveryHomeIcon,
  Fonts,
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
import { COLORS, SH, SW } from '@/theme';
import Header from './Components/Header';
import OrderDetail from './Components/OrderDetail';
import OrderReview from './Components/OrderReview';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { TYPES as ANALYTICSTYPES } from '@/Types/AnalyticsTypes';

import { ScreenWrapper, Spacer } from '@/components';
import RightSideBar from './Components/RightSideBar';
import { getAuthData } from '@/selectors/AuthSelector';
import CurrentStatus from './Components/CurrentStatus';
import { getDelivery } from '@/selectors/DeliverySelector';
import OrderConvertion from './Components/OrderConvertion';
import TodayOrderStatus from './Components/TodayOrderStatus';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { graphOptions, labels } from '@/constants/staticData';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { getOrderData } from '@/actions/AnalyticsAction';
import ShipmentTracking from './Components/ShipmentTracking';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import MapViewDirections from 'react-native-maps-directions';

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
  const isProductDetailLoading = useSelector((state) =>
    isLoadingSelector([ANALYTICSTYPES.GET_ORDER_DATA], state)
  );

  const widthAndHeight = 140;
  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
    pieChartData?.[3]?.count ?? 0,
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

  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet, COLORS.lightGreen];

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
  console.log('stst', oneOrderDetail?.getOrderData?.status);
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
      image: deliveryParcel,
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
  }, [viewAllOrders && getOrderDetail === 'ViewAllScreen']);

  useEffect(() => {
    setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
    setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
  }, [openShippingOrders, viewAllOrders, getDeliveryData?.getReviewDef]);

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
  const trackHandler = () => {
    // alert('track order');
    setTrackingView(true);
    // <ShipmentTracking />;
  };

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
              backgroundColor: COLORS.solidGrey,
              borderColor: COLORS.dark_grey,
              borderWidth: 2,
            },
          ]}
        >
          <Text style={styles.badgetext}>{item?.count ?? 0}</Text>
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
      style={[
        styles.firstIconStyle,
        {
          backgroundColor: openShippingOrders === item?.key ? COLORS.solidGrey : COLORS.transparent,
          marginVertical: 6,
          width: SW(15),
          height: SW(15),
          borderRadius: 5,
          justifyContent: 'center',
        },
      ]}
    >
      <View style={styles.bucketBackgorund}>
        <Image source={item?.image} style={styles.sideBarImage} />
        {showBadge(item)}
      </View>
    </TouchableOpacity>
  );

  const renderShippingDrawer = ({ item }) => {
    return (
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
  };
  const renderOrderToReview = ({ item, index }) => (
    <>
      {
        <TouchableOpacity
          onPress={() => {
            setViewAllOrders(true);
            setSelectedProductId(item?.order_details[0]?.id);
            setUserDetail(item);
            setOrderDetail(item?.order_details);
            dispatch(getOrderData(item?.id));
            setViewAllOrders(true);
          }}
          style={[
            viewAllOrders ? styles.showAllOrdersView : styles.orderRowStyle,
            {
              backgroundColor:
                viewAllOrders && item?.id === userDetail?.id
                  ? COLORS.textInputBackground
                  : COLORS.transparent,
              borderColor:
                viewAllOrders && item?.id === userDetail?.id ? COLORS.primary : COLORS.blue_shade,
            },
          ]}
          // style={
          //   viewAllOrders
          //     ? [
          //         styles.showAllOrdersView,
          //         {
          //           borderColor:
          //             selectedProductId == item?.order_details[0]?.id
          //               ? COLORS.blueLight
          //               : COLORS.blue_shade,
          //         },
          //       ]
          //     : styles.orderRowStyle
          // }
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

          <View style={[styles.orderDetailStyle, { width: SW(50) }]}>
            <Text style={styles.timeTextStyle}>
              {item?.delivery_details?.title ? item?.delivery_details?.title : ''}
            </Text>
            <View style={styles.locationViewStyle}>
              <Image source={clock} style={styles.pinImageStyle} />
              <Text style={styles.distanceTextStyle}>
                {' '}
                {item?.preffered_delivery_start_time
                  ? item?.preffered_delivery_start_time
                  : '00.00'}
                {'-'}{' '}
                {item?.preffered_delivery_end_time ? item?.preffered_delivery_end_time : '00.00'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setUserDetail(item);
              setOrderDetail(item?.order_details);
              setViewAllOrders(true);
            }}
            style={[styles.orderDetailStyle, { width: SH(24) }]}
          >
            <Image source={rightIcon} style={styles.rightIconStyle} />
          </TouchableOpacity>
        </TouchableOpacity>
      }
    </>
  );

  const headerComponent = () => (
    <View style={styles.headingRowStyle}>
      <Text style={styles.ordersToReviewText}>
        {openShippingOrders == '0'
          ? strings.shipingOrder.orderOfReview
          : openShippingOrders == '1'
          ? 'Accept Orders'
          : openShippingOrders == '2'
          ? 'Order Preparing'
          : openShippingOrders == '3'
          ? 'Ready To Pickup'
          : openShippingOrders == '4'
          ? 'Picked Up orders'
          : openShippingOrders == '5'
          ? 'Delivered'
          : openShippingOrders == '6'
          ? 'Rejected/Cancelled'
          : 'Returned'}
      </Text>

      {getDeliveryData?.getReviewDef?.length > 0 ? (
        <TouchableOpacity onPress={() => setViewAllOrders(true)} style={styles.viewAllButtonStyle}>
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

  const renderGraphItem = ({ item, index }) => {
    return (
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
  };

  const renderOrderProducts = ({ item }) => {
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image source={{ uri: item?.product_image }} style={styles.userImageStyle} />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text style={styles.nameTextStyle}>{item?.product_name}</Text>
            <Text style={styles.varientTextStyle}>{'Box'}</Text>
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.price}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.qty}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.price}</Text>
        <Image
          source={removeProduct}
          style={[styles.removeProductImageStyle, { marginRight: 10 }]}
        />
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
      acceptOrder(data, (res) => {
        if (res?.msg) {
          setViewAllOrders(false);
          dispatch(getReviewDefault(parseInt(openShippingOrders), sellerID));
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
      acceptOrder(data, (res) => {
        if (res?.msg === 'Order status updated successfully!') {
          alert('Order declined successfully');
          setViewAllOrders(false);
          dispatch(getReviewDefault(0, sellerID));
        }
      })
    );
  };

  const graphElements = () => {
    if (
      graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
        ],
      };
    } else if (
      !graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
        ],
      };
    } else if (
      !graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
        ],
      };
    } else if (
      !graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      !graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      !graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      !graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else if (
      graphData?.[0]?.checked &&
      graphData?.[1]?.checked &&
      graphData?.[2]?.checked &&
      graphData?.[3]?.checked &&
      Object.keys(getDeliveryData?.graphOrders).length > 0
    ) {
      return {
        labels: getDeliveryData?.graphOrders?.labels,
        datasets: [
          {
            data: getDeliveryData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getDeliveryData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(39, 90, 255, ${2})`,
          },
        ],
      };
    } else {
      return {
        labels: labels,
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      };
    }
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

  return (
    <ScreenWrapper>
      {!trackingView ? (
        <>
          <View style={styles.container}>
            <Header {...{ viewAllOrders, setViewAllOrders, setIsBack }} />

            <Spacer space={SH(20)} />

            {viewAllOrders ? (
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
                              {openShippingOrders == '0'
                                ? strings.shipingOrder.orderOfReview
                                : openShippingOrders == '1'
                                ? 'Accept Orders'
                                : openShippingOrders == '2'
                                ? 'Order Preparing'
                                : openShippingOrders == '3'
                                ? 'Ready To Pickup'
                                : openShippingOrders == '4'
                                ? 'Picked Up orders'
                                : openShippingOrders == '5'
                                ? 'Delivered'
                                : openShippingOrders == '6'
                                ? 'Rejected/Cancelled'
                                : 'Returned'}
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
        <>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                setViewAllOrders(true);
                setTrackingView(false);
              }}
              style={styles.backButtonView}
            >
              <View style={styles.rowView}>
                <Image source={backArrow} resizeMode="contain" style={styles.backIconStyle} />
                <Text style={styles.backTextStyle}>{'Back'}</Text>
              </View>
            </TouchableOpacity>
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
              style={styles.map}
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
                    source={storeTracker}
                    style={{ height: ms(50), width: ms(50) }}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
              <Marker coordinate={destinationCoordinate}>
                <View>
                  <Image
                    source={deliveryHomeIcon}
                    style={{ height: ms(50), width: ms(50) }}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            </MapView>
            <ShipmentTracking props={{ status: oneOrderDetail?.getOrderData?.status, data: '' }} />
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}

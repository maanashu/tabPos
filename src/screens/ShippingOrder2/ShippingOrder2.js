import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';

import {
  pay,
  pin,
  Cart,
  task,
  clock,
  timer,
  NoCard,
  Delivery,
  rightIcon,
  ReturnTruck,
  blankCheckBox,
  returnedOrders,
  incomingOrders,
  cancelledOrders,
  drawerdeliveryTruck,
  checkedCheckboxSquare,
} from '@/assets';
import {
  orderStatusCount,
  todayCurrentStatus,
  todayShippingStatus,
} from '@/actions/ShippingAction';
import {
  acceptOrder,
  getGraphOrders,
  getReviewDefault,
  getOrderstatistics,
} from '@/actions/DeliveryAction';
import Header from './Components/Header';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import OrderDetail from './Components/OrderDetail';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { ScreenWrapper, Spacer } from '@/components';
import { getAuthData } from '@/selectors/AuthSelector';
import OrderConversion from './Components/OrderConversion';
import { getShipping } from '@/selectors/ShippingSelector';
import { getDelivery } from '@/selectors/DeliverySelector';
import { labels, graphOptions } from '@/constants/staticData';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import TodayShippingStatus from './Components/TodayShippingStatus';
import CurrentShippingStatus from './Components/CurrentShippingStatus';

import styles from './ShippingOrder2.styles';
import RightDrawer from './Components/RightDrawer';
import Orders from './Components/Orders';
import Graph from './Components/Graph';
import { getOrderData } from '@/actions/AnalyticsAction';
import { getAnalytics } from '@/selectors/AnalyticsSelector';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export function ShippingOrder2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const todayStatus = useSelector(getShipping);
  const oneOrderDetail = useSelector(getAnalytics);
  const getGraphOrderData = useSelector(getDelivery);
  const ordersList = getGraphOrderData?.getReviewDef;
  const pieChartData = getGraphOrderData?.getOrderstatistics?.data;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const orderStatusCountData = todayStatus?.orderStatus;

  const widthAndHeight = 140;
  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
    pieChartData?.[3]?.count ?? 0,
  ];

  let sum = 0;
  series.forEach((num) => {
    sum += num;
  });

  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet, COLORS.lightGreen];

  const [graphData, setGraphData] = useState(graphOptions);
  const [userDetail, setUserDetail] = useState(ordersList?.[0] ?? []);
  const [orderDetail, setOrderDetail] = useState(ordersList?.[0]?.order_details ?? []);
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState('0');
  const [getOrderDetail, setGetOrderDetail] = useState('');
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id);

  const statusCount = [
    {
      key: '0',
      image: task,
      title: 'Orders to Review',
      count: orderStatusCountData?.[0]?.count,
    },
    {
      key: '1',
      image: drawerdeliveryTruck,
      title: 'Accepted',
      count: orderStatusCountData?.[1]?.count,
    },
    {
      key: '2',
      image: timer,
      title: 'Order Preparing ',
      count: orderStatusCountData?.[2]?.count,
    },
    {
      key: '3',
      image: Delivery,
      title: 'Shipped',
      count: orderStatusCountData?.[3]?.count,
    },
    {
      key: '5',
      image: Cart,
      title: 'Delivered',
      count: orderStatusCountData?.[4]?.count,
    },
    {
      key: '7,8',
      image: NoCard,
      title: 'Rejected/ Cancelled',
      count: orderStatusCountData?.[5]?.count,
    },
    {
      key: '9',
      image: ReturnTruck,
      title: 'Returned',
      count: orderStatusCountData?.[6]?.count,
    },
  ];

  useEffect(() => {
    dispatch(todayShippingStatus(sellerID));
    dispatch(todayCurrentStatus(sellerID));
    dispatch(getReviewDefault(0, sellerID, 4));
    dispatch(getGraphOrders(sellerID, 4));
    dispatch(getOrderstatistics(sellerID, 4));
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
    // dispatch(getReviewDefault(openShippingOrders, sellerID, 4));
  }, [openShippingOrders, viewAllOrders, getGraphOrderData?.getReviewDef]);

  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state)
  );

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  const isAcceptOrder = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={{ uri: item?.shipping_image }} style={styles.shippingTypeImage} />

      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.shiping_name.toUpperCase()}</Text>
        <Text style={styles.totalTextStyle}>{item?.count}</Text>
      </View>
    </View>
  );

  const showBadge = (item) => {
    if (item?.image === Cart) {
      return (
        <View
          style={[
            styles.bucketBadge,
            { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
          ]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
        </View>
      );
    } else if (item?.image === NoCard) {
      return (
        <View
          style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
        </View>
      );
    } else if (item?.image === ReturnTruck) {
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
          <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
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
          <Text style={styles.badgetext}>{item?.count}</Text>
        </View>
      );
    }
  };

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.drawerIconView,
        {
          backgroundColor: openShippingOrders === item?.key ? COLORS.solidGrey : COLORS.transparent,
        },
      ]}
      onPress={() => setOpenShippingOrders(item?.key)}
    >
      <View style={styles.bucketBackgorund}>
        <Image source={item.image} style={styles.sideBarImage} />
        {showBadge(item)}
      </View>
    </TouchableOpacity>
  );

  const renderOrderToReview = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setViewAllOrders(true);
        setUserDetail(item);
        setOrderDetail(item?.order_details);
        dispatch(getOrderData(item?.id));
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
    >
      <View style={styles.orderDetailStyle}>
        <Text style={styles.nameTextStyle}>
          {item?.user_details?.firstname ? item?.user_details?.firstname : 'user name'}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={pin} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {item?.distance ? item?.distance : '{item?.count}'}
          </Text>
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
        <Text style={styles.timeTextStyle}>{item?.delivery_details?.title}</Text>
        <View style={styles.locationViewStyle}>
          <Image source={clock} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {' '}
            {item?.preffered_delivery_start_time ? item?.preffered_delivery_start_time : '00.00'}
            {'-'} {item?.preffered_delivery_end_time ? item?.preffered_delivery_end_time : '00.00'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
        <Image source={rightIcon} style={styles.rightIconStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAllOrdersToReview = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setViewAllOrders(true);
        setUserDetail(item);
        setOrderDetail(item?.order_details);
        setGetOrderDetail('MainScreen');
        dispatch(getOrderData(item?.id));
        setOrderId(item?.id);
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
    >
      <View style={styles.orderDetailStyle}>
        <Text style={styles.nameTextStyle}>
          {item?.user_details?.firstname ? item?.user_details?.firstname : 'user name'}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={pin} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {item?.distance ? item?.distance : '{item?.count}'}
          </Text>
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
        <Text style={styles.timeTextStyle}>{item?.delivery_details?.title}</Text>
        <View style={styles.locationViewStyle}>
          <Image source={clock} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {' '}
            {item?.preffered_delivery_start_time ? item?.preffered_delivery_start_time : '00.00'}
            {'-'} {item?.preffered_delivery_end_time ? item?.preffered_delivery_end_time : '00.00'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
        <Image source={rightIcon} style={styles.rightIconStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
    </View>
  );

  const renderOrderProducts = ({ item }) => (
    <View style={styles.orderproductView}>
      <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
        <Image source={item?.image} style={styles.userImageStyle} />

        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.nameTextStyle}>{item?.name}</Text>
          <Text style={styles.varientTextStyle}>{item?.colorandsize}</Text>
        </View>
      </View>

      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.price}</Text>

      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.quantity}</Text>

      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.totalprice}</Text>

      {/* <Image source={removeProduct} style={[styles.removeProductImageStyle, { marginRight: 10 }]} /> */}
    </View>
  );

  const graphElements = () => {
    if (
      graphData?.[0]?.checked &&
      !graphData?.[1]?.checked &&
      !graphData?.[2]?.checked &&
      !graphData?.[3]?.checked &&
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[2]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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
      Object.keys(getGraphOrderData?.graphOrders).length > 0
    ) {
      return {
        labels: getGraphOrderData?.graphOrders?.labels,
        datasets: [
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[0]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(31, 179, 255,${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[1]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(251, 70, 108, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
            strokeWidth: 5,
            color: (opacity = 1) => `rgba(252, 186, 48, ${2})`,
          },
          {
            data: getGraphOrderData?.graphOrders?.datasets?.[3]?.data,
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

  const acceptHandler = (id, status) => {
    const data = {
      orderId: id,
      status: status,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, openShippingOrders, 4, (res) => {
        if (res?.msg === 'Order status updated successfully!') {
          alert('Order accepted successfully');
          dispatch(getReviewDefault(openShippingOrders, sellerID, 4));
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
      acceptOrder(data, (res) => {
        if (res?.msg === 'Order status updated successfully!') {
          alert('Order declined successfully');
          setViewAllOrders(false);
          dispatch(getReviewDefault(0, sellerID, 4));
        }
      })
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header {...{ viewAllOrders, setViewAllOrders }} />

        <Spacer space={SH(20)} />

        {viewAllOrders ? (
          <View style={styles.firstRowStyle}>
            {ordersList?.length > 0 ? (
              <OrderDetail
                {...{
                  renderAllOrdersToReview,
                  ordersList,
                  openShippingOrders,
                  userDetail,
                  orderDetail,
                  renderOrderProducts,
                  declineHandler,
                  acceptHandler,
                }}
              />
            ) : (
              <View style={styles.noOrderView}>
                <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
              </View>
            )}

            <RightDrawer {...{ height, statusCount, renderDrawer }} />
          </View>
        ) : (
          <View style={styles.firstRowStyle}>
            <View>
              <TodayShippingStatus {...{ todayStatus }} />

              <Spacer space={ms(10)} />

              <CurrentShippingStatus {...{ todayStatus, renderItem }} />

              <Spacer space={ms(10)} />

              <OrderConversion
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
                  graphElements,
                  width,
                }}
              />

              <Spacer space={SH(15)} />

              <>
                {isOrderLoading ? (
                  <View style={styles.orderLoader}>
                    <ActivityIndicator size={'small'} color={COLORS.primary} />
                  </View>
                ) : (
                  <Orders
                    {...{
                      height,
                      openShippingOrders,
                      ordersList,
                      setViewAllOrders,
                      setGetOrderDetail,
                      renderOrderToReview,
                      emptyComponent,
                    }}
                  />
                )}
              </>
            </View>

            <RightDrawer {...{ height, statusCount, renderDrawer }} />
          </View>
        )}
      </View>

      {isAcceptOrder ? (
        <View
          style={[
            styles.loader,
            {
              backgroundColor: 'rgba(0,0,0, 0.3)',
            },
          ]}
        >
          <ActivityIndicator color={COLORS.primary} size={'small'} style={styles.loader} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}

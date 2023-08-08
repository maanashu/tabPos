import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';

import PieChart from 'react-native-pie-chart';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeModal from 'react-native-modal';
import { LineChart } from 'react-native-chart-kit';

import {
  pay,
  pin,
  Cart,
  NoCard,
  rightIcon,
  watchLogo,
  firstTruck,
  ReturnTruck,
  flipTruck,
  backArrow2,
  Fonts,
  scooter,
  profileImage,
  removeProduct,
  blankCheckBox,
  incomingOrders,
  cancelledOrders,
  returnedOrders,
  checkedCheckboxSquare,
  clock,
  userImage,
  task,
  drawerdeliveryTruck,
  timer,
  Group,
  Delivery,
} from '@/assets';
import {
  orderToReview,
  rightSideDrawer,
  shippingDrawer,
  legends,
  labels,
  graphOptions,
} from '@/constants/staticData';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { ScreenWrapper, Spacer } from '@/components';
import {
  acceptOrder,
  getGraphOrders,
  getOrderstatistics,
  getReviewDefault,
} from '@/actions/DeliveryAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getShipping } from '@/selectors/ShippingSelector';
import {
  orderStatusCount,
  todayCurrentStatus,
  todayShippingStatus,
} from '@/actions/ShippingAction';

import styles from './ShippingOrder2.styles';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import TodayShippingStatus from './Components/TodayShippingStatus';
import CurrentShippingStatus from './Components/CurrentShippingStatus';
import OrderConversion from './Components/OrderConversion';
import Header from './Components/Header';
import moment from 'moment';

export function ShippingOrder2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const todayStatus = useSelector(getShipping);
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
  const [openShippingOrders, setOpenShippingOrders] = useState(0);

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
    // {
    //   key: '3',
    //   image: Group,
    //   title: 'Printing Label',
    //   count: orderStatusCountData?.[3]?.count,
    // },
    {
      key: '4',
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
      key: '7',
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
    setUserDetail(ordersList?.[0] ?? []);
    setOrderDetail(ordersList?.[0]?.order_details ?? []);
  }, [viewAllOrders]);

  useEffect(() => {
    dispatch(getReviewDefault(openShippingOrders, sellerID, 4));
  }, [openShippingOrders]);

  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state)
  );

  const isOrderLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  const renderItem = ({ item, index }) => (
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

  const renderDrawer = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.drawerIconView,
        {
          backgroundColor: openShippingOrders === item?.key ? COLORS.lineGrey : COLORS.transparent,
          marginVertical: 6,
          width: SW(15),
          height: SW(15),
          borderRadius: 5,
          justifyContent: 'center',
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

  const renderShippingDrawer = ({ item, index }) => (
    <View style={styles.shippingDrawerView}>
      <Image source={item.image} style={styles.sideBarImage} />
      <View style={{ paddingLeft: 15, justifyContent: 'center' }}>
        <Text style={styles.shippingDrawerCountText}>{item?.count}</Text>
        <Text style={styles.shippingDrawerTitleText}>{item?.title}</Text>
      </View>
    </View>
  );

  const renderOrderToReview = ({ item }) => (
    <>
      {
        <TouchableOpacity
          onPress={() => {
            setUserDetail(item);
            setOrderDetail(item?.order_details);
          }}
          style={viewAllOrders ? styles.showAllOrdersView : styles.orderRowStyle}
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
                {item?.preffered_delivery_start_time
                  ? item?.preffered_delivery_start_time
                  : '00.00'}
                {'-'}{' '}
                {item?.preffered_delivery_end_time ? item?.preffered_delivery_end_time : '00.00'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
            <Image source={rightIcon} style={styles.rightIconStyle} />
          </TouchableOpacity>
        </TouchableOpacity>
      }
    </>
  );

  // const headerComponent = () => (
  //   <View style={styles.headingRowStyle}>
  //     <Text style={styles.ordersToReviewText}>
  //       {openShippingOrders == 0
  //         ? strings.shipingOrder.orderOfReview
  //         : openShippingOrders == 1
  //         ? 'Accept Orders'
  //         : openShippingOrders == 2
  //         ? 'Order Preparing'
  //         : openShippingOrders == 3
  //         ? 'Ready To Pickup'
  //         : openShippingOrders == 4
  //         ? 'Picked Up orders'
  //         : openShippingOrders == 5
  //         ? 'Delivered'
  //         : openShippingOrders == 6
  //         ? 'Rejected/Cancelled'
  //         : openShippingOrders == 7
  //         ? 'Returned'
  //         : 'Orders'}
  //     </Text>

  //     {getDeliveryData?.getReviewDef?.length > 0 ? (
  //       <TouchableOpacity onPress={() => setViewAllOrders(true)} style={styles.viewAllButtonStyle}>
  //         <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
  //       </TouchableOpacity>
  //     ) : (
  //       <View />
  //     )}
  //   </View>
  // );

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
    </View>
  );

  const renderOrderProducts = ({ item, index }) => (
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

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  const acceptHandler = (id) => {
    const data = {
      orderId: id,
      status: 1,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, (res) => {
        if (res?.msg === 'Order status updated successfully!') {
          alert('Order accepted successfully');
          setViewAllOrders(false);
          dispatch(getReviewDefault(0, sellerID));
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

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header {...{ viewAllOrders, setViewAllOrders }} />

        <Spacer space={SH(20)} />

        {viewAllOrders ? (
          <View style={styles.firstRowStyle}>
            {ordersList?.length > 0 ? (
              <>
                <View style={styles.orderToReviewView}>
                  <FlatList
                    renderItem={renderOrderToReview}
                    showsVerticalScrollIndicator={false}
                    data={ordersList ?? []}
                    ListHeaderComponent={() => (
                      <View style={styles.headingRowStyle}>
                        <Text style={styles.ordersToReviewText}>
                          {/* {openShippingOrders == 0
                            ?  */}
                          {strings.shipingOrder.orderOfReview}
                          {/* : openShippingOrders == 1
                            ? 'Accept Orders'
                            : openShippingOrders == 2
                            ? 'Order Preparing'
                            : openShippingOrders == 3
                            ? 'Ready To Pickup'
                            : openShippingOrders == 4
                            ? 'Picked Up orders'
                            : openShippingOrders == 5
                            ? 'Delivered'
                            : openShippingOrders == 6
                            ? 'Rejected/Cancelled'
                            : openShippingOrders == 7
                            ? 'Returned'
                            : 'Orders'} */}
                        </Text>
                      </View>
                    )}
                    contentContainerStyle={styles.contentContainerStyle}
                  />
                </View>

                <View style={styles.orderDetailView}>
                  <View style={styles.orderDetailViewStyle}>
                    <View style={[styles.locationViewStyle, { width: ms(140) }]}>
                      <Image
                        source={
                          userDetail?.user_details?.profile_photo
                            ? { uri: userDetail?.user_details?.profile_photo }
                            : userImage
                        }
                        style={styles.userImageStyle}
                      />

                      <View style={styles.userNameView}>
                        <Text style={[styles.totalTextStyle, { padding: 0 }]}>
                          {userDetail?.user_details?.firstname
                            ? userDetail?.user_details?.firstname
                            : 'user name'}
                        </Text>
                        <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
                          {userDetail?.address}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.locationViewStyle,
                        { width: ms(120), right: Platform.OS === 'ios' ? 20 : 15 },
                      ]}
                    >
                      <Image source={scooter} style={styles.scooterImageStyle} />

                      <View style={[styles.userNameView, { paddingLeft: 5 }]}>
                        <Text
                          style={{
                            fontFamily: Fonts.Bold,
                            fontSize: SF(14),
                            color: COLORS.primary,
                          }}
                        >
                          {userDetail?.delivery_details?.title ?? 'ghfgh'}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Fonts.Medium,
                            fontSize: SF(11),
                            color: COLORS.dark_grey,
                          }}
                        >
                          {userDetail?.preffered_delivery_start_time
                            ? userDetail?.preffered_delivery_start_time
                            : '00.00'}
                          {'-'}{' '}
                          {userDetail?.preffered_delivery_end_time
                            ? userDetail?.preffered_delivery_end_time
                            : '00.00'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ height: ms(300) }}>
                    <FlatList
                      scrollEnabled
                      data={orderDetail}
                      renderItem={renderOrderProducts}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
                    />
                  </View>

                  <View style={styles.orderandPriceView}>
                    <View style={{ paddingLeft: 15 }}>
                      <View>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.shippingOrder.totalItem}
                        </Text>
                        <Text style={styles.itemCountText}>{userDetail?.total_items}</Text>
                      </View>

                      <Spacer space={SH(15)} />
                      <View>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.shippingOrder.orderDate}
                        </Text>
                        <Text style={styles.itemCountText}>
                          {moment(userDetail?.date).format('DD/MM/YYYY')}
                        </Text>
                      </View>

                      <Spacer space={SH(15)} />
                      <View>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.shippingOrder.orderId}
                        </Text>
                        <Text style={styles.itemCountText}>{userDetail?.id}</Text>
                      </View>
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                      <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
                        <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
                          {strings.deliveryOrders.subTotal}
                        </Text>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {userDetail?.actual_amount ? userDetail?.actual_amount : '0'}
                        </Text>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {userDetail?.discount ? userDetail?.discount : '0'}
                        </Text>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {strings.deliveryOrders.subTotalValue}
                        </Text>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
                        <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                          {userDetail?.tax ? userDetail?.tax : '0'}
                        </Text>
                      </View>

                      <View style={styles.orderDetailsView}>
                        <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
                        <Text style={styles.totalText}>{'$' + userDetail?.payable_amount}</Text>
                      </View>

                      <Spacer space={ms(10)} />
                      {openShippingOrders == 0 ||
                      openShippingOrders == 1 ||
                      openShippingOrders == 2 ? (
                        <View style={styles.shippingOrdersViewStyle}>
                          <TouchableOpacity
                            onPress={() => declineHandler(userDetail?.id)}
                            style={styles.declineButtonStyle}
                          >
                            <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => acceptHandler(userDetail?.id)}
                            style={styles.acceptButtonView}
                          >
                            <Text style={styles.acceptTextStyle}>
                              {strings.deliveryOrders.accept}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
              </View>
            )}

            {/* {openShippingOrders ? (
              <>
                <ReactNativeModal
                  animationIn={'slideInRight'}
                  animationOut={'slideOutRight'}
                  style={styles.modalStyle}
                  isVisible={isOpenSideBarDrawer}
                >
                  <View style={styles.shippingOrderViewStyle}>
                    <FlatList
                      data={shippingDrawer}
                      renderItem={renderShippingDrawer}
                      ListHeaderComponent={() => (
                        <View style={styles.shippingOrderHeader}>
                          <Text style={styles.shippingOrderHeading}>
                            {strings.deliveryOrders.shippingOrder}
                          </Text>

                          <View style={styles.rightSideView}>
                            <TouchableOpacity
                              style={styles.firstIconStyle}
                              onPress={() => setOpenShippingOrders(!openShippingOrders)}
                            >
                              <Image source={flipTruck} style={styles.sideBarImage} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                      keyExtractor={(item, index) => item.key.toString()}
                    />
                  </View>
                </ReactNativeModal>

                <View style={{ width: 90 }} />
              </>
            ) : ( */}
            <View style={styles.rightSideView}>
              <FlatList
                data={statusCount}
                renderItem={renderDrawer}
                ListHeaderComponent={() => (
                  <View
                    // onPress={() => {
                    //   setOpenShippingOrders(!openShippingOrders);
                    //   setIsOpenSideBarDrawer(true);
                    // }}
                    style={styles.firstIconStyle}
                  >
                    <Image source={firstTruck} style={styles.sideBarImage} />
                  </View>
                )}
                keyExtractor={(item, index) => item.key.toString()}
              />
            </View>
            {/* )} */}
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
              <View style={styles.graphViewStyle}>
                <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

                <FlatList
                  horizontal
                  data={graphData}
                  scrollEnabled={false}
                  renderItem={renderGraphItem}
                  showsHorizontalScrollIndicator={false}
                />

                {isDeliveryOrder ? (
                  <View
                    style={{
                      height: ms(185),
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ActivityIndicator size={'small'} color={COLORS.primary} />
                  </View>
                ) : (
                  <LineChart
                    bezier
                    fromZero
                    height={ms(185)}
                    segments={10}
                    withDots={false}
                    withShadow={false}
                    data={graphElements()}
                    width={Dimensions.get('window').width * 0.5}
                    chartConfig={{
                      decimalPlaces: 0,
                      backgroundColor: COLORS.black,
                      backgroundGradientFrom: COLORS.white,
                      backgroundGradientTo: COLORS.white,
                      propsForLabels: styles.shippingDrawerTitleText,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(60, 68, 77, ${opacity})`,
                    }}
                  />
                )}
              </View>

              <Spacer space={SH(15)} />

              <>
                {isOrderLoading ? (
                  <View
                    style={{
                      height: Dimensions.get('window').height / 2.35,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}
                  >
                    <ActivityIndicator size={'small'} color={COLORS.primary} />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.orderToReviewView,
                      { height: Dimensions.get('window').height / 2.35, paddingBottom: ms(10) },
                    ]}
                  >
                    <View style={styles.headingRowStyle}>
                      <Text style={styles.ordersToReviewText}>
                        {strings.shipingOrder.orderOfReview}
                      </Text>

                      {ordersList?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => setViewAllOrders(true)}
                          style={styles.viewAllButtonStyle}
                        >
                          <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    <FlatList
                      data={ordersList?.slice(0, 4)}
                      renderItem={renderOrderToReview}
                      ListEmptyComponent={emptyComponent}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.contentContainerStyle}
                      scrollEnabled={ordersList?.length > 0 ? true : false}
                    />
                  </View>
                )}
              </>
            </View>

            {/* {openShippingOrders ? (
              <>
                <ReactNativeModal
                  animationIn={'slideInRight'}
                  animationOut={'slideOutRight'}
                  style={styles.modalStyle}
                  isVisible={isOpenSideBarDrawer}
                >
                  <View style={styles.shippingOrderViewStyle}>
                    <FlatList
                      data={statusCount}
                      renderItem={renderShippingDrawer}
                      ListHeaderComponent={() => (
                        <View style={styles.shippingOrderHeader}>
                          <Text style={styles.shippingOrderHeading}>
                            {strings.deliveryOrders.shippingOrder}
                          </Text>

                          <View style={styles.rightSideView}>
                            <TouchableOpacity
                              style={styles.firstIconStyle}
                              onPress={() => setOpenShippingOrders(!openShippingOrders)}
                            >
                              <Image source={flipTruck} style={styles.sideBarImage} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                      keyExtractor={(item, index) => item.key.toString()}
                    />
                  </View>
                </ReactNativeModal>

                <View style={{ width: 90 }} />
              </>
            ) : ( */}
            <View style={styles.rightSideView}>
              <FlatList
                data={statusCount}
                renderItem={renderDrawer}
                ListHeaderComponent={() => (
                  <View
                    // onPress={() => {
                    //   setOpenShippingOrders(!openShippingOrders);
                    //   setIsOpenSideBarDrawer(true);
                    // }}
                    style={styles.firstIconStyle}
                  >
                    <Image source={firstTruck} style={styles.sideBarImage} />
                  </View>
                )}
                keyExtractor={(item, index) => item.key.toString()}
              />
            </View>
            {/* )} */}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

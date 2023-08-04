import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';

import {
  pay,
  pin,
  rightIcon,
  clock,
  expressType,
  oneHourType,
  twoHourType,
  customType,
  blankCheckBox,
  checkedCheckboxSquare,
  incomingOrders,
  cancelledOrders,
  returnedOrders,
  removeProduct,
  returnDeliveryBox,
  task,
  deliveryorderProducts,
  timer,
  deliveryParcel,
  NoCard,
  returnShipping,
  deliveryShipping,
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
import { getDelivery } from '@/selectors/DeliverySelector';
import OrderConvertion from './Components/OrderConvertion';
import TodayOrderStatus from './Components/TodayOrderStatus';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { graphOptions, labels } from '@/constants/staticData';

import styles from './styles';

export function DeliveryOrders2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const todayOrderStatusData = getDeliveryData?.todayOrderStatus;
  const pieChartData = getDeliveryData?.getOrderstatistics?.data;

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

  const [deliverytypes, setDeliveryTypes] = useState();
  const [graphData, setGraphData] = useState(graphOptions);
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState(0);
  const [isOpenSideBarDrawer, setIsOpenSideBarDrawer] = useState(false);
  const [userDetail, setUserDetail] = useState(getDeliveryData?.getReviewDef?.[0] ?? '');
  const [orderDetail, setOrderDetail] = useState(
    getDeliveryData?.getReviewDef?.[0]?.order_details ?? []
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
    dispatch(getReviewDefault(parseInt(openShippingOrders), sellerID, 1));

    setUserDetail(getDeliveryData?.getReviewDef?.[0] ?? []);
    setOrderDetail(getDeliveryData?.getReviewDef?.[0]?.order_details ?? []);
  }, [viewAllOrders, openShippingOrders]);

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
      onPress={() => setOpenShippingOrders(item?.key)}
      style={[
        styles.firstIconStyle,
        {
          backgroundColor:
            openShippingOrders === item?.key ? COLORS.textInputBackground : COLORS.transparent,
          marginVertical: 6,
          width: SW(15),
          height: SW(15),
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

  const headerComponent = () => (
    <View style={styles.headingRowStyle}>
      <Text style={styles.ordersToReviewText}>
        {openShippingOrders == 0
          ? strings.shipingOrder.orderOfReview
          : openShippingOrders == 1
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
          : 'Orders'}
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
        if (res?.msg === 'Order status updated successfully!') {
          alert('Order accepted successfully');
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

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header {...{ viewAllOrders, setViewAllOrders }} />

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
                          {openShippingOrders == 0
                            ? strings.shipingOrder.orderOfReview
                            : openShippingOrders == 1
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
                            : 'Orders'}
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
                isOpenSideBarDrawer,
                renderShippingDrawer,
                setOpenShippingOrders,
                renderDrawer,
                setIsOpenSideBarDrawer,
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

      <ReactNativeModal
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        style={styles.modalStyle}
        isVisible={isOpenSideBarDrawer}
      >
        <View style={styles.shippingOrderViewStyle}>
          <FlatList
            data={deliveryDrawer}
            renderItem={renderShippingDrawer}
            ListHeaderComponent={() => (
              <View style={styles.shippingOrderHeader}>
                <Text style={styles.shippingOrderHeading}>{strings.deliveryOrders.heading}</Text>

                <View style={styles.rightSideView}>
                  <TouchableOpacity
                    style={styles.firstIconStyle}
                    onPress={() => {
                      setIsOpenSideBarDrawer(!isOpenSideBarDrawer);
                      graphElements();
                    }}
                  >
                    <Image source={returnDeliveryBox} style={styles.sideBarImage} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key.toString()}
          />
        </View>
      </ReactNativeModal>
    </ScreenWrapper>
  );
}

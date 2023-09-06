import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import WebView from 'react-native-webview';
import { ms } from 'react-native-size-matters';
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
  Group,
  Fonts,
  backArrow2,
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
import Graph from './Components/Graph';
import Header from './Components/Header';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import Orders from './Components/Orders';
import RightDrawer from './Components/RightDrawer';
import OrderDetail from './Components/OrderDetail';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { ScreenWrapper, Spacer } from '@/components';
import { getAuthData } from '@/selectors/AuthSelector';
import { getOrderData } from '@/actions/AnalyticsAction';
import OrderConversion from './Components/OrderConversion';
import { getShipping } from '@/selectors/ShippingSelector';
import { getDelivery } from '@/selectors/DeliverySelector';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import TodayShippingStatus from './Components/TodayShippingStatus';
import CurrentShippingStatus from './Components/CurrentShippingStatus';

import styles from './ShippingOrder2.styles';
import { returnOrders } from '@/constants/flatListData';
import ReturnOrderDetail from './Components/ReturnOrderDetail';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export function ShippingOrder2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const todayStatus = useSelector(getShipping);
  const getGraphOrderData = useSelector(getDelivery);
  const ordersList = getGraphOrderData?.getReviewDef;
  const pieChartData = getGraphOrderData?.getOrderstatistics?.data;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const orderStatusCountData = todayStatus?.orderStatus;
  const getAnalyticsData = useSelector(getAnalytics);

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

  const graphOptions = [
    {
      key: '1',
      title: 'Incoming Orders',
      checked: true,
    },
    {
      key: '2',
      title: 'Order Processing',
      checked: true,
    },
    {
      key: '3',
      title: 'Ready For Pickup',
      checked: true,
    },
    {
      key: '4',
      title: 'Completed',
      checked: true,
    },
  ];

  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet, COLORS.lightGreen];

  const [graphData, setGraphData] = useState(graphOptions);
  const [userDetail, setUserDetail] = useState(ordersList?.[0] ?? []);
  const [orderDetail, setOrderDetail] = useState(ordersList?.[0]?.order_details ?? []);
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState('0');
  const [getOrderDetail, setGetOrderDetail] = useState('');
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id);
  const [openWebView, setOpenWebView] = useState(false);

  const statusCount = [
    {
      key: '0',
      image: task,
      title: 'Orders to Review',
      count: orderStatusCountData?.[0]?.count ?? '0',
    },
    {
      key: '1',
      image: drawerdeliveryTruck,
      title: 'Accepted',
      count: orderStatusCountData?.[1]?.count ?? '0',
    },
    {
      key: '2',
      image: timer,
      title: 'Order Preparing ',
      count: orderStatusCountData?.[2]?.count ?? '0',
    },
    {
      key: '3',
      image: Group,
      title: 'Printing Label',
      count: orderStatusCountData?.[3]?.count ?? '0',
    },
    {
      key: '4',
      image: Delivery,
      title: 'Shipped',
      count: orderStatusCountData?.[4]?.count ?? '0',
    },
    {
      key: '5',
      image: Cart,
      title: 'Delivered',
      count: orderStatusCountData?.[5]?.count ?? '0',
    },
    {
      key: '7,8',
      image: NoCard,
      title: 'Rejected/ Cancelled',
      count: orderStatusCountData?.[6]?.count ?? '0',
    },
    {
      key: '9',
      image: ReturnTruck,
      title: 'Returned',
      count: orderStatusCountData?.[7]?.count ?? '0',
    },
  ];

  useEffect(() => {
    dispatch(todayShippingStatus(sellerID));
    dispatch(todayCurrentStatus(sellerID));
    dispatch(getReviewDefault(0, 4));
    dispatch(getGraphOrders(4));
    dispatch(getOrderstatistics(4));
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
        <View style={styles.bucketBackgorund}>
          <Image
            source={item.image}
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
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View>
        </View>
      );
    } else if (item?.image === NoCard) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item.image}
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
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View>
        </View>
      );
    } else if (item?.image === ReturnTruck) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item.image}
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
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item.image}
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
              {item?.count}
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      style={styles.drawerIconView}
      onPress={() => {
        setOpenShippingOrders(item?.key);
        dispatch(getReviewDefault(item?.key, 4));
      }}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );

  const renderOrderToReview = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setViewAllOrders(true);
          setUserDetail(item);
          setOrderDetail(item?.order_details);
          dispatch(getOrderData(item?.id));
          setOrderId(item?.id);
        }}
        style={[
          viewAllOrders ? styles.showAllOrdersView : styles.orderRowStyle,
          {
            backgroundColor:
              viewAllOrders && item?.id === orderDetail?.id
                ? COLORS.textInputBackground
                : COLORS.transparent,
            borderColor:
              viewAllOrders && item?.id === orderDetail?.id ? COLORS.primary : COLORS.blue_shade,
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
          <Text style={styles.timeTextStyle}>{item?.invoice?.delivery_date ?? ''}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>
              {' '}
              {item?.preffered_delivery_start_time ? item?.preffered_delivery_start_time : '00.00'}
              {'-'}{' '}
              {item?.preffered_delivery_end_time ? item?.preffered_delivery_end_time : '00.00'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.timeTextStyle}>{item?.invoice?.delivery_date}</Text>
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
    </View>
  );

  const changeValue = (index) => {
    setGraphData((prev) => {
      let list = [...prev];
      list[index].checked = !list[index].checked;
      return list;
    });
  };

  const checkedIndices = graphData
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => parseInt(checkbox.key) - 1);

  // Initialize an array to store the summed values
  const summedValues = Array(getGraphOrderData?.graphOrders?.labels?.length).fill(0);

  // Sum the values from checked datasets for each day
  for (const index of checkedIndices) {
    const dataset = getGraphOrderData?.graphOrders?.datasets?.[index].data;
    for (let i = 0; i < dataset?.length; i++) {
      summedValues[i] += dataset[i];
    }
  }

  // Transform the summed values into the desired format with labels
  const outputData = summedValues.map((value, index) => ({
    label: getGraphOrderData?.graphOrders?.labels?.[index],
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

  const renderGraphItem = ({ item, index }) => {
    return (
      <View style={styles.shippingDrawerView}>
        {item?.checked ? (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => changeValue(index)}
          >
            <Image
              source={
                item?.title === 'Incoming Orders'
                  ? incomingOrders
                  : item?.title === 'Order Processing'
                  ? cancelledOrders
                  : item?.title === 'Ready For Pickup'
                  ? returnedOrders
                  : checkedCheckboxSquare
              }
              style={styles.rightIconStyle}
            />
            <Text style={styles.varientTextStyle}>
              {item?.title === 'Incoming Orders'
                ? 'Incoming Orders'
                : item?.title === 'Order Processing'
                ? 'Order Processing'
                : item?.title === 'Ready For Pickup'
                ? 'Ready For Pickup'
                : 'Completed'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => changeValue(index)}
          >
            <Image
              source={blankCheckBox}
              style={[
                styles.rightIconStyle,
                {
                  tintColor:
                    item?.title === 'Incoming Orders'
                      ? COLORS.bluish_green
                      : item?.title === 'Order Processing'
                      ? COLORS.pink
                      : item?.title === 'Ready For Pickup'
                      ? COLORS.yellowTweet
                      : COLORS.primary,
                },
              ]}
            />
            <Text style={styles.varientTextStyle}>
              {item?.title === 'Incoming Orders'
                ? 'Incoming Orders'
                : item?.title === 'Order Processing'
                ? 'Order Processing'
                : item?.title === 'Ready For Pickup'
                ? 'Ready For Pickup'
                : 'Completed'}
            </Text>
          </TouchableOpacity>
        )}
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
        if (res?.msg) {
          dispatch(getReviewDefault(openShippingOrders, 4));
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
        alert('Order declined successfully');
        setViewAllOrders(false);
        dispatch(getReviewDefault(0, 4));
      })
    );
  };

  const trackOrderHandler = (info) => {
    if (info) {
      setOpenWebView(true);
    }
  };

  const renderReturnOrders = ({ item, index }) => {
    const isSelected = viewAllOrders && item?.key === userDetail?.key;

    const handlePress = () => {
      setViewAllOrders(true);
      setUserDetail(item);
      setOrderId(item?.key);
    };

    const handleExpandPress = () => {
      setUserDetail(item);
      setViewAllOrders(true);
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.showAllOrdersView,
          {
            alignItems: 'center',
            width:
              Platform.OS === 'ios'
                ? Dimensions.get('window').width / ms(1.1)
                : Dimensions.get('window').width / ms(1.2),
          },

          {
            backgroundColor: isSelected ? COLORS.textInputBackground : COLORS.transparent,
            borderColor: isSelected ? COLORS.primary : COLORS.blue_shade,
          },
        ]}
      >
        <Text
          style={[
            styles.nameTextStyle,
            {
              fontFamily: Fonts.SemiBold,
              textAlignVertical: 'center',
              paddingRight: 4,
            },
          ]}
        >
          {item?.id}
        </Text>
        <View style={[styles.orderDetailStyle, { left: 10 }]}>
          <Text numberOfLines={1} style={styles.nameTextStyle}>
            {item?.name}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image source={pin} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.miles}</Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { left: 10, paddingHorizontal: 12 }]}>
          <Text style={styles.nameTextStyle}>{item?.items}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={pay} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.price}</Text>
          </View>
        </View>

        <Image source={item?.userProfile} style={styles.userImageStyle} />
        <View
          style={[styles.orderDetailStyle, { width: Platform.OS === 'android' ? SW(38) : SW(25) }]}
        >
          <Text
            style={[styles.timeTextStyle, { fontFamily: Fonts.SemiBold, color: COLORS.solid_grey }]}
          >
            {item?.deliveryType}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.time}</Text>
          </View>
        </View>

        <View
          style={[styles.orderDetailStyle, { width: Platform.OS === 'android' ? SW(38) : SW(25) }]}
        >
          <Text
            style={[styles.timeTextStyle, { fontFamily: Fonts.Regular, color: COLORS.solid_grey }]}
          >
            {item?.returnWithin}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image
              source={clock}
              style={[styles.pinImageStyle, { tintColor: COLORS.yellowTweet }]}
            />
            <Text style={[styles.distanceTextStyle, { color: COLORS.yellowTweet }]}>
              {item?.returnTime}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleExpandPress}
          style={[styles.orderDetailStyle, { width: SH(20) }]}
        >
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    // <ScreenWrapper>
    //   {!openWebView ? (
    //     <View style={styles.container}>
    //       <Header {...{ viewAllOrders, setViewAllOrders }} />

    //       <Spacer space={SH(20)} />
    //       {viewAllOrders ? (
    //         <View style={[styles.firstRowStyle, { flex: 1 }]}>
    //           {openShippingOrders === '9' ? (
    //             <>
    //               <View
    //                 style={[
    //                   styles.orderToReviewView,
    //                   {
    //                     flex: 0.58,
    //                     height: Dimensions.get('window').height - 80,
    //                     paddingBottom: ms(10),
    //                   },
    //                 ]}
    //               >
    //                 <FlatList
    //                   data={returnOrders}
    //                   renderItem={renderReturnOrders}
    //                   ListHeaderComponent={() => (
    //                     <View style={styles.headingRowStyle}>
    //                       <Text style={styles.ordersToReviewText}>
    //                         {openShippingOrders === '0'
    //                           ? strings.shippingOrder.reviewOrders
    //                           : openShippingOrders === '1'
    //                           ? strings.shippingOrder.acceptedOrders
    //                           : openShippingOrders === '2'
    //                           ? strings.shippingOrder.prepareOrders
    //                           : openShippingOrders === '3'
    //                           ? 'Printing Labels'
    //                           : openShippingOrders === '4'
    //                           ? strings.orderStatus.shipOrder
    //                           : openShippingOrders === '5'
    //                           ? strings.orderStatus.deliveryOrder
    //                           : openShippingOrders === '7,8'
    //                           ? strings.orderStatus.cancelledOrder
    //                           : 'Shipping Order Returns'}
    //                       </Text>
    //                     </View>
    //                   )}
    //                 />
    //               </View>

    //               {/* <View
    //                 style={{
    //                   flex: 0.39,
    //                   borderRadius: 10,
    //                   backgroundColor: COLORS.white,
    //                 }}
    //               >
    //                 <ReturnOrderDetail />
    //               </View> */}
    //             </>
    //           ) : ordersList?.length > 0 ? (
    //             <>
    //               <View style={styles.orderToReviewView}>
    //                 <FlatList
    //                   renderItem={renderAllOrdersToReview}
    //                   showsVerticalScrollIndicator={false}
    //                   data={ordersList ?? []}
    //                   ListHeaderComponent={() => (
    //                     <View style={styles.headingRowStyle}>
    //                       <Text style={styles.ordersToReviewText}>
    //                         {openShippingOrders === '0'
    //                           ? strings.shippingOrder.reviewOrders
    //                           : openShippingOrders === '1'
    //                           ? strings.shippingOrder.acceptedOrders
    //                           : openShippingOrders === '2'
    //                           ? strings.shippingOrder.prepareOrders
    //                           : openShippingOrders === '3'
    //                           ? 'Printing Labels'
    //                           : openShippingOrders === '4'
    //                           ? strings.orderStatus.shipOrder
    //                           : openShippingOrders === '5'
    //                           ? strings.orderStatus.deliveryOrder
    //                           : openShippingOrders === '7,8'
    //                           ? strings.orderStatus.cancelledOrder
    //                           : strings.orderStatus.returnedOrders}
    //                       </Text>
    //                     </View>
    //                   )}
    //                   contentContainerStyle={styles.contentContainerStyle}
    //                 />
    //               </View>

    //               <OrderDetail
    //                 {...{
    //                   renderAllOrdersToReview,
    //                   ordersList,
    //                   openShippingOrders,
    //                   userDetail,
    //                   orderDetail,
    //                   renderOrderProducts,
    //                   declineHandler,
    //                   acceptHandler,
    //                   trackOrderHandler,
    //                 }}
    //               />
    //             </>
    //           ) : (
    //             <View style={styles.noOrderView}>
    //               <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
    //             </View>
    //           )}

    //           <RightDrawer {...{ height, statusCount, renderDrawer }} />
    //         </View>
    //       ) : (
    //         <View style={styles.firstRowStyle}>
    //           <View>
    //             <TodayShippingStatus {...{ todayStatus }} />

    //             <Spacer space={ms(10)} />

    //             <CurrentShippingStatus {...{ todayStatus, renderItem }} />

    //             <Spacer space={ms(10)} />

    //             <OrderConversion
    //               {...{
    //                 series,
    //                 sliceColor,
    //                 widthAndHeight,
    //                 pieChartData,
    //                 sum,
    //                 orderConversionLoading,
    //               }}
    //             />
    //           </View>

    //           <View>
    //             <Graph
    //               {...{
    //                 graphData,
    //                 renderGraphItem,
    //                 isDeliveryOrder,
    //                 width,
    //                 outputData,
    //               }}
    //             />

    //             <Spacer space={SH(15)} />

    //             <>
    //               {isOrderLoading ? (
    //                 <View style={styles.orderLoader}>
    //                   <ActivityIndicator size={'small'} color={COLORS.primary} />
    //                 </View>
    //               ) : (
    //                 <Orders
    //                   {...{
    //                     height,
    //                     openShippingOrders,
    //                     ordersList,
    //                     viewAllOrders,
    //                     setViewAllOrders,
    //                     setGetOrderDetail,
    //                     renderOrderToReview,
    //                     emptyComponent,
    //                     setUserDetail,
    //                     setOrderId,
    //                   }}
    //                 />
    //               )}
    //             </>
    //           </View>

    //           <RightDrawer {...{ height, statusCount, renderDrawer }} />
    //         </View>
    //       )}
    //     </View>
    //   ) : (
    //     <View style={styles.container}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           dispatch(getReviewDefault(openShippingOrders, 4)), setOpenWebView(false);
    //         }}
    //         style={styles.backView}
    //       >
    //         <Image source={backArrow2} style={styles.backImageStyle} />
    //         <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
    //           {strings.deliveryOrders.back}
    //         </Text>
    //       </TouchableOpacity>
    //       <Spacer space={SH(20)} />

    //       <WebView
    //         source={{ uri: getAnalyticsData?.getOrderData?.tracking_info?.url }}
    //         style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}
    //         startInLoadingState
    //         renderLoading={() => (
    //           <View style={styles.loader}>
    //             <ActivityIndicator size={'large'} color={COLORS.primary} style={styles.loader} />
    //           </View>
    //         )}
    //       />
    //     </View>
    //   )}

    //   {isAcceptOrder ? (
    //     <View
    //       style={[
    //         styles.loader,
    //         {
    //           backgroundColor: 'rgba(0,0,0, 0.3)',
    //         },
    //       ]}
    //     >
    //       <ActivityIndicator color={COLORS.primary} size={'small'} style={styles.loader} />
    //     </View>
    //   ) : null}
    // </ScreenWrapper>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 0.28,
          marginHorizontal: 15,
        }}
      >
        <View style={{ flex: 0.2 }}>
          <Spacer space={SH(15)} />
          <TodayShippingStatus {...{ todayStatus }} />
        </View>

        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
          }}
        >
          <CurrentShippingStatus {...{ todayStatus, renderItem }} />
        </View>

        <View style={{ flex: 0.5 }}>
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
      </View>

      <View
        style={{
          flex: 0.65,
          justifyContent: 'space-between',
          marginRight: 15,
        }}
      >
        <View style={{ flex: 0.5 }}>
          <Spacer space={SH(15)} />
          <Graph
            {...{
              graphData,
              renderGraphItem,
              isDeliveryOrder,
              width,
              outputData,
            }}
          />
        </View>

        <View style={{ flex: 0.5 }}>
          <Orders
            {...{
              height,
              openShippingOrders,
              ordersList,
              viewAllOrders,
              setViewAllOrders,
              setGetOrderDetail,
              renderOrderToReview,
              emptyComponent,
              setUserDetail,
              setOrderId,
            }}
          />
        </View>
      </View>

      <View style={{ flex: 0.07, borderWidth: 1, backgroundColor: COLORS.yellowTweet }}></View>
    </View>
  );
}

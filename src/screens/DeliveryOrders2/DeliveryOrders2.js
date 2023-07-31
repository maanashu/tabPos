import React, { useState, useEffect } from 'react';

import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';

import {
  pay,
  pin,
  rightIcon,
  firstTruck,
  flipTruck,
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
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import Header from './Components/Header';
import OrderDetail from './Components/OrderDetail';
import OrderReview from './Components/OrderReview';
import { ScreenWrapper, Spacer } from '@/components';
import RightSideBar from './Components/RightSideBar';
import { getAuthData } from '@/selectors/AuthSelector';
import CurrentStatus from './Components/CurrentStatus';
import { getDelivery } from '@/selectors/DeliverySelector';
import OrderConvertion from './Components/OrderConvertion';
import TodayOrderStatus from './Components/TodayOrderStatus';
import { graphOptions, labels, rightSideDrawer, shippingDrawer } from '@/constants/staticData';
import { deliOrder, getOrderCount, getReviewDefault, todayOrders } from '@/actions/DeliveryAction';

import styles from './styles';
import { ms } from 'react-native-size-matters';

export function DeliveryOrders2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const todayOrderStatusData = getDeliveryData?.todayOrderStatus;

  const widthAndHeight = 200;
  const series = [823, 101, 40];
  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const [graphData, setGraphData] = useState(graphOptions);
  const [userDetail, setUserDetail] = useState(getDeliveryData?.getReviewDef?.[0] ?? '');
  const [orderDetail, setOrderDetail] = useState(
    getDeliveryData?.getReviewDef?.[0]?.order_details ?? []
  );
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState(false);
  const [isOpenSideBarDrawer, setIsOpenSideBarDrawer] = useState(false);
  const [deliverytypes, setDeliveryTypes] = useState();

  useEffect(() => {
    dispatch(todayOrders(sellerID));
    dispatch(deliOrder(sellerID));
    dispatch(getOrderCount(sellerID));
    dispatch(getReviewDefault(0, sellerID));

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

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.shippingTypeImage} />
      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.delivery_type_title}</Text>
        <Text style={styles.totalTextStyle}>{item?.count}</Text>
      </View>
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
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
        </View>
      );
    } else if (item?.title === 'Rejected') {
      return (
        <View
          style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
        </View>
      );
    } else if (item?.title === 'Cancelled') {
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
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
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
          <Text style={styles.badgetext}>0</Text>
        </View>
      );
    }
  };

  const renderDrawer = ({ item }) => (
    <View style={styles.drawerIconView}>
      <View style={styles.bucketBackgorund}>
        <Image source={item.image} style={styles.sideBarImage} />
        {showBadge(item)}
      </View>
    </View>
  );

  const renderShippingDrawer = ({ item }) => (
    <View style={styles.shippingDrawerView}>
      <Image source={item.image} style={styles.sideBarImage} />
      <View style={{ paddingLeft: 15, justifyContent: 'center' }}>
        <Text
          style={[
            styles.shippingDrawerCountText,
            {
              color:
                item?.title === 'Delivered'
                  ? COLORS.primary
                  : item?.title === 'Rejected'
                  ? COLORS.pink
                  : item?.title === 'Cancelled'
                  ? COLORS.yellowTweet
                  : COLORS.solid_grey,
            },
          ]}
        >
          {item?.count}
        </Text>
        <Text
          style={[
            styles.shippingDrawerTitleText,
            {
              color:
                item?.title === 'Delivered'
                  ? COLORS.primary
                  : item?.title === 'Rejected'
                  ? COLORS.pink
                  : item?.title === 'Cancelled'
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

  const headerComponent = () => (
    <View style={styles.headingRowStyle}>
      <Text style={styles.ordersToReviewText}>{strings.shipingOrder.orderOfReview}</Text>

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

  const changeValue = (item, index) => {
    let list = graphOptions;
    list[index].checked = !list[index].checked;
    setGraphData(list);
  };

  const renderGraphItem = ({ item, index }) => {
    return (
      <View style={styles.shippingDrawerView}>
        {item?.checked ? (
          <TouchableOpacity onPress={() => changeValue(item, index)}>
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
          <TouchableOpacity onPress={() => changeValue(item, index)}>
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
        <Text style={styles.varientTextStyle}>{item?.title}</Text>
      </View>
    );
  };

  const renderOrderProducts = ({ item, index }) => {
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

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header {...{ viewAllOrders, setViewAllOrders }} />

        <Spacer space={SH(20)} />

        {viewAllOrders ? (
          <View style={styles.firstRowStyle}>
            <View style={[styles.orderToReviewView, { marginBottom: 75 }]}>
              <FlatList
                renderItem={renderOrderToReview}
                showsVerticalScrollIndicator={false}
                data={getDeliveryData?.getReviewDef ?? []}
                ListHeaderComponent={() => (
                  <View style={styles.headingRowStyle}>
                    <Text style={styles.ordersToReviewText}>
                      {strings.shipingOrder.orderOfReview}
                    </Text>
                  </View>
                )}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>

            <OrderDetail {...{ userDetail, orderDetail, renderOrderProducts }} />

            {openShippingOrders ? (
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
                      keyExtractor={(item) => item.key.toString()}
                    />
                  </View>
                </ReactNativeModal>

                <View style={{ width: 90 }} />
              </>
            ) : (
              <View style={styles.rightSideView}>
                <FlatList
                  data={rightSideDrawer}
                  renderItem={renderDrawer}
                  ListHeaderComponent={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setOpenShippingOrders(!openShippingOrders);
                        setIsOpenSideBarDrawer(true);
                      }}
                      style={styles.firstIconStyle}
                    >
                      <Image source={firstTruck} style={styles.sideBarImage} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.key.toString()}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.firstRowStyle}>
            <View>
              <TodayOrderStatus {...{ todayOrderStatusData }} />

              <Spacer space={SH(15)} />

              <CurrentStatus {...{ deliverytypes, renderItem }} />

              <Spacer space={SH(15)} />

              <OrderConvertion {...{ series, sliceColor, widthAndHeight }} />
            </View>

            <View>
              {/* <Graph /> */}

              <View style={styles.graphViewStyle}>
                <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

                <FlatList
                  horizontal
                  data={graphData}
                  renderItem={renderGraphItem}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />

                <LineChart
                  bezier
                  fromZero
                  height={285}
                  segments={10}
                  withDots={false}
                  withShadow={false}
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: [32, 48, 33, 49, 94, 79, 87],
                        strokeWidth: 5,
                        color: (opacity = 1) => `rgba(31, 179, 255,${opacity})`,
                      },
                      {
                        data: [19, 31, 19, 32, 71, 58, 79],
                        strokeWidth: 5,
                        color: (opacity = 1) => `rgba(39, 90, 255, ${opacity})`,
                      },
                      {
                        data: [15, 20, 15, 20, 35, 30, 38],
                        strokeWidth: 5,
                        color: (opacity = 1) => `rgba(251, 70, 108, ${opacity})`,
                      },
                      {
                        data: [5, 9, 5, 8, 19, 15, 20],
                        strokeWidth: 5,
                        color: (opacity = 1) => `rgba(252, 186, 48, ${opacity})`,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.53}
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
              </View>

              <Spacer space={SH(15)} />
              <OrderReview
                {...{
                  renderOrderToReview,
                  emptyComponent,
                  headerComponent,
                  getDeliveryData,
                }}
              />
            </View>

            <RightSideBar
              {...{
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
    </ScreenWrapper>
  );
}

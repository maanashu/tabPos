import React, { useState, useEffect } from 'react';

import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import moment from 'moment';
import PieChart from 'react-native-pie-chart';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';

import {
  pay,
  pin,
  Cart,
  NoCard,
  rightIcon,
  firstTruck,
  ReturnTruck,
  flipTruck,
  backArrow2,
  Fonts,
  scooter,
  removeProduct,
  deliveryBox,
  returnDeliveryBox,
  clock,
  userImage,
  expressType,
  oneHourType,
  twoHourType,
  customType,
} from '@/assets';
import {
  rightSideDrawer,
  shippingDrawer,
  legends,
  labels,
  rightSideDeliveryDrawer,
  deliveryDrawer,
} from '@/constants/staticData';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { ScreenWrapper, Spacer } from '@/components';
import { getAuthData } from '@/selectors/AuthSelector';
import { getDelivery } from '@/selectors/DeliverySelector';
import { acceptOrder, deliOrder, getOrderCount, getReviewDefault } from '@/actions/DeliveryAction';

import styles from './styles';

export function DeliveryOrders2() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const orderCount = getDeliveryData?.getOrderCount;
  const length = orderCount?.map((item) => item.count);
  const orderPlaced = length?.reduce((sum, num) => sum + num);

  // console.log('orderCount==========', orderCount);

  const widthAndHeight = 200;
  const series = [823, 101, 40];
  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const [userDetail, setUserDetail] = useState(getDeliveryData?.getReviewDef?.[0] ?? '');
  const [orderDetail, setOrderDetail] = useState(
    getDeliveryData?.getReviewDef?.[0]?.order_details ?? []
  );
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState(false);
  const [isOpenSideBarDrawer, setIsOpenSideBarDrawer] = useState(false);
  const [deliverytypes, setDeliveryTypes] = useState();

  useEffect(() => {
    dispatch(deliOrder(sellerID));
    dispatch(getOrderCount(sellerID));
    dispatch(getReviewDefault(0, sellerID));

    // if (getDeliveryData?.deliveringOrder?.length > 0) {
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
        count: getDeliveryData?.deliveringOrder?.[0].count ?? 0,
        image: oneHourType,
      },
      {
        key: '3',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[2]?.delivery_type_title ?? '2 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[0]?.count ?? 0,
        image: twoHourType,
      },
      {
        key: '4',
        delivery_type_title: 'Customer Pickups',
        count: orderCount?.[6]?.count ?? 0,
        image: customType,
      },
    ];
    setDeliveryTypes(deliveryTypes);
    // }
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.shippingTypeImage} />
      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.delivery_type_title}</Text>
        <Text style={styles.totalTextStyle}>{item?.count}</Text>
      </View>
    </View>
  );

  const showBadge = (image) => {
    if (image === Cart) {
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
    } else if (image === NoCard) {
      return (
        <View
          style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
        </View>
      );
    } else if (image === ReturnTruck) {
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

  const renderDrawer = ({ item, index }) => (
    <View style={styles.drawerIconView}>
      <View style={styles.bucketBackgorund}>
        <Image source={item.image} style={styles.sideBarImage} />
        {showBadge(item?.image)}
      </View>
    </View>
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

  const renderOrderToReview = ({ item, index }) => {
    return (
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

        <View style={[styles.orderDetailStyle, { width: SW(55) }]}>
          <Text style={styles.timeTextStyle}>{item?.delivery_details?.title}</Text>
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

  const declineHandler = (id) => {
    const data = {
      orderId: id,
      status: 7,
      sellerID: sellerID,
    };
    dispatch(acceptOrder(data));
    setViewAllOrders(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {viewAllOrders ? (
          <TouchableOpacity onPress={() => setViewAllOrders(false)} style={styles.backView}>
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>{'Back'}</Text>
          </TouchableOpacity>
        ) : null}
        <Spacer space={SH(20)} />

        {viewAllOrders ? (
          <View style={styles.firstRowStyle}>
            <View style={[styles.orderToReviewView, { marginBottom: 75 }]}>
              <FlatList
                data={getDeliveryData?.getReviewDef ?? []}
                renderItem={renderOrderToReview}
                showsVerticalScrollIndicator={false}
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

                <View style={[styles.locationViewStyle, { width: ms(140) }]}>
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

              <View style={{ height: SH(400) }}>
                <FlatList
                  scrollEnabled
                  data={orderDetail}
                  renderItem={renderOrderProducts}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
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

                <View style={{ paddingHorizontal: 10, width: SW(70) }}>
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

                  <Spacer space={SH(15)} />
                  <View style={styles.shippingOrdersViewStyle}>
                    <TouchableOpacity
                      onPress={() => declineHandler(userDetail?.id)}
                      style={styles.declineButtonStyle}
                    >
                      <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.acceptButtonView}>
                      <Text style={styles.acceptTextStyle}>{strings.deliveryOrders.accept}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

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
                      keyExtractor={(item, index) => item.key.toString()}
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
                  keyExtractor={(item, index) => item.key.toString()}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.firstRowStyle}>
            <View>
              <View style={styles.shippingStatusViewStyle}>
                <Text style={styles.shippingStatusText}>{strings.deliveryOrders2.orderStatus}</Text>

                <View style={styles.shippingOrdersViewStyle}>
                  <Text style={styles.shippedOrderText}>{strings.analytics.deliveryOrder}</Text>
                  <Text style={styles.shippedOrderText}>{'23'}</Text>
                </View>

                <View style={styles.shippingOrdersViewStyle}>
                  <Text style={styles.shippedOrderText}>
                    {strings.deliveryOrders2.pickupOrders}
                  </Text>
                  <Text style={styles.shippedOrderText}>{'10'}</Text>
                </View>
              </View>

              <Spacer space={SH(15)} />

              <View style={styles.currentStatusView}>
                <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>

                <FlatList data={deliverytypes} renderItem={renderItem} />
              </View>

              <Spacer space={SH(15)} />

              <View style={styles.orderConvertionView}>
                <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

                <Spacer space={SH(22)} />
                <View style={styles.piechartViewStyle}>
                  <PieChart
                    series={series}
                    coverRadius={0.65}
                    sliceColor={sliceColor}
                    coverFill={COLORS.white}
                    widthAndHeight={widthAndHeight}
                  />
                  <Text style={styles.percentageTextStyle}>{'97.51%'}</Text>

                  <Spacer space={SH(12)} />
                  <View style={styles.ordersRowView}>
                    <Text style={styles.orderTypeTextStyle}>
                      {strings.shippingOrder.deliveredOrders}
                    </Text>
                    <Text style={styles.countTextStyle}>
                      {strings.shippingOrder.deliveredCount}
                    </Text>
                  </View>

                  <View style={styles.ordersRowView}>
                    <Text style={styles.orderTypeTextStyle}>
                      {strings.shippingOrder.cancelledOrders}
                    </Text>
                    <Text style={styles.countTextStyle}>
                      {strings.shippingOrder.cancelledCount}
                    </Text>
                  </View>

                  <View style={styles.ordersRowView}>
                    <Text style={styles.orderTypeTextStyle}>
                      {strings.shippingOrder.returnedOrders}
                    </Text>
                    <Text style={styles.countTextStyle}>{strings.shippingOrder.returnedCount}</Text>
                  </View>
                  <Spacer space={SH(7)} />
                </View>
              </View>
            </View>

            <View>
              <View style={styles.graphViewStyle}>
                <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

                <LineChart
                  bezier
                  data={{
                    labels: labels,
                    legend: legends,
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
                  height={285}
                  withDots={false}
                  width={Dimensions.get('window').width * 0.53}
                  chartConfig={{
                    backgroundColor: COLORS.black,
                    backgroundGradientFrom: COLORS.white,
                    backgroundGradientTo: COLORS.white,
                    propsForLabels: {
                      fontFamily: Fonts.Regular,
                      fontSize: SF(12),
                    },
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                      backgroundColor: COLORS.white,
                    },
                    labelColor: (opacity = 1) => `rgba(60, 68, 77, ${opacity})`,
                  }}
                  style={{
                    borderRadius: 16,
                    backgroundColor: COLORS.white,
                  }}
                  withShadow={false}
                  fromZero
                  segments={10}
                />
              </View>

              <Spacer space={SH(15)} />
              <View style={styles.orderToReviewView}>
                <FlatList
                  data={getDeliveryData?.getReviewDef?.slice(0, 4)}
                  renderItem={renderOrderToReview}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  ListHeaderComponent={() => (
                    <View style={styles.headingRowStyle}>
                      <Text style={styles.ordersToReviewText}>
                        {strings.shipingOrder.orderOfReview}
                      </Text>

                      <TouchableOpacity
                        onPress={() => setViewAllOrders(true)}
                        style={styles.viewAllButtonStyle}
                      >
                        <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>

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
                      data={deliveryDrawer}
                      renderItem={renderShippingDrawer}
                      ListHeaderComponent={() => (
                        <View style={styles.shippingOrderHeader}>
                          <Text style={styles.shippingOrderHeading}>
                            {strings.deliveryOrders.heading}
                          </Text>

                          <View style={styles.rightSideView}>
                            <TouchableOpacity
                              style={styles.firstIconStyle}
                              onPress={() => setOpenShippingOrders(!openShippingOrders)}
                            >
                              <Image source={returnDeliveryBox} style={styles.sideBarImage} />
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
            ) : (
              <View style={styles.rightSideView}>
                <FlatList
                  data={rightSideDeliveryDrawer}
                  renderItem={renderDrawer}
                  ListHeaderComponent={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setOpenShippingOrders(!openShippingOrders);
                        setIsOpenSideBarDrawer(true);
                      }}
                      style={styles.firstIconStyle}
                    >
                      <Image source={deliveryBox} style={styles.sideBarImage} />
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={{
                    height: Dimensions.get('window').height - 90,
                  }}
                  keyExtractor={(item, index) => item.key.toString()}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

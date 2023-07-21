import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import PieChart from 'react-native-pie-chart';
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
  user,
  scooter,
  profileImage,
  removeProduct,
} from '@/assets';
import {
  shippingTypes,
  orderToReview,
  rightSideDrawer,
  shippingDrawer,
  orderProducts,
} from '@/constants/staticData';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { ScreenWrapper, Spacer } from '@/components';

import styles from './ShippingOrder2.styles';

export function ShippingOrder2() {
  const widthAndHeight = 200;
  const series = [823, 101, 40];
  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const [orderDetail, setOrderDetail] = useState(orderToReview[0]);
  const [viewAllOrders, setViewAllOrders] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState(false);
  const [isOpenSideBarDrawer, setIsOpenSideBarDrawer] = useState(false);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.shippingTypeImage} />

      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.title}</Text>
        <Text style={styles.totalTextStyle}>{item?.total}</Text>
      </View>
    </View>
  );

  const showBadge = image => {
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
          style={[
            styles.bucketBadge,
            { backgroundColor: COLORS.pink, borderColor: COLORS.pink },
          ]}
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

  const renderOrderToReview = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setOrderDetail(item);
      }}
      style={viewAllOrders ? styles.showAllOrdersView : styles.orderRowStyle}
    >
      <View style={styles.orderDetailStyle}>
        <Text style={styles.nameTextStyle}>{item?.name}</Text>
        <View style={styles.locationViewStyle}>
          <Image source={pin} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>{item?.distance}</Text>
        </View>
      </View>

      <View style={styles.orderDetailStyle}>
        <Text style={styles.nameTextStyle}>{item?.totalItems}</Text>
        <View style={styles.locationViewStyle}>
          <Image source={pay} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>{item?.price}</Text>
        </View>
      </View>

      <View style={styles.orderDetailStyle}>
        <Text style={styles.timeTextStyle}>{item?.deliveryType}</Text>
        <View style={styles.locationViewStyle}>
          <Image source={watchLogo} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>{item?.time}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.orderDetailStyle}>
        <Image source={rightIcon} style={styles.rightIconStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderOrderProducts = ({ item, index }) => (
    <View style={styles.orderproductView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={item?.image} style={styles.userImageStyle} />

        <View style={{ paddingLeft: 10 }}>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: SF(12),
              color: COLORS.solid_grey,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: SF(11),
              color: COLORS.darkGray,
            }}
          >
            {item?.colorandsize}
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: SF(12),
          color: COLORS.darkGray,
        }}
      >
        {item?.price}
      </Text>

      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: SF(12),
          color: COLORS.darkGray,
        }}
      >
        {item?.quantity}
      </Text>

      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: SF(12),
          color: COLORS.darkGray,
        }}
      >
        {item?.totalprice}
      </Text>

      <Image
        source={removeProduct}
        style={[styles.removeProductImageStyle, { marginRight: 10 }]}
      />
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {viewAllOrders ? (
          <TouchableOpacity
            onPress={() => setViewAllOrders(false)}
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 12,
            }}
          >
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
              {'Back'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Spacer space={SH(20)} />

        {viewAllOrders ? (
          <View style={styles.firstRowStyle}>
            <View style={styles.orderToReviewView}>
              <FlatList
                data={orderToReview}
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
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                  paddingVertical: 30,
                  borderRadius: 10,
                  marginTop: 20,
                  backgroundColor: COLORS.textInputBackground,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image source={profileImage} style={styles.userImageStyle} />

                  <View style={styles.userNameView}>
                    <Text
                      style={{
                        fontFamily: Fonts.Bold,
                        fontSize: SF(14),
                        color: COLORS.solid_grey,
                      }}
                    >
                      {orderDetail?.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Medium,
                        fontSize: SF(11),
                        color: COLORS.dark_grey,
                      }}
                    >
                      {'1480 Bassel Street, New Orleans, LA 70113'}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image source={scooter} style={styles.userImageStyle} />

                  <View style={styles.userNameView}>
                    <Text
                      style={{
                        fontFamily: Fonts.Bold,
                        fontSize: SF(14),
                        color: COLORS.primary,
                      }}
                    >
                      {orderDetail?.deliveryType}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Medium,
                        fontSize: SF(11),
                        color: COLORS.dark_grey,
                      }}
                    >
                      {orderDetail?.time}
                    </Text>
                  </View>
                </View>
              </View>

              <FlatList data={orderProducts} renderItem={renderOrderProducts} />
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
                              onPress={() =>
                                setOpenShippingOrders(!openShippingOrders)
                              }
                            >
                              <Image
                                source={flipTruck}
                                style={styles.sideBarImage}
                              />
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
            {/* left View */}
            <View>
              {/* firstView */}
              <View style={styles.shippingStatusViewStyle}>
                <Text style={styles.shippingStatusText}>
                  {strings.shippingOrder.shippingStatus}
                </Text>

                <View style={styles.shippingOrdersViewStyle}>
                  <Text style={styles.shippedOrderText}>
                    {strings.shippingOrder.shippingOrders}
                  </Text>
                  <Text style={styles.shippedOrderText}>{'23'}</Text>
                </View>

                <View style={styles.shippingOrdersViewStyle}>
                  <Text style={styles.shippedOrderText}>
                    {strings.shippingOrder.shippedOrder}
                  </Text>
                  <Text style={styles.shippedOrderText}>{'10'}</Text>
                </View>
              </View>

              <Spacer space={SH(20)} />

              {/* second View */}
              <View style={styles.currentStatusView}>
                <Text style={styles.currentStatusText}>
                  {strings.shippingOrder.currentStatus}
                </Text>

                <FlatList data={shippingTypes} renderItem={renderItem} />
              </View>

              <Spacer space={SH(20)} />
              {/* third view */}
              <View style={styles.orderConvertionView}>
                <Text style={styles.orderTextStyle}>
                  {strings.shippingOrder.orderConvertion}
                </Text>

                <Spacer space={SH(29)} />
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
                    <Text style={styles.countTextStyle}>
                      {strings.shippingOrder.returnedCount}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* rightView */}
            <View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  width: Dimensions.get('window').width * 0.56,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.numberOrdersText}>
                  {strings.shipingOrder.numberOfOrders}
                </Text>

                <LineChart
                  bezier
                  data={{
                    labels: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ],
                    datasets: [
                      {
                        data: [32, 48, 33, 49, 94, 79, 87],
                        strokeWidth: 5,
                        color: (opacity = 1) => `rgba(31, 179, 255,${opacity})`, // optional
                      },
                      {
                        data: [19, 31, 19, 32, 71, 58, 79],
                        strokeWidth: 5,
                        color: (opacity = 1) => `rgba(39, 90, 255, ${opacity})`, // optional
                      },
                      {
                        data: [15, 20, 15, 20, 35, 30, 38],
                        strokeWidth: 5,
                        color: (opacity = 1) =>
                          `rgba(251, 70, 108, ${opacity})`, // optional
                      },
                      {
                        data: [5, 9, 5, 8, 19, 15, 20],
                        strokeWidth: 5,

                        color: (opacity = 1) =>
                          `rgba(252, 186, 48, ${opacity})`, // optional
                      },
                    ],
                    legend: [
                      'In Coming Orders',
                      'Delivered Orders',
                      'Cancelled Orders',
                      'Returned Orders',
                    ],
                  }}
                  width={Dimensions.get('window').width * 0.53}
                  height={320}
                  withDots={false}
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

              <Spacer space={SH(20)} />
              <View style={styles.orderToReviewView}>
                <FlatList
                  data={orderToReview.slice(0, 4)}
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
                        <Text style={styles.viewallTextStyle}>
                          {strings.reward.viewAll}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>

            {/* right bar view */}
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
                              onPress={() =>
                                setOpenShippingOrders(!openShippingOrders)
                              }
                            >
                              <Image
                                source={flipTruck}
                                style={styles.sideBarImage}
                              />
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
        )}
      </View>
    </ScreenWrapper>
  );
}

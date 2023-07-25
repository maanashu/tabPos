import React, { useState } from 'react';

import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

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
  legends,
  labels,
  orderReview,
} from '@/constants/staticData';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { strings } from '@/localization';
import { ScreenWrapper, Spacer } from '@/components';

import styles from './ShippingOrder2.styles';

export function ShippingOrder2() {
  const widthAndHeight = 200;
  const series = [823, 101, 40];
  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const [userDetail, setUserDetail] = useState(orderToReview[0]);
  const [orderDetail, setOrderDetail] = useState(orderToReview[0]?.products);
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

  const renderOrderToReview = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setUserDetail(item);
        setOrderDetail(item?.products);
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

      <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
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

      <Image source={removeProduct} style={[styles.removeProductImageStyle, { marginRight: 10 }]} />
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
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>{'Back'}</Text>
          </TouchableOpacity>
        ) : null}
        <Spacer space={SH(20)} />

        {viewAllOrders ? (
          <View style={styles.firstRowStyle}>
            <View style={[styles.orderToReviewView, { marginBottom: 75 }]}>
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

            {orderDetail ? (
              <View style={styles.orderDetailView}>
                <View style={styles.orderDetailViewStyle}>
                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Image source={profileImage} style={styles.userImageStyle} />

                    <View style={styles.userNameView}>
                      <Text
                        style={{
                          fontFamily: Fonts.Bold,
                          fontSize: SF(14),
                          color: COLORS.solid_grey,
                        }}
                      >
                        {userDetail?.name}
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

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 15,
                    }}
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
                        {userDetail?.deliveryType}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.Medium,
                          fontSize: SF(11),
                          color: COLORS.dark_grey,
                        }}
                      >
                        {userDetail?.time}
                      </Text>
                    </View>
                  </View>
                </View>

                <FlatList data={orderDetail} renderItem={renderOrderProducts} />

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: COLORS.white,
                    ...ShadowStyles.shadow1,
                    marginHorizontal: 20,
                  }}
                >
                  <View style={{ paddingLeft: 15 }}>
                    <View>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Total Item'}</Text>
                      <Text style={styles.itemCountText}>{'7'}</Text>
                    </View>

                    <Spacer space={SH(15)} />
                    <View>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Order Date'}</Text>
                      <Text style={styles.itemCountText}>{'20/12/2023'}</Text>
                    </View>

                    <Spacer space={SH(15)} />
                    <View>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Order ID#'}</Text>
                      <Text style={styles.itemCountText}>{'AST0000876'}</Text>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 10, width: SW(70) }}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
                        {'Sub Total'}
                      </Text>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'$4.00'}</Text>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 10,
                      }}
                    >
                      <Text style={styles.invoiceText}>{'Discount'}</Text>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'-$2.00'}</Text>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 10,
                      }}
                    >
                      <Text style={styles.invoiceText}>{'Other fees'}</Text>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'$4.00'}</Text>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                      }}
                    >
                      <Text style={styles.invoiceText}>{'Tax'}</Text>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'$4.00'}</Text>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                      }}
                    >
                      <Text style={styles.totalText}>{'Total'}</Text>
                      <Text style={styles.totalText}>{'$254.60'}</Text>
                    </View>

                    <Spacer space={SH(15)} />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        right: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: SH(48),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1.5,
                          borderColor: COLORS.primary,
                          borderRadius: 5,
                          paddingHorizontal: 20,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: Fonts.SemiBold,
                            fontSize: SF(16),
                            color: COLORS.primary,
                          }}
                        >
                          {'Decline'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          height: SH(48),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          backgroundColor: COLORS.primary,
                          marginLeft: 10,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: Fonts.SemiBold,
                            fontSize: SF(16),
                            color: COLORS.white,
                          }}
                        >
                          {'Accept Order'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
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
                  <Text style={styles.shippedOrderText}>{strings.shippingOrder.shippedOrder}</Text>
                  <Text style={styles.shippedOrderText}>{'10'}</Text>
                </View>
              </View>

              <Spacer space={SH(15)} />

              {/* second View */}
              <View style={styles.currentStatusView}>
                <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>

                <FlatList data={shippingTypes} renderItem={renderItem} />
              </View>

              <Spacer space={SH(15)} />
              {/* third view */}
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

            {/* rightView */}
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
                        <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
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
        )}
      </View>
    </ScreenWrapper>
  );
}

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {
  pay,
  pin,
  Cart,
  NoCard,
  rightIcon,
  watchLogo,
  ReturnTruck,
  backArrow2,
  Fonts,
  scooter,
  profileImage,
  removeProduct,
  deliveryBox,
} from '@/assets';
import { orderToReview, rightSideDeliveryDrawer } from '@/constants/staticData';
import { strings } from '@/localization';
import { ScreenWrapper, Spacer } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import RightSideBar from './Components/RightSideBar';

import styles from './styles';

import Graph from './Components/Graph';
import OrderStatus from './Components/OrderStatus';
import { ms, verticalScale } from 'react-native-size-matters';
import PieChart from 'react-native-pie-chart';

export function DeliveryOrders2() {
  const widthAndHeight = 190;
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

      <Image source={removeProduct} style={[styles.removeProductImageStyle, { marginRight: 10 }]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {viewAllOrders ? (
        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={() => setViewAllOrders(false)} style={styles.backView}>
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>{'Back'}</Text>
          </TouchableOpacity>

          <Spacer space={SH(20)} />
          <View
            style={{
              width: Dimensions.get('window').width,
              flexDirection: 'row',
            }}
          >
            <View style={[styles.viewAllOrders, { marginBottom: 140 }]}>
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
                  <View style={[styles.locationViewStyle, { width: ms(120) }]}>
                    <Image source={profileImage} style={styles.userImageStyle} />

                    <View style={styles.userNameView}>
                      <Text style={[styles.totalTextStyle, { padding: 0 }]}>
                        {userDetail?.name}
                      </Text>
                      <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
                        {strings.deliveryOrders.address}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[styles.locationViewStyle, { width: ms(120), paddingHorizontal: 3 }]}
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

                <View style={{ height: SH(400) }}>
                  <FlatList
                    scrollEnabled
                    data={orderDetail}
                    renderItem={renderOrderProducts}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  />
                </View>

                <View style={styles.orderandPriceView}>
                  <View style={{ paddingLeft: 15 }}>
                    <View>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                        {strings.shippingOrder.totalItem}
                      </Text>
                      <Text style={styles.itemCountText}>
                        {strings.shippingOrder.totalItemsValue}
                      </Text>
                    </View>

                    <Spacer space={SH(15)} />
                    <View>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                        {strings.shippingOrder.orderDate}
                      </Text>
                      <Text style={styles.itemCountText}>
                        {strings.shippingOrder.orderDateValue}
                      </Text>
                    </View>

                    <Spacer space={SH(15)} />
                    <View>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                        {strings.shippingOrder.orderId}
                      </Text>
                      <Text style={styles.itemCountText}>{strings.shippingOrder.orderIdValue}</Text>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 10, width: SW(70) }}>
                    <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
                      <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
                        {strings.deliveryOrders.subTotal}
                      </Text>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                        {strings.deliveryOrders.subTotalValue}
                      </Text>
                    </View>

                    <View style={styles.orderDetailsView}>
                      <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
                      <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                        {strings.deliveryOrders.discountValue}
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
                        {strings.deliveryOrders.subTotalValue}
                      </Text>
                    </View>

                    <View style={styles.orderDetailsView}>
                      <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
                      <Text style={styles.totalText}>{strings.deliveryOrders.totalValue}</Text>
                    </View>

                    <Spacer space={SH(15)} />
                    <View style={styles.shippingOrdersViewStyle}>
                      <TouchableOpacity style={styles.declineButtonStyle}>
                        <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.acceptButtonView}>
                        <Text style={styles.acceptTextStyle}>{strings.deliveryOrders.accept}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 10,
                width: Dimensions.get('window').width * 0.06,
                paddingVertical: verticalScale(6),
                alignItems: 'center',
                // position: 'absolute',
                // top: 20,
                right: 10,
                marginBottom: 40,
                left: 10,
              }}
            >
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
                  height: Dimensions.get('window').height - 160,
                }}
                keyExtractor={(item, index) => item.key.toString()}
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
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Spacer space={SH(15)} />
          <View style={styles.firstRowStyle}>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <OrderStatus
                {...{
                  renderItem,
                  series,
                  sliceColor,
                  widthAndHeight,
                }}
              />

              <Graph />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <View style={styles.orderConvertionView}>
                <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

                <Spacer space={ms(18)} />
                <View style={styles.piechartViewStyle}>
                  <PieChart
                    series={series}
                    coverRadius={0.65}
                    sliceColor={sliceColor}
                    coverFill={COLORS.white}
                    widthAndHeight={widthAndHeight}
                  />
                  <Text style={styles.percentageTextStyle}>{'97.51%'}</Text>

                  <Spacer space={ms(18)} />
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
                </View>
              </View>

              <View style={styles.orderToReviewView}>
                <FlatList
                  data={orderToReview.slice(0, 4)}
                  renderItem={renderOrderToReview}
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 10,
                  }}
                  scrollEnabled={false}
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
          </View>

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
    </SafeAreaView>
  );
}

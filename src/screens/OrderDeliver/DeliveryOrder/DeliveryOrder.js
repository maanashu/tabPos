import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  deliveryTruck,
  notifications,
  search_light,
  chart,
  pin,
  clock,
  pay,
  rightIcon,
  conversionBox,
  backArrow,
  profileImage,
  Fonts,
  deliveryScooter,
  dropdown2,
  delivery,
  deliveryLine,
  radio
} from '@/assets';
import { styles } from './DeliveryOrder.styles';
import { strings } from '@/localization';
import {
  deliveryOrders,
  orderConversion,
  orderReview,
  orderStatus,
  productList,
} from '@/constants/staticData';
import { COLORS, SH, SW } from '@/theme';
import { Button, Spacer } from '@/components';

import {
  LineChart,
} from "react-native-chart-kit";

export function DeliveryOrder() {
  const [viewAllReviews, setViewAllReviews] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [readyPickup, setReadyForPickup] = useState(false);
  const [showArea, setShowArea] = useState(true);

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {viewAllReviews ? (
          <TouchableOpacity
            onPress={() => {
              setViewAllReviews(false);
            }}
            style={styles.backView}
          >
            <Image source={backArrow} style={styles.truckStyle} />
            <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={deliveryTruck} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>
              {strings.deliveryOrders.heading}
            </Text>
          </View>
        )}

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 10 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.orderView}>
      <View style={styles.orderStatusView}>
        <Image source={item.image} style={styles.orderStatusImage} />
      </View>

      <View style={styles.countView}>
        <Text style={styles.countText}>{item.count}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  const renderReviewItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={viewAllReviews ? 0.5 : 1}
      onPress={() => { viewAllReviews ? onPressReview(index) : null }}
      style={styles.reviewRenderView}>
      <View style={{ width: SW(50) }}>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item.items}</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.price}</Text>
        </View>
      </View>

      <View style={{ width: SW(60) }}>
        <Text style={[styles.nameText, { color: COLORS.primary }]}>{item.deliveryType}</Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.timeSlot}</Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

  const renderOrder = ({ item, index }) => (
    <View style={styles.renderOrderView}>
      <Text style={styles.countText}>{item.total}</Text>
      <Text style={[styles.statusText, { textAlign: 'left' }]}>{item.title}</Text>
    </View>
  );

  const renderDeliveryOrders = ({ item, index }) => (
    <View style={styles.deliveryViewStyle}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={item.image} style={[styles.pinIcon, { tintColor: COLORS.primary }]} />
        <Text style={[styles.timeText, { color: COLORS.primary }]}>{item.delivery}</Text>
        <Image source={rightIcon} style={[styles.pinIcon, { left: 5 }]} />
      </View>
      <Text style={styles.totalText}>{item.total}</Text>
    </View>
  );

  const renderProductList = ({ item, index }) => (
    <View style={styles.productViewStyle}>
      <View style={styles.productImageView}>
        <Image source={item.image} style={styles.profileImage} />

        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.boxText}>{item.box}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{'x'}</Text>
        <Text style={styles.priceText}>{item.quantity}</Text>
      </View>

      <Text style={styles.priceText}>{item.price}</Text>
    </View>
  );

  const orderStatusText = () => {
    if (orderAccepted && readyPickup === false) {
      return <Text style={styles.orderReviewText}>{strings.deliveryOrders.ordersPreparing}</Text>
    } else if (orderAccepted && readyPickup) {
      return <Text style={styles.orderReviewText}>{strings.deliveryOrders.ready}</Text>
    } else {
      return <Text style={styles.orderReviewText}>{strings.deliveryOrders.orderReview}</Text>
    }
  };

  const changeView = () => {
    if (viewAllReviews && readyPickup === false) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>{orderStatusText()}</View>

            <View style={{ flex: 1 }}>
              <FlatList
                data={orderReview}
                renderItem={renderReviewItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>

          <View style={styles.orderDetailView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>{strings.deliveryOrders.orderId}</Text>
              <Text style={styles.orderReviewText}>{strings.deliveryOrders.orderDate}</Text>
            </View>

            <View style={styles.profileDetailView}>
              <Image source={profileImage} style={styles.profileImage} />

              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>{strings.deliveryOrders.name}</Text>
                <Text style={[styles.timeText, { paddingLeft: 0 }]}>{strings.deliveryOrders.address}</Text>
              </View>

              <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <Image source={deliveryScooter} style={styles.profileImage} />
                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                  <Text style={[styles.nameText, { color: COLORS.primary, fontFamily: Fonts.SemiBold }]}>{strings.deliveryOrders.deliveryType}</Text>
                  <Text style={styles.timeText}>{strings.deliveryOrders.time}</Text>
                </View>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View>
              <FlatList
                data={productList}
                renderItem={renderProductList}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparatorView} />
                )}
              />
            </View>

            <View style={styles.bottomSheet}>
              <View style={styles.rowView}>
                <Text style={styles.subTotal}>{strings.deliveryOrders.subTotal}</Text>
                <Text style={styles.subTotalValue}>{strings.deliveryOrders.subTotalValue}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>{strings.deliveryOrders.discount}</Text>
                <Text style={styles.discountValue}>{strings.deliveryOrders.discountValue}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>{strings.deliveryOrders.tax}</Text>
                <Text style={styles.discountValue}>{strings.deliveryOrders.subTotalValue}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={styles.totalLabel}>{strings.deliveryOrders.total}</Text>
                <Text style={styles.totalValue}>{strings.deliveryOrders.totalValue}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={styles.discountValue}>{strings.deliveryOrders.items}</Text>
              </View>

              {orderAccepted ? (
                <Button
                  onPress={() => { setReadyForPickup(true) }}
                  style={styles.button}
                  title={strings.deliveryOrders.ready}
                  textStyle={styles.buttonText}
                />
              ) : (
                <View style={styles.orderReviewButton}>
                  <Button
                    style={styles.declineButton}
                    title={strings.deliveryOrders.decline}
                    textStyle={[styles.buttonText, { color: COLORS.primary }]}
                  />

                  <Button
                    onPress={() => { setOrderAccepted(true) }}
                    style={styles.acceptButton}
                    title={strings.deliveryOrders.accept}
                    textStyle={styles.buttonText}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      );
    } else if (viewAllReviews && readyPickup) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>{orderStatusText()}</View>

            <FlatList
              data={orderReview}
              renderItem={renderReviewItem}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.orderDetailView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>{strings.deliveryOrders.orderId}</Text>
              <Text style={styles.orderReviewText}>{strings.deliveryOrders.orderDate}</Text>
            </View>

            <View style={[styles.profileDetailView, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={profileImage} style={styles.profileImage} />

                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                  <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>{strings.deliveryOrders.profileName}</Text>
                  <Text style={[styles.timeText, { paddingLeft: 0 }]}>{strings.deliveryOrders.distance}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <Image source={deliveryScooter} style={styles.profileImage} />
                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                  <Text style={[styles.nameText, { color: COLORS.primary, fontFamily: Fonts.SemiBold }]}>{strings.deliveryOrders.deliveryType}</Text>
                  <Text style={styles.timeText}>{strings.deliveryOrders.time}</Text>
                </View>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View style={{ flex: 1, marginTop: SH(15) }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                showCompass
                region={{
                  latitude: 27.2046,
                  longitude: 77.4977,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={styles.map}>
              </MapView>
              {/* <View>
                    {showOrderStatusModal()}
                  </View> */}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            scrollEnabled={false}
            data={orderStatus}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.contentContainer}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headerMainView}>
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.orderNumberLeftView}>
                  <Spacer space={SH(30)} />
                  <Text style={styles.deliveryText}>{strings.deliveryOrders.orderNumber}</Text>

                  <Spacer space={SH(20)} />
                  <View style={styles.chartView}>

                    {/* <LineChart
                      data={{
                        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        datasets: [
                          {
                            data: [
                              5,45,15,35
                            ]
                          }
                        ]
                      }}
                      width={SW(168)} // from react-native
                      height={SH(310)}
                      withDots={false}
                      withHorizontalLines
                      withVerticalLines
                      withInnerLines
                      fromZero
                      yAxisLabel={''}
                      segments={3}
                      // yAxisInterval={2} // optional, defaults to 1
                      chartConfig={{
                        backgroundColor: COLORS.white,
                        backgroundGradientFrom: COLORS.bluish_green,
                        backgroundGradientTo: COLORS.bluish_green,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => COLORS.white,
                        labelColor: (opacity = 1) => COLORS.darkGray,
                        // style: {
                        //   borderRadius: 16
                        // },
                        propsForDots: {
                          r: "6",
                          strokeWidth: "2",
                          stroke: COLORS.primary
                        }
                      }}
                      // bezier
                      style={{
                        marginVertical: 8,
                        // borderRadius: 16
                      }}
                    /> */}
                    <Image source={chart} style={styles.chartImageStyle} />
                  </View>
                  <Spacer space={SH(30)} />
                </View>

                <Spacer space={SH(40)} />
                <View style={styles.orderNumberLeftView}>
                  <Spacer space={SH(20)} />
                  <Text style={styles.deliveryText}>{strings.deliveryOrders.orderConversion}</Text>

                  <Spacer space={SH(30)} />
                  <View style={styles.conversionRow}>
                    <Image source={conversionBox} style={styles.conversionBoxStyle} />

                    <View style={styles.orderFlatlistView}>
                      <FlatList data={orderConversion} renderItem={renderOrder} />
                    </View>
                  </View>

                  <Spacer space={SH(50)} />
                </View>
              </View>

              <View style={{ flexDirection: 'column' }}>
                <View style={styles.orderReviewRightView}>
                  <Spacer space={SH(20)} />
                  <View style={styles.reviewHeadingView}>
                    <Text style={styles.orderReviewText}>{strings.deliveryOrders.orderReview}</Text>

                    <TouchableOpacity
                      onPress={() => { setViewAllReviews(true) }}
                      style={styles.viewAllView}>
                      <Text style={styles.viewText}>{strings.deliveryOrders.viewAll}</Text>
                    </TouchableOpacity>
                  </View>

                  <Spacer space={SH(15)} />
                  <FlatList
                    data={orderReview}
                    renderItem={renderReviewItem}
                    showsVerticalScrollIndicator={false}
                  />
                </View>

                <Spacer space={SH(20)} />
                <View style={styles.deliveryOrders}>
                  <Text style={styles.orderReviewText}>{strings.deliveryOrders.deliveryOrders}</Text>

                  <FlatList
                    horizontal
                    data={deliveryOrders}
                    renderItem={renderDeliveryOrders}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  const showOrderStatusModal = () => {
    return (
      <View style={styles.orderModalView}>
        <View style={styles.headerTab}>
          <View>
            <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>{strings.deliveryOrders.orderStatus}</Text>
            <Text style={styles.timeText}>{strings.deliveryOrders.assignedDriver}</Text>
          </View>

          <TouchableOpacity onPress={() => { setShowArea(!showArea) }}>
            <Image source={dropdown2} style={[styles.searchImage, { right: 30 }]} />
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        <Spacer space={SH(20)} />
        {showArea ? <View>
          <View style={styles.deliveryStatus}>
            <Image source={radio} style={styles.radioImage} />
            <View style={[styles.justifyContentStyle, { left: 12 }]}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.verifyCode}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.within}</Text>
            </View>
          </View>

          <View style={styles.deliveryStatus}>
            <Image source={delivery} style={styles.deliveryImage} />
            <View style={styles.justifyContentStyle}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.delivery}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.within}</Text>
            </View>
          </View>

          <View style={styles.deliveryStatus}>
            <Image source={delivery} style={styles.deliveryImage} />
            <View style={styles.justifyContentStyle}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.nextTo}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.within}</Text>
            </View>
          </View>

          <View style={styles.deliveryStatus}>
            <Image source={deliveryLine} style={styles.deliveryImage} />
            <View style={styles.justifyContentStyle}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.pickup}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.within}</Text>
            </View>
          </View>

          <View style={styles.deliveryStatus}>
            <Image source={deliveryLine} style={styles.deliveryImage} />
            <View style={styles.justifyContentStyle}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.assign}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.within}</Text>
            </View>
          </View>

          <View style={styles.deliveryStatus}>
            <Image source={deliveryLine} style={styles.deliveryImage} />
            <View style={styles.justifyContentStyle}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.readyToPickup}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.within}</Text>
            </View>
          </View>

          <View style={styles.deliveryStatus}>
            <Image source={deliveryLine} style={styles.deliveryImage} />
            <View style={styles.justifyContentStyle}>
              <Text style={styles.verifyText}>{strings.deliveryOrders.orderAccepted}</Text>
              <Text style={styles.verifyText}>{strings.deliveryOrders.dateTime}</Text>
            </View>
          </View>

        </View> : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {customHeader()}

      {changeView()}
    </View>
  );
}

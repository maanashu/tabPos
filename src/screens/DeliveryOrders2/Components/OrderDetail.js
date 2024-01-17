import React, { memo } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import CustomerDetails from './CustomerDetails';
import ButtonComponent from './ButtonComponent';
import ShipmentTracking from './ShipmentTracking';
import mapCustomStyle from '@/components/MapCustomStyles';
import { deliveryHomeIcon, expand, Fonts, gps, pay, scooter } from '@/assets';

import styles from '../styles';
import {
  amountFormat,
  formattedReturnPrice,
  formattedReturnPriceWithoutSign,
} from '@/utils/GlobalMethods';

const OrderDetail = ({
  userDetail,
  orderDetail,
  renderOrderProducts,
  acceptHandler,
  declineHandler,
  openShippingOrders,
  trackHandler,
  changeMapState,
  mapRef,
  onPressShop,
  isMaximizeStatusView,
  data,
}) => {
  const detailView = () => {
    if (
      userDetail?.status === 0 ||
      userDetail?.status === 1 ||
      userDetail?.status === 2 ||
      userDetail?.status === 8 ||
      (userDetail?.status === 7 && userDetail?.is_delivery_dispute === false)
    ) {
      return (
        <>
          <CustomerDetails orderDetail={userDetail} />

          <View style={{ height: SH(400) }}>
            <FlatList
              scrollEnabled
              data={orderDetail}
              renderItem={renderOrderProducts}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
            />
          </View>

          <View style={styles.orderandPriceView}>
            <View style={{ paddingHorizontal: 15, flex: 1 }}>
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.totalItem}
                </Text>
                <Text style={styles.itemCountText}>
                  {userDetail?.order_details?.length > 0 ? userDetail?.order_details?.length : '0'}
                </Text>
              </View>

              <Spacer space={SH(6)} />
              <Spacer backgroundColor={COLORS.lavender} space={0.4} />
              <Spacer space={SH(6)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderDate}
                </Text>
                <Text style={[styles.itemCountText, { fontSize: ms(8) }]}>
                  {userDetail?.date ? moment.utc(userDetail?.date).format('DD/MM/YYYY') : '00:00'}
                </Text>
              </View>

              <Spacer space={SH(6)} />
              <Spacer backgroundColor={COLORS.lavender} space={0.4} />
              <Spacer space={SH(6)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderId}
                </Text>
                <Text style={styles.itemCountText}>{`#${userDetail?.id}`}</Text>
              </View>
              <Spacer space={SH(6)} />
              <Spacer backgroundColor={COLORS.lavender} space={0.5} />
              <Spacer space={SH(6)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.paymentMethod}
                </Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.alarm_success_50, borderRadius: 100 },
                  ]}
                >
                  <Image
                    source={pay}
                    style={[styles.pinImageStyle, { tintColor: COLORS.success_green }]}
                  />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
                    {userDetail?.mode_of_payment == 'jbr' ? 'JBR coin' : 'cash'}
                  </Text>
                </View>
              </View>

              {/* {userDetail?.status === 2 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 15,
                  }}
                >
                  <Text
                    style={[
                      styles.invoiceText,
                      { fontFamily: Fonts.SemiBold, color: COLORS.solid_grey },
                    ]}
                  >
                    {'OTP for Driver - '}
                  </Text>
                  <Text
                    style={[
                      styles.invoiceText,
                      { fontFamily: Fonts.SemiBold, color: COLORS.solid_grey },
                    ]}
                  >
                    {userDetail?.order_delivery?.seller_otp}
                  </Text>
                </View>
              )} */}
            </View>

            <View style={styles.subTotalView}>
              <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
                <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                  {strings.deliveryOrders.subTotal}
                </Text>
                <Text
                  style={[
                    styles.totalTextStyle,
                    { paddingTop: 0, fontFamily: Fonts.MaisonBold, color: COLORS.navy_blue },
                  ]}
                >
                  $
                  {amountFormat(
                    userDetail?.actual_amount ? Number(userDetail?.actual_amount).toFixed(2) : '0',
                    true
                  )}
                </Text>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle2, { color: COLORS.navy_blue }]}>{'$'}</Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                    {/* {userDetail?.discount ? Number(userDetail?.discount).toFixed(2) : '0'} */}
                    {formattedReturnPriceWithoutSign(userDetail?.discount)}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.invoiceText}>{strings.deliveryOrders.tips}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle2, { color: COLORS.navy_blue }]}>{'$'}</Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                    {amountFormat(Number(userDetail?.tips).toFixed(2) ?? '0', true)}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                  {strings.deliveryOrders.tax}
                </Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle2, { color: COLORS.navy_blue }]}>{'$'}</Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                    {amountFormat(userDetail?.tax ? Number(userDetail?.tax).toFixed(2) : '0', true)}
                  </Text>
                </View>
              </View>
              {userDetail?.delivery_charge !== '0' && (
                <View style={styles.orderDetailsView}>
                  <Text style={styles.invoiceText}>{strings.deliveryOrders.deliveryCharges}</Text>
                  <View style={styles.flexDirectionRow}>
                    <Text style={[styles.totalTextStyle2, { color: COLORS.navy_blue }]}>{'$'}</Text>
                    <Text
                      style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}
                    >
                      {amountFormat(Number(userDetail?.delivery_charge)?.toFixed(2), true)}
                    </Text>
                  </View>
                </View>
              )}

              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.solidGrey,
                  borderStyle: 'dashed',
                  marginTop: ms(5),
                }}
              />

              <View style={styles.orderDetailsView}>
                <Text style={[styles.totalText, { color: COLORS.black }]}>
                  {strings.deliveryOrders.total}
                </Text>
                <View style={styles.flexDirectionRow}>
                  <Text
                    style={[
                      {
                        fontFamily: Fonts.MaisonBold,
                        fontSize: SF(13),
                        color: COLORS.navy_blue,
                        textAlign: 'center',
                      },
                    ]}
                  >
                    {'$'}
                  </Text>
                  <Text style={[styles.totalText, { paddingTop: 0, color: COLORS.navy_blue }]}>
                    {amountFormat(Number(userDetail?.payable_amount).toFixed(2), true)}
                  </Text>
                </View>
              </View>

              <Spacer space={SH(15)} />

              <ButtonComponent
                selected={openShippingOrders}
                orderData={userDetail}
                acceptHandler={acceptHandler}
                declineHandler={declineHandler}
                trackHandler={trackHandler}
              />
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <MapView
            customMapStyle={mapCustomStyle}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: userDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
              longitude: userDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: userDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
              longitude: userDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            <MapViewDirections
              key={userDetail?.order_delivery?.order_pickup_latitude ?? 'key'}
              origin={{
                latitude: userDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: userDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              }}
              destination={{
                latitude: userDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
                longitude: userDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              }}
              apikey={GOOGLE_MAP.API_KEYS}
              strokeWidth={6}
              strokeColor={COLORS.primary}
            />
            <Marker
              zIndex={1}
              coordinate={{
                latitude: userDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: userDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              }}
            >
              {userDetail?.order_delivery !== null && (
                <View>
                  <Image source={scooter} style={styles.mapMarkerStyle} />
                </View>
              )}
            </Marker>
            <Marker
              zIndex={5}
              coordinate={{
                latitude: userDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
                longitude: userDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              }}
            >
              {userDetail?.order_delivery !== null && (
                <View>
                  <Image source={deliveryHomeIcon} style={styles.mapMarkerStyle} />
                </View>
              )}
            </Marker>
          </MapView>

          <TouchableOpacity onPress={() => changeMapState(true)} style={styles.expandButtonStyle}>
            <Image source={expand} style={styles.rightIconStyle} />
            <Text style={[styles.acceptTextStyle, { paddingHorizontal: 12 }]}>{'Expand'}</Text>
          </TouchableOpacity>

          <ShipmentTracking
            orderData={userDetail}
            onPressShop={onPressShop}
            isMaximizeStatusView={isMaximizeStatusView}
          />

          <TouchableOpacity
            onPress={() =>
              mapRef.current.animateToRegion(
                {
                  latitude: userDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                  longitude: userDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                },
                1000
              )
            }
            style={styles.gpsViewStyle}
          >
            <Image source={gps} style={styles.gpsImageStyle} />
          </TouchableOpacity>
        </>
      );
    }
  };

  return <View style={styles.orderDetailView}>{detailView()}</View>;
};

export default memo(OrderDetail);

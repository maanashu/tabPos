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
import { deliveryHomeIcon, expand, Fonts, gps, scooter } from '@/assets';

import styles from '../styles';

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
            <View style={{ paddingLeft: 15, flex: 1 }}>
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
                  {userDetail?.date ? moment(userDetail?.date).format('DD/MM/YYYY') : '00:00'}
                </Text>
              </View>

              <Spacer space={SH(15)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderId}
                </Text>
                <Text style={styles.itemCountText}>{`#${userDetail?.id}`}</Text>
              </View>

              {userDetail?.status === 2 && (
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
              )}
            </View>

            <View style={styles.subTotalView}>
              <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
                <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
                  {strings.deliveryOrders.subTotal}
                </Text>
                <Text
                  style={[styles.totalTextStyle, { paddingTop: 0, fontFamily: Fonts.MaisonBold }]}
                >
                  ${userDetail?.actual_amount ? Number(userDetail?.actual_amount).toFixed(2) : '0'}
                </Text>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.totalTextStyle2}>{'$'}</Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {userDetail?.discount ? Number(userDetail?.discount).toFixed(2) : '0'}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.totalTextStyle2}>{'$'}</Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'0.00'}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.totalTextStyle2}>{'$'}</Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {userDetail?.tax ? Number(userDetail?.tax).toFixed(2) : '0'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.solidGrey,
                  borderStyle: 'dashed',
                  marginTop: ms(5),
                }}
              />

              <View style={styles.orderDetailsView}>
                <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text
                    style={[
                      styles.totalTextStyle2,
                      {
                        fontFamily: Fonts.MaisonBold,
                        fontSize: SF(13),
                        color: COLORS.solid_grey,
                      },
                    ]}
                  >
                    {'$'}
                  </Text>
                  <Text style={[styles.totalText, { paddingTop: 0 }]}>
                    {Number(userDetail?.payable_amount).toFixed(2)}
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
              coordinate={{
                latitude: userDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: userDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              }}
            >
              <View>
                <Image source={scooter} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
            <Marker
              coordinate={{
                latitude: userDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
                longitude: userDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              }}
            >
              <View>
                <Image source={deliveryHomeIcon} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
          </MapView>

          <TouchableOpacity onPress={() => changeMapState(true)} style={styles.expandButtonStyle}>
            <Image source={expand} style={styles.rightIconStyle} />
            <Text style={[styles.acceptTextStyle, { paddingHorizontal: 12 }]}>{'Expand'}</Text>
          </TouchableOpacity>

          <ShipmentTracking orderData={userDetail} onPressShop={onPressShop} />

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

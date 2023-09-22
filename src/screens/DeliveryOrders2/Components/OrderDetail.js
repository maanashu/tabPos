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
  latitude,
  longitude,
  location,
  sourceCoordinate,
  destinationCoordinate,
  changeMapState,
  mapRef,
  onPressShop,
}) => {
  console.log(userDetail?.status);
  return (
    <View style={styles.orderDetailView}>
      {openShippingOrders >= '3' &&
      userDetail?.status === 7 &&
      userDetail?.is_delivery_dispute &&
      userDetail?.status !== 8 ? (
        <>
          <MapView
            customMapStyle={mapCustomStyle}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: latitude ?? 0.0,
              longitude: longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: latitude ?? 0.0,
              longitude: longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            <MapViewDirections
              key={location?.latitude ?? 'key'}
              origin={{
                latitude: latitude ?? 0.0,
                longitude: longitude ?? 0.0,
              }}
              destination={{
                latitude: userDetail?.coordinates?.[0] ?? 0.0,
                longitude: userDetail?.coordinates?.[1] ?? 0.0,
              }}
              apikey={GOOGLE_MAP.API_KEYS}
              strokeWidth={6}
              strokeColor={COLORS.primary}
            />
            <Marker coordinate={sourceCoordinate}>
              <View>
                <Image source={scooter} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
            <Marker coordinate={destinationCoordinate}>
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
                  latitude: latitude ?? 0.0,
                  longitude: longitude ?? 0.0,
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
      ) : (
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
      )}
    </View>
  );
};

export default memo(OrderDetail);

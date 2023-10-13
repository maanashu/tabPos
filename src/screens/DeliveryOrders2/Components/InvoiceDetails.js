import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import { getUser } from '@/selectors/UserSelectors';
import { getOrderData } from '@/actions/AnalyticsAction';
import mapCustomStyle from '@/components/MapCustomStyles';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { deliveryHomeIcon, scooter, crossButton, gps, logo_full, Fonts } from '@/assets';

import styles from '../styles';
import { formattedReturnPrice } from '@/utils/GlobalMethods';

const InvoiceDetails = ({ trackingView, mapRef, orderData }) => {
  const dispatch = useDispatch();
  const getOrder = useSelector(getAnalytics);
  const getUserData = useSelector(getUser);
  const orderDetail = getOrder?.getOrderData;

  useEffect(() => {
    dispatch(getOrderData(orderData?.order_id));
  }, []);

  const renderProductItem = ({ item, index }) => (
    <View style={style.container}>
      <View style={style.subContainer}>
        <Text style={style.count}>{index + 1}</Text>

        <View style={{ marginLeft: ms(10) }}>
          <Text style={[style.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.product_name ?? '-'}
          </Text>
          <View style={style.belowSubContainer}>
            <Text style={style.colorsTitle}>{`QTY : ${item?.qty}`}</Text>
            {/* <Text style={style.colorsTitle}>{item?.product_details?.sku ?? '-'}</Text> */}
          </View>
        </View>
      </View>

      <Text style={style.priceTitle}>{`$${item?.price}` ?? '-'}</Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.firstRowStyle}>
        <View style={styles.storeDetailView}>
          <Text style={style.storeNameText}>
            {`${orderDetail?.seller_details?.organization_name}` ?? '-'}
          </Text>

          <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

          <Text style={style.storeAddressText}>
            {`${orderDetail?.seller_details?.current_address?.street_address ?? '-'}`}
          </Text>

          <Spacer space={SH(5)} backgroundColor={COLORS.transparent} />

          <Text style={style.storeAddressText}>
            {`${orderDetail?.seller_details?.phone_number}` ?? '-'}
          </Text>

          <Text style={[style._commonPayTitle, style.boldInvoice]}>
            Invoice No. # {orderDetail?.invoices?.invoice_number ?? '-'}
          </Text>

          <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

          <View style={{ paddingVertical: 8 }}>
            <FlatList
              renderItem={renderProductItem}
              showsVerticalScrollIndicator={false}
              extraData={orderDetail?.order_details}
              data={orderDetail?.order_details ?? []}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>

          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{strings.deliveryOrders.subTotal}</Text>
            <Text style={style._subTotalPrice}>
              {`$${Number(orderDetail?.actual_amount)?.toFixed(2)}` ?? '-'}
            </Text>
          </View>
          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{'Discount'}</Text>
            <Text style={style._subTotalPrice}>{formattedReturnPrice(orderDetail?.discount)}</Text>
          </View>

          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{strings.deliveryOrders.totalTax}</Text>
            <Text style={style._subTotalPrice}>
              {`$${Number(orderDetail?.tax)?.toFixed(2)}` ?? '-'}
            </Text>
          </View>

          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{strings.deliveryOrders.tips}</Text>
            <Text style={style._subTotalPrice}>
              {`$${Number(orderDetail?.tips)?.toFixed(2)}` ?? '-'}
            </Text>
          </View>

          <View style={style._horizontalLine} />

          {(orderDetail?.delivery_charge !== '0' || orderDetail?.shipping_charge !== '0') && (
            <View style={style._subTotalContainer}>
              <Text style={style._substotalTile}>
                {orderDetail?.delivery_charge !== '0'
                  ? strings.deliveryOrders.deliveryCharges
                  : strings.deliveryOrders.shippingCharges}
              </Text>
              <Text style={style._subTotalPrice}>
                {`$${
                  orderDetail?.delivery_charge !== '0'
                    ? Number(orderDetail?.delivery_charge)?.toFixed(2)
                    : Number(orderDetail?.shipping_charge)?.toFixed(2)
                }` ?? '-'}
              </Text>
            </View>
          )}

          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style.totalPriceLabel}>{strings.deliveryOrders.total}</Text>
            <Text style={style.totalPriceText}>{`$${orderDetail?.payable_amount}` ?? '-'}</Text>
          </View>

          <View style={[style._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

          <View style={style._paymentTitleContainer}>
            <Text style={style._payTitle}>{strings.deliveryOrders.paymentOption} </Text>
            <Text style={style._paySubTitle}>
              {orderDetail?.mode_of_payment?.toUpperCase() ?? '-'}
            </Text>
          </View>

          <Text style={style._commonPayTitle}>
            {moment(orderData?.created_at).format('ddd DD MMM, YYYY HH:mm A') ?? '-'}
          </Text>

          <Text style={style._commonPayTitle}>
            POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
          </Text>

          <Text style={style._commonPayTitle}>
            User ID : #{orderDetail?.user_details?.id ?? '-'}
          </Text>

          <Text style={style._thankyou}>{strings.deliveryOrders2.thanks}</Text>

          <Image source={{ uri: orderDetail?.invoices?.barcode }} style={style._barCodeImage} />

          <Image source={logo_full} style={style.logoFull} />
        </View>

        <View style={styles.mapMainView}>
          <MapView
            customMapStyle={mapCustomStyle}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showCompass
            region={{
              latitude: orderDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
              longitude: orderDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: orderDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
              longitude: orderDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            style={styles.detailMap}
          >
            <MapViewDirections
              key={orderDetail?.order_delivery?.order_pickup_latitude ?? 'key'}
              origin={{
                latitude: orderDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: orderDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              }}
              destination={{
                latitude: orderDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
                longitude: orderDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              }}
              apikey={GOOGLE_MAP.API_KEYS}
              strokeWidth={6}
              strokeColor={COLORS.primary}
            />
            <Marker
              coordinate={{
                latitude: orderDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: orderDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
              }}
            >
              <View>
                <Image source={scooter} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
            <Marker
              coordinate={{
                latitude: orderDetail?.order_delivery?.order_delivery_latitude ?? 0.0,
                longitude: orderDetail?.order_delivery?.order_delivery_longitude ?? 0.0,
              }}
            >
              <View>
                <Image source={deliveryHomeIcon} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
          </MapView>

          <TouchableOpacity
            onPress={() =>
              mapRef.current.animateToRegion(
                {
                  latitude: orderDetail?.order_delivery?.order_pickup_latitude ?? 0.0,
                  longitude: orderDetail?.order_delivery?.order_pickup_longitude ?? 0.0,
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

          <TouchableOpacity
            onPress={trackingView}
            style={[
              styles.expandButtonStyle,
              {
                borderColor: COLORS.dark_grey,
                borderWidth: 1,
                backgroundColor: COLORS.white,
              },
            ]}
          >
            <Image source={crossButton} style={styles.rightIconStyle} />
            <Text
              style={[styles.acceptTextStyle, { color: COLORS.dark_grey, paddingHorizontal: 12 }]}
            >
              {strings.deliveryOrders2.close}
            </Text>
          </TouchableOpacity>

          {/* <ShipmentTracking orderData={orderDetail} onPressShop={onPressShop} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(InvoiceDetails);

const style = StyleSheet.create({
  storeNameText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    textAlign: 'center',
  },
  storeAddressText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    textAlign: 'center',
  },
  container: {
    borderColor: COLORS.washGrey,
    borderWidth: 1,
    paddingHorizontal: ms(8),
    height: ms(28),
    borderRadius: ms(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginTop: ms(5),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(5),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
  },
  colorsTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
  },
  priceTitle: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(5),
  },
  totalPriceLabel: {
    fontSize: ms(6),
    color: COLORS.black,
    marginTop: ms(5),
    fontFamily: Fonts.SemiBold,
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(7),
  },
  totalPriceText: {
    fontSize: ms(6),
    marginTop: ms(7),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  _horizontalLine: {
    height: ms(1),
    width: '90%',
    marginTop: ms(4),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  _paymentTitleContainer: {
    marginTop: ms(5),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(15),
    marginTop: ms(3),
    fontSize: ms(7),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _barCodeImage: {
    height: ms(25),
    width: '70%',
    marginTop: ms(5),
    alignSelf: 'center',
  },
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(10),
    textAlign: 'center',
  },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    marginTop: ms(2),
    alignSelf: 'center',
  },
  boldInvoice: {
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
  },
});

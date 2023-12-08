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
  console.log('dfdsfdsfds', JSON.stringify(orderDetail));

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
      <View style={styles.firstRowStyleInvoice}>
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
            Invoice No. #
            {orderDetail?.status === 9
              ? orderDetail?.returns?.invoices?.invoice_number
              : orderDetail?.invoices?.invoice_number ?? '-'}
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
              {`$${
                orderDetail?.status === 9
                  ? Number(orderDetail?.returns?.products_refunded_amount)?.toFixed(2)
                  : Number(orderDetail?.actual_amount)?.toFixed(2)
              }` ?? '-'}
            </Text>
          </View>
          <View style={style._horizontalLine} />

          {orderDetail?.status === 9 && (
            <View style={style._subTotalContainer}>
              <Text style={style._substotalTile}>{'Delivery Charges'}</Text>
              <Text style={style._subTotalPrice}>
                {`${formattedReturnPrice(orderDetail?.returns?.delivery_charge)}`}
              </Text>
            </View>
          )}
          {/* {New Addition} */}

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{'Delivery Charges'}</Text>
            <Text style={style._subTotalPrice}>
              {`$` + `${parseFloat(orderDetail?.delivery_charge).toFixed(2)}`}
            </Text>
          </View>

          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{'Tip'}</Text>
            <Text style={style._subTotalPrice}>{`${formattedReturnPrice(orderDetail?.tips)}`}</Text>
          </View>
          {/* { Above New Addition} */}
          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style._substotalTile}>{strings.deliveryOrders.totalTax}</Text>
            <Text style={style._subTotalPrice}>
              {`$${
                orderDetail?.status === 9
                  ? Number(orderDetail?.returns?.tax)?.toFixed(2)
                  : Number(orderDetail?.tax)?.toFixed(2)
              }` ?? '-'}
            </Text>
          </View>

          <View style={style._horizontalLine} />

          <View style={style._subTotalContainer}>
            <Text style={style.totalPriceLabel}>{strings.deliveryOrders.total}</Text>
            <Text style={style.totalPriceText}>
              {`$${
                orderDetail?.status === 9
                  ? orderDetail?.returns?.refunded_amount
                  : orderDetail?.payable_amount
              }` ?? '-'}
            </Text>
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

          {/* <Text style={style._thankyou}>{strings.deliveryOrders2.thanks}</Text> */}
          <Image source={logo_full} style={[style.logoFull, { tintColor: COLORS.navy_blue }]} />

          <Image
            source={{ uri: orderDetail?.invoices?.barcode }}
            style={[style._barCodeImage, { tintColor: COLORS.navy_blue }]}
          />
        </View>
        <View style={{ flex: 0.02 }} />
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
                borderColor: COLORS.navy_blue,
                borderWidth: 1,
                backgroundColor: COLORS.white,
              },
            ]}
          >
            <Image source={crossButton} style={styles.rightIconStyle} />
            <Text
              style={[styles.acceptTextStyle, { color: COLORS.navy_blue, paddingHorizontal: 12 }]}
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
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    textAlign: 'center',
  },
  storeAddressText: {
    color: COLORS.navy_blue,
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
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(5),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
  },
  colorsTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
  },
  priceTitle: {
    color: COLORS.navy_blue,
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
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(5),
  },
  totalPriceLabel: {
    fontSize: ms(6),
    color: COLORS.navy_blue,
    marginTop: ms(5),
    fontFamily: Fonts.SemiBold,
  },
  _subTotalPrice: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(7),
  },
  totalPriceText: {
    fontSize: ms(6),
    marginTop: ms(7),
    color: COLORS.navy_blue,
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
    color: COLORS.navy_blue,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(15),
    marginTop: ms(3),
    fontSize: ms(7),
    color: COLORS.navy_blue,
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
    color: COLORS.navy_blue,
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

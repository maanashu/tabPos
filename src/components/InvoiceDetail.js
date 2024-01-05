import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { ms } from 'react-native-size-matters';
import {
  arrowLeftUp,
  barcode,
  crossButton,
  deliveryHomeIcon,
  Fonts,
  leftBack,
  logo_full,
  scooter,
} from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import mapCustomStyle from './MapCustomStyles';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';
import ShipmentTracking from '@/screens/DeliveryOrders2/Components/ShipmentTracking';
import { getUser } from '@/selectors/UserSelectors';
import { DELIVERY_MODE, PAGINATION_DATA } from '@/constants/enums';
import { formattedPrice } from '@/utils/GlobalMethods';

export function InvoiceDetail({ mapRef, closeHandler }) {
  const dispatch = useDispatch();
  const getUserData = useSelector(getUser);
  const getAuth = useSelector(getAuthData);
  const oneOrderDetail = useSelector(getAnalytics);
  const singleOrderDetail = oneOrderDetail?.getOrderData;
  const sellerDetailData = singleOrderDetail?.seller_details;
  const location = getAuth?.merchantLoginData?.user?.user_profiles?.current_address;
  const latitude = parseFloat(location?.latitude ?? 0.0);
  const longitude = parseFloat(location?.longitude ?? 0.0);
  const sourceCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };
  const destinationCoordinate = {
    latitude: singleOrderDetail?.coordinates?.[0] ?? 0.0,
    longitude: singleOrderDetail?.coordinates?.[1] ?? 0.0,
  };

  console.log('first', singleOrderDetail);
  const invoiceData = [
    {
      title: 'Payment Option',
      data: singleOrderDetail?.mode_of_payment?.toUpperCase(),
      id: 1,
    },
    {
      title: 'Date',
      data: moment.utc(singleOrderDetail?.created_at).format('ddd MM/DD/YYYY'),
      id: 2,
    },
    {
      title: 'Mode',
      data: 'Walk-In',
      id: 3,
    },
    {
      title: 'Invoice',
      data: singleOrderDetail?.is_returned_order
        ? singleOrderDetail?.return_detail?.invoices?.invoice_number
        : singleOrderDetail?.invoices?.invoice_number,
      id: 4,
    },
    {
      title: 'POS No.',
      data: getUserData?.posLoginData?.pos_number,
      id: 4,
    },
    {
      title: 'User ID',
      data: getUserData?.posLoginData?.id,
      id: 5,
    },
  ];

  const renderProductItem = ({ item, index }) => {
    const isBookingDateAvailable =
      singleOrderDetail?.appointments?.[0]?.date ||
      singleOrderDetail?.appointments?.[0]?.start_time ||
      singleOrderDetail?.appointments?.[0]?.end_time;
    const bookingDateTime = `${moment
      .utc(singleOrderDetail?.appointments?.[0]?.date)
      .format('DD/MM/YYYY')} @ ${singleOrderDetail?.appointments?.[0]?.start_time}-${
      singleOrderDetail?.appointments?.[0]?.end_time
    }`;
    return (
      <View style={{ height: ms(28) }}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.count}>
              x {singleOrderDetail?.is_returned_order ? item?.order_details?.qty : item?.qty}
            </Text>
            <View style={{ marginLeft: ms(10) }}>
              <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
                {singleOrderDetail?.is_returned_order
                  ? item?.order_details?.product_name
                  : item?.product_details?.name}
              </Text>
            </View>
          </View>
          <View style={{ width: '24%', alignItems: 'flex-end' }}>
            <Text style={styles.priceTitle} numberOfLines={1}>
              {`${formattedPrice(
                singleOrderDetail?.is_returned_order
                  ? item?.order_details?.price * item?.order_details?.qty
                  : item?.price * item?.qty ?? '0.00'
              )}`}
            </Text>
          </View>
        </View>
        {isBookingDateAvailable && (
          <Text style={[styles.priceTitle, styles.container, { marginTop: ms(2) }]}>
            {bookingDateTime}
          </Text>
        )}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}>
      {singleOrderDetail?.delivery_option == 1 || singleOrderDetail?.delivery_option == 4 ? (
        <View style={[styles.firstRowStyle]}>
          <View style={[styles.rightCon, styles.invoiceDetailSection]}>
            <View style={[{ height: '100%' }]}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles._kSubCenterContainer}>
                  {singleOrderDetail?.seller_details?.organization_name ?? ''}
                </Text>
                <Text style={styles._kAddress}>
                  {`${sellerDetailData?.current_address?.city} ${sellerDetailData?.current_address?.country} ${sellerDetailData?.current_address?.zipcode}`}
                </Text>
                <Text style={styles._kNumber}>{`${sellerDetailData?.phone_number}` ?? '-'}</Text>
              </View>
              <View style={styles._flatListContainer}>
                <FlatList
                  data={
                    singleOrderDetail?.is_returned_order
                      ? singleOrderDetail?.return_detail?.return_details
                      : singleOrderDetail?.order_details
                  }
                  style={{ width: '100%' }}
                  renderItem={renderProductItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingLeft: ms(30),
                  // backgroundColor: 'red',
                }}
              >
                <FlatList
                  data={invoiceData}
                  numColumns={3}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        // width: ms(67),
                        height: ms(30),
                        // justifyContent: 'space-between',
                        marginTop: ms(12),
                        flex: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={[styles._payTitle, { letterSpacing: -1, flex: 1 }]}>
                        {item.title}
                      </Text>
                      <Spacer space={SH(7)} />
                      <Text style={[styles._paySubTitle, { flex: 1 }]}>{item.data}</Text>
                    </View>
                  )}
                />
              </View>
              <Spacer space={SH(10)} />
              <View style={[styles._horizontalLine, { width: '100%', borderStyle: 'dashed' }]} />
              <Spacer space={SH(15)} />
              <View style={{ width: '85%', alignSelf: 'center' }}>
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>Sub-Total</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.total_sale_price
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>{'Discount'}</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.discount
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>{'Delivery Charges'}</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.delivery_charge
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>{'Shipping Charges'}</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.shipping_charge
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>Taxes</Text>
                  <Text style={[styles._payTitle]}>{`${formattedPrice(
                    singleOrderDetail?.tax
                  )}`}</Text>
                </View>

                <Spacer space={SH(15)} />
                <View style={styles._subTotalContainer}>
                  <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                    Total
                  </Text>
                  <View style={styles.totalView}>
                    <Text
                      style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}
                    >
                      {`${formattedPrice(singleOrderDetail?.payable_amount)}`}
                    </Text>
                  </View>
                </View>
                <Spacer space={SH(10)} />
                <Image source={logo_full} style={styles.logoFull} />
                <Image
                  source={
                    {
                      uri: singleOrderDetail?.is_returned_order
                        ? singleOrderDetail?.return_detail?.invoices?.barcode
                        : singleOrderDetail?.invoices?.barcode,
                    } ?? barcode
                  }
                  style={[
                    styles._barCodeImage,
                    { alignSelf: 'center', tintColor: COLORS.navy_blue },
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.mapMainView}>
            <MapView
              customMapStyle={mapCustomStyle}
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              showCompass
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
              style={[styles.detailMap]}
            >
              <MapViewDirections
                key={location?.latitude ?? 0.0}
                origin={{
                  latitude: latitude ?? 0.0,
                  longitude: longitude ?? 0.0,
                }}
                destination={{
                  latitude: singleOrderDetail?.coordinates?.[0] ?? 0.0,
                  longitude: singleOrderDetail?.coordinates?.[1] ?? 0.0,
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

            <TouchableOpacity
              onPress={closeHandler}
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
            <ShipmentTracking
              orderData={singleOrderDetail}
              // props={{ status: singleOrderDetail?.status }}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.firstRowStyle]}>
          <TouchableOpacity style={styles.deliveryView} onPress={closeHandler}>
            <Image source={arrowLeftUp} style={styles.backIcon} />
            <Text style={styles.backTitle}>{'Back'}</Text>
          </TouchableOpacity>

          <View style={styles.rightCon}>
            <View style={[{ height: '100%' }]}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles._kSubCenterContainer}>
                  {singleOrderDetail?.seller_details?.organization_name ?? ''}
                </Text>
                <Text style={styles._kAddress}>
                  {`${sellerDetailData?.current_address?.city} ${sellerDetailData?.current_address?.country} ${sellerDetailData?.current_address?.zipcode}`}
                </Text>
                <Text style={styles._kNumber}>{`${sellerDetailData?.phone_number}` ?? '-'}</Text>
              </View>
              <View style={styles._flatListContainer}>
                <FlatList
                  data={
                    singleOrderDetail?.is_returned_order
                      ? singleOrderDetail?.return_detail?.return_details
                      : singleOrderDetail?.order_details
                  }
                  style={{ width: '100%' }}
                  renderItem={renderProductItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingLeft: ms(30),
                  // backgroundColor: 'red',
                }}
              >
                <FlatList
                  data={invoiceData}
                  numColumns={3}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        // width: ms(67),
                        height: ms(30),
                        // justifyContent: 'space-between',
                        marginTop: ms(15),
                        flex: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={[styles._payTitle, { letterSpacing: -1, flex: 1 }]}>
                        {item.title}
                      </Text>
                      <Spacer space={SH(7)} />
                      <Text style={[styles._paySubTitle, { flex: 1 }]}>{item.data}</Text>
                    </View>
                  )}
                />
              </View>
              <Spacer space={SH(7)} />
              <View style={[styles._horizontalLine, { width: '100%', borderStyle: 'dashed' }]} />
              <Spacer space={SH(10)} />
              <View style={{ width: '85%', alignSelf: 'center' }}>
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>Sub-Total</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.total_sale_price
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>{'Discount'}</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.discount
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>{'Delivery  Charges'}</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.delivery_charge
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>{'Shipping Charges'}</Text>
                  <Text style={styles._payTitle}>{`${formattedPrice(
                    singleOrderDetail?.shipping_charge
                  )}`}</Text>
                </View>
                <Spacer space={SH(7)} />
                <View style={styles._subTotalContainer}>
                  <Text style={styles._payTitle}>Taxes</Text>
                  <Text style={[styles._payTitle]}>{`${formattedPrice(
                    singleOrderDetail?.tax
                  )}`}</Text>
                </View>

                <Spacer space={SH(15)} />
                <View style={styles._subTotalContainer}>
                  <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                    Total
                  </Text>
                  <View style={styles.totalView}>
                    <Text
                      style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}
                    >
                      {`${formattedPrice(singleOrderDetail?.payable_amount)}`}
                    </Text>
                  </View>
                </View>
                <Spacer space={SH(15)} />
                <Image source={logo_full} style={styles.logoFull} />

                <Image
                  source={
                    {
                      uri: singleOrderDetail?.is_returned_order
                        ? singleOrderDetail?.return_detail?.invoices?.barcode
                        : singleOrderDetail?.invoices?.barcode,
                    } ?? barcode
                  }
                  style={[
                    styles._barCodeImage,
                    { alignSelf: 'center', tintColor: COLORS.navy_blue },
                  ]}
                />
              </View>
            </View>
          </View>
          <View></View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: ms(8),
    marginLeft: ms(5),
  },
  backIcon: {
    height: ms(16),
    width: ms(16),
    resizeMode: 'contain',
    marginRight: ms(5),
  },
  backTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
  firstRowStyle: {
    flexDirection: 'row',
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
    justifyContent: 'space-between',
  },
  invoiceDetailSection: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: Platform.OS === 'ios' ? windowWidth * 0.25 : windowWidth * 0.27,
    // height: windowHeight * 0.92,
    flex: 0.45,
  },
  mapMainView: {
    flex: 1,
    marginLeft: ms(10),
    // width: Dimensions.get('window').width / 2.2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    // height: windowHeight * 0.92,
  },
  detailMap: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  mapMarkerStyle: { height: ms(30), width: ms(30), resizeMode: 'contain' },
  expandButtonStyle: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end',
    top: 20,
    right: 20,
  },
  onlyInvoiceBackStyle: {
    height: ms(35),
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },

  boldInvoice: {
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
  },

  //

  rightCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.35,
    marginRight: ms(7),
    paddingVertical: ms(8),
  },
  _kSubCenterContainer: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    marginTop: ms(5),
  },
  _kAddress: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(7),
    marginTop: ms(5),
    paddingHorizontal: ms(5),
    textAlign: 'center',
  },
  _kNumber: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(7),
    marginTop: ms(3),
  },
  _flatListContainer: {
    height: ms(100),
    width: '100%',
    marginTop: ms(5),
    // flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.light_purple,
    borderStyle: 'dashed',
  },
  _horizontalLine: {
    // height: ms(1),
    borderWidth: 0.5,
    width: '90%',
    marginTop: ms(4),
    borderColor: COLORS.light_purple,
  },

  _paymentTitleContainer: {
    marginTop: ms(5),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '80%',
  },
  totalView: {
    backgroundColor: COLORS.textInputBackground,
    height: ms(25),
    paddingHorizontal: ms(10),
    justifyContent: 'center',
    borderRadius: ms(12),
  },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
    alignSelf: 'center',
  },
  _barCodeImage: {
    height: ms(25),
    width: '70%',
    marginTop: ms(5),
  },

  container: {
    paddingHorizontal: ms(8),
    // height: ms(28),
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
    fontSize: ms(6),
  },

  priceTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
    // marginLeft: ms(10),
  },
});

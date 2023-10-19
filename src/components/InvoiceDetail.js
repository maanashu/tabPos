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
import { formattedReturnPrice } from '@/utils/GlobalMethods';

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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}>
      {singleOrderDetail?.delivery_option == 1 || singleOrderDetail?.delivery_option == 4 ? (
        <View style={[styles.firstRowStyle]}>
          <View style={styles.invoiceDetailSection}>
            <View style={[{ height: '100%', alignItems: 'center' }]}>
              <Text style={styles._kSubCenterContainer}>
                {singleOrderDetail?.seller_details?.organization_name ?? ''}
              </Text>
              <Text style={styles._kAddress}>
                {`${sellerDetailData?.current_address?.city} ${sellerDetailData?.current_address?.country} ${sellerDetailData?.current_address?.zipcode}`}
              </Text>
              <Text style={styles._kAddress}>{sellerDetailData?.phone_number ?? '-'}</Text>
              <Text style={[styles._commonPayTitle, styles.boldInvoice]}>
                {`Invoice No. #${
                  singleOrderDetail?.is_returned_order
                    ? singleOrderDetail?.return_detail?.invoices?.invoice_number
                    : singleOrderDetail?.invoices?.invoice_number
                }`}
              </Text>
              <View style={styles._flatListContainer}>
                <FlatList
                  data={
                    singleOrderDetail?.is_returned_order
                      ? singleOrderDetail?.return_detail?.return_details
                      : singleOrderDetail?.order_details
                  }
                  style={{ width: '100%' }}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.cartcontainer}>
                        <View style={styles.subContainer}>
                          <Text style={styles.count}>{index + 1}</Text>
                          <View style={{ marginLeft: ms(10) }}>
                            <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
                              {singleOrderDetail?.is_returned_order
                                ? item?.order_details?.product_name
                                : item?.product_details?.name}
                            </Text>
                            <View style={styles.belowSubContainer}>
                              {/* <Text style={styles.colorsTitle}>Colors : Gray</Text>
                            <Text style={styles.sizeTitle}>Size : XXL</Text> */}
                              <Text style={styles.colorsTitle}>
                                QTY :
                                {singleOrderDetail?.is_returned_order
                                  ? item?.order_details?.qty
                                  : item?.qty}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Text style={styles.priceTitle}>
                          $
                          {singleOrderDetail?.is_returned_order
                            ? item?.order_details?.price
                            : item?.price ?? '0.00'}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Spacer space={SH(10)} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Sub-Total</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.total_sale_price)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View style={styles._horizontalLine} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Discount</Text>
                <Text style={styles._subTotalPrice}>
                  {formattedReturnPrice(singleOrderDetail?.discount)}
                </Text>
              </View>

              <View style={styles._horizontalLine} />

              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Tips</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.tips)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View style={styles._horizontalLine} />

              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Total Taxes</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.tax)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <View style={styles._horizontalLine} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Delivery charges</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.delivery_charge)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View style={styles._horizontalLine} />

              <View style={styles._subTotalContainer}>
                <Text
                  style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
                >
                  Total
                </Text>
                <Text
                  style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
                >
                  ${Number(singleOrderDetail?.payable_amount)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              {/* <View style={styles._horizontalLine} /> */}
              <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

              <View style={styles._paymentTitleContainer}>
                <Text style={styles._payTitle}>Payment option: </Text>
                <Text style={styles._paySubTitle}>
                  {singleOrderDetail?.mode_of_payment?.toUpperCase() ?? '-'}
                </Text>
              </View>
              <Text style={styles._commonPayTitle}>
                {moment(singleOrderDetail?.created_at).format('llll')}
              </Text>
              <Text style={styles._commonPayTitle}>Walk-In</Text>

              <Text style={styles._commonPayTitle}>
                POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
              </Text>
              <Text style={styles._commonPayTitle}>
                User ID : #{getUserData?.posLoginData?.id ?? '-'}
              </Text>

              <Text style={styles._thankyou}>Thank You</Text>
              <Image
                source={{ uri: singleOrderDetail?.invoices?.barcode }}
                style={styles._barCodeImage}
              />
              {/* <Text style={styles._barCode}>ABC-abc-1234</Text> */}
              <Image source={logo_full} style={styles.logoFull} />
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
            <ShipmentTracking
              orderData={singleOrderDetail}
              // props={{ status: singleOrderDetail?.status }}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.firstRowStyle]}>
          <TouchableOpacity style={styles.deliveryView} onPress={closeHandler}>
            <Image source={leftBack} style={styles.backIcon} />
            <Text style={styles.backTitle}>{'Back'}</Text>
          </TouchableOpacity>
          <View style={styles.invoiceDetailSection}>
            <View style={[{ height: '100%', alignItems: 'center' }]}>
              <Text style={styles._kSubCenterContainer}>
                {singleOrderDetail?.seller_details?.organization_name ?? ''}
              </Text>
              <Text style={styles._kAddress}>
                {`${sellerDetailData?.current_address?.city} ${sellerDetailData?.current_address?.country} ${sellerDetailData?.current_address?.zipcode}`}
              </Text>
              <Text style={styles._kAddress}>{sellerDetailData?.phone_number ?? '-'}</Text>
              <Text style={[styles._commonPayTitle, styles.boldInvoice]}>
                {/* {`Invoice No. #${singleOrderDetail?.invoices?.invoice_number}` ?? '-'} */}

                {`Invoice No. #${
                  singleOrderDetail?.is_returned_order
                    ? singleOrderDetail?.return_detail?.invoices?.invoice_number
                    : singleOrderDetail?.invoices?.invoice_number
                }`}
              </Text>
              <View style={styles._flatListContainer}>
                <FlatList
                  data={
                    singleOrderDetail?.is_returned_order
                      ? singleOrderDetail?.return_detail?.return_details
                      : singleOrderDetail?.order_details
                  }
                  style={{ width: '100%' }}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.cartcontainer}>
                        <View style={styles.subContainer}>
                          <Text style={styles.count}>{index + 1}</Text>
                          <View style={{ marginLeft: ms(10) }}>
                            <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
                              {singleOrderDetail?.is_returned_order
                                ? item?.order_details?.product_name
                                : item?.product_details?.name}
                            </Text>
                            <View style={styles.belowSubContainer}>
                              {/* <Text style={styles.colorsTitle}>Colors : Gray</Text>
                          <Text style={styles.sizeTitle}>Size : XXL</Text> */}
                              <Text style={styles.colorsTitle}>
                                QTY :
                                {singleOrderDetail?.is_returned_order
                                  ? item?.order_details?.qty
                                  : item?.qty}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Text style={styles.priceTitle}>
                          $
                          {singleOrderDetail?.is_returned_order
                            ? item?.order_details?.price
                            : item?.price ?? '0.00'}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Spacer space={SH(10)} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Sub-Total</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.total_sale_price)?.toFixed(2) ?? '0'}
                </Text>
              </View>

              <View style={styles._horizontalLine} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Discount</Text>
                <Text style={styles._subTotalPrice}>
                  {formattedReturnPrice(singleOrderDetail?.discount)}
                </Text>
              </View>

              <View style={styles._horizontalLine} />

              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Tips</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.tips)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View style={styles._horizontalLine} />

              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Total Taxes</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.tax)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <View style={styles._horizontalLine} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._substotalTile}>Delivery charges</Text>
                <Text style={styles._subTotalPrice}>
                  ${Number(singleOrderDetail?.delivery_charge)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View style={styles._horizontalLine} />

              <View style={styles._subTotalContainer}>
                <Text
                  style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
                >
                  Total
                </Text>
                <Text
                  style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
                >
                  ${Number(singleOrderDetail?.payable_amount)?.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              {/* <View style={styles._horizontalLine} /> */}
              <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

              <View style={styles._paymentTitleContainer}>
                <Text style={styles._payTitle}>Payment option: </Text>
                <Text style={styles._paySubTitle}>
                  {singleOrderDetail?.mode_of_payment?.toUpperCase() ?? '-'}
                </Text>
              </View>
              <Text style={styles._commonPayTitle}>
                {moment(singleOrderDetail?.created_at).format('llll')}
              </Text>
              <Text style={styles._commonPayTitle}>Walk-In</Text>
              <Text style={styles._commonPayTitle}>
                POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
              </Text>
              <Text style={styles._commonPayTitle}>
                User ID : #{getUserData?.posLoginData?.id ?? '-'}
              </Text>

              <Text style={styles._thankyou}>Thank You</Text>
              <Image
                source={{ uri: singleOrderDetail?.invoices?.barcode }}
                style={styles._barCodeImage}
              />
              {/* <Text style={styles._barCode}>ABC-abc-1234</Text> */}
              <Image source={logo_full} style={styles.logoFull} />
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
    height: ms(10),
    width: ms(10),
    resizeMode: 'contain',
    marginRight: ms(3),
  },
  backTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
  },
  firstRowStyle: {
    flexDirection: 'row',
    paddingVertical: ms(10),
    paddingHorizontal: ms(10),
    justifyContent: 'space-between',
  },
  invoiceDetailSection: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: Platform.OS === 'ios' ? windowWidth * 0.25 : windowWidth * 0.27,
    height: windowHeight * 0.92,
  },
  _kSubCenterContainer: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginTop: ms(5),
  },
  _kAddress: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    marginTop: ms(5),
    paddingHorizontal: ms(5),
  },
  _flatListContainer: { height: ms(100), width: '100%', marginTop: ms(5) },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(4),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(4),
  },
  _horizontalLine: {
    height: ms(1),
    width: '90%',
    marginTop: ms(4),
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
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(10),
  },
  _barCodeImage: { height: ms(25), width: '70%', marginTop: ms(5) },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    marginTop: ms(2),
  },
  mapMainView: {
    flex: 1,
    marginLeft: ms(10),
    // width: Dimensions.get('window').width / 2.2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: windowHeight * 0.92,
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
  cartcontainer: {
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
  sizeTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
    marginLeft: ms(10),
  },
  priceTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    marginLeft: ms(10),
  },
  boldInvoice: {
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
  },
});

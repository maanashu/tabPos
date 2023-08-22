import React from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import ShipmentTracking from './ShipmentTracking';
import { getReviewDefault } from '@/actions/DeliveryAction';
import { deliveryHomeIcon, Fonts, scooter, backArrow2, barcode, crossButton } from '@/assets';

import styles from '../styles';
import { useDispatch } from 'react-redux';

const InvoiceDetails = ({
  setTrackingView,
  singleOrderDetail,
  latitude,
  longitude,
  sourceCoordinate,
  destinationCoordinate,
  openShippingOrders,
  sellerID,
  renderOrderDetailProducts,
  location,
}) => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity onPress={() => setTrackingView(false)} style={styles.backView}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
          {strings.deliveryOrders.back}
        </Text>
      </TouchableOpacity>

      <View style={styles.firstRowStyle}>
        <View
          style={{
            width: Dimensions.get('window').width / 3,
            marginTop: ms(10),
            backgroundColor: COLORS.white,
            borderRadius: 15,
            paddingBottom: 80,
          }}
        >
          <Text style={styles.firstNameText}>
            {singleOrderDetail?.user_details?.firstname ?? ''}
          </Text>
          <Text style={styles.addressTextStyle}>
            {singleOrderDetail?.user_details?.current_address?.street_address +
              ', ' +
              singleOrderDetail?.user_details?.current_address?.city +
              ', ' +
              singleOrderDetail?.user_details?.current_address?.country +
              ' ' +
              singleOrderDetail?.user_details?.current_address?.zipcode ?? ''}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: ms(9),
              color: COLORS.dark_grey,
              paddingTop: ms(5),
              textAlign: 'center',
            }}
          >
            {singleOrderDetail?.user_details?.phone_number ?? ''}
          </Text>
          <Spacer space={SH(40)} />
          <FlatList
            data={singleOrderDetail?.order_details}
            renderItem={renderOrderDetailProducts}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={[
                styles.subTotalView,
                {
                  backgroundColor: COLORS.white,
                  width: Dimensions.get('window').width / 3,
                },
              ]}
            >
              <View style={styles.orderDetailsView}>
                <Text style={styles.countTextStyle}>{strings.deliveryOrders.subTotal}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'$'}
                  </Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {singleOrderDetail?.total_sale_price ?? '0'}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.countTextStyle}>{'Discount ( MIDApril100)'}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'$'}
                  </Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {singleOrderDetail?.discount ?? '0'}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.countTextStyle}>{'Tax'}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'$'}
                  </Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {singleOrderDetail?.tax ?? '0'}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetailsView}>
                <Text style={styles.countTextStyle}>{'Delivery Charges'}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'$'}
                  </Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {singleOrderDetail?.order_delivery?.amount}
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
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'$'}
                  </Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {singleOrderDetail?.payable_amount}
                  </Text>
                </View>
              </View>

              <Spacer space={SH(15)} />
            </View>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Regular,
                fontSize: ms(9),
                color: COLORS.dark_grey,
              }}
            >
              {'Payment Option: '}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.SemiBold,
                fontSize: ms(9),
                color: COLORS.dark_grey,
              }}
            >
              {singleOrderDetail?.mode_of_payment?.toUpperCase()}
            </Text>
          </View>

          <Text
            style={{
              paddingLeft: 15,
              fontFamily: Fonts.Regular,
              fontSize: ms(9),
              paddingTop: ms(5),
              color: COLORS.dark_grey,
            }}
          >
            {moment(singleOrderDetail?.invoice?.delivery_date).format('llll')}
          </Text>

          <Text
            style={{
              paddingLeft: 15,
              fontFamily: Fonts.Regular,
              fontSize: ms(9),
              paddingTop: ms(5),
              color: COLORS.dark_grey,
            }}
          >
            {`Invoice No. #${singleOrderDetail?.invoice?.invoice_id}`}
          </Text>

          <Text
            style={{
              paddingLeft: 15,
              fontFamily: Fonts.Regular,
              fontSize: ms(9),
              paddingTop: ms(5),
              color: COLORS.dark_grey,
            }}
          >
            {`User ID:${singleOrderDetail?.user_details?.uid}`}
          </Text>

          <Spacer space={SH(45)} />
          <Text
            style={{
              fontFamily: Fonts.MaisonBold,
              fontSize: ms(16),
              textAlign: 'center',
              color: COLORS.dark_grey,
            }}
          >
            {`Thank You`}
          </Text>

          <Spacer space={SH(15)} />
          <Image source={barcode} style={{ alignSelf: 'center', height: 50 }} />

          <Text
            style={{
              fontFamily: Fonts.Bold,
              fontSize: ms(16),
              textAlign: 'center',
              color: COLORS.primary,
            }}
          >
            {`JOBR`}
          </Text>
        </View>

        <View
          style={{
            width: Dimensions.get('window').width / 2.2,
            marginTop: ms(10),
            borderRadius: 15,
          }}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            showCompass
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: latitude ?? 0.0,
              longitude: longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            style={styles.detailMap}
          >
            <MapViewDirections
              key={location?.latitude}
              origin={{
                latitude: latitude,
                longitude: longitude,
              }}
              destination={{
                latitude: singleOrderDetail?.coordinates?.[0],
                longitude: singleOrderDetail?.coordinates?.[1],
              }}
              apikey={GOOGLE_MAP.API_KEYS}
              strokeWidth={6}
              strokeColor={COLORS.primary}
            />
            <Marker coordinate={sourceCoordinate}>
              <View>
                <Image
                  source={scooter}
                  style={{ height: ms(30), width: ms(30), resizeMode: 'contain' }}
                />
              </View>
            </Marker>
            <Marker coordinate={destinationCoordinate}>
              <View>
                <Image
                  source={deliveryHomeIcon}
                  style={{ height: ms(30), width: ms(30), resizeMode: 'contain' }}
                />
              </View>
            </Marker>
          </MapView>

          <TouchableOpacity
            onPress={() => {
              setTrackingView(false);
              dispatch(getReviewDefault(openShippingOrders, sellerID, 1));
            }}
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
              {'Close'}
            </Text>
          </TouchableOpacity>

          <ShipmentTracking props={{ status: singleOrderDetail?.status }} />
        </View>
      </View>
    </View>
  );
};

export default InvoiceDetails;

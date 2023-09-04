import React, { memo } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import ShipmentTracking from './ShipmentTracking';
import mapCustomStyle from '@/components/MapCustomStyles';
import { getReviewDefault } from '@/actions/DeliveryAction';
import { deliveryHomeIcon, scooter, barcode, crossButton, gps } from '@/assets';

import styles from '../styles';

const InvoiceDetails = ({
  setTrackingView,
  singleOrderDetail,
  latitude,
  longitude,
  sourceCoordinate,
  destinationCoordinate,
  openShippingOrders,
  renderOrderDetailProducts,
  location,
  mapRef,
}) => {
  const dispatch = useDispatch();
  const userDetailData = singleOrderDetail?.user_details;
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.firstRowStyle]}>
        <View style={styles.storeDetailView}>
          <Text style={styles.firstNameText}>
            {singleOrderDetail?.seller_details?.organization_name ?? ''}
          </Text>
          <Text style={styles.addressTextStyle}>
            {`${userDetailData?.current_address?.street_address}`}
          </Text>
          <Text style={styles.addressTextStyle}>
            {' '}
            {`${userDetailData?.current_address?.city} ${userDetailData?.current_address?.country} ${userDetailData?.current_address?.zipcode}`}
          </Text>

          <Text style={styles.storeNumberText}>{userDetailData?.phone_number ?? ''}</Text>

          <Spacer space={SH(10)} />

          <FlatList
            data={singleOrderDetail?.order_details}
            renderItem={renderOrderDetailProducts}
          />

          <View style={[styles.shippingOrdersViewStyle, { bottom: 0 }]}>
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
                <Text style={styles.countTextStyle}>{strings.wallet.discount}</Text>
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
                <Text style={styles.countTextStyle}>{strings.deliveryOrders.tax}</Text>
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
                <Text style={styles.countTextStyle}>{strings.deliveryOrders.deliveryCharges}</Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {'$'}
                  </Text>
                  <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                    {singleOrderDetail?.order_delivery?.amount}
                  </Text>
                </View>
              </View>

              <View style={styles.dashedLineView} />

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

          <View style={styles.paymentOptionView}>
            <Text style={styles.paymentOptionText}>{strings.deliveryOrders.paymentOption}</Text>
            <Text style={styles.paymentModeText}>
              {singleOrderDetail?.mode_of_payment?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.deliveryDateText}>
            {moment(singleOrderDetail?.invoice?.delivery_date).format('llll')}
          </Text>

          <Text style={styles.deliveryDateText}>
            {`Invoice No. #${singleOrderDetail?.invoice?.invoice_id}`}
          </Text>

          <Text style={styles.deliveryDateText}>{`User ID:${userDetailData?.uid}`}</Text>

          <Spacer space={SH(35)} />

          <Text style={styles.thankYouText}>{strings.deliveryOrders2.thanks}</Text>

          <Spacer space={SH(15)} />
          <Image source={barcode} style={{ alignSelf: 'center', height: 50 }} />

          <Text style={styles.jobrTextStyle}>{strings.deliveryOrders2.jobr}</Text>
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
            style={styles.detailMap}
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

          <TouchableOpacity
            onPress={() => {
              setTrackingView(false);
              dispatch(getReviewDefault(openShippingOrders, 1));
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
              {strings.deliveryOrders2.close}
            </Text>
          </TouchableOpacity>

          <ShipmentTracking props={{ status: singleOrderDetail?.status }} />
        </View>
      </View>
    </View>
  );
};

export default memo(InvoiceDetails);

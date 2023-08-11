import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { deliveryHomeIcon, Fonts, scooter, storeTracker, userImage } from '@/assets';

import styles from '../ShippingOrder2.styles';
import ShipmentTracking from './ShipmentTracking';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getAuthData } from '@/selectors/AuthSelector';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AnalyticsTypes';
import { getAnalytics } from '@/selectors/AnalyticsSelector';

const OrderDetail = ({
  renderAllOrdersToReview,
  ordersList,
  openShippingOrders,
  userDetail,
  orderDetail,
  renderOrderProducts,
  declineHandler,
  acceptHandler,
}) => {
  const user = useSelector(getAuthData);
  const location = user?.merchantLoginData?.user?.user_profiles?.current_address;
  const oneOrderDetail = useSelector(getAnalytics);

  const sourceCoordinate = {
    latitude: location?.latitude,
    longitude: location?.longitude,
  };
  const destinationCoordinate = {
    latitude: oneOrderDetail?.getOrderData?.coordinates?.[0],
    longitude: oneOrderDetail?.getOrderData?.coordinates?.[1],
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_ORDER_DATA], state));

  return (
    <>
      {/* {openShippingOrders >= '3' ? (
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <View style={[styles.loader, { backgroundColor: 'transparent' }]}>
              <ActivityIndicator size={'large'} style={styles.loader} color={COLORS.primary} />
            </View>
          ) : (
            <>
              <MapView
                provider={PROVIDER_GOOGLE}
                showCompass
                region={{
                  latitude: location?.latitude,
                  longitude: location?.longitude,
                  latitudeDelta: 0.0992,
                  longitudeDelta: 0.0421,
                }}
                style={styles.map}
              >
                <MapViewDirections
                  key={location?.latitude}
                  origin={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                  }}
                  destination={{
                    latitude: oneOrderDetail?.getOrderData?.coordinates?.[0],
                    longitude: oneOrderDetail?.getOrderData?.coordinates?.[1],
                  }}
                  apikey={GOOGLE_MAP.API_KEYS}
                  strokeWidth={10}
                  strokeColor={COLORS.primary}
                />
                <Marker coordinate={sourceCoordinate}>
                  <View>
                    <Image
                      source={storeTracker}
                      style={{ height: ms(50), width: ms(50) }}
                      resizeMode="contain"
                    />
                  </View>
                </Marker>
                <Marker coordinate={destinationCoordinate}>
                  <View>
                    <Image
                      source={deliveryHomeIcon}
                      style={{ height: ms(50), width: ms(50) }}
                      resizeMode="contain"
                    />
                  </View>
                </Marker>
              </MapView>
              <ShipmentTracking
                props={{ status: oneOrderDetail?.getOrderData?.status, data: '' }}
              />
            </>
          )}
        </View>
      ) : ( */}
      <View style={styles.orderDetailView}>
        <View style={styles.orderDetailViewStyle}>
          <View style={[styles.locationViewStyle, { width: ms(140) }]}>
            <Image
              source={
                userDetail?.user_details?.profile_photo
                  ? { uri: userDetail?.user_details?.profile_photo }
                  : userImage
              }
              style={styles.userImageStyle}
            />

            <View style={styles.userNameView}>
              <Text style={[styles.totalTextStyle, { padding: 0 }]}>
                {userDetail?.user_details?.firstname
                  ? userDetail?.user_details?.firstname
                  : 'user name'}
              </Text>
              <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
                {userDetail?.address}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.locationViewStyle,
              { width: ms(120), right: Platform.OS === 'ios' ? 20 : 15 },
            ]}
          >
            <Image source={scooter} style={styles.scooterImageStyle} />

            <View style={[styles.userNameView, { paddingLeft: 5 }]}>
              <Text
                style={{
                  fontFamily: Fonts.Bold,
                  fontSize: SF(14),
                  color: COLORS.primary,
                }}
              >
                {userDetail?.delivery_details?.title ?? ''}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Medium,
                  fontSize: SF(11),
                  color: COLORS.dark_grey,
                }}
              >
                {userDetail?.preffered_delivery_start_time
                  ? userDetail?.preffered_delivery_start_time
                  : '00.00'}
                {'-'}{' '}
                {userDetail?.preffered_delivery_end_time
                  ? userDetail?.preffered_delivery_end_time
                  : '00.00'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: ms(300) }}>
          <FlatList
            scrollEnabled
            data={orderDetail}
            renderItem={renderOrderProducts}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
          />
        </View>

        <View style={styles.orderandPriceView}>
          <View style={{ paddingLeft: 15 }}>
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
              <Text style={styles.itemCountText}>{userDetail?.id}</Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
              <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
                {strings.deliveryOrders.subTotal}
              </Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {userDetail?.actual_amount ? userDetail?.actual_amount : '0'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {userDetail?.discount ? userDetail?.discount : '0'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {strings.deliveryOrders.subTotalValue}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {userDetail?.tax ? userDetail?.tax : '0'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
              <Text style={styles.totalText}>{'$' + userDetail?.payable_amount}</Text>
            </View>

            <Spacer space={ms(10)} />
            {openShippingOrders == 0 || openShippingOrders == 1 || openShippingOrders == 2 ? (
              <View style={styles.shippingOrdersViewStyle}>
                {openShippingOrders === '0' ? (
                  <TouchableOpacity
                    onPress={() => declineHandler(userDetail?.id)}
                    style={styles.declineButtonStyle}
                  >
                    <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
                  </TouchableOpacity>
                ) : null}

                {openShippingOrders === '0' ||
                openShippingOrders === '1' ||
                openShippingOrders === '2' ? (
                  <TouchableOpacity
                    onPress={() =>
                      acceptHandler(
                        userDetail?.id,
                        openShippingOrders === '0' ? 1 : openShippingOrders === '1' ? 2 : 3
                      )
                    }
                    style={styles.acceptButtonView}
                  >
                    <Text style={styles.acceptTextStyle}>
                      {openShippingOrders === '0'
                        ? strings.buttonStatus.reviewButton
                        : openShippingOrders === '1'
                        ? strings.buttonStatus.acceptedButton
                        : openShippingOrders === '2'
                        ? strings.buttonStatus.prepareButton
                        : ''}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.acceptButtonView}>
                    <Text style={styles.acceptTextStyle}>{'Track order'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        </View>
      </View>
      {/* )} */}
    </>
  );
};

export default OrderDetail;

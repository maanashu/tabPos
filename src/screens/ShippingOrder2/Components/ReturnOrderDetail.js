import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { Fonts, scooter, userImage } from '@/assets';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAnalytics } from '@/selectors/AnalyticsSelector';

const { width, height } = Dimensions.get('window');

const ReturnOrderDetail = ({
  openShippingOrders,
  userDetail,
  orderDetail,
  renderOrderProducts,
  declineHandler,
  acceptHandler,
  trackOrderHandler,
}) => {
  const user = useSelector(getAuthData);
  const location = user?.merchantLoginData?.user?.user_profiles?.current_address;
  const oneOrderDetail = useSelector(getAnalytics);
  const getTrackingInfo = oneOrderDetail?.getOrderData?.tracking_info;

  return (
    <>
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
              <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>{location.city}</Text>
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
                {userDetail?.invoice?.delivery_date ?? ''}
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

            <Spacer space={SH(15)} />
            {openShippingOrders > '2' && (
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Tracking ID'}</Text>
                <Text
                  style={[
                    styles.invoiceText,
                    { fontFamily: Fonts.SemiBold, color: COLORS.solid_grey },
                  ]}
                >
                  {getTrackingInfo?.track_id}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              width: ms(200),
              paddingHorizontal: ms(20),
              borderRadius: 10,
              paddingVertical: 20,
              alignSelf: 'center',
              backgroundColor: COLORS.textInputBackground,
            }}
          >
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
            {openShippingOrders == '0' || openShippingOrders == '1' || openShippingOrders == '2' ? (
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
                    style={[
                      styles.acceptButtonView,
                      { width: openShippingOrders > '0' ? ms(170) : ms(80) },
                    ]}
                  >
                    <Text style={styles.acceptTextStyle}>
                      {openShippingOrders === '0'
                        ? strings.buttonStatus.reviewButton
                        : openShippingOrders === '1'
                        ? strings.buttonStatus.acceptedButton
                        : openShippingOrders === '2'
                        ? strings.buttonStatus.printlabel
                        : ''}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
              <View style={styles.shippingOrdersViewStyle}>
                <TouchableOpacity
                  onPress={() => trackOrderHandler(getTrackingInfo)}
                  style={[styles.acceptButtonView, { width: ms(170) }]}
                >
                  <Text style={styles.acceptTextStyle}>{'Track order'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default memo(ReturnOrderDetail);

const styles = StyleSheet.create({
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 0.3,
    height: height - 120,
    marginBottom: 90,
  },
  userDetailView: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    height: SH(80),
    marginVertical: 10,
    flexDirection: 'row',
    borderWidth: 1,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: 20,
    width: width / 2.4,
    backgroundColor: COLORS.textInputBackground,
  },
  userImageStyle: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(10),
    resizeMode: 'cover',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  userNameView: {
    paddingLeft: 10,
  },
});

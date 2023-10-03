import React from 'react';
import { View, Text, Image, Platform, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { Fonts, scooter, userImage } from '@/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';

import styles from '../ShippingOrder2.styles';

const OrderDetail = ({
  openShippingOrders,
  userDetail,
  orderDetail,
  renderOrderProducts,
  declineHandler,
  acceptHandler,
  trackOrderHandler,
}) => {
  const oneOrderDetail = useSelector(getAnalytics);
  const getTrackingInfo = oneOrderDetail?.getOrderData?.tracking_info;

  return (
    <>
      <View style={styles.orderDetailView}>
        <View style={styles.orderDetailViewStyle}>
          <View style={[styles.locationViewStyle, { flex: 0.95 }]}>
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
                {userDetail?.invoice?.delivery_date ??
                  moment(userDetail?.created_at).format('YYYY-MM-DD')}
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

        <View style={[styles.orderandPriceView, { flex: 0.9 }]}>
          <View style={{ paddingLeft: 15, flex: 0.3 }}>
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
                {userDetail?.date
                  ? moment(userDetail?.date).format('DD/MM/YYYY')
                  : moment(userDetail?.created_at).format('YYYY-MM-DD')}
              </Text>
            </View>

            <Spacer space={SH(15)} />
            <View>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {strings.shippingOrder.orderId}
              </Text>
              <Text style={styles.itemCountText}>{`#${userDetail?.id}`}</Text>
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
              flex: 0.6,
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

export default OrderDetail;

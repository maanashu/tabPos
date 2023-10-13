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
  const profileImage = userDetail?.user_details?.profile_photo;

  const buttonFunction = () => {
    if (openShippingOrders === '0') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <TouchableOpacity
            onPress={() => declineHandler(userDetail?.id)}
            style={styles.declineButtonStyle}
          >
            <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => acceptHandler(userDetail?.id, 3)}
            style={[styles.acceptButtonView, { width: ms(80) }]}
          >
            <Text style={styles.acceptTextStyle}>{strings.buttonStatus.reviewButton}</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (openShippingOrders === '3') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <TouchableOpacity
            onPress={() => acceptHandler(userDetail?.id, 4)}
            style={[styles.acceptButtonView, { width: ms(170) }]}
          >
            <Text style={styles.acceptTextStyle}>{strings.buttonStatus.printlabel}</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (openShippingOrders === '4' || openShippingOrders === '5') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <TouchableOpacity
            onPress={() => trackOrderHandler(getTrackingInfo)}
            style={[styles.acceptButtonView, { width: ms(140) }]}
          >
            <Text style={styles.acceptTextStyle}>{'Track order'}</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (openShippingOrders === '7,8') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <View
            onPress={() => trackOrderHandler(getTrackingInfo)}
            style={[styles.acceptButtonView, { backgroundColor: COLORS.washGrey, width: ms(140) }]}
          >
            <Text style={[styles.acceptTextStyle, { color: COLORS.text }]}>
              {'Cancelled by user'}
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <>
      <View style={styles.orderDetailView}>
        <View style={styles.orderDetailViewStyle}>
          <View style={[styles.locationViewStyle, { flex: 0.95 }]}>
            <Image
              source={profileImage ? { uri: profileImage } : userImage}
              style={styles.userImageStyle}
            />

            <View style={styles.userNameView}>
              <Text style={[styles.totalTextStyle, { padding: 0 }]}>
                {userDetail?.user_details?.firstname ? userDetail?.user_details?.firstname : '-'}
              </Text>

              <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
                {`${userDetail?.address}, ${userDetail?.city}`}
              </Text>

              <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
                {`${userDetail?.state}, ${userDetail?.country}`}
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
                  moment(userDetail?.created_at).format('DD MMM YYYY')}
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
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 170 }}
          />
        </View>

        <View style={[styles.orderandPriceView, { flex: 1 }]}>
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
                  : moment(userDetail?.created_at).format('DD/MM/YYYY')}
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
            {openShippingOrders > '3' && (
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
                ${Number(userDetail?.actual_amount)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {/* ${userDetail?.discount ? userDetail?.discount : '0'} */}$
                {Number(userDetail?.discount)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.invoiceText}>{strings.deliveryOrders.tips}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                ${Number(userDetail?.tips)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                ${Number(userDetail?.tax)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            {userDetail?.shipping_charge !== '0' && (
              <View style={styles.orderDetailsView}>
                <Text style={styles.invoiceText}>{strings.deliveryOrders.shippingCharges}</Text>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  ${Number(userDetail?.shipping_charge)?.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.orderDetailsView}>
              <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
              <Text style={styles.totalText}>{'$' + userDetail?.payable_amount}</Text>
            </View>

            <Spacer space={ms(10)} />

            {buttonFunction()}

            {/* {openShippingOrders == '0' ||
            openShippingOrders == '1' ||
            openShippingOrders == '2' ||
            openShippingOrders === '3' ? (
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
                openShippingOrders === '2' ||
                openShippingOrders === '3' ? (
                  <TouchableOpacity
                    onPress={() =>
                      acceptHandler(userDetail?.id, openShippingOrders === '0' ? 3 : 4)
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
                        ? strings.buttonStatus.readyForShipment
                        : openShippingOrders === '3'
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
                  style={[styles.acceptButtonView, { width: ms(140) }]}
                >
                  <Text style={styles.acceptTextStyle}>{'Track order'}</Text>
                </TouchableOpacity>
              </View>
            )} */}
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderDetail;

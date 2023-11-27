import React from 'react';
import { View, Text, Image, Platform, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import {
  Fonts,
  cashShippingNew,
  clock,
  pay,
  printLabel,
  scooter,
  thunder,
  trackOrder,
  userImage,
} from '@/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';

import styles from '../ShippingOrder2.styles';
import { formattedReturnPrice, formattedReturnPriceWithoutSign } from '@/utils/GlobalMethods';

const OrderDetail = ({
  openShippingOrders,
  userDetail,
  orderDetail,
  renderOrderProducts,
  declineHandler,
  acceptHandler,
  trackOrderHandler,
  printLabelHandler,
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
            style={[styles.declineButtonStyle, { width: ms(80), borderRadius: ms(30) }]}
          >
            <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => acceptHandler(userDetail?.id, 3)}
            style={[styles.acceptButtonView, { width: ms(80), borderRadius: ms(30) }]}
          >
            <Text style={styles.acceptTextStyle}>{strings.buttonStatus.reviewButton}</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (openShippingOrders === '3') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <TouchableOpacity
            onPress={() => printLabelHandler(oneOrderDetail?.getOrderData)}
            style={[
              styles.acceptButtonView,
              {
                width: ms(170),
                backgroundColor: COLORS.sky_blue,
                borderRadius: ms(30),
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text style={styles.acceptTextStyle}>{strings.buttonStatus.printlabel}</Text>
            <Image source={printLabel} style={[styles.trackOrderIconStyle]} />
          </TouchableOpacity>
        </View>
      );
    } else if (openShippingOrders === '4' || openShippingOrders === '5') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <TouchableOpacity
            onPress={() => trackOrderHandler(getTrackingInfo)}
            style={[
              styles.acceptButtonView,
              { width: ms(140), flexDirection: 'row', justifyContent: 'space-between' },
            ]}
          >
            <Text style={styles.acceptTextStyle}>{'Track order'}</Text>
            <Image source={trackOrder} style={[styles.trackOrderIconStyle]} />
          </TouchableOpacity>
        </View>
      );
    } else if (openShippingOrders === '7,8') {
      return (
        <View style={styles.shippingOrdersViewStyle}>
          <View
            onPress={() => trackOrderHandler(getTrackingInfo)}
            style={[
              styles.acceptButtonView,
              { backgroundColor: COLORS.purple_fade, width: ms(140) },
            ]}
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
        <View
          style={{
            flexDirection: 'row',
            margin: ms(8),
          }}
        >
          <View style={[styles.locationViewStyle, { paddingHorizontal: ms(10), flex: 0.8 }]}>
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

          <View style={[styles.locationViewStyle, { paddingHorizontal: ms(10), flex: 0.4 }]}>
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
              <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                <Image source={thunder} style={[styles.pinImageStyle]} />
                <Text
                  style={{
                    fontFamily: Fonts.Medium,
                    fontSize: SF(11),
                    color: COLORS.dark_yellow,
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
        </View>
        <View style={styles.lineCommonStyle}></View>

        {/* <View style={styles.orderDetailViewStyle}>
          <View
            style={[styles.locationViewStyle, { flex: 0.7, borderWidth: 2, borderColor: 'green' }]}
          >
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
            style={[styles.locationViewStyle, { flex: 0.2, borderWidth: 2, borderColor: 'red' }]}
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
        </View> */}

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
          <View style={{ paddingLeft: 15, flex: 0.3, paddingTop: ms(10) }}>
            <View>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {strings.shippingOrder.totalItem}
              </Text>
              <Text style={styles.itemCountText}>{userDetail?.total_items}</Text>
            </View>
            <View
              style={[styles.lineCommonStyle, { marginHorizontal: ms(2), marginVertical: ms(2) }]}
            />

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
            <View
              style={[styles.lineCommonStyle, { marginHorizontal: ms(2), marginVertical: ms(2) }]}
            />

            <Spacer space={SH(15)} />
            <View>
              <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                {strings.shippingOrder.orderId}
              </Text>
              <Text style={styles.itemCountText}>{`#${userDetail?.id}`}</Text>
            </View>
            <View
              style={[styles.lineCommonStyle, { marginHorizontal: ms(2), marginVertical: ms(2) }]}
            />
            <Spacer space={SH(15)} />

            {openShippingOrders > '3' && (
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Tracking ID'}</Text>
                <Text
                  style={[
                    styles.invoiceText,
                    { fontFamily: Fonts.SemiBold, color: COLORS.navy_blue },
                  ]}
                >
                  {getTrackingInfo?.track_id}
                </Text>
              </View>
            )}
            <Spacer space={SH(15)} />
            {openShippingOrders <= '3' && (
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.paymentMethod}
                </Text>
                <View
                  style={[styles.locationViewStyle, { backgroundColor: COLORS.alarm_success_50 }]}
                >
                  <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
                    {'Cash'}
                  </Text>
                </View>
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
              backgroundColor: COLORS.sky_grey,
            }}
          >
            <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
              <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                {strings.deliveryOrders.subTotal}
              </Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                ${Number(userDetail?.actual_amount)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                {strings.deliveryOrders.discount}
              </Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                {/* ${userDetail?.discount ? userDetail?.discount : '0'} */}$
                {/* {Number(userDetail?.discount)?.toFixed(2) ?? '0.00'} */}
                {formattedReturnPriceWithoutSign(userDetail?.discount)}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                {strings.deliveryOrders.tips}
              </Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                ${Number(userDetail?.tips)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>

            <View style={styles.orderDetailsView}>
              <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                {strings.deliveryOrders.tax}
              </Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                ${Number(userDetail?.tax)?.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            {userDetail?.shipping_charge !== '0' && (
              <View style={styles.orderDetailsView}>
                <Text style={[styles.invoiceText, { color: COLORS.lavender }]}>
                  {strings.deliveryOrders.shippingCharges}
                </Text>
                <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.navy_blue }]}>
                  ${Number(userDetail?.shipping_charge)?.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.dashedLineStyle}></View>

            <View style={styles.orderDetailsView}>
              <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
              <Text style={styles.totalText}>{'$' + userDetail?.payable_amount}</Text>
            </View>

            <Spacer space={ms(10)} />

            {buttonFunction()}
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderDetail;

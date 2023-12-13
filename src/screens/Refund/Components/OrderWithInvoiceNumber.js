import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { clock, Fonts, pay, pin, rightIcon, user, userOutlineDrawer } from '@/assets';
import { ms } from 'react-native-size-matters';

const OrderWithInvoiceNumber = ({ orderData }) => {
  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.deliveryOrders.delivery;
      case '3':
        return strings.returnOrder.inStore;
      case '4':
        return strings.shipping.shippingText;
      default:
        return strings.returnOrder.reservation;
    }
  };

  return (
    <View style={styles.container}>
      {orderData !== undefined && Object.keys(orderData).length > 0 ? (
        <View style={styles.orderRowStyle}>
          <Text style={styles.invoiceNumberTextStyle}>
            {`#${orderData?.invoice_number}` ?? '-'}
          </Text>

          <View
            style={[
              styles.orderDetailStyle,
              { flexDirection: 'row', alignItems: 'center', paddingHorizontal: ms(2) },
            ]}
          >
            <Image source={user} resizeMode="contain" style={{ height: ms(20), width: ms(20) }} />
            <Text style={styles.nameTextStyle}>
              {orderData?.order?.user_details
                ? `${orderData?.order?.user_details?.user_profiles?.firstname} ${orderData?.order?.user_details?.user_profiles?.lastname}`
                : '-'}
            </Text>

            {/* {orderData?.order?.delivery_option !== '3' ? (
              <View style={styles.locationViewStyle}>
                <Image source={pin} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>{orderData?.distance ?? '-'}</Text>
              </View>
            ) : (
              <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                <Text style={styles.nameTextStyle}>{'-'}</Text>
              </View>
            )} */}
          </View>

          {/* <Text style={styles.timeTextStyle}>{strings.returnOrder.customer}</Text> */}
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>
              {getDeliveryType(orderData?.order?.delivery_option)}
            </Text>
          </View>

          <View>
            <Text style={styles.nameTextStyle}>{orderData?.order?.total_items ?? '-'}</Text>
          </View>

          <View
            style={[
              styles.locationViewStyle,
              { backgroundColor: COLORS.soft_green, paddingHorizontal: ms(10) },
            ]}
          >
            <Image
              source={pay}
              style={[styles.pinImageStyle, { tintColor: COLORS.success_green }]}
            />
            <Text style={[styles.distanceTextStyle, { color: COLORS.success_green }]}>
              {orderData?.order?.payable_amount ?? '-'}
            </Text>
          </View>

          <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
            <Image source={rightIcon} style={styles.rightIconStyle} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>{strings.returnOrder.noInvoices}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(OrderWithInvoiceNumber);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: ms(8),
    marginVertical: ms(8),
    paddingVertical: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderColor: COLORS.input_border,
    justifyContent: 'space-between',
    backgroundColor: COLORS.sky_grey,
  },
  invoiceNumberTextStyle: {
    fontSize: SF(10),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    textAlignVertical: 'center',
  },
  orderDetailStyle: {
    width: SW(30),
  },
  nameTextStyle: {
    fontSize: ms(7),
    textAlign: 'center',
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    marginHorizontal: ms(4),
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input_border,
    paddingHorizontal: ms(4),
    paddingVertical: ms(2),
    borderRadius: ms(10),
    justifyContent: 'center',
  },
  pinImageStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontSize: SF(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  distanceTextStyle: {
    paddingLeft: 5,
    fontSize: ms(7),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  rightIconStyle: {
    width: ms(24),
    height: ms(24),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextStyle: {
    fontSize: ms(14),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
});

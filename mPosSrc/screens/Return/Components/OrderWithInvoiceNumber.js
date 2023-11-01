import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { Images, clock, pay, pin, rightIcon } from '@mPOS/assets';

const OrderWithInvoiceNumber = ({ orderData }) => {
  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.return.delivery;
      case '3':
        return strings.return.inStore;
      case '4':
        return strings.return.shipping;
      default:
        return strings.return.reservation;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      {orderData !== undefined && Object.keys(orderData).length > 0 ? (
        <View style={styles.orderRowStyle}>
          <Text style={styles.invoiceNumberTextStyle}>
            {`#${orderData?.invoice_number}` ?? '-'}
          </Text>

          <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
            <Text style={styles.nameTextStyle}>
              {orderData?.order?.order_details?.length > 1
                ? `${orderData?.order?.order_details?.length} Items`
                : `${orderData?.order?.order_details?.length} Item`}
            </Text>
            <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
              <Image source={Images.pay} style={styles.pinImageStyle} />
              <Text style={styles.distanceTextStyle}>
                {orderData?.order?.payable_amount ?? '-'}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailStyle}>
            <Text style={styles.timeTextStyle}>{strings.return.customer}</Text>
            <View style={styles.locationViewStyle}>
              <Image
                source={Images.clockIcon}
                style={[styles.pinImageStyle, { tintColor: COLORS.darkBlue }]}
              />
              <Text style={styles.distanceTextStyle}>
                {getDeliveryType(orderData?.order?.delivery_option)}
              </Text>
            </View>
          </View>

          <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
            <Image source={Images.rightArrow} style={styles.rightIconStyle} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>{strings.return.noOrderFound}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(OrderWithInvoiceNumber);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: COLORS.darkBlue,
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBorder,
  },
  invoiceNumberTextStyle: {
    fontSize: SF(10),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
    textAlignVertical: 'center',
  },
  orderDetailStyle: {
    width: SW(100),
    alignItems: 'center',
  },
  nameTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinImageStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontSize: SF(14),
    color: COLORS.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
  distanceTextStyle: {
    paddingLeft: 5,
    fontSize: SF(11),
    color: COLORS.text,
    fontFamily: Fonts.Regular,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextStyle: {
    fontSize: SF(20),
    color: COLORS.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
});

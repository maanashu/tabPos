import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Images } from '@mPOS/assets';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { strings } from '@mPOS/localization';

const OrderWithInvoiceNumber = ({ orderData }) => {
  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.return.delivery;
      case '3':
        return strings.return.inStore;
      case '4':
        return strings.return.shipping;
      case '2':
        return strings.return.reservation;
      default:
        return strings.return.inStore;
    }
  };

  return (
    <View style={styles.container}>
      {orderData !== undefined && Object.keys(orderData).length > 0 ? (
        <TouchableOpacity
          style={styles.orderRowStyle}
          onPress={() => {
            ((orderData?.order?.status === 9 ||
              orderData?.order?.status === 7 ||
              orderData?.order?.status === 8) &&
              orderData?.return !== null) ||
            (orderData?.order === null && orderData?.return !== null)
              ? commonNavigate(MPOS_NAVIGATION.invoice, { data: orderData })
              : commonNavigate(MPOS_NAVIGATION.returnOrderDetail, { data: orderData });
          }}
        >
          <Text style={styles.invoiceNumberTextStyle}>
            {`#${orderData?.invoice_number}` ?? '-'}
          </Text>

          <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
            <Text style={styles.nameTextStyle}>
              {orderData?.order === null && orderData?.return !== null
                ? `${orderData?.return?.return_details?.length} Items`
                : `${orderData?.order?.order_details?.length} Item`}
            </Text>

            <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
              <Image source={Images.pay} style={styles.pinImageStyle} />
              <Text style={styles.distanceTextStyle}>
                {orderData?.order?.payable_amount ?? orderData?.return?.refunded_amount}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailStyle}>
            <Text style={styles.timeTextStyle}>{strings.return.customer}</Text>
            <View style={styles.locationViewStyle}>
              <Image
                source={Images.clockIcon}
                style={[styles.pinImageStyle, { tintColor: COLORS.primary }]}
              />
              <Text style={styles.distanceTextStyle}>
                {getDeliveryType(orderData?.order?.delivery_option)}
              </Text>
            </View>
          </View>

          <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
            <Image source={Images.rightArrow} style={styles.rightIconStyle} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>{strings.return.noOrderFound}</Text>
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
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: COLORS.primary,
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBorder,
  },
  invoiceNumberTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
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
    color: COLORS.solid_grey,
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
    color: COLORS.primary,
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
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
});

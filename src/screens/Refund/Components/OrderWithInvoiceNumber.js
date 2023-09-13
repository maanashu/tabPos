import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { clock, Fonts, pay, pin, rightIcon } from '@/assets';

const OrderWithInvoiceNumber = ({ orderData }) => {
  console.log('orderData====', JSON.stringify(orderData));
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

          <View style={styles.orderDetailStyle}>
            <Text style={styles.nameTextStyle}>
              {orderData?.order?.user_details
                ? `${orderData?.order?.user_details?.user_profiles?.firstname} ${orderData?.order?.user_details?.user_profiles?.lastname}`
                : '-'}
            </Text>

            {orderData?.order?.delivery_option !== '3' ? (
              <View style={styles.locationViewStyle}>
                <Image source={pin} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>{orderData?.distance ?? '-'}</Text>
              </View>
            ) : (
              <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                <Text style={styles.nameTextStyle}>{'-'}</Text>
              </View>
            )}
          </View>

          <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
            <Text style={styles.nameTextStyle}>{orderData?.order?.total_items ?? '-'}</Text>
            <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
              <Image source={pay} style={styles.pinImageStyle} />
              <Text style={styles.distanceTextStyle}>
                {orderData?.order?.payable_amount ?? '-'}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailStyle}>
            <Text style={styles.timeTextStyle}>{strings.returnOrder.customer}</Text>
            <View style={styles.locationViewStyle}>
              <Image source={clock} style={styles.pinImageStyle} />
              <Text style={styles.distanceTextStyle}>
                {getDeliveryType(orderData?.order?.delivery_option)}
              </Text>
            </View>
          </View>

          <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
            <Image source={rightIcon} style={styles.rightIconStyle} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>{strings.returnOrder.noOrderFound}</Text>
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
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderColor: COLORS.primary,
    justifyContent: 'space-between',
    backgroundColor: COLORS.textInputBackground,
  },
  invoiceNumberTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    textAlignVertical: 'center',
  },
  orderDetailStyle: {
    width: SW(30),
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
    fontSize: SF(12),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  distanceTextStyle: {
    paddingLeft: 5,
    fontSize: SF(9),
    color: COLORS.dark_grey,
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

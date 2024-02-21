import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import dayjs from 'dayjs';

import { COLORS, Fonts, SF, SH } from '@/theme';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { Dimensions } from 'react-native';
import { ms } from 'react-native-size-matters';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { amountFormat, formattedPrice } from '@/utils/GlobalMethods';

const OrderTotal = ({ orderData, orderDetails }) => {
  // const hasCheckedItem = orderData?.order?.order_details?.some((item) => item.isChecked === true);

  const hasCheckedItem = orderDetails?.some((item) => item.isChecked === true);
  const orderDetail = orderData?.order;

  const deliveryShippingCharges = () => {
    let deliveryCharges;
    let title;
    if (orderDetail?.delivery_charge !== '0') {
      deliveryCharges = orderDetail?.delivery_charge;
      title = 'Delivery Charges';
    } else if (orderDetail?.shipping_charge !== '0') {
      deliveryCharges = orderDetail?.shipping_charge;
      title = 'Shipping Charges';
    } else {
      title = '';
      deliveryCharges = '0';
    }
    return { title, deliveryCharges };
  };

  const getCalculatedAmount = orderDetails?.reduce(
    (accu, item) => {
      const TAX_PERCENTAGE = 0.08;
      const otherCharges =
        parseFloat(orderDetail?.tips) + parseFloat(deliveryShippingCharges().deliveryCharges);
      const subTotal = accu.subTotal + parseFloat(item.price * item.qty);
      const totalTax = accu.totalTax + parseFloat(item.price * item.qty * TAX_PERCENTAGE);
      const totalAmount = subTotal + totalTax + otherCharges;
      return { subTotal, totalTax, totalAmount };
    },
    { subTotal: 0, totalTax: 0, totalAmount: 0 }
  );

  const onPressNextHandler = () => {
    if (hasCheckedItem) {
      commonNavigate(MPOS_NAVIGATION.productRefund, { data: orderData, list: orderDetails });
    } else {
      alert('Please select products to return');
    }
  };

  return (
    <View style={styles.billViewStyle}>
      <Text style={styles.totalItemsStyles}>
        {`${strings.delivery.totalItems} ${
          orderData?.order?.order_details?.length > 1
            ? `${orderData?.order?.order_details?.length}`
            : `${orderData?.order?.order_details?.length}`
        }`}
      </Text>

      <View style={styles.horizontalLineStyle} />

      <Spacer space={SH(10)} />

      <View style={styles.orderDetailView}>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.orderDate}</Text>
          <Text style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}>{`${dayjs(
            orderData?.order?.date
          ).format('DD/MM/YYYY')}`}</Text>
        </View>

        <View>
          <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.invoiceNumber}</Text>
          <Text
            style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}
          >{`#${orderData?.invoice_number}`}</Text>
        </View>
      </View>

      <View style={styles.horizontalLineStyle} />

      <Spacer space={SH(15)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.subTotal}</Text>
        <Text style={styles.priceValueText}> {amountFormat(getCalculatedAmount?.subTotal)}</Text>
      </View>

      <Spacer space={SH(4)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.totalTax}</Text>
        <Text style={styles.priceValueText}>{amountFormat(getCalculatedAmount?.totalTax)}</Text>
      </View>

      <Spacer space={SH(4)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.discount}</Text>
        <Text style={styles.priceValueText}>{amountFormat(orderDetails?.discount)}</Text>
      </View>

      {orderDetails?.tips > 0 ? (
        <>
          <Spacer space={SH(4)} />

          <View style={styles.amountViewStyle}>
            <Text style={styles.labelTextStyle}>{strings.delivery.tip}</Text>
            <Text style={styles.priceValueText}>{amountFormat(orderDetails?.tips)}</Text>
          </View>
        </>
      ) : (
        <></>
      )}

      <Spacer space={SH(4)} />

      {deliveryShippingCharges().title != '' && (
        <View style={styles.amountViewStyle}>
          <Text style={styles.invoiceText}>{deliveryShippingCharges().title}</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.priceValueText}>{'$'}</Text>
            <Text style={styles.priceValueText}>{deliveryShippingCharges().deliveryCharges}</Text>
          </View>
        </View>
      )}

      <Spacer space={SH(4)} />

      <View style={styles.dashedHorizontalLine} />

      <Spacer space={SH(15)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.totalValueText}>{strings.delivery.total}</Text>
        <Text style={styles.totalValueText}>{amountFormat(getCalculatedAmount?.totalAmount)}</Text>
      </View>

      <Spacer space={SH(15)} />

      <Pressable
        onPress={onPressNextHandler}
        style={[
          styles.buttonStyle,
          { backgroundColor: hasCheckedItem ? COLORS.primary : COLORS.textInputBackground },
        ]}
      >
        <Text
          style={[
            styles.buttonTextStyle,
            { color: hasCheckedItem ? COLORS.white : COLORS.darkGray },
          ]}
        >
          {strings.return.next}
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(OrderTotal);

const styles = StyleSheet.create({
  billViewStyle: {
    width: Dimensions.get('window').width - 40,
    bottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(15),
    borderRadius: 10,
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
  },
  totalItemsStyles: {
    fontSize: SF(16),
    paddingBottom: ms(10),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  horizontalLineStyle: {
    borderWidth: 0.6,
    borderColor: COLORS.inputBorder,
  },
  orderDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  deliveryOrderTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  deliveryDateTextStyle: {
    fontSize: SF(10),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  amountViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelTextStyle: {
    fontSize: SF(12),
    color: COLORS.text,
    fontFamily: Fonts.MaisonRegular,
  },
  totalValueText: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  priceValueText: {
    fontSize: SF(12),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  dashedHorizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderStyle: 'dashed',
  },
  buttonStyle: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: ms(20),
    paddingVertical: ms(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.darkGray,
  },
});

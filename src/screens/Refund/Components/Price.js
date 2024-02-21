import React, { memo } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { Fonts, arrowRightTop } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { amountFormat } from '@/utils/GlobalMethods';

const Price = ({ orderData, orderList, onPresshandler }) => {
  const hasCheckedItem = orderList?.some((item) => item.isChecked === true);
  const orderDetails = orderData?.order;

  const deliveryShippingCharges = () => {
    let deliveryCharges;
    let title;
    if (orderDetails?.delivery_charge !== '0') {
      deliveryCharges = orderDetails?.delivery_charge;
      title = 'Delivery Charges';
    } else if (orderDetails?.shipping_charge !== '0') {
      deliveryCharges = orderDetails?.shipping_charge;
      title = 'Shipping Charges';
    } else {
      title = '';
      deliveryCharges = '0.00';
    }
    return { title, deliveryCharges };
  };

  const getCalculatedAmount = orderList?.reduce(
    (accu, item) => {
      const TAX_PERCENTAGE = 0.08;
      const otherCharges =
        parseFloat(orderDetails?.tips) + parseFloat(deliveryShippingCharges().deliveryCharges);
      const subTotal = accu.subTotal + parseFloat(item.price * item.qty);
      const totalTax = accu.totalTax + parseFloat(item.price * item.qty * TAX_PERCENTAGE);
      const totalAmount = subTotal + totalTax + otherCharges;
      return { subTotal, totalTax, totalAmount };
    },
    { subTotal: 0, totalTax: 0, totalAmount: 0 }
  );

  return (
    <View style={styles.subTotalView}>
      <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
        <Text style={[styles.invoiceText, { color: COLORS.light_blue2 }]}>
          {strings.deliveryOrders.subTotal}
        </Text>
        <Text style={[styles.totalTextStyle, { fontFamily: Fonts.MaisonBold }]}>
          ${getCalculatedAmount?.subTotal?.toFixed(2)}
        </Text>
      </View>

      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.totalTextStyle]}>
            {amountFormat(orderDetails?.discount ?? '0.00')}
          </Text>
        </View>
      </View>
      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.tips}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.totalTextStyle]}>{amountFormat(orderDetails?.tips ?? '0.00')}</Text>
        </View>
      </View>

      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.totalTextStyle2}>{'$'}</Text>
          <Text style={[styles.totalTextStyle]}>{getCalculatedAmount?.totalTax?.toFixed(2)}</Text>
        </View>
      </View>
      {deliveryShippingCharges().title != '' && (
        <View style={styles.orderDetailsView}>
          <Text style={styles.invoiceText}>{deliveryShippingCharges().title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.totalTextStyle]}>
              {amountFormat(deliveryShippingCharges().deliveryCharges)}
            </Text>
          </View>
        </View>
      )}

      {/* <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.totalTextStyle2}>{'$'}</Text>
          <Text style={[styles.totalTextStyle]}>{'0.00'}</Text>
        </View>
      </View> */}

      <View style={styles.horizontalLine} />

      <View style={styles.orderDetailsView}>
        <Text style={[styles.totalText, { color: COLORS.black }]}>
          {strings.deliveryOrders.total}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.totalTextStyle2,
              {
                fontFamily: Fonts.MaisonBold,
                fontSize: SF(18),
                color: COLORS.navy_blue,
              },
            ]}
          >
            {'$'}
          </Text>
          <Text style={[styles.totalText, { paddingTop: 0 }]}>
            {getCalculatedAmount?.totalAmount?.toFixed(2)}
          </Text>
        </View>
      </View>

      <Spacer space={SH(15)} />

      <View style={styles.activeTaxButtonStyle}>
        <TouchableOpacity
          onPress={() => {
            if (hasCheckedItem) {
              onPresshandler();
            } else {
              alert('Please select products to return');
            }
          }}
          style={[
            styles.saveButtonTax,
            {
              backgroundColor: hasCheckedItem ? COLORS.navy_blue : COLORS.white,
              borderWidth: hasCheckedItem ? 0 : 1,
              borderColor: COLORS.navy_blue,
            },
          ]}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: hasCheckedItem ? COLORS.white : COLORS.navy_blue },
            ]}
          >
            {'Next'}
          </Text>
          <Image source={arrowRightTop} style={styles.arrowButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Price);

const styles = StyleSheet.create({
  subTotalView: {
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.sky_grey,
    paddingVertical: ms(8),
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width / 4
        : Dimensions.get('window').width / 4,
    borderRadius: 10,
  },
  orderDetailsView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  invoiceText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(12),
    color: COLORS.light_blue2,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.navy_light_blue,
    paddingTop: 0,
  },
  totalTextStyle2: {
    paddingTop: 0,
    fontSize: SF(12),
    // lineHeight: ms(8),
    color: COLORS.navy_blue,
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: COLORS.navy_blue,
    borderStyle: 'dashed',
    marginTop: ms(5),
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.navy_blue,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.navy_blue,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: ms(120),
    paddingHorizontal: ms(12),
  },
  returnTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.navy_blue,
  },
  saveButtonTax: {
    backgroundColor: COLORS.navy_blue,
    flex: 1,
    height: SH(50),
    borderRadius: 5,
    marginLeft: ms(10),
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: ms(11),
    fontFamily: Fonts.MaisonRegular,
    letterSpacing: -1,
  },

  arrowButton: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    // tintColor: COLORS.solid_grey,
  },
});

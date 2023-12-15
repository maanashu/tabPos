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

const Price = ({ orderData, onPresshandler }) => {
  const hasCheckedItem = orderData?.order?.order_details.some((item) => item.isChecked === true);

  return (
    <View style={styles.subTotalView}>
      <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
        <Text style={[styles.invoiceText, { color: COLORS.light_blue2 }]}>
          {strings.deliveryOrders.subTotal}
        </Text>
        <Text style={[styles.totalTextStyle, { fontFamily: Fonts.MaisonBold }]}>
          ${orderData?.order?.actual_amount ?? '0'}
        </Text>
      </View>

      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.totalTextStyle2}>{'$'}</Text>
          <Text style={[styles.totalTextStyle]}>{orderData?.order?.discount ?? '0.0'}</Text>
        </View>
      </View>
      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.tips}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.totalTextStyle2}>{'$'}</Text>
          <Text style={[styles.totalTextStyle]}>{orderData?.order?.tips ?? '0.0'}</Text>
        </View>
      </View>

      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.totalTextStyle2}>{'$'}</Text>
          <Text style={[styles.totalTextStyle]}>{orderData?.order?.tax}</Text>
        </View>
      </View>
      {(orderData?.order?.delivery_charge !== '0' || orderData?.order?.shipping_charge !== '0') && (
        <View style={styles.orderDetailsView}>
          <Text style={styles.invoiceText}>
            {orderData?.order?.delivery_charge !== '0'
              ? strings.deliveryOrders.deliveryCharges
              : strings.deliveryOrders.shippingCharges}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.totalTextStyle2}>{'$'}</Text>
            <Text style={[styles.totalTextStyle]}>
              {orderData?.order?.delivery_charge !== '0'
                ? orderData?.order?.delivery_charge
                : orderData?.order?.shipping_charge}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.orderDetailsView}>
        <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.totalTextStyle2}>{'$'}</Text>
          <Text style={[styles.totalTextStyle]}>{'0.00'}</Text>
        </View>
      </View>

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
            {orderData?.order?.payable_amount ?? '0'}
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

      {/* <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
        <TouchableOpacity
          onPress={() => {
            if (hasCheckedItem) {
              onPresshandler();
            } else {
              alert('Please select products to return');
            }
          }}
          style={[
            styles.returnButtonStyle,
            {
              backgroundColor: hasCheckedItem ? COLORS.navy_blue : COLORS.white,
              borderWidth: hasCheckedItem ? 0 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.returnTextStyle,
              { color: hasCheckedItem ? COLORS.white : COLORS.navy_blue },
            ]}
          >
            {'Return All'}
          </Text>
        </TouchableOpacity>
      </View> */}
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

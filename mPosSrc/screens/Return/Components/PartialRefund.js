import React, { memo, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { ms } from 'react-native-size-matters';

import { Images } from '@mPOS/assets';
import { strings } from '@/localization';
import { COLORS, Fonts, SF, SW } from '@/theme';

const PartialRefund = ({ setIsVisible, productsList, onPressApplyRefund }) => {
  const [amount, setAmount] = useState();
  const [selectedMethod, setSelectedMethod] = useState('dollar');
  const [products, setProducts] = useState();

  return (
    <View style={[styles.container, { flex: 1 / 2 }]}>
      <View style={styles.headerViewStyle}>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressApplyRefund(products)}
          disabled={amount ? false : true}
          style={[
            styles.buttonViewStyle,
            { backgroundColor: amount ? COLORS.primary : COLORS.gerySkies },
          ]}
        >
          <Text style={styles.buttonTextStyle}>{strings.returnOrder.applyRefund}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.applicableAllViewStyle,
          {
            borderWidth: amount ? 0.7 : 0,
            borderColor: amount ? COLORS.primary : COLORS.transparent,
          },
        ]}
      >
        <Text style={styles.applicableTextStyle}>{strings.returnOrder.applicable}</Text>

        <View style={styles.amountViewStyle}>
          <TextInput
            value={amount}
            style={styles.textInputStyle}
            keyboardType="number-pad"
            onChangeText={(text) => {
              const isPercentageLabel = selectedMethod === strings.returnOrder.percentageLabel;

              const updatedDataArray = productsList?.map((item) => {
                let newPrice = parseFloat(text);

                // Check if the entered price is less than the current item price
                if (newPrice >= parseFloat(item.price)) {
                  newPrice = parseFloat(item.price); // Retain the current item price
                }

                return {
                  ...item,
                  refundAmount: isPercentageLabel ? (item.price * newPrice) / 100 : newPrice,
                  totalRefundAmount: isPercentageLabel
                    ? (item.price * newPrice * item.qty) / 100
                    : newPrice * item.qty,
                };
              });

              setProducts(updatedDataArray);
              setAmount(text);
            }}
          />

          <View style={styles.amountTypeView}>
            <TouchableOpacity
              onPress={() => setSelectedMethod('dollar')}
              style={[
                styles.percentageViewStyle,
                {
                  backgroundColor: selectedMethod === 'dollar' ? COLORS.primary : COLORS.white,
                  borderTopLeftRadius: selectedMethod === 'dollar' ? 5 : 0,
                  borderBottomLeftRadius: selectedMethod === 'dollar' ? 5 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.dollarTextStyle,
                  { color: selectedMethod === 'dollar' ? COLORS.white : COLORS.dark_grey },
                ]}
              >
                {'$'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedMethod('percentage')}
              style={[
                styles.percentageViewStyle,
                {
                  backgroundColor: selectedMethod === 'percentage' ? COLORS.primary : COLORS.white,
                  borderTopRightRadius: selectedMethod === 'percentage' ? 5 : 0,
                  borderBottomRightRadius: selectedMethod === 'percentage' ? 5 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.dollarTextStyle,
                  { color: selectedMethod === 'percentage' ? COLORS.white : COLORS.dark_grey },
                ]}
              >
                {'%'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(PartialRefund);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: ms(18),
    justifyContent: 'space-between',
  },
  buttonViewStyle: {
    borderRadius: 3,
    paddingHorizontal: ms(8),
    paddingVertical: ms(10),
    backgroundColor: COLORS.primary,
  },
  buttonTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(12),
  },
  applicableAllViewStyle: {
    backgroundColor: COLORS.blue_shade,
    marginHorizontal: ms(15),
    borderRadius: 10,
    padding: ms(15),
  },
  applicableTextStyle: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  textInputStyle: {
    width: ms(180),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    paddingLeft: 10,
  },
  amountViewStyle: {
    height: ms(40),
    borderRadius: 5,
    marginTop: ms(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  amountTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(5),
  },
  percentageViewStyle: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  dollarTextStyle: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    fontSize: SF(12),
  },
});

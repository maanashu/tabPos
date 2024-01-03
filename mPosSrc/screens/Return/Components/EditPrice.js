import React, { memo, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { ms } from 'react-native-size-matters';

import { strings } from '@/localization';

import { Images } from '@mPOS/assets';
import { Spacer } from '@/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const EditPrice = ({ setIsVisible, selected, index, productsList, saveRefundAmount }) => {
  const [refundAmount, setRefundAmount] = useState('');
  const [products, setProducts] = useState();

  let selectedProduct = selected;

  const refundHandler = (newText) => {
    const parsedNewText = parseFloat(newText);
    const finalText = isNaN(parsedNewText) ? 0 : parsedNewText;
    const isSmallerThanUnitPrice = finalText <= parseFloat(selected?.price);
    if (!isSmallerThanUnitPrice) {
      alert('Refund amount should not be greater than unit price');
      setRefundAmount('');
      return;
    }
    selectedProduct['refundAmount'] = isSmallerThanUnitPrice ? finalText : selectedProduct?.price;
    selectedProduct['totalRefundAmount'] = isSmallerThanUnitPrice
      ? finalText * selectedProduct.qty
      : 0.0;

    const updatedProductsList = productsList.map((product, ind) => {
      if (ind !== index) {
        if (product.refundAmount > 0 || product.totalRefundAmount > 0) {
          // If refundAmount or totalRefundAmount is already greater than 0, keep the existing values
          return product;
        } else {
          // Update refundAmount and totalRefundAmount for non-selected products to their original prices
          return {
            ...product,
            refundAmount: product.price,
            totalRefundAmount: product.price * product.qty,
          };
        }
      }
      return product;
    });

    const oldProductList = [...updatedProductsList];
    oldProductList[index] = selectedProduct;

    setProducts(oldProductList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.headerTextStyle}>{strings.returnOrder.priceChanging}</Text>

        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.applicableAllViewStyle}>
        <Text style={styles.applicableTextStyle}>{strings.returnOrder.productPrice}</Text>

        <View style={styles.amountViewStyle}>
          <Text style={styles.textInputStyle}>{`$${selected?.price}`}</Text>
        </View>
      </View>

      <View style={styles.applicableAllViewStyle}>
        <Text style={styles.refundTextStyle}>{strings.returnOrder.refundAmount}</Text>

        <View style={styles.inputViewStyle}>
          <TextInput
            value={refundAmount}
            style={styles.textInputStyle}
            placeholder={'Enter refund amount'}
            onChangeText={(text) => {
              setRefundAmount(text);
              refundHandler(text);
            }}
            keyboardType={'number-pad'}
          />
        </View>
      </View>

      <Spacer space={SH(20)} />

      <TouchableOpacity
        onPress={() => {
          if (refundAmount !== '') {
            saveRefundAmount(products);
          } else {
            alert('Please enter the amount');
          }
        }}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>{strings.management.save}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(EditPrice);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
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
  buttonStyle: {
    borderRadius: 3,
    paddingHorizontal: ms(12),
    paddingVertical: ms(15),
    width: SW(160),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  headerTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(16),
  },
  applicableAllViewStyle: {
    marginHorizontal: ms(10),
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
    borderRadius: 5,
    marginTop: ms(10),
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
  refundTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(16),
  },
  inputViewStyle: {
    height: ms(70),
    borderRadius: 5,
    marginTop: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.textInputBackground,
  },
  buttonTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(16),
  },
});

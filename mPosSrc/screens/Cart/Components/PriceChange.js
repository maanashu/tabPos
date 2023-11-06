import React, { memo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { digitWithDot } from '@/utils/validators';
import { useDispatch } from 'react-redux';
import { productUpdatePrice } from '@/actions/RetailAction';
// import { productPriceUpdate } from "@/actions/RetailActions";

const PriceChange = ({ priceChangeClose, cartProduct }) => {
  const dispatch = useDispatch();
  const productPrice = cartProduct?.product_details?.supply?.supply_prices?.selling_price;
  const notesRef = useRef();
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  useEffect(() => {
    setAmount(Number(productPrice)?.toFixed(2));
  }, []);

  useEffect(() => {
    notesRef?.current?.open();
  }, []);
  const priceSaveHandler = () => {
    if (!amount || amount == 0) {
      alert('Please enter Amount');
    } else if (amount && digitWithDot.test(amount) === false) {
      alert('Please enter valid amount');
    } else {
      const data = {
        cartid: cartProduct?.cart_id,
        cartProductId: cartProduct?.id,
        updatedPrice: amount,
      };
      dispatch(productUpdatePrice(data));
      priceChangeClose();
    }
  };

  return (
    <View style={styles.addDiscountcon}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.clearCartTextStyle}>{strings.cart.priceChanging}</Text>

        <TouchableOpacity onPress={() => priceChangeClose()}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentViewStyle}>
        <Text style={styles.oldPriceText}>Old Price</Text>
        <View style={styles.oldAmountText}>
          <Text style={styles.oldAmount}>${Number(productPrice)?.toFixed(2)}</Text>
        </View>
        <Spacer space={SH(18)} />
        <Text style={styles.newPriceText}>New Price</Text>
        <View style={styles.amountTextStyle}>
          <Text style={styles.dollarSign}>{'$'}</Text>
          <TextInput
            value={amount.toString()}
            onChangeText={setAmount}
            keyboardType={'number-pad'}
            style={styles.amountInput}
            placeholder={strings.cart.amountValue}
            placeholderTextColor={COLORS.row_grey}
          />
        </View>

        <Spacer space={SH(10)} />

        <View style={styles.buttonMainContainer}>
          <TouchableOpacity style={styles.keepButtonStyle} onPress={() => priceChangeClose()}>
            <Text style={[styles.counterText, { color: COLORS.primary }]}>
              {strings.cart.keepit}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButtonStyle} onPress={priceSaveHandler}>
            <Text style={[styles.counterText, { color: COLORS.white }]}>
              {strings.profile.onlySave}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // </RBSheet>
  );
};

export default memo(PriceChange);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: ms(350),
    height: ms(350),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: ms(30),
  },
  nameBottomSheetContainerStyle: {
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    backgroundColor: COLORS.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: ms(15),
    // paddingHorizontal: ms(20),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  clearCartTextStyle: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    paddingVertical: ms(20),
  },
  notesInputStyle: {
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(15),
  },
  keepButtonStyle: {
    borderWidth: 1,
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
  },
  clearButtonStyle: {
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  counterText: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },

  amountTextStyle: {
    height: SH(65),
    borderRadius: 5,
    paddingLeft: SW(10),
    backgroundColor: COLORS.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    height: SH(65),
    fontSize: SF(16),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    flex: 1,
  },
  dollarSign: {
    fontSize: SF(16),
    color: COLORS.row_grey,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(1),
  },
  oldAmountText: {
    height: SH(55),
    borderRadius: 5,
    fontSize: SF(16),
    color: COLORS.dark_grey,
    paddingLeft: SW(10),
    fontFamily: Fonts.Regular,
    backgroundColor: COLORS.inputBorder,
    justifyContent: 'center',
  },
  oldAmount: {
    fontSize: SF(16),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },

  oldPriceText: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
    marginBottom: ms(3),
  },
  newPriceText: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(3),
  },
});

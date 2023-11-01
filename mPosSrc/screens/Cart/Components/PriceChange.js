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

const PriceChange = ({ priceChangeClose }) => {
  const notesRef = useRef();
  const [notes, setNotes] = useState('');
  const [oldPrice, setOldPrice] = useState('$6.56');

  useEffect(() => {
    notesRef?.current?.open();
  }, []);

  return (
    // <RBSheet
    // ref={notesRef}
    // height={ms(300)}
    // animationType={'fade'}
    // closeOnDragDown={false}
    // closeOnPressMask={false}
    // customStyles={{
    //   container: {...styles.nameBottomSheetContainerStyle},
    // }}>
    <View style={styles.addDiscountcon}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.clearCartTextStyle}>{strings.cart.priceChanging}</Text>

        <TouchableOpacity onPress={() => priceChangeClose()}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentViewStyle}>
        <Text style={styles.oldPriceText}>Old Price</Text>
        <TextInput
          value={oldPrice}
          onChangeText={setOldPrice}
          keyboardType={'number-pad'}
          style={styles.oldAmountText}
          editable={false}
        />
        <Spacer space={SH(18)} />
        <Text style={styles.newPriceText}>New Price</Text>
        <TextInput
          // value={amount}
          // onChangeText={setAmount}
          keyboardType={'number-pad'}
          style={styles.amountTextStyle}
          placeholder={strings.cart.amountValue}
          placeholderTextColor={COLORS.placeholderText}
        />

        <Spacer space={SH(10)} />

        <View style={styles.buttonMainContainer}>
          <TouchableOpacity style={styles.keepButtonStyle}>
            <Text style={[styles.counterText, { color: COLORS.darkBlue }]}>
              {strings.cart.keepit}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButtonStyle}>
            <Text style={[styles.counterText, { color: COLORS.white }]}>
              {strings.profile.save}
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
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    paddingVertical: ms(20),
  },
  notesInputStyle: {
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    color: COLORS.text,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_border,
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
    borderColor: COLORS.darkBlue,
  },
  clearButtonStyle: {
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  counterText: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },

  amountTextStyle: {
    height: SH(65),
    borderRadius: 5,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(10),
    fontFamily: Fonts.SemiBold,
    backgroundColor: COLORS.inputBorder,
  },
  oldAmountText: {
    height: SH(55),
    borderRadius: 5,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(10),
    fontFamily: Fonts.Regular,
    backgroundColor: COLORS.inputBorder,
  },

  oldPriceText: {
    fontSize: SF(14),
    color: COLORS.text,
    fontFamily: Fonts.Medium,
    marginBottom: ms(3),
  },
  newPriceText: {
    fontSize: SF(14),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(3),
  },
});

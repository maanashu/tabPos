import React, { memo, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { useDispatch } from 'react-redux';
import { clearProductCart } from '@mPOS/actions/RetailActions';

const ClearCart = ({ cartClose }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.addDiscountcon}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.clearCartTextStyle}>{strings.cart.clearCart}</Text>

        <TouchableOpacity onPress={() => cartClose()}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentViewStyle}>
        <Text style={styles.titleTextStyle}>{strings.cart.clearCartDescription}</Text>

        <Spacer space={SH(15)} />

        <View style={styles.buttonMainContainer}>
          <TouchableOpacity style={styles.keepButtonStyle} onPress={() => cartClose()}>
            <Text style={[styles.counterText, { color: COLORS.darkBlue }]}>
              {strings.cart.keepIt}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButtonStyle}
            onPress={() => {
              dispatch(clearProductCart());
              cartClose();
            }}
          >
            <Text style={[styles.counterText, { color: COLORS.red }]}>{strings.cart.clear}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(ClearCart);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: ms(350),
    height: ms(230),
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
  titleTextStyle: {
    fontSize: SF(14),
    paddingTop: SH(20),
    color: COLORS.dark_gray,
    fontFamily: Fonts.Medium,
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
    borderWidth: 1,
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.red,
  },
  counterText: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },
});

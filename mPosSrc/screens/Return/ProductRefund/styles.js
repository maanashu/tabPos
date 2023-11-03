import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  partialButtonStyle: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    paddingHorizontal: ms(16),
    paddingVertical: ms(16),
    marginHorizontal: ms(16),
    borderRadius: 5,
    borderColor: COLORS.darkGray,
  },
  partialButtonTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.darkGray,
  },
  leftMainViewStyle: {
    flex: 0.75,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  rowStyle: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(7),
    paddingHorizontal: ms(2),
  },
  productMainViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
    marginHorizontal: ms(16),
    paddingVertical: ms(10),
  },
  blueListDataText: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.SemiBold,
  },
  skuNumber: {
    color: COLORS.darkGray,
    fontSize: SF(9),
    fontFamily: Fonts.Regular,
  },
  productImageStyle: {
    width: ms(40),
    height: ms(40),
    borderRadius: 7,
    resizeMode: 'contain',
  },
  totalItemsText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
    fontSize: SF(16),
  },
  displayflex: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableListSide: {
    borderWidth: 1,
    width: width * 0.24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cashLabelWhiteHash: {
    paddingHorizontal: moderateScale(15),
  },
  productCartBody: {
    width: ms(60),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    borderRadius: 5,
    color: COLORS.dark_grey,
    fontSize: SF(11),
    backgroundColor: COLORS.blue_shade,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
  refundAmountText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(11),
  },
  listCountCon: {
    borderWidth: 1,
    // width: SW(30),
    // height: SH(30),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
  },
  minus: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
});

export default styles;

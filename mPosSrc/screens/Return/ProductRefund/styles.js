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
    backgroundColor: COLORS.white,
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
    alignSelf: 'center',
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
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
    fontSize: SF(11),
    marginLeft: 10,
  },
  refundAmountText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(11),
  },
  listCountCon: {
    borderWidth: 1,
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
  editIconStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  editPriceViewStyle: {
    flex: 1,
    paddingRight: ms(10),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(12),
  },
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

export default styles;

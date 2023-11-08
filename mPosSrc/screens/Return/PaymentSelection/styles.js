import { COLORS, Fonts, SF, SW } from '@/theme';
import { width } from '@/theme/ScalerDimensions';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  crossIconViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: ms(20),
    marginTop: ms(20),
  },
  crossButtonStyle: {
    width: SW(36),
    height: SW(36),
    tintColor: COLORS.solid_grey,
    resizeMode: 'contain',
  },
  amountMainViewStyle: {
    marginTop: ms(20),
    alignItems: 'center',
    marginHorizontal: ms(20),
  },
  totalAmountLabelStyle: {
    color: COLORS.solid_grey,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
  },
  _dollarSymbol: {
    fontSize: ms(17),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  amountTextStyle: {
    color: COLORS.primary,
    fontSize: SF(36),
    fontFamily: Fonts.SemiBold,
  },
  selectPaymentMethodViewStyle: {
    marginTop: ms(20),
    marginHorizontal: ms(20),
  },
  selectPaymentTextStyle: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  cashIconStyle: {
    width: SW(30),
    height: SW(30),
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },
  paymentMethodViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    padding: ms(10),
    flexDirection: 'row',
    marginTop: ms(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.primary,
  },
  paymentMethodTextStyle: {
    color: COLORS.primary,
    fontSize: SF(18),
    paddingLeft: 5,
    fontFamily: Fonts.SemiBold,
  },
  paymentTextStyle: {
    color: COLORS.primary,
    fontSize: SF(16),
    paddingLeft: 5,
    fontFamily: Fonts.SemiBold,
  },
  receiptViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  smsViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 0.32,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.solidGrey,
    paddingVertical: ms(25),
  },
  ereceiptTextStyle: {
    color: COLORS.dark_grey,
    fontSize: SF(13),
    fontFamily: Fonts.SemiBold,
  },
  confirmButtonStyle: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(20),
    borderRadius: 5,
    justifyContent: 'center',
    padding: ms(15),
    width: width - 40,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  confirmReturnTextStyle: {
    color: COLORS.white,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  buttonArrowStyle: {
    width: SW(24),
    height: SW(24),
    left: 5,
    resizeMode: 'contain',
  },
  _payBYBoxContainer: {
    borderWidth: 1,
    borderRadius: ms(6),
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: ms(4),
    justifyContent: 'center',
    borderColor: COLORS.primary,
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
    height: Platform.OS === 'ios' ? ms(100) : ms(120),
  },
  _payByTitle: {
    fontSize: ms(9),
    marginBottom: ms(3),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  _payByMethod: {
    fontSize: ms(14),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  _payByAmount: {
    fontSize: ms(10),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  _payByIcon: {
    width: ms(22),
    height: ms(22),
    marginTop: ms(8),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
});

export default styles;

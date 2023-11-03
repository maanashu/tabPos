import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    borderRadius: 10,
    marginHorizontal: ms(15),
    backgroundColor: COLORS.white,
  },
  todayStatusTextStyle: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  shippingOrderViewStyle: {
    zIndex: 0.3,
    width: SW(160),
    marginTop: SH(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shippingOrderTextStyle: {
    fontSize: SF(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  deliveryItemViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(6),
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
    borderColor: COLORS.solidGrey,
  },
  deliveryTypeTextStyle: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.SemiBold,
  },
  deliveryTypeCountTextStyle: {
    fontSize: SF(14),
    paddingTop: ms(5),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  deliveryTypeIconStyle: {
    width: SW(40),
    height: SH(30),
    resizeMode: 'contain',
  },
  ordersHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(20),
    justifyContent: 'space-between',
  },
  viewAllButtonStyle: {
    borderRadius: 3,
    paddingVertical: SH(4),
    paddingHorizontal: SW(10),
    backgroundColor: COLORS.darkGray,
  },
  viewAllTextStyle: {
    fontSize: SF(12),
    color: COLORS.white,
    fontFamily: Fonts.Medium,
  },
  orderTextStyle: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  orderItemViewStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SH(15),
    paddingHorizontal: SW(10),
    marginHorizontal: ms(2),
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
  },
  payIconStyle: {
    width: SW(11),
    height: SW(11),
    resizeMode: 'contain',
  },
  priceTextStyle: {
    paddingLeft: 3,
    fontSize: SF(10),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  deliveryDateTextStyle: {
    fontSize: SF(10),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  itemAndPaymentView: {
    paddingTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArrowIconStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  ordersContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: ms(20),
    marginHorizontal: ms(15),
    backgroundColor: COLORS.white,
  },
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(6),
  },
});

export default styles;

import { Dimensions, StyleSheet } from 'react-native';

import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deliveryOrderTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  deliveryItemViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(6),
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
    borderColor: COLORS.light_border,
  },
  deliveryTypeTextStyle: {
    fontSize: SF(11),
    color: COLORS.grayShade,
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
    marginHorizontal: ms(15),
    justifyContent: 'space-between',
  },
  viewAllButtonStyle: {
    borderRadius: 3,
    paddingVertical: SH(4),
    paddingHorizontal: SW(10),
    backgroundColor: COLORS.grayShade,
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
    paddingHorizontal: SW(15),
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
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: ms(20),
    marginHorizontal: ms(15),
    backgroundColor: COLORS.white,
  },
  totalAmountView: {
    alignItems: 'center',
    flex: 0.2,
    justifyContent: 'space-between',
  },
  numberOrdersText: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  userDetailView: {
    borderRadius: 5,
    paddingHorizontal: ms(10),
    paddingVertical: ms(18),
    marginHorizontal: ms(15),
    backgroundColor: COLORS.white,
  },
  profileImageStyle: {
    width: SW(36),
    height: SW(36),
    borderRadius: SW(18),
    resizeMode: 'cover',
  },
  nameTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  addressTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.text,
    paddingTop: 2,
  },
  deliveryTypeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.white,
    textAlign: 'center',
  },
  clockImageStyle: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  deliveryTimeViewStyle: {
    flex: 0.55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark_grey,
    borderRadius: 5,
    paddingHorizontal: ms(8),
    paddingVertical: ms(12),
    alignItems: 'center',
  },
  productItemViewStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(12),
    paddingVertical: ms(7),
    justifyContent: 'space-between',
    marginHorizontal: ms(15),
    marginVertical: ms(2),
  },
  productnameTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  productDetailView: {
    paddingLeft: ms(10),
    flex: 0.75,
    justifyContent: 'center',
  },
  productImageStyle: {
    width: ms(50),
    height: ms(50),
    resizeMode: 'cover',
  },
  productQtyPriceText: {
    fontSize: SF(12),
    paddingTop: ms(5),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  totalItemsStyles: {
    fontSize: SF(16),
    paddingBottom: ms(10),
    color: COLORS.primary,
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
  billViewStyle: {
    width: Dimensions.get('window').width - 35,
    bottom: 10,
    // alignSelf: 'center',
    // position: 'absolute',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(15),
    borderRadius: 10,
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
  },
  totalMainViewStyle: {
    width: Dimensions.get('window').width - 40,
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(15),
    borderRadius: 10,
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
  },
  horizontalLineStyle: {
    borderWidth: 0.6,
    borderColor: COLORS.inputBorder,
  },
  dashedHorizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderStyle: 'dashed',
  },
  orderDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  detailMap: {
    height: '50%',
    width: '100%',
    borderRadius: 10,
  },
  mapViewStyle: {
    height: ms(160),
    marginHorizontal: ms(15),
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  mapMarkerStyle: {
    height: ms(30),
    width: ms(30),
    resizeMode: 'contain',
  },
  driverViewStyle: {
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    padding: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverStatusTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(14),
  },
  driverArrivalTimeText: {
    fontFamily: Fonts.Regular,
    color: COLORS.text,
    fontSize: SF(14),
  },
  trackTextStyle: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    fontSize: SF(12),
    paddingHorizontal: ms(5),
  },
  trackButtonStyle: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: ms(9),
    paddingVertical: ms(8),
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackImageStyle: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(6),
  },
  todayStatusTextStyle: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  cancelButtonStyle: {
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: ms(10),
    paddingVertical: ms(18),
    marginHorizontal: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: Fonts.Regular,
    color: COLORS.red,
    fontSize: SF(12),
  },
});

export default styles;

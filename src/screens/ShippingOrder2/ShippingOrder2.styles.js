import { Dimensions, Platform, StyleSheet } from 'react-native';
import { ms, scale, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.textInputBackground,
  },
  leftMainViewStyle: {
    flex: 0.24,
    justifyContent: 'space-between',
  },
  gapView: {
    flex: 0.011,
  },
  todayShippingViewStyle: {
    flex: 0.2,
  },
  currentShippingViewStyle: {
    flex: 0.4,
    justifyContent: 'center',
  },
  orderConversionViewStyle: {
    flex: 0.4,
  },
  centerMainViewStyle: {
    flex: 0.64,
    justifyContent: 'space-between',
  },
  centerDividerViewStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  graphViewStyle: {
    flex: 0.45,
  },
  drawerMainViewStyle: {
    flex: 0.06,
    marginTop: SH(15),
  },
  centerViewStyle: {
    flexDirection: 'row',
    flex: 1,
    // paddingBottom: ms(10),

    justifyContent: 'space-evenly',
  },
  orderListMainView: {
    flex: 0.45,
    marginTop: SH(15),
    // marginHorizontal: SH(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetailMainView: {
    flex: 0.45,
    marginTop: SH(15),
    // marginRight: SH(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyOrderView: {
    flex: 0.92,
    alignItems: 'center',
    justifyContent: 'center',
  },

  firstRowStyle: {
    flexDirection: 'row',
    paddingHorizontal: ms(10),
    justifyContent: 'space-between',
  },

  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // justifyContent: 'space-between',
  },

  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(7),
    color: COLORS.text,
    paddingLeft: ms(12),
  },

  totalTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: scale(5),
    color: COLORS.lavender,
    paddingTop: ms(3),
  },

  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    height: SH(65),
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderColor: COLORS.blue_shade,
  },
  showAllOrdersView: {
    borderWidth: 1,
    borderRadius: 5,
    height: SH(60),
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(12),
    paddingHorizontal: ms(7),
    width: SW(130),
    borderColor: COLORS.blue_shade,
  },
  rightIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinImageStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.primary,
  },
  orderDetailStyle: {
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    paddingLeft: 5,
  },

  // -------------------

  shippingOrdersView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: SW(110),
    paddingVertical: verticalScale(6),
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 0,
    right: 0,
    zIndex: 999,
  },

  firstIconStyle: {
    alignSelf: 'center',
    width: SW(13),
    height: SW(13),
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 25,
    backgroundColor: COLORS.textInputBackground,
  },

  shippingDrawerTitleText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  shippingDrawerCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
  },
  bucketBackgorund: {
    width: SW(17),
    height: SW(17),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bucketBadge: {
    width: ms(13),
    height: ms(13),
    borderRadius: ms(10),
    position: 'absolute',
    right: 8,
    bottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
  },
  holdBadge: {
    borderWidth: 2,
    width: ms(13),
    height: ms(13),
    borderRadius: ms(10),
    position: 'absolute',
    right: -5,
    bottom: -6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.gerySkies,
    backgroundColor: COLORS.white,
  },
  holdBadgetext: {
    color: COLORS.gerySkies,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
  },
  orderToReviewView: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: height - 120,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: ms(20),
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: SH(15),
  },
  ordersToReviewText: {
    color: COLORS.primary,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
  },

  viewallTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  viewAllButtonStyle: {
    width: SH(70),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.darkGray,
  },
  modalStyle: {
    flex: 1,
  },
  shippingOrderViewStyle: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: COLORS.white,
    right: -50,
    top: -50,
    bottom: -50,
    borderRadius: 10,
  },
  shippingOrderHeader: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shippingOrderHeading: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
    paddingLeft: SW(6),
  },
  backView: {
    marginTop: 20,
    marginLeft: 18,
    width: ms(60),
    borderRadius: 5,
    height: ms(25),
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gerySkies,
  },
  backImageStyle: {
    width: SW(8),
    height: SW(8),
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    flex: 1,
  },
  userDetailView: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    height: SH(80),
    marginVertical: 10,
    flexDirection: 'row',
  },
  orderDetailViewStyle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: COLORS.textInputBackground,
  },
  userImageStyle: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(10),
    resizeMode: 'cover',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  userNameView: {
    justifyContent: 'center',
    // paddingLeft: 10,
  },
  orderproductView: {
    borderWidth: 1,
    borderRadius: 5,
    height: SH(60),
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 5,
    borderColor: COLORS.sky_grey,
  },
  removeProductImageStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  invoiceText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(14),
    color: COLORS.darkGray,
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(10),
    color: COLORS.navy_blue,
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.textBlue,
  },
  acceptButtonView: {
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.sky_blue,
    marginLeft: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    flex: 1,
    // width: ms(80),
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  declineButtonStyle: {
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 20,
    flex: 1,
    // width: ms(80),
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.primary,
  },
  orderDetailsView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  orderandPriceView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingTop: 15,
  },
  emptyView: {
    height: Platform.OS === 'ios' ? height / 3.2 : height / 2.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrdersText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(22),
    color: COLORS.primary,
  },
  noOrderView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  orderLoader: {
    height: height / 2.35,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 6,
  },
  lineCommonStyle: {
    height: 1,
    backgroundColor: '#E4E6F2',
    marginVertical: ms(8),
    marginHorizontal: ms(10),
  },
  dashedLineStyle: {
    borderTopWidth: 1,
    borderTopColor: '#7E8AC1',
    marginTop: ms(10),
    borderStyle: 'dashed',
  },
  trackOrderIconStyle: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
  },
  checkboxIconStyle: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
    marginRight: ms(3),
  },
  rightTopIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    marginLeft: 2,
  },
  scanButtonStyle: {
    width: '90%',
    backgroundColor: COLORS.sky_grey,
    height: ms(25),
    borderRadius: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  scanIconStyle: {
    height: ms(15),
    width: ms(15),
    resizeMode: 'contain',
    marginLeft: ms(5),
  },
  scanBttnTextStyle: {
    color: COLORS.navy_blue,
    fontSize: ms(10),
  },
  calendarModalView: {
    backgroundColor: COLORS.white,
    width: width * 0.6,
    height: height - SW(30),
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
  },
});

export default styles;

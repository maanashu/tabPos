import { Dimensions, Platform, StyleSheet } from 'react-native';
import { ms, scale, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  firstRowStyle: {
    flexDirection: 'row',
    paddingHorizontal: ms(10),
    justifyContent: 'space-between',
  },
  shippingStatusViewStyle: {
    alignItems: 'flex-start',
    borderRadius: 10,
    width: SW(100),
    paddingVertical: ms(10),
    backgroundColor: COLORS.white,
  },
  shippingStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingLeft: ms(15),
    color: COLORS.primary,
  },
  shippedOrderText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    paddingLeft: ms(15),
    paddingTop: ms(10),
  },
  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-between',
  },
  currentStatusView: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingVertical: ms(9),
    width: SW(100),
    height: height / 3.3,
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(7),
    color: COLORS.text,
    paddingLeft: ms(12),
  },
  shippingTypeImage: {
    width: ms(16),
    height: ms(16),
    resizeMode: 'contain',
  },
  itemMainViewStyle: {
    borderWidth: 1,
    marginHorizontal: ms(12),
    marginVertical: ms(1.5),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(8),
    alignItems: 'center',
    flexDirection: 'row',
  },
  shippingTypeDetails: {
    justifyContent: 'center',
    marginHorizontal: ms(10),
    paddingVertical: ms(1),
  },
  shippingTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(5),
    color: COLORS.darkGray,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(5),
    color: COLORS.solid_grey,
    paddingTop: ms(3),
  },
  orderConvertionView: {
    borderRadius: 10,
    width: SW(100),

    backgroundColor: COLORS.white,
    height: height / 2.35,
  },
  orderTextStyle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: scale(7),
    color: COLORS.solid_grey,
    paddingLeft: ms(12),
    paddingTop: ms(9),
  },
  piechartViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  percentageTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.black,
    textAlign: 'center',
  },
  ordersRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(80),
    justifyContent: 'space-between',
    paddingVertical: ms(4),
    paddingHorizontal: ms(12),
  },
  orderTypeTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: SF(14),
    color: COLORS.dark_grey,
  },
  countTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.dark_grey,
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
  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: width * 0.06,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
  },
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
  drawerIconView: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 6,
    width: SW(15),
    height: SW(15),
    borderRadius: 5,
    justifyContent: 'center',
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
  shippingDrawerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(10),
    paddingHorizontal: ms(10),
  },
  sideBarImage: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
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
  graphViewStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: width * 0.56,
    paddingHorizontal: ms(12),
    paddingBottom: 30,
  },
  numberOrdersText: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: ms(12),
    paddingTop: ms(8),
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  backImageStyle: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: width * 0.43,
    height: height - 120,
    marginBottom: 90,
  },
  userDetailView: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    height: SH(80),
    marginVertical: 10,
    flexDirection: 'row',
    borderWidth: 1,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: 20,
    width: width / 2.4,
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
    paddingLeft: 10,
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
    borderColor: COLORS.blue_shade,
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
    fontSize: SF(28),
    color: COLORS.dark_grey,
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  acceptButtonView: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    // width: ms(80),
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  declineButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 20,
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
    bottom: 15,
    alignSelf: 'center',
    width: width * 0.43,
    paddingTop: 15,
    paddingHorizontal: ms(15),
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
});

export default styles;

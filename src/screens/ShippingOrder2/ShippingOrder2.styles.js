import { Dimensions, StyleSheet } from 'react-native';
import { ms, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  firstRowStyle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  shippingStatusViewStyle: {
    width: SW(100),
    height: SH(120),
    alignItems: 'flex-start',
    borderRadius: 10,
    paddingTop: SH(16),
    backgroundColor: COLORS.white,
  },
  shippingStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.primary,
    paddingLeft: SW(6),
  },
  shippedOrderText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    paddingLeft: SW(6),
    paddingTop: SH(10),
  },
  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentStatusView: {
    width: SW(100),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingVertical: SH(15),
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(6),
  },
  shippingTypeImage: {
    width: SH(30),
    height: SH(30),
    resizeMode: 'contain',
  },
  itemMainViewStyle: {
    borderWidth: 1,
    marginHorizontal: SW(6),
    marginVertical: SH(4),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  shippingTypeDetails: {
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  shippingTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    paddingTop: 5,
  },
  orderConvertionView: {
    width: SW(100),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingVertical: SH(15),
  },
  orderTextStyle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
    paddingLeft: SW(6),
  },
  piechartViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.black,
    position: 'absolute',
    textAlign: 'center',
    top: 90,
  },
  ordersRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(80),
    justifyContent: 'space-between',
    paddingVertical: 8,
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
    height: SH(60),
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
    marginHorizontal: 20,
    paddingHorizontal: 20,
    width: SW(140),
    borderColor: COLORS.blue_shade,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
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
    fontSize: SF(14),
    color: COLORS.primary,
  },
  orderDetailStyle: {
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
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
    width: windowWidth * 0.06,
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
    paddingVertical: 13,
    paddingHorizontal: 25,
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
    marginBottom: 90,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20,
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
  numberOrdersText: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  backImageStyle: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: SW(160),
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
  userImageStyle: {
    width: SH(36),
    height: SH(36),
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
});

export default styles;

import { Dimensions, StyleSheet } from 'react-native';
import { ms, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  firstRowStyle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  shippingStatusViewStyle: {
    width: SW(100),
    height: SH(120),
    alignItems: 'flex-start',
    ...ShadowStyles.shadow2,
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
    ...ShadowStyles.shadow2,
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
    ...ShadowStyles.shadow2,
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
  // -------------------
  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    // borderWidth: 1,
    ...ShadowStyles.shadow,
    width: windowWidth * 0.06,
    // height: windowHeight * 0.86,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
  },
  drawerIconView: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sideBarImage: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  bucketBackgorund: {
    width: SW(17),
    height: SW(17),
    borderRadius: 5,
    backgroundColor: COLORS.textInputBackground,
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
    ...ShadowStyles.shadow2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
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
});

export default styles;
import { Fonts } from '@/assets';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { ms, verticalScale } from 'react-native-size-matters';

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
    marginHorizontal: 20,
    paddingHorizontal: 15,
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

  orderToReviewView: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
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
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: COLORS.textInputBackground,
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
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
  shippingOrderHeader: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 10,
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
    ...ShadowStyles.shadow1,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: SW(150),
    paddingVertical: 15,
  },
  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  itemMainViewStyle: {
    marginHorizontal: SW(6),
    marginVertical: SH(4),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 3,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  shippingTypeImage: {
    width: SH(30),
    height: SH(30),
    resizeMode: 'contain',
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
});

export default styles;

import { Dimensions, Platform, StyleSheet } from 'react-native';
import { ms, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2;

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
  shippedOrderText: {
    fontSize: SF(14),
    paddingTop: ms(10),
    paddingLeft: ms(15),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalTextStyle: {
    fontSize: SF(12),
    paddingTop: ms(2),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  totalTextStyle2: {
    paddingTop: 0,
    fontSize: SF(12),
    lineHeight: ms(8),
    color: COLORS.darkGray,
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
  countTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderColor: COLORS.blue_shade,
  },
  showAllOrdersView: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width / 2.6,
    paddingVertical: 10,
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
    width: SW(30),
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.solid_grey,
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    paddingLeft: 5,
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
    alignItems: 'center',
    marginVertical: 6,
    width: SW(15),
    height: SW(15),
    borderRadius: 5,
    justifyContent: 'center',
  },
  shippingDrawerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(7),
    marginLeft: ms(15),
  },
  titleStyle: {
    color: COLORS.dark_grey,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
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
    right: 5,
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: ms(5.5),
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
    // marginTop: ms(30),
    backgroundColor: COLORS.white,
    height: twoEqualView,
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
    fontFamily: Fonts.MaisonRegular,
  },
  viewallTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  emptyView: {
    flex: 1,
    alignSelf: 'center',
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height / 3.2
        : Dimensions.get('window').height / 2.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrdersText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(22),
    color: COLORS.primary,
    textAlign: 'center',
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
    paddingTop: 10,
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
    marginLeft: 28,
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
  currentStatusText: {
    fontSize: ms(8),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').width * 0.38
        : Dimensions.get('window').width * 0.42,
    height: Dimensions.get('window').height - 80,
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
    marginTop: ms(10),
    backgroundColor: COLORS.textInputBackground,
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  orderproductView: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: COLORS.blue_shade,
  },
  removeProductImageStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  invoiceText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(12),
    color: COLORS.darkGray,
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark_grey,
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(16),
    color: COLORS.solid_grey,
  },
  acceptButtonView: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    paddingHorizontal: ms(12),
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
    paddingHorizontal: ms(12),
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
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: ms(5),
    alignSelf: 'center',
    // width: Dimensions.get('window').width * 0.42,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  backButtonView: {
    position: 'absolute',
    width: ms(55),
    backgroundColor: COLORS.darkGray,
    borderRadius: ms(5),
    height: ms(25),
    alignItems: 'center',
    justifyContent: 'center',
    top: ms(10),
    left: ms(20),
    zIndex: 9999,
  },
  backIconStyle: {
    height: ms(17),
    width: ms(17),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  backTextStyle: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTotalView: {
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.textInputBackground,
    paddingVertical: ms(8),
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width / 5
        : Dimensions.get('window').width / 4.5,
    borderRadius: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  expandButtonStyle: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end',
    top: 20,
    right: 20,
  },
  detailMap: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  addressTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    paddingTop: ms(5),
    textAlign: 'center',
  },
  firstNameText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.dark_grey,
    paddingTop: ms(10),
    textAlign: 'center',
  },
  driverListHeadingText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(20),
    color: COLORS.dark_grey,
    textAlign: 'center',
    paddingVertical: ms(15),
  },
  driverModalStyle: {
    height: ms(250),
    position: 'absolute',
    bottom: 0,
    right: 10,
    borderRadius: 15,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width / 2.5,
  },
  driverProfileStyle: {
    width: ms(36),
    height: ms(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  storeNumberText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    paddingTop: ms(5),
    textAlign: 'center',
  },
  storeDetailView: {
    width: Dimensions.get('window').width / 3.5,
    marginTop: ms(10),
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingBottom: 10,
    paddingTop: 20,
  },
  dashedLineView: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderStyle: 'dashed',
    marginTop: ms(5),
  },
  paymentModeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  paymentOptionView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  paymentOptionText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  thankYouText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(20),
    textAlign: 'center',
    color: COLORS.dark_grey,
  },
  deliveryDateText: {
    paddingLeft: 20,
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    paddingTop: ms(5),
    color: COLORS.dark_grey,
  },
  mapMainView: {
    width: Dimensions.get('window').width / 2.2,
    marginTop: ms(10),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: Dimensions.get('window').height - 80,
  },
  jobrTextStyle: {
    fontFamily: Fonts.Bold,
    fontSize: SF(22),
    textAlign: 'center',
    color: COLORS.primary,
  },
  mapMarkerStyle: {
    height: ms(30),
    width: ms(30),
    resizeMode: 'contain',
  },
  gpsViewStyle: {
    top: 20,
    left: 20,
    opacity: 0.8,
    width: ms(32),
    height: ms(32),
    borderRadius: 21,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  gpsImageStyle: {
    width: ms(13),
    height: ms(13),
    resizeMode: 'contain',
  },
  productTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    color: COLORS.dark_grey,
  },
});

export default styles;

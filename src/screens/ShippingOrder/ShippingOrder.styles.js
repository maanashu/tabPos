import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, verticalScale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainScreenContiner: {
    flex: 1,
    width: windowWidth * 0.94,
    alignSelf: 'center',
    height: windowHeight,
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
    flexDirection: 'row',
  },
  truckStyle: {
    width: SH(32),
    height: SH(32),
    resizeMode: 'contain',
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
  },
  dropdown2Con: {
    width: SW(15),
    height: SH(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  searchView: {
    borderWidth: 1,
    // width: SW(65),
    height: SH(38),
    borderRadius: 30,
    borderColor: COLORS.row_grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchImage: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  textInputStyle: {
    width: SW(75),
    // marginLeft: 10,
    fontFamily: Fonts.Italic,
    // borderWidth: 3,
    fontSize: SF(15),
    paddingLeft: 5,
  },
  orderView: {
    backgroundColor: COLORS.orderStatusBackground,
    borderRadius: 8,
    width: Platform.OS === 'android' ? SW(32) : SW(30),
    height: SH(92),
    flexDirection: 'row',
    marginHorizontal: moderateScale(7),
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SW(2),
  },
  orderStatusView: {
    justifyContent: 'center',
    paddingLeft: SW(2),
  },
  orderStatusImage: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
  },
  countView: {
    justifyContent: 'center',
    paddingLeft: SW(2),
  },
  countText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(16),
  },

  statusText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    width: SW(20),
  },
  statusText2: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    textAlign: 'center',
  },
  orderNumberMainView: {
    width: windowWidth,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orderNumberLeftView: {
    borderRadius: 5,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    height: windowHeight * 0.34,
    width: windowWidth * 0.45,
  },
  orderNumberLeftViewmap: {
    borderRadius: 5,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    height: windowHeight,
    width: windowWidth * 0.44,
  },
  chartView: {
    width: SW(168),
    height: SW(60),
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  chartImageStyle: {
    width: SW(168),
    height: SH(210),
    resizeMode: 'contain',
  },
  orderReviewRightView: {
    width: windowWidth / 2.25,
    borderRadius: 5,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    height: windowHeight * 0.5,
    width: windowWidth * 0.45,
  },
  orderReviewText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  reviewHeadingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SW(5),
    alignItems: 'center',
  },
  viewAllView: {
    width: SW(25),
    height: SH(30),
    backgroundColor: COLORS.bluish_green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  viewText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(14),
    textAlign: 'center',
  },
  reviewRenderView: {
    marginHorizontal: SW(5),
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: SW(2),
    borderColor: COLORS.orderStatusBackground,
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: SW(5),
    justifyContent: 'space-between',
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 1,
  },
  pinIcon: {
    width: SW(5),
    height: SW(8),
    resizeMode: 'contain',
  },
  rightIconStyle: {
    width: SW(10),
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  nameTextSet: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    width: SW(40),
  },
  timeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    textAlignVertical: 'center',
    paddingLeft: 2,
  },
  conversionRow: {
    width: windowWidth / 2.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingLeft: SW(7),
  },
  conversionBoxStyle: {
    width: SW(40),
    height: SW(40),
    resizeMode: 'contain',
  },
  orderFlatlistView: {
    width: SW(100),
    alignItems: 'center',
  },
  renderOrderView: {
    width: SW(70),
    borderRadius: 6,
    height: Platform.OS === 'ios' ? SH(65) : SW(15),
    backgroundColor: COLORS.textInputBackground,
    marginTop: 5,
    paddingLeft: SW(6),
    justifyContent: 'center',
  },
  deliveryOrders: {
    width: windowWidth * 0.44,
    backgroundColor: COLORS.orderStatusBackground,
    borderRadius: 5,
    paddingHorizontal: SW(5),
    paddingTop: SW(3),
    height: windowHeight * 0.15,
  },
  deliveryViewStyle: {
    backgroundColor: COLORS.white,
    marginVertical: SH(8),
    marginHorizontal: SW(3),
    paddingLeft: SW(2),
    paddingRight: SW(5),
    paddingVertical: SW(2),
    width: Platform.OS === 'ios' ? SW(48) : SH(180),
    borderRadius: 5,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    paddingLeft: 2,
  },
  backView: {
    width: SW(30),
    height: SW(14),
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
  },
  orderDetailView: {
    backgroundColor: COLORS.white,
    // paddingRight: SW(50),
    width: windowWidth * 0.46,
    height: windowHeight * 0.88,
  },
  orderDetailView2: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: windowWidth * 0.48,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: 10,
  },
  profileDetailView: {
    paddingHorizontal: SW(5),
    paddingVertical: SW(3),
    borderRadius: 6,
    backgroundColor: COLORS.textInputBackground,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImageView: {
    flexDirection: 'row',
    width: SW(50),
  },
  profileImage: {
    width: SW(13),
    height: SW(13),
    resizeMode: 'contain',
    borderRadius: 50,
    marginRight: 5,
  },
  scooter: {
    width: SW(17),
    height: SW(18),
    resizeMode: 'contain',
  },
  titleText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.black,
    width: SW(60),
  },
  boxText: {
    fontFamily: Fonts.Italic,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  productViewStyle: {
    marginRight: SW(4),
    flexDirection: 'row',
    top: 7,
    justifyContent: 'space-between',
  },
  priceText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 0,
    right: 0,
    backgroundColor: COLORS.white,
    width: windowWidth * 0.46,
    height: windowHeight * 0.3,
    // ...ShadowStyles.shadow,
    padding: 10,
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SW(100),
    paddingVertical: 2,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  subTotal: {
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  subTotalValue: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  discount: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  discountValue: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.darkGray,
  },
  totalLabel: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  totalValue: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  button: {
    width: SW(100),
    height: SW(15),
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    marginRight: 6,
    top: 8,
  },
  buttonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  declineButton: {
    width: SW(50),
    height: SW(15),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignSelf: 'flex-end',
    marginRight: 6,
    top: 8,
  },
  acceptButton: {
    width: SW(50),
    height: SW(15),
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    marginRight: 6,
    top: 8,
  },
  orderReviewButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
    marginTop: 7,
  },
  itemSeparatorView: {
    backgroundColor: COLORS.solidGrey,
    height: 2,
    width: '96%',
    marginVertical: verticalScale(3),
  },
  map: {
    width: windowWidth * 0.48,
    height: windowHeight * 0.7,
    alignSelf: 'center',
    borderRadius: 6,
  },
  headerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  orderModalView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 50,
    backgroundColor: COLORS.white,
    right: SW(5),
    width: SW(95),
    paddingVertical: 8,
    borderRadius: 7,
  },
  deliveryImage: {
    width: SW(13),
    height: SH(40),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  deliveryStatus2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SH(53),
    paddingRight: moderateScale(7),
    marginTop: 10,
  },
  deliveryStatus: {
    flexDirection: 'row',
    height: SH(44),
    paddingRight: moderateScale(7),
  },
  verifyText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  justifyContentStyle: {
    justifyContent: 'flex-end',
  },
  nineXCon: {
    width: SW(22),
    height: SH(45),
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nineXText: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(17),
  },
  radioImage: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    alignSelf: 'center',
    left: 10,
  },
  reviewHeader: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.primary,
    paddingHorizontal: moderateScale(13),
  },
  subtotalRow: {
    borderWidth: 1,
    width: SH(300),
    alignSelf: 'flex-end',
    borderStyle: 'dashed',
    borderColor: COLORS.row_grey,
    marginVertical: verticalScale(3),
  },
  mapContainer: {
    marginTop: SH(15),
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: COLORS.solidGrey,
    height: windowHeight * 0.65,
  },
  nodata: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.primary,
    alignSelf: 'center',
    marginVertical: moderateScale(30),
  },
  orderViewBody: {
    width: SW(60),
    height: SH(50),
    justifyContent: 'center',
  },
  noteContainer: {
    position: 'absolute',
    bottom: 10,
    borderWidth: 2,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.46,
    height: SH(126),
    borderRadius: 5,
    paddingHorizontal: moderateScale(15),
  },
  note: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.black,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectShipingRightView: {
    borderWidth: 1,
    width: windowWidth * 0.42,
    borderRadius: 10,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    height: windowHeight * 0.84,
  },
  selectShipingCon: {
    height: SH(56),
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    marginVertical: verticalScale(3),
  },
  radioRound: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  shipingRate: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(13),
    color: COLORS.solid_grey,
  },
  shipingRateSubHead: {
    fontSize: SF(11),
  },
  ups2: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  printButtonCon: {
    height: SH(64),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  printText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.darkGray,
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shipingRadioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

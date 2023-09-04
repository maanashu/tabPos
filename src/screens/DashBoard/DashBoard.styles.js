import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // home Screen css start
  homeScreenCon: {
    flex: 1,
  },
  cashProfileCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.95,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  cashProfile: {
    width: SW(55),
    height: SW(55),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  todaySaleCon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.26,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  sessionCon: {
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.26,
  },

  todaySale: {
    color: COLORS.primary,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonRegular,
  },
  cashLabel: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  saleAmountLable: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    width: windowWidth * 0.13,
  },
  cashAmount: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  paddingV: {
    paddingVertical: verticalScale(2.5),
  },
  profileHrRow: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.26,
  },
  checkoutButton: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.dark_grey,
    width: windowWidth * 0.26,

    height: SW(14),
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(9),
  },
  checkoutText1: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  checkArrow: {
    width: SW(10),
    height: SW(4),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
  },
  lockLight: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(10),
  },
  cashierName: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  posCashier: {
    color: COLORS.dark_grey,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  cashProfilecon: {
    borderWidth: 4,
    borderRadius: 100,
    borderColor: COLORS.solidGrey,
  },
  rightOrderCon: {
    width: windowWidth * 0.64,
    height: windowHeight * 0.95,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(5),
    backgroundColor: COLORS.white,
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.61,
    height: Platform.OS === 'android' ? SH(55) : SH(45),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  sideBarInputWraper: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    alignItems: 'center',
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    justifyContent: 'center',
    marginTop: 5,
    paddingLeft: moderateScale(10),
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  sideSearchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginLeft: moderateScale(10),
    marginRight: moderateScale(5),
    tintColor: COLORS.gerySkies,
  },
  searchInput: {
    borderRadius: 7,
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
  },
  sideBarsearchInput: {
    borderRadius: 7,
    width: windowWidth * 0.24,
    fontFamily: Fonts.Medium,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
  },
  storeCardCon: {
    width: SW(110),
    height: SW(65),
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...ShadowStyles.shadow2,
  },
  sellingBucket: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  sellingArrow: {
    width: SW(10),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  startSelling: {
    color: COLORS.solid_grey,
    fontSize: SF(22),
    fontFamily: Fonts.MaisonRegular,
  },
  scanSer: {
    color: COLORS.dark_grey,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  arrowBtnCon: {
    width: SW(90),
    height: SW(14),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTableCon: {
    // borderWidth: 1,
    height: Platform.OS === 'ios' ? windowHeight * 0.6 : windowHeight * 0.5,
    backgroundColor: COLORS.textInputBackground,
    ...ShadowStyles.shadow2,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  deliveries: {
    color: COLORS.black,
    fontSize: SF(20),
    fontFamily: Fonts.SemiBold,
  },
  tableScrollCon: {
    borderWidth: 1,
    height: SH(60),
  },
  reviewRenderView: {
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: SW(2),
    borderColor: COLORS.orderStatusBackground,
    borderRadius: 5,
    paddingVertical: 6,
    paddingLeft: SW(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  nameText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  timeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    textAlignVertical: 'center',
    paddingLeft: 2,
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
  rightIconStyle1: {
    width: SW(35),
    justifyContent: 'center',
  },
  hashNumber: {
    fontFamily: Fonts.Medium,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  nameTextBold: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.dark_grey,
  },
  timeSec: {
    color: COLORS.primary,
    paddingRight: moderateScale(10),
  },

  // home Screen css end

  // start tracking modal css start
  modalMainView: {
    backgroundColor: COLORS.white,
    width: SW(160),
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    height: windowHeight - 200,
    // borderWidth:10
  },
  headerView: {
    backgroundColor: COLORS.primary,
    width: SW(160),
    height: SH(60),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  trackingButtonText: {
    fontFamily: Fonts.Medium,
    color: COLORS.white,
    fontSize: SF(12),
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  countCashView: {
    width: SW(130),
    alignSelf: 'center',
  },
  countCashText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(22),
  },
  amountCountedText: {
    fontFamily: Fonts.Medium,
    color: COLORS.darkGray,
    fontSize: SF(14),
  },
  inputStyle: {
    marginTop: 4,
    height: SH(60),
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    fontSize: SF(24),
    color: COLORS.solid_grey,
    paddingLeft: SW(5),
    paddingVertical: SH(5),
    backgroundColor: COLORS.textInputBackground,
  },
  noteInputStyle: {
    marginTop: 4,
    width: SW(130),
    height: SH(60),
    borderRadius: 5,
    fontFamily: Fonts.Italic,
    fontSize: SF(13),
    color: COLORS.solid_grey,
    paddingLeft: SW(5),
    paddingVertical: SH(8),
    backgroundColor: COLORS.textInputBackground,
  },
  buttonText: {
    fontSize: SF(16),
    color: COLORS.darkGray,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
  },
  saveButton: {
    alignSelf: 'center',
    width: windowWidth * 0.28,
    height: SH(60),
  },

  // your session end con css start
  yourSessionendCon: {
    backgroundColor: 'white',
    borderRadius: 10,

    width: windowWidth * 0.4,
    height: windowHeight * 0.7,
    position: 'absolute',
    alignSelf: 'center',
  },
  yourSessionendHeader: {
    height: SH(70),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourSession: {
    color: COLORS.solid_grey,
    fontSize: SF(23),
    fontFamily: Fonts.MaisonBold,
  },
  yourSessionBodyCon: {
    flex: 1,
    width: windowWidth * 0.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  posClose: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  sessionEndBar: {
    width: SW(60),
    height: SW(60),
    resizeMode: 'contain',
  },
  expandOneHourButton: {
    backgroundColor: COLORS.dark_grey,
    width: windowWidth * 0.3,
    height: windowHeight * 0.07,
  },
  expandTwoHourButton: {
    backgroundColor: COLORS.solid_grey,
    width: windowWidth * 0.3,
    height: windowHeight * 0.07,
  },
  expandOneHourText: {
    color: COLORS.white,
    fontFamily: Fonts.Regular,
    fontSize: SF(16),
  },
  sessionViewStyle: {
    width: SW(140),
    alignItems: 'center',
  },

  // searching list Modal css start
  searchproductCon: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    position: 'absolute',
    top: 0,
    left: 10,
    paddingHorizontal: moderateScale(12),
    marginLeft: moderateScale(10),
  },
  searchInputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    height: SH(55),
    justifyContent: 'space-between',
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow2Style: {
    width: SW(15),
    height: SW(10),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  searchInput2: {
    borderRadius: 7,
    width: SW(170),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },

  searchCrossButton: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(8),
  },
  searchingProductCon: {
    height: windowHeight * 0.8,
  },

  flatlistHeight: {
    height: windowHeight * 0.95,
  },
  padding: {
    paddingRight: moderateScale(15),
  },
  marboloRedPackStyle: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius: 50,
    marginVertical: verticalScale(4),
  },
  locStock: {
    paddingHorizontal: moderateScale(10),
  },
  stockStyle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  searchItalicText: {
    color: COLORS.darkGray,
    fontFamily: Fonts.Italic,
    fontSize: SF(13),
  },
  marbolorRedStyle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(18),
  },
  viewDetailCon: {
    zIndex: 99,
    height: 35,
  },
  stockStyle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  hr: {
    borderWidth: 0.5,
    borderColor: COLORS.row_grey,
    marginVertical: verticalScale(5),
  },
  productDetailCon: {
    flex: 1,
    width: windowWidth * 0.4,
    alignSelf: 'center',
    height: windowHeight * 0.7,
  },
  availablestockHeading: {
    color: COLORS.bluish_green,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    alignSelf: 'center',
  },
  amountjfrContainer: {
    borderWidth: 2,
    borderColor: COLORS.textInputBackground,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
  },
  jfrmaduro: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
    width: SW(70),
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    height: SH(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    zIndex: -99,
  },
  price: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    height: SH(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    zIndex: -99,
  },

  plusBtn2: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  bundleOfferText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
  },
  addcartButtonStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    width: windowWidth * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  addToCartText: {
    color: COLORS.white,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    paddingVertical: verticalScale(7),
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noProductText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(50),
  },
  emptyListText: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  // searching list Modal css end

  // searching product Detail css start
  productModCon2: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.7,
    height: windowHeight * 0.7,
    borderRadius: 15,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(8),
  },

  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.07,
    alignItems: 'center',
    flexDirection: 'row',
  },

  backButtonArrow: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  backTextStyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingVertical: verticalScale(5),
  },
  productDetailHeader: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(32),
  },
  detailImageCon: {
    width: windowWidth * 0.25,
  },
  marboloPackStyle: {
    width: SW(92),
    height: SW(60),
    resizeMode: 'contain',
  },
  productDescrptionCon: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5),
  },
  detailHeader: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
  },
  productDes: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(13),
  },
  detailPriceCon: {
    width: windowWidth * 0.4,
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    height: SH(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    zIndex: -99,
  },
  descriptionAddCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  desAddCartText: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingVertical: verticalScale(6),
  },
  unitTypeCon: {
    width: windowWidth * 0.12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5),
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(2),
  },
  detailHeader2: { color: COLORS.dark_grey, fontFamily: Fonts.MaisonRegular },

  // searching product Detail css end

  bundleOfferCon: {
    backgroundColor: COLORS.blue_shade,
    height: SH(42),
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
  },
  buypackText: {
    color: COLORS.primary,
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  bundleAddCon: {
    borderRadius: 3,
    width: SW(20),
    alignItems: 'center',
  },
  bundleAddText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingVertical: verticalScale(3),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  requestNotFound: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: SF(20),
  },
});

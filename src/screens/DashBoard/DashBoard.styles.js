import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale, ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.sky_grey,
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
    backgroundColor: COLORS.sky_grey,
  },
  cashProfileCon: {
    flex: 0.3,
    backgroundColor: COLORS.sky_grey,
    paddingRight: moderateScale(15),
  },
  cashProfile: {
    width: ms(70),
    height: ms(70),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  todaySaleCon: {
    borderRadius: 15,
    width: windowWidth * 0.26,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
    backgroundColor: COLORS.white,
  },
  sessionCon: {
    borderColor: COLORS.solidGrey,
    // width: windowWidth * 0.26,
  },

  todaySale: {
    color: COLORS.navy_blue,
    fontSize: SF(18),
    fontFamily: Fonts.SemiBold,
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
    fontFamily: Fonts.Regular,
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
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.navy_blue,
    width: windowWidth * 0.26,

    height: SW(14),
    borderRadius: 30,
    paddingVertical: verticalScale(9),
    paddingHorizontal: moderateScale(16),
  },
  checkoutText1: {
    color: COLORS.navy_blue,
    fontSize: SF(16),
    fontFamily: Fonts.Medium,
  },
  checkArrow: {
    width: SW(10),
    height: SW(4),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
  },
  lockLight: {
    width: ms(16),
    height: ms(16),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(10),
  },
  cashierName: {
    color: COLORS.navy_blue,
    fontSize: SF(24),
    fontFamily: Fonts.SemiBold,
  },
  cashierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  posCashier: {
    color: COLORS.faded_purple,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  cashierIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FF',
    borderRadius: 20,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    backgroundColor: COLORS.neutral_blue,
  },
  idDotStyle: {
    backgroundColor: COLORS.sky_blue,
    width: moderateScale(4),
    height: moderateScale(4),
    borderRadius: moderateScale(4 / 2),
    marginRight: moderateScale(8),
  },
  cashProfilecon: {
    width: ms(77),
    height: ms(77),
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightOrderCon: {
    flex: 0.7,
    backgroundColor: COLORS.white,
    padding: ms(15),
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(22),
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(32),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
    paddingHorizontal: ms(7),
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
    tintColor: COLORS.navy_blue,
  },
  searchStyle: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
    marginRight: moderateScale(5),
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
    flex: 1,
    // width: windowWidth * 0.4,
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(10),
  },
  sideBarsearchInput: {
    borderRadius: 7,
    width: windowWidth * 0.24,
    fontFamily: Fonts.Medium,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  scnStyle: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
  },
  storeCardCon: {
    // width: SW(100),
    flex: 1,
    height: SW(65),
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...ShadowStyles.shadow2,
  },
  sellingBucket: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  searchIconInCard: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    marginRight: SW(2),
  },
  searchTxtStyle: {
    color: COLORS.sky_blue,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  sellingArrow: {
    width: SW(10),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  startSelling: {
    color: COLORS.white,
    fontSize: SF(22),
    fontFamily: Fonts.Medium,
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
    flex: 1,
  },
  deliveries: {
    color: COLORS.navy_blue,
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
    borderRadius: 16,
    paddingLeft: SW(8),
    paddingVertical: SH(12),
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  nameText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(14),
    color: COLORS.textBlue,
  },
  timeText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    textAlignVertical: 'center',
    paddingLeft: 2,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SH(8),
  },
  pinIcon: (value) => {
    return {
      width: SW(6),
      height: SW(6),
      resizeMode: 'contain',
      marginRight: SW(1),
      tintColor: value === 1 ? COLORS.purple : value === 2 ? COLORS.navy_blue : COLORS.light_time,
    };
  },
  arrowIconRight: {
    width: ms(16),
    height: ms(16),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rightIconStyle1: {
    // width: SW(35),
    justifyContent: 'center',
    marginRight: SW(8),
    alignSelf: 'center',
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
    width: ms(250),
    borderRadius: ms(22),
    alignSelf: 'center',
    height: ms(320),
    ...ShadowStyles.shadow,
  },
  headerView: {
    height: ms(30),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: ms(15),
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
    tintColor: COLORS.navy_blue,
  },
  countCashView: {
    width: SW(130),
    alignSelf: 'center',
  },
  countCashText: {
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
    fontSize: ms(9),
  },
  amountCountedText: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(9),
  },
  hintText: {
    fontFamily: Fonts.Regular,
    color: COLORS.lavender,
    fontSize: ms(9),
  },
  inputStyle: {
    height: SH(60),
    fontFamily: Fonts.Medium,
    fontSize: ms(12),
    color: COLORS.navy_blue,
    paddingLeft: ms(5),
    flex: 1,
  },
  noteInputStyle: {
    fontFamily: Fonts.Medium,
    fontSize: ms(11),
    color: COLORS.navy_blue,
    flex: 1,
    height: ms(38),
    textAlignVertical: 'center',
    paddingLeft: ms(5),
    paddingTop: ms(8),
  },
  buttonText: {
    fontSize: SF(16),
    color: COLORS.darkGray,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
  },
  saveButton: {
    alignSelf: 'center',
    // width: windowWidth * 0.28,
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
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    // position: 'absolute',
    // top: 0,
    right: 25,
    paddingHorizontal: moderateScale(12),
    alignSelf: 'flex-end',
    // marginLeft: moderateScale(10),
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
    height: windowHeight * 0.7,
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
    height: windowHeight * 0.25,
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
    color: COLORS.red,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: SF(20),
  },

  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderColor: COLORS.row_grey,
    justifyContent: 'space-between',
    // backgroundColor: COLORS.textInputBackground,
  },
  invoiceNumberTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    textAlignVertical: 'center',
  },
  orderDetailStyle: {
    width: SW(30),
  },
  nameTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
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
  distanceTextStyle: {
    paddingLeft: 5,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  distanceTextStyle: {
    paddingLeft: 5,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  timeTextStyle: {
    fontSize: SF(12),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  btnInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cameraIcon: {
    width: ms(30),
    height: ms(30),
    resizeMode: 'contain',
  },
  startTracking: {
    fontSize: ms(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    marginVertical: ms(4),
  },
  inputCon: {
    height: ms(38),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    marginVertical: ms(4),
    borderRadius: ms(22),
    paddingHorizontal: ms(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  dollarSign: {
    fontSize: ms(12),
    color: COLORS.placeHoldeText,
    fontFamily: Fonts.Bold,
  },
  notFoundIcon: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
  },
  notesIcon: {
    width: ms(17),
    height: ms(17),
    resizeMode: 'contain',
  },
  startButtonCon: (value) => {
    return {
      height: ms(38),
      borderRadius: ms(22),
      backgroundColor: value ? COLORS.navy_blue : COLORS.graySky,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    };
  },
  startSessionText: () => {
    return {
      fontSize: ms(11),
      color: COLORS.white,
      fontFamily: Fonts.Medium,
    };
  },
  arrowIcon: (value) => {
    return {
      tintColor: value ? COLORS.sky_blue : COLORS.white,
      transform: [{ rotate: '90deg' }],
      marginLeft: ms(3),
    };
  },
  bellBack: {
    width: ms(27),
    height: ms(27),
    position: 'absolute',
    top: 15,
    right: 15,
    borderWidth: 2,
    borderColor: COLORS.sky_blue,
    borderRadius: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
    backgroundColor: COLORS.dark_grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellingBucket: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  sellingArrow: {
    width: SW(10),
    height: SW(5),
    resizeMode: 'contain',
  },
  startSelling: {
    color: COLORS.white,
    fontSize: SF(22),
    fontFamily: Fonts.MaisonRegular,
  },
  scanSer: {
    color: COLORS.solid_green,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  arrowBtnCon: {
    width: SW(90),
    height: SW(14),
    borderWidth: 1,
    borderColor: COLORS.solid_green,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTableCon: {
    // borderWidth: 1,
    height: Platform.OS === 'ios' ? windowHeight * 0.6 : windowHeight * 0.5,
    backgroundColor: COLORS.white,
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
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: SW(5),
    justifyContent: 'space-between',
    alignItems: 'center',
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
  rightIconStyle: {
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

  // search screen css start
  backgroundColorSCreen: {
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal:
      Platform.OS === 'android' ? moderateScale(22) : moderateScale(12),
  },

  searchScreenHeader: {
    height: SH(60),
    justifyContent: 'center',
  },
  crossBg: {
    width: SW(20),
    height: SW(8),
    resizeMode: 'contain',
  },
  cashLabelBold: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  itemLIistCon: {
    width: windowWidth * 0.57,
    height: windowHeight * 0.88,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },

  rightSideCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.87,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  inputWraper2: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.55,
    height: Platform.OS === 'android' ? SH(55) : SH(45),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  blueListHeader: {
    backgroundColor: COLORS.primary,
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    // alignContent: 'center',
  },
  blueListData: {
    borderWidth: 1,
    height: SH(48),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
    // alignContent: 'center',
  },
  blueListDataText: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
  },
  listCountCon: {
    borderWidth: 1,
    width: SW(30),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    paddingVertical: verticalScale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
  },
  sukNumber: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  borderCross: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },

  tableListSide: {
    width: windowWidth * 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableListSide2: {
    width: windowWidth * 0.29,
    paddingRight: 20,
  },
  listLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cashLabelWhite: {
    color: COLORS.white,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  cashLabelWhiteHash: {
    paddingHorizontal: moderateScale(15),
  },
  categoryArrayCon: {
    width: windowWidth * 0.13,
    height: SW(18),
    borderRadius: 10,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  listed: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  categories: {
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.MaisonBold,
  },
  catProArrayCon: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.125,
    height: SW(34),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: verticalScale(5),
    marginRight: moderateScale(7),
  },
  cloth: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  keyboard: {
    width: SW(12),
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    resizeMode: 'contain',
  },
  holdCartCon: {
    width: windowWidth * 0.11,
    height: SH(40),
    borderRadius: 5,
    backgroundColor: COLORS.marshmallow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pause: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  holdCart: {
    color: COLORS.white,
    fontSize: SF(13),
    fontFamily: Fonts.Bold,
    paddingHorizontal: moderateScale(3),
  },
  dark_greyBg: {
    backgroundColor: COLORS.dark_grey,
  },
  nameAddCon: {
    borderWidth: 1,
    height:
      Platform.OS === 'android' ? windowHeight * 0.35 : windowHeight * 0.37,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5),
  },
  nameAddSingleCon: {
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    justifyContent: 'center',
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    backgroundColor: COLORS.textInputBackground,
    marginTop: 5,
  },
  Phonelight: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
    marginLeft: moderateScale(10),
    marginRight: moderateScale(5),
  },
  terryText: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  okButtonCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.dark_grey,
    width: windowWidth * 0.26,
    alignSelf: 'center',
    borderRadius: 5,
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    marginTop: 5,
  },
  okText: {
    color: COLORS.white,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  addDiscountCon: {
    backgroundColor: COLORS.blue_shade,
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    width: windowWidth * 0.12,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDiscountText: {
    color: COLORS.dark_grey,
    fontSize: SF(13),
    fontFamily: Fonts.MaisonRegular,
  },
  addDiscountPic: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(10),
  },
  requestNotFound: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: SF(20),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  // totalItemCon: {
  //   borderTopWidth: 1,
  //   borderBottomWidth: 1,
  //   borderColor: COLORS.solidGrey,
  // },

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
    paddingVertical: SH(5),
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
  // subcategories component

  tabCont: {
    borderRadius: moderateScale(20),
    padding: SH(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: SH(50),
  },
  tabimg: {
    height: 16,
    width: 16,
  },
  totalItemCon: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  totalItem: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.MaisonBold,
    paddingVertical: verticalScale(4),
  },
  subTotal: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
  },
  subTotalDollar: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },

  paddVertical: {
    paddingVertical: verticalScale(3),
  },
  itemValue: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  checkoutButtonSideBar: {
    width: windowWidth * 0.28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(5),
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  checkArrow: {
    width: SW(10),
    height: SW(4),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
  },
  columbiaMen: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
  },
  minus: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
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
});

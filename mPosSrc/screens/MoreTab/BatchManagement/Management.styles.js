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
    backgroundColor: COLORS.textInputBackground,
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutText1: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockLight: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(10),
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    paddingVertical: SH(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMainViewN: {
    width: windowWidth,
    // paddingHorizontal: SW(16),
    alignSelf: 'center',
    // paddingVertical: SH(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImageStyle: {
    height: SH(25),
    width: SW(25),
    resizeMode: 'contain',
  },
  // backImageStyle: {
  //   width: SW(24),
  //   height: SW(24),
  //   resizeMode: 'contain',
  // },
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
    padding: 0,
    margin: 0,
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
    fontSize: SF(20),
    paddingLeft: SW(4),
  },
  cashDrawerView: {
    width: windowWidth - 50,
    alignSelf: 'center',
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: SH(25),
    paddingVertical: SH(25),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 10,
    ...ShadowStyles.shadow1,
  },
  cashDrawerText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: SF(14),
  },
  drawerIdText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    marginTop: SF(5),
  },
  loggedInAsText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
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
    // borderWidth: 4,
    // borderRadius: 100,
    // borderColor: COLORS.solidGrey,
    // alignItems: 'center',
  },
  cashLabel: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  cashProfile: {
    width: SW(50),
    height: SW(50),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  trackingButtonView: {
    width: SW(70),
    height: SH(55),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  trackingButtonText: {
    fontFamily: Fonts.Medium,
    color: COLORS.black,
    fontSize: SF(12),
    textAlign: 'left',
    marginVertical: SH(3),
  },
  calculatorView: {
    width: SW(110),
    alignSelf: 'center',
    // height: windowHeight * 0.22,
    justifyContent: 'center',
    marginTop: SW(5),
  },
  viewSessionButtonView: {
    width: SW(150),
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginTop: ms(10),
  },
  closeBatchButtonView: {
    width: '50%',
    height: SH(45),
    borderRadius: 5,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: COLORS.primary,
    alignItems: 'center',
    backgroundColor: COLORS.solidGrey,
  },
  lockScreenButton: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.dark_grey,
    width: '100%',

    height: SW(40),
    alignSelf: 'center',
    borderRadius: 5,
    // paddingVertical: verticalScale(9),
  },
  viewSessionButtonText: {
    fontFamily: Fonts.Bold,
    color: COLORS.primary,
    fontSize: SF(12),
  },
  closeBatchButtonText: {
    fontFamily: Fonts.Bold,
    color: COLORS.roseRed,
    fontSize: SF(12),
  },
  sessionHistoryView: {
    width: windowWidth - 50,
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: COLORS.primary,
    backgroundColor: COLORS.blue_shade,
    borderRadius: 10,
    paddingVertical: SH(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SH(25),
  },
  sessionHistoryText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(15),
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  modalMainView: {
    backgroundColor: COLORS.white,
    // width: SW(160),
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    // minHeight: windowHeight - 250,
    // borderWidth:10
  },
  headerView: {
    // backgroundColor: COLORS.primary,
    width: '100%',
    height: SH(60),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: SW(15),
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.gerySkies,
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.black,
    alignSelf: 'center',
  },
  calculatorStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  countCashView: {
    width: '90%',
    alignSelf: 'center',
    // height: '70%',
  },
  countCashText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  amountCountedText: {
    fontFamily: Fonts.Medium,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  inputStyle: {
    marginTop: 4,
    height: SH(60),
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    fontSize: SF(16),
    color: COLORS.solid_grey,
    paddingLeft: SW(5),
    paddingVertical: SH(5),
    backgroundColor: COLORS.textInputBackground,
  },
  noteInputStyle: {
    marginTop: 4,
    width: '100%',
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
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
  },
  saveButton: {
    alignSelf: 'center',
    width: '90%',
    height: SH(60),
    zIndex: -999,
    backgroundColor: COLORS.gerySkies,
  },
  saveButtonNew: {
    alignSelf: 'center',
    width: '100%',
    height: SH(60),
    zIndex: -999,
    backgroundColor: COLORS.gerySkies,
  },
  sessionMainView: {
    width: windowWidth - 50,
    alignSelf: 'center',
    borderRadius: 10,
    paddingTop: SH(10),
    backgroundColor: COLORS.white,
  },
  sessionView: {
    width: windowWidth - 80,
    alignSelf: 'center',
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    backgroundColor: COLORS.white,
  },
  usdText: {
    fontSize: SF(24),
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  buttonView: {
    justifyContent: 'space-between',
    width: windowWidth - 80,
    alignSelf: 'center',
  },
  addCashView: {
    width: '100%',
    height: SH(50),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue_shade,
  },
  removeCashView: {
    width: '100%',
    height: SH(50),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.silver_solid,
  },
  cashPaymentsText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.black,
  },
  paymentOptionsView: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SH(20),
    paddingBottom: SH(15),
  },
  paymentBodyCon: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(7),
    // paddingHorizontal: moderateScale(12),
  },
  buttonStyle: {
    width: windowWidth - 110,
    height: SH(90),
    alignSelf: 'center',
  },

  // summary history css start
  summaryHeaderCon: {
    height: SH(100),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.08,
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
  summaryText: {
    color: COLORS.black,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
  },
  bodyContainer: {
    // width: windowWidth * 0.88,
    // height: windowHeight * 0.68,
    // alignSelf: 'center',
    width: windowWidth * 0.88,
    maxHeight: windowHeight * 0.7,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow,
    borderRadius: 10,
    paddingHorizontal: SW(20),
  },
  bodyContainer2: {
    width: windowWidth * 0.88,
    maxHeight: windowHeight * 0.7,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow,
    borderRadius: 10,
    paddingHorizontal: SW(20),
  },
  allCashText: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
  },
  totalCashHeader: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(6),
    marginTop: 15,
  },
  totalCashData: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(5),
  },
  sectionListHeader: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(17),
  },
  sectionListData: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  netPaymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(6),
    marginTop: 15,
  },
  cashActivity: {
    color: COLORS.darkGray,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
  },
  cashActivityCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingVertical: verticalScale(3),
    marginTop: 5,
  },
  cashActivityDarkText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
  },
  cashActivityLightText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  cashActivityRedText: {
    color: COLORS.orange,
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  senEmailButton: {
    alignSelf: 'center',
    width: windowWidth * 0.88,
    height: SH(70),
  },
  // summary history css end
  // summary history css start
  sessionHistory: {
    color: COLORS.black,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    paddingHorizontal: moderateScale(12),
  },
  datePickerContainer: {
    height: SH(63),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  datepickerConatiner: {
    borderWidth: 1,
    height: SH(35),
    width: SW(45),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(7),
    justifyContent: 'center',
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  datePlaceholder: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(5),
  },
  dropDownIcon: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    height: SH(60),
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    fontSize: SF(24),
    color: COLORS.solid_grey,
  },
  dropDownContainerStyle: {
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    // top: Platform.OS === 'android' ? 50 : 15,
    zIndex: Platform.OS === 'ios' ? 999 : 1,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  userTableHead: {
    height: SH(50),
    backgroundColor: '#E1E3E4',
    textAlign: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  text: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    textAlign: 'center',
  },
  historyHeaderText: {
    width: windowWidth * 0.112,
    justifyContent: 'center',
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    textAlign: 'left',
  },
  historydataText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    textAlign: 'left',
    width: windowWidth * 0.112,
    justifyContent: 'center',
  },
  usertableRowStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.solidGrey,
    paddingVertical: SH(18),
  },
  usertableRowText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    // textAlign: 'center',
  },
  tableMainView: {
    zIndex: -10,
  },
  tableDataHeaderCon: {
    height: SH(50),
    backgroundColor: '#E1E3E4',
    textAlign: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
  },
  tableDataCon: {
    height: SH(55),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
    marginHorizontal: ms(15),
  },
  allienpic: {
    width: SW(6),
    height: SW(6),
    borderRadius: 50,
    resizeMode: 'contain',
  },

  // summary history css end

  trackingBodyCon: {
    width: SW(110),
    alignSelf: 'center',
    paddingHorizontal: SW(20),
    width: '100%',
  },
  absoluteZero: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    height: SH(windowHeight) / 1.5,
  },
  centerSw: {
    width: SW(250),
    paddingHorizontal: SW(12),

    // alignItems: 'center',
  },
  amountExpect: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  removerDarkText: {
    textAlign: 'center',
    fontFamily: Fonts.Bold,
    fontSize: SF(25),
    color: COLORS.solid_grey,
  },
  removerDarkTextRegular: {
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  dateTimeAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.65,
  },
  dateHeadAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.65,
  },
  paymentBodyText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.dark_grey,
  },
  scrolCon: {
    // borderWidth:1,
    height: windowHeight * 0.28,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  datePickerCon: {
    borderWidth: 1,
    height: SH(38),
    width: SW(45),
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(7),
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  txtInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: SF(11),
    top: 2,
    color: COLORS.solid_grey,
  },
  selectAmountCon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: SH(8),
    height: SH(50),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    marginRight: moderateScale(8),
  },
  selectAmountText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(15),
    color: COLORS.solid_grey,
  },
  selectAmountText2: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(15),
  },
  selectAmountCon2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SW(45),
    height: SH(50),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    marginRight: moderateScale(8),
  },
  userNotFound: {
    color: COLORS.primary,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(20),
    alignSelf: 'center',
  },
  addCashDrop: {
    flex: Platform.OS === 'android' ? 1 : 0,
  },
  dropDownPayment: {
    height: ms(4),
    width: ms(4),
    marginLeft: ms(5),
  },
  activeDropDownPayment: {
    height: ms(4),
    width: ms(4),
    marginLeft: ms(5),
    transform: [{ rotate: '180deg' }],
  },

  //New table style

  tableDataHeaderConNew: {
    height: SH(50),
    backgroundColor: COLORS.textInputBackground,
    textAlign: 'center',
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
  },
  profileheaderUnderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileheaderUnderData: {
    flexDirection: 'row',
    // marginLeft: ms(-10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileheaderChildView: {
    width: Platform.OS === 'android' ? SW(38) : ms(65),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(3),
    // borderWidth: 1,
  },
  tableTextHeader: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(14),
  },
  tableTextDataFirst: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    letterSpacing: -1,
    width: windowWidth * 0.02,
  },
  tableTextData: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    marginStart: ms(10),
    alignSelf: 'center',
  },

  //Calendar

  calendarModalView: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.6,
    height: windowHeight - SW(30),
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  // pagination table ui css
  jbrTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(55),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  paginationEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  dropDownIconPagination: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.darkGreen,
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStylePagination: {
    width: SW(25),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    color: COLORS.solidGrey,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    top: Platform.OS === 'android' ? 30 : 35,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  placeholderStylePagination: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },

  unionCon: {
    backgroundColor: COLORS.washGrey,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 7,
  },
  unionStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(12),
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  scnStyle: {
    width: SW(13),
    height: SW(14),
    resizeMode: 'contain',
  },
  invoiceContainer: {
    flex: 0.48,
    backgroundColor: COLORS.white,
    marginBottom: ms(10),
    right: SW(5),
    height: SH(700),
  },
});

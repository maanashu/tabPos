import { StyleSheet, Dimensions, ViewPagerAndroidBase, Platform } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale, scale, ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.sky_grey,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dispalyRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  upgradePlanView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.sky_grey,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  countryStateWidth: {
    width: windowWidth * 0.36,
    justifyContent: 'space-between',
  },
  headingCon: {
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.22,
    height: windowHeight * 0.96,
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  DataCon: {
    width: Platform.OS === 'android' ? windowWidth * 0.66 : windowWidth * 0.64,
    height: windowHeight * 0.915,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(18),
    backgroundColor: COLORS.white,
    marginLeft: SW(6),
    borderRadius: ms(20),
    marginTop: ms(10),
    marginBottom: ms(10),
  },
  headingBody: {
    // borderTopWidth: 1,
    // borderBottomWidth: 0.5,
    borderColor: COLORS.solidGrey,
    height: Platform.OS === 'android' ? SW(13) : SW(15),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    marginVertical: ms(2),
    borderRadius: ms(8),
    borderWidth: ms(1),
    // ...ShadowStyles.shadow2,
  },
  right_light: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },
  security: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  securityText: {
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
  notUpdated: {
    fontSize: SF(10),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  HeaderLabelText: {
    fontSize: SF(18),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
    textAlign: 'center',
  },

  // setting security css start
  securityMainCon: {
    // borderWidth: 2,
    // borderColor: COLORS.sky_blue,
    borderRadius: 20,
    // height: windowHeight * 0.33,
    // paddingVertical: ms(15),
    // paddingHorizontal: ms(20),
    // marginHorizontal: ms(15),
  },
  securityStaffMainCon: {
    // borderWidth: 1,
    // borderColor: COLORS.solidGrey,

    // height: windowHeight * 0.5,
    padding: 15,
    flex: 0.9,
    // alignItems: 'center',
  },
  securityMainCon2: {
    height: windowHeight * 0.82,
  },
  securityBodyCon: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: COLORS.solidGrey,
    borderRadius: 10,
    // padding: 15,
  },
  securityLogo: {
    width: SW(8),
    height: SW(8),
    // top: SH(-6),
  },
  twoStepVerifiCon: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  twoStepText: {
    fontSize: SF(24),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.navy_blue,
  },
  walletHeading: {
    fontSize: SF(15),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  downloadText: {
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
  },
  buttonText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
  },
  mainHeading: {
    fontSize: SF(24),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  securitysubhead: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.lavender,
  },
  activateTaxLabel: {
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
  },
  twoStepMemberCon: {
    borderColor: COLORS.light_purple,
    borderRadius: SH(20),
    paddingHorizontal: moderateScale(12),
    marginVertical: verticalScale(3),
    height: SH(70),
    justifyContent: 'center',
    backgroundColor: COLORS.sky_grey,
  },
  staffItemContainer: {
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    borderRadius: SH(20),
    paddingHorizontal: moderateScale(12),
    marginVertical: verticalScale(3),
    height: SH(70),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  locationsView: {
    borderRadius: SH(20),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
    marginVertical: verticalScale(3),
    height: SH(90),
    backgroundColor: COLORS.sky_grey,
    justifyContent: 'center',
  },
  twoStepMemberConTax: {
    marginLeft: Platform.OS === 'android' ? moderateScale(35) : moderateScale(20),
  },
  twoStepMemberCon2: {
    width: windowWidth * 0.38,
  },
  teamMember: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    marginRight: SW(8),
  },
  locationPinStyle: {
    width: ms(15),
    height: ms(15),
    // top: ms(-5),
    marginRight: ms(10),
  },
  teamMember2: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  toggleSecurity: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },

  toggleSecurityLarge: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
  },
  marginLeft: {
    // marginLeft: moderateScale(8),
    flex: 0.8,
  },
  confirmModalView: {
    width: windowWidth * 0.32,
    height: windowHeight * 0.73,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    paddingVertical: ms(20),
    paddingHorizontal: SW(15),
    alignItems: 'center',
    flex: 1,
  },
  modalMainView: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.7,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    paddingVertical: ms(20),
    paddingHorizontal: SW(15),
    alignItems: 'center',
    flex: 1,
  },
  modalMainViewNew: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.4,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    paddingVertical: ms(20),
    paddingHorizontal: SW(15),
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  blueToothModalHeight: {
    height: windowHeight * 0.65,
  },
  modalHeaderCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SH(80),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
  },
  crossButton: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  crossButtonCon: {
    width: SW(13),
    height: SW(13),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: ms(8),
    top: ms(8),
  },
  modalDataCon: {
    width: windowWidth * 0.38,
    alignSelf: 'center',
    flex: 1,
  },
  primaryClr: {
    color: COLORS.light_time,
  },
  firstDownloader: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
  },
  googleAuthCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    height: SW(40),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  googleAuthConSel: {
    borderWidth: 1,
    borderColor: COLORS.bluish_green,
    backgroundColor: COLORS.light_sky,
    borderRadius: 10,
    height: SW(40),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  googleAuth: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
  },
  googleAuthText: {
    fontSize: SF(22),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  checkboxSec: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  fontLeft: {
    fontSize: SF(14),
    marginLeft: moderateScale(8),
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
    width: SW(70),
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(5),
  },
  checkoutButtonSec: {
    backgroundColor: COLORS.bluish_green,
    width: SW(82),
  },
  checkoutText: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  checkArrow: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
    tintColor: COLORS.darkGray,
  },
  buttonSetting: {
    alignItems: 'center',
  },
  scanCodeCon: {
    width: windowWidth * 0.25,
    alignSelf: 'center',
    height: SW(15),
    borderRadius: 5,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scurityScan: {
    width: SW(70),
    height: SW(70),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  scurityScanCon: {
    width: SW(70),
    height: SW(70),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  // setting security css end

  // setting device css start
  addNewButtonCon: {
    backgroundColor: COLORS.primary,
    // width: SW(38),
    height: SW(10),
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 999,
    paddingHorizontal: moderateScale(5),

    position: 'absolute',
    right: 10,
  },
  deleteButton: {
    width: SW(20),
    height: SW(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    borderRadius: 6,
  },
  deleteText: { color: COLORS.white, fontSize: 14 },
  addIcon: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
  },
  addNew: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    marginLeft: 5,
  },
  scanner: {
    width: SW(100),
    height: SW(30),
    resizeMode: 'contain',
  },
  codeAppear: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    alignSelf: 'center',
  },
  codeContainer: {
    width: SW(100),
    height: SW(22),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    alignSelf: 'center',
  },
  doneButtons: {
    width: SW(100),
    height: SW(14),
    backgroundColor: COLORS.gerySkies,
    borderRadius: 3,
    alignSelf: 'center',
  },
  doneSelectText: {
    color: COLORS.white,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    alignSelf: 'center',
  },
  searchForDevice: {
    color: COLORS.solid_grey,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonRegular,
  },
  blueToothIcon: {
    width: SW(45),
    height: SW(45),
    resizeMode: 'contain',
  },
  foundOneDev: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    alignSelf: 'flex-start',
  },
  dropdownCon: {
    position: 'absolute',
    top: 45,
    right: 0,
    width: SW(60),
    height: SW(60),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    ...ShadowStyles.shadow,
  },
  dropDownText: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
    marginLeft: 3,
  },
  dropScan: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  dropPressArea: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(9),
  },
  yourPlan: {
    color: COLORS.solid_grey,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
  },
  changePlan: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginLeft: verticalScale(3),
  },
  changePlan2: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    marginRight: verticalScale(3),
  },
  basic: {
    color: COLORS.bluish_green,
    fontSize: SF(32),
    fontFamily: Fonts.MaisonRegular,
  },
  everyThingNeed: {
    color: COLORS.lavender,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  changePlanText: {
    color: COLORS.navy_blue,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  includedText: {
    color: COLORS.sky_blue,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  radioFillPlan: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
    // item?.name == 'Standard'
    // ? COLORS.lavenders
    // : item?.name == 'Premium'
    // ? COLORS.navy_blue
    // : COLORS.sky_blue,
  },
  appIncludedIcon: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),

    // COLORS.navy_blue
    //  COLORS.sky_blue
  },
  checkmark: {
    width: SW(4),
    height: SW(4),
    marginHorizontal: moderateScale(4),
  },
  billingDateCon: {
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    borderRadius: 16,
    flex: 1,
    padding: 16,
    height: ms(65),
    justifyContent: 'center',
  },
  visa: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
    marginRight: moderateScale(5),
  },
  planModalcon: {
    width: windowWidth * 0.85,
    height: Platform.OS === 'android' ? windowHeight * 0.88 : windowHeight * 0.8,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
  },

  planFit: {
    color: COLORS.primary,
    fontSize: SF(26),
    fontFamily: Fonts.MaisonRegular,
  },

  planModalSunhead: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    alignSelf: 'center',
  },
  annualBillingCon: {
    backgroundColor: COLORS.textInputBackground,
    width: SW(35),
    height: SW(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: moderateScale(4),
  },
  monthlyBil: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  basicContainer: (item) => {
    return {
      width: windowWidth * 0.2,
      borderRadius: 10,
      backgroundColor: COLORS.white,
      padding: 12,
      marginHorizontal: moderateScale(3),
      marginBottom: 15,
      borderWidth: 2,
      borderColor:
        item == 'Standard'
          ? COLORS.lavenders
          : item == 'Premium'
          ? COLORS.navy_blue
          : COLORS.sky_blue,
      flex: 1,
      height: windowHeight * 0.69,
    };
  },
  basic: {
    color: COLORS.sky_blue,
    fontSize: SF(20),
    fontFamily: Fonts.MaisonRegular,
  },
  basicPrice: {
    color: COLORS.dark_grey,
    fontSize: SF(20),
    fontFamily: Fonts.MaisonRegular,
  },
  windowWid: {
    width: windowWidth * 0.84,
    borderWidth: 1,
    // paddingHorizontal:moderateScale(5)
  },
  templateCon: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.5,
    borderRadius: 10,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    padding: 12,
    //  marginBottom:10
  },
  publishDate: {
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  invoiceFrame: {
    width: SW(100),
    height: SW(70),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emailS: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },
  emailStint: {
    tintColor: COLORS.white,
  },
  emailSCon: {
    width: SW(10),
    height: SW(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginHorizontal: moderateScale(3),
  },
  activateCon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Taxes css start
  submitButtons: {
    backgroundColor: COLORS.primary,
    width: SW(30),
    height: SH(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  selectedText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  countryModCon: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.55,
    borderRadius: 15,
    alignSelf: 'center',
    // position: 'absolute',
    backgroundColor: COLORS.white,
  },
  countryModHeader: {
    backgroundColor: COLORS.textInputBackground,
    height: windowHeight * 0.09,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(10),
  },
  selectHead: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },
  cntryCrossButton: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.solid_grey,
  },
  countryModBody: {
    flex: 1,
    width: windowWidth * 0.36,
    height: windowHeight * 0.45,
    borderRadius: 15,
    alignSelf: 'center',
  },
  countryNameCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SW(14),
    borderRadius: 5,
    paddingLeft: moderateScale(10),
    justifyContent: 'center',
    marginBottom: 5,
  },
  blankCircle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  blankSquare: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginRight: 10,
  },
  usaFlag: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(10),
  },
  cancelbuttonCon: {
    width: SW(28),
    height: SW(12),
    backgroundColor: COLORS.washGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  nextbuttonCon: {
    backgroundColor: COLORS.primary,
  },
  cancel: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  next: {
    color: COLORS.white,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SW(12),
  },
  taxPayerModCon: {
    height: windowHeight * 0.9,
  },
  name: {
    fontSize: SF(14),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    paddingVertical: verticalScale(2),
  },
  nameInput: {
    backgroundColor: COLORS.textInputBackground,
    paddingLeft: moderateScale(10),
    borderRadius: 5,
    fontFamily: Fonts.Italic,
    fontSize: SF(13),
    height: SW(13),
    color: COLORS.solid_grey,
  },
  countryInput: {
    backgroundColor: COLORS.textInputBackground,
    paddingLeft: moderateScale(10),
    borderRadius: 5,
    fontFamily: Fonts.Italic,
    fontSize: SF(13),
    height: SW(13),
    width: windowWidth * 0.17,
    color: COLORS.solid_grey,
  },
  namePlaceholder: {
    color: COLORS.black,
  },
  height: {
    // height:windowHeight * 0.80
  },
  taxnameCon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: 10,
    paddingVertical: verticalScale(3),
  },
  taxMainCon: {
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    padding: 15,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
  },
  charlieName: {
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
    paddingVertical: verticalScale(1),
  },
  verifiedBtnCon: {
    borderWidth: 1,
    width: SW(42),
    height: SW(9),
    borderRadius: 5,
    borderColor: COLORS.bluish_green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taxVerified: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(3),
  },
  financialReport: {
    fontSize: SF(16),
    fontFamily: Fonts.Medium,
    color: COLORS.primary,
  },
  financialReportCon: {
    borderWidth: 1,
    height: SW(50),
    borderRadius: 8,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(7),
  },
  checkoutMore: {
    fontSize: SF(14),
    fontFamily: Fonts.MediumItalic,
    color: COLORS.solid_grey,
  },
  craeteTax: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
  },
  addState: {
    fontFamily: Fonts.MaisonRegular,
  },
  addStatebtn: {
    width: SW(5),
    height: SW(5),
    marginLeft: 10,
  },
  createTaxModCon: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.7,
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
  },
  createTaxModHeight: {
    height: windowHeight * 0.93,
  },
  createtaxModHeader: {
    height: windowHeight * 0.08,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(10),
  },
  createTaxModBody: {
    flex: 1,
    width: windowWidth * 0.5,
    height: windowHeight * 0.45,
    borderRadius: 15,
    alignSelf: 'center',
  },
  details: {
    fontSize: SF(16),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  saleInputMain: {
    backgroundColor: COLORS.textInputBackground,
    height: SW(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(10),
    borderRadius: 5,
    marginVertical: verticalScale(2),
  },
  taxName: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  taxInput: {
    borderWidth: 1,
    height: SW(13),
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    width: windowWidth * 0.3,
    paddingHorizontal: moderateScale(10),
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontFamily: Fonts.MediumItalic,
    fontSize: SF(13),
  },
  saveButtons: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.5,
    height: SH(50),
    borderRadius: 5,
  },
  taxFormCon: {
    borderWidth: 1,
    borderRadius: 5,
    height: SW(55),
    width: windowWidth * 0.41,
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    borderColor: COLORS.solidGrey,
  },
  taxExmptionCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SW(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(5),
  },
  taxEmption: {
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
  },
  taxImptionInput: {
    width: windowWidth * 0.18,
    fontSize: SF(12),
    fontFamily: Fonts.Italic,
    color: COLORS.gerySkies,
  },
  // Taxes css end

  // wallet css start

  viewStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    // height: windowHeight * 0.33,
    padding: 20,
    marginVertical: SH(4),
  },
  walletTextStyle: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    paddingLeft: SW(5),
  },
  silaTextStyle: {
    fontSize: SF(25),
    fontWeight: '800',
    color: COLORS.primary,
  },
  silaButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.15,
    height: SH(50),
    borderRadius: 5,
  },

  // Languages css style

  addLanguage: {
    fontSize: SF(24),
  },
  container1: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: windowWidth * 0.45,
    height: windowHeight * 0.6,
    alignSelf: 'center',
    position: 'absolute',
  },
  modalViewStyle: {
    backgroundColor: '#F5F6F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SW(6),
    borderTopEndRadius: SW(8),
    borderTopStartRadius: SW(8),
  },

  // LEGAL CSS STYLES

  legalViewStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(5),
    // justifyContent: 'center',
    marginBottom: 5,
    width: windowWidth * 0.19,
    height: windowHeight * 0.4,
    marginTop: SW(4),
    marginHorizontal: SW(1.9),
    // marginLeft: SW(4),
  },
  legalView: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    padding: moderateScale(10),
    marginBottom: 5,
    marginHorizontal: ms(1),
    height: windowHeight * 0.25,
    borderRadius: 10,
  },
  circlImageStyle: {
    width: SW(3),
    height: SW(3),
    resizeMode: 'contain',
  },
  circlImageRed: {
    tintColor: COLORS.red,
  },
  activeTextStyle: {
    fontSize: SF(11),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.green,
    marginLeft: SW(2),
  },
  activeTextrRed: {
    color: COLORS.red,
  },
  updateTextStyle: {
    fontSize: SF(12),
    marginLeft: SW(2),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  dateViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SW(2),
  },
  activebuttonStyle: {
    width: SW(24),
    height: SW(8),
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  redActiveButton: {
    width: SW(27),
    borderColor: COLORS.red,
  },
  legalModalCon: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: windowWidth * 0.48,
    height: windowHeight * 0.8,
    alignSelf: 'center',
    position: 'absolute',
    // paddingHorizontal: moderateScale(12),
  },
  refundPolicy: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(15),
    color: COLORS.black,
  },
  refundPolicyRegular: {
    fontFamily: Fonts.Regular,
    fontSize: SF(15),
    color: COLORS.black,
  },
  closeCon: {
    height: SW(15),
    borderBottomLeftRadius: 15,
    borderBottomEndRadius: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow,
    paddingLeft: moderateScale(12),
  },
  closeButtonCon: {
    backgroundColor: COLORS.row_grey,
    width: SW(22),
    height: SW(9),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Close: {
    fontFamily: Fonts.Medium,
    fontSize: SF(16),
    color: COLORS.white,
  },

  // notification section css start
  notificationMainCon: {
    height: windowHeight * 0.82,
  },
  appNotification: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  notificationName: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.navy_blue,
  },
  horizontalRow: {
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    marginVertical: verticalScale(3),
  },
  arrowStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  arrowStyle2: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
    transform: [{ rotate: '180deg' }],
  },
  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.08,
    alignItems: 'center',
    flexDirection: 'row',
  },
  staffBackButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonArrow: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
    marginRight: 5,
  },
  backTextStyle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(18),
    paddingVertical: verticalScale(5),
  },
  profileMaincon: {
    flexDirection: 'row',
    backgroundColor: COLORS.sky_grey,
    borderRadius: 15,
    padding: 10,
  },
  profileBodycon: {
    width: windowWidth * 0.38,
    borderRightWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  profileBodycon2: {
    width: windowWidth * 0.27,
    borderRightWidth: 0,
  },
  profileImageStaff: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  staffName: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(22),
    color: COLORS.navy_blue,
  },
  Phonelight: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
    marginRight: moderateScale(5),
  },
  terryText: {
    color: COLORS.navy_blue,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  litMorecon: {
    height: windowHeight * 0.16,
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  shieldText: {
    color: COLORS.navy_blue,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  Phonelight2: {
    width: SW(8),
    height: SW(8),
  },
  joinDateCon: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.16,
    paddingLeft: moderateScale(10),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  joinDateDark: {
    color: COLORS.navy_blue,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  joinDatelight: {
    color: COLORS.navy_blue,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  hourcontainer: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hourRateLigh: {
    color: COLORS.dark_grey,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
    textAlign: 'center',

    // width:"90%"
  },
  hourRateBodyCon: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  billingCycleCon: {
    // width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    backgroundColor: COLORS.blue_shade,
    borderRadius: 5,
    paddingLeft: moderateScale(10),
    justifyContent: 'center',

    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  tableDataHeaderCon: {
    height: SH(45),
    textAlign: 'center',
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    // backgroundColor: COLORS.textInputBackground,
    width: windowWidth * 0.7,
  },
  dateHeadAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.56,
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.Medium,
    color: COLORS.lavender,
    fontSize: SF(14),
    textAlign: 'center',
    width: windowWidth * 0.11,
  },
  tableDataCon: {
    height: SH(45),
    textAlign: 'center',
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    width: windowWidth * 0.7,
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },

  invoiceModalCon: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
  },
  addStaffModalCon: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.94,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 10,
    // paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
  },
  invoice: {
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
    fontSize: SF(50),
  },
  billToCon: {
    width: windowWidth * 0.3,
    backgroundColor: COLORS.textInputBackground,
    height: windowHeight * 0.2,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  invoiceTableHeader: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBodyCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.27,
  },
  headerBodyCon2: {
    justifyContent: 'space-around',
    width: windowWidth * 0.4,
  },
  invoiveheaderText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  invoiceTableData: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  subTotalCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    alignSelf: 'flex-end',
  },
  subTotalBodyCon: {
    height: SH(50),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideLeftSideBar: {
    borderLeftWidth: 3,
    borderColor: COLORS.primary,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  vectorIconCon: {
    width: SW(12),
    height: SW(9),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: SW(2),
  },
  walletConfigMain: {
    // borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
  },
  systemPos: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
  },
  posSystem: {
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
    fontSize: SF(14),
  },
  shippingBodyCon: {
    height: windowHeight * 0.83,
  },
  flagCon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
  },
  countrySelectCon: {
    height: windowHeight * 0.3,
  },
  noProductText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(50),
  },
  emptyListText: {
    fontSize: SF(12),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },

  // passcode screen css start

  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.8,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flexWidth: {
    width: windowWidth * 0.35,
  },

  subHeading: {
    fontSize: SF(24),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  cellRoot: {
    backgroundColor: COLORS.white,
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.solidGrey,
    marginHorizontal: moderateScale(5),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    color: COLORS.black,
    marginTop: SH(10),
  },
  cross: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },

  //
  continueBtnCon: {
    width: SH(120),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginLeft: SH(10),
    borderRadius: 3,
  },
  addToCartCon: {
    backgroundColor: COLORS.primary,
    width: SH(120),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SH(10),
    borderRadius: 3,
  },
  addTocartText: {
    color: COLORS.white,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },
  detailBtnCon: {
    color: COLORS.primary,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },
  addCartConHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SH(70),
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  colorBottomCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SH(70),
    paddingHorizontal: moderateScale(15),
    alignSelf: 'center',
  },
  crossBg: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
  },

  textInputView: {
    paddingHorizontal: SW(4),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: windowHeight * 0.08,
    width: windowWidth * 0.45,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    marginTop: 16,
    // marginHorizontal: SW(10),
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    color: COLORS.black,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
  },
  phoneText: {
    color: COLORS.black,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
    // paddingHorizontal: moderateScale(8),
  },
  textInputContainer: {
    backgroundColor: COLORS.input_bg,
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.Italic,
    width: windowWidth * 0.5,
  },
  staffScrollableArea: {
    height: windowHeight * 0.8,
    width: '100%',
  },
  requestButtoncon: {
    backgroundColor: COLORS.primary,
    width: ms(50),
    height: ms(20),
    borderRadius: ms(3),
    marginLeft: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestText: {
    color: COLORS.white,
    fontSize: ms(7),
    fontFamily: Fonts.Regular,
  },
  noDataText: {
    color: COLORS.red,
    fontSize: ms(14),
    fontFamily: Fonts.Regular,
    alignSelf: 'center',
  },
  devicesLogo: {
    height: ms(18),
    width: ms(18),
    marginRight: ms(7),
  },
  deviceText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
    fontSize: SF(14),
  },
  codeDisplayText: {
    fontFamily: Fonts.Regular,
    color: COLORS.lavender,
    fontSize: SF(12),
  },
  deviceOptionsView: {
    backgroundColor: COLORS.sky_grey,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: SW(2),
  },
  codeView: {
    backgroundColor: COLORS.sky_grey,
    borderRadius: ms(12),
    paddingHorizontal: ms(12),
    paddingVertical: ms(15),
    width: '87%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 60,
  },
  confirmButton: {
    width: '87%',
    borderRadius: ms(30),
    height: ms(42),
    backgroundColor: COLORS.navy_blue,
  },
  subscribedView: {
    height: ms(37),
    width: ms(100),
    backgroundColor: COLORS.light_skyblue,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribedText: {
    color: COLORS.sky_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(10),
  },
  appIncludedText: {
    color: COLORS.sky_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(7),
    textAlign: 'center',
  },
  changePlanButton: (item) => {
    return {
      width: ms(90),
      height: 50,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:
        item == 'Standard'
          ? COLORS.lavenders
          : item == 'Premium'
          ? COLORS.navy_blue
          : COLORS.sky_blue,
      alignSelf: 'center',
    };
  },
  dashedBorderLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    marginBottom: SH(5),
    marginTop: SH(10),
    borderColor: COLORS.lavender,
  },
  secondButton: {
    width: '45%',
    borderWidth: 1,
    borderRadius: ms(100),
    alignItems: 'center',
    height: ms(30),
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: COLORS.navy_blue,
    backgroundColor: COLORS.navy_blue,
  },
  firstButton: {
    width: '45%',
    height: ms(30),
    borderWidth: 1,
    borderRadius: ms(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.navy_blue,
  },
  thirdBox: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  secondBox: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: COLORS.navy_blue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: ms(10),
  },
  firstBox: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-evenly' },
  walletItemBackground: {
    backgroundColor: COLORS.sky_grey,
    padding: ms(14),
    borderRadius: 16,
    marginBottom: ms(5),
  },
  hourlyRateView: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    width: windowWidth * 0.14,
    marginHorizontal: 5,
    borderColor: COLORS.light_purple,
    alignItems: 'flex-start',
  },
  tableMainConatiner: {
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    borderColor: COLORS.light_purple,
  },
});

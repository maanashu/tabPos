import {
  StyleSheet,
  Dimensions,
  ViewPagerAndroidBase,
  Platform,
} from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dispalyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.22,
    height: windowHeight * 0.96,
    justifyContent: 'center',
  },
  DataCon: {
    width: windowWidth * 0.73,
    height: windowHeight * 0.96,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(18),
  },
  headingBody: {
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: COLORS.solidGrey,
    height: Platform.OS === 'android' ? SW(15) : SW(18),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
  },
  right_light: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },
  security: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  securityText: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
  notUpdated: {
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  HeaderLabelText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },

  // setting security css start
  securityMainCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    // height: windowHeight * 0.33,
    padding: 15,
  },
  securityMainCon2: {
    height: windowHeight * 0.82,
  },
  securityBodyCon: {
    // flex: 1,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    padding: 25,
  },
  securityLogo: {
    width: SW(18),
    height: SW(18),
    resizeMode: 'contain',
  },
  twoStepVerifiCon: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  twoStepText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  securitysubhead: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  twoStepMemberCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
    marginVertical: verticalScale(3),
  },
  twoStepMemberConTax: {
    marginLeft:
      Platform.OS === 'android' ? moderateScale(35) : moderateScale(20),
  },
  twoStepMemberCon2: {
    width: windowWidth * 0.38,
  },
  teamMember: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
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
  marginLeft: {
    marginLeft: moderateScale(8),
  },
  modalMainView: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.8,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
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
  },
  modalDataCon: {
    width: windowWidth * 0.38,
    alignSelf: 'center',
    flex: 1,
  },
  primaryClr: {
    color: COLORS.primary,
  },
  firstDownloader: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
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
    width: SW(8),
    height: SW(3),
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
    width: SW(65),
    height: SW(65),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  // setting security css end

  // setting device css start
  addNewButtonCon: {
    backgroundColor: COLORS.primary,
    width: SW(38),
    height: SW(10),
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
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
    width: SW(140),
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
    color: COLORS.dark_grey,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  changePlanText: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  radioFillPlan: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
  },
  checkmark: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
  },
  billingDateCon: {
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingVertical: verticalScale(4),
  },
  visa: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
    marginRight: moderateScale(5),
  },
  planModalcon: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.88,
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
    borderRadius: 5,
    marginHorizontal: moderateScale(4),
  },
  monthlyBil: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  basicContainer: {
    // borderWidth:1,
    width: windowWidth * 0.26,
    borderRadius: 10,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    padding: 12,
    marginHorizontal: moderateScale(9),
    marginBottom: 15,
  },
  basic: {
    color: COLORS.bluish_green,
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
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  selectedText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SF(16),
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
    width: windowWidth * 0.33,
    height: windowHeight * 0.45,
    borderRadius: 15,
    alignSelf: 'center',
  },
  countryNameCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SW(17),
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
    width: SW(5),
    height: SW(5),
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
    height: windowHeight * 0.8,
  },
  name: {
    fontSize: SF(16),
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
    height: SW(15),
  },
  namePlaceholder: {
    color: COLORS.gerySkies,
  },
  height: {
    // height:windowHeight * 0.80
  },
  taxnameCon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: 10,
    paddingVertical: verticalScale(5),
  },
  taxMainCon: {
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    padding: 15,
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
  },
  charlieName: {
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
    paddingVertical: verticalScale(1),
  },
  verifiedBtnCon: {
    borderWidth: 1,
    width: SW(42),
    height: SW(10),
    borderRadius: 5,
    borderColor: COLORS.bluish_green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taxVerified: {
    width: SW(7),
    height: SW(7),
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
  taxFormCon:{
    borderWidth:1,
    borderRadius:5,
    height:SW(55),
    width:windowWidth * 0.41,
    alignSelf:'center',
    paddingHorizontal:moderateScale(15),
    borderColor:COLORS.solidGrey

  },
  taxExmptionCon:{
    borderBottomWidth:1,
    borderColor:COLORS.solidGrey,
    height:SW(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(5),
  },
  taxEmption:{
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
  },
  taxImptionInput:{
    width:windowWidth * 0.18,
    fontSize: SF(12),
    fontFamily: Fonts.Italic,
    color:COLORS.gerySkies
    

  }
  // Taxes css end
});

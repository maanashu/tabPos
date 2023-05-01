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
    width: SW(9),
    height: SW(9),
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
  annualBillingCon:{
    backgroundColor:COLORS.textInputBackground,
    width:SW(35),
    height:SW(10),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginHorizontal:moderateScale(4)
  },
  monthlyBil:{
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  basicContainer:{
    //  borderWidth:1,
     flex:1,
     width:windowWidth * 0.25,
     borderRadius:10,
     ...ShadowStyles.shadow2,
     backgroundColor:COLORS.white,
     padding:12
  },
  basic:{
    color: COLORS.bluish_green,
    fontSize: SF(20),
    fontFamily: Fonts.MaisonRegular,
  }
});

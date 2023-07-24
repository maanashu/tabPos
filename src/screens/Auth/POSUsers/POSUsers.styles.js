import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    // justifyContent: 'center',
  },
  containerSix: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  posUserNot: {
    fontSize: SF(25),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    alignSelf: 'center',
  },
  profileImage: {
    width: SH(100),
    height: SH(100),
    borderRadius: SH(50),
  },
  firstName: {
    fontSize: SH(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
  role: {
    fontSize: SH(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    width: SH(270),
    textAlign: 'center',
  },
  dateTime: {
    fontSize: SH(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  posUserCon: {
    backgroundColor: COLORS.textInputBackground,
    alignItems: 'center',
    marginVertical: SH(25),
    marginHorizontal: SH(15),
    padding: SH(10),
    width: SH(255),
    height: SH(300),
    borderRadius: 15,
  },
  posLoginHeader: {
    color: COLORS.black,
    fontSize: SH(16),
    fontFamily: Fonts.Bold,
    margin: SH(20),
  },
  arrowButonCon: {
    bottom: SH(25),
    backgroundColor: COLORS.primary,
    width: SH(84),
    height: SH(44),
    padding: SH(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  arrowImage: {
    width: SH(30),
    height: SH(20),
    resizeMode: 'contain',
  },
  logoutCon: {
    borderWidth: 1,
    borderColor: COLORS.dark_grey,
    width: SW(40),
    height: SW(12),
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOut: {
    fontSize: SH(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  powerAuth: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    marginRight: 4,
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
    padding: 15,
  },
  securityLogo: {
    width: SW(16),
    height: SW(16),
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
    fontSize: SF(12),
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
    marginLeft: Platform.OS === 'android' ? moderateScale(35) : moderateScale(20),
  },
  twoStepMemberCon2: {
    width: windowWidth * 0.38,
  },
  teamMember: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
    borderRadius: 100,
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
    width: SW(11),
    height: SW(11),
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
  dispalyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  verifyContainerSix: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.8,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flexWidthSix: {
    width: windowWidth * 0.35,
  },

  subHeadingSix: {
    fontSize: SF(24),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  alignSelfCenterSix: {
    alignSelf: 'center',
  },
  cellRootSix: {
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
  cellTextSix: {
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    color: COLORS.black,
  },
  crossSix: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  flexRowSix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

import { StyleSheet, Dimensions, Platform } from 'react-native';

import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.sky_grey,
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
    fontFamily: Fonts.Medium,
    color: COLORS.red,
    alignSelf: 'center',
  },
  profileImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: SH(50),
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
  },
  firstName: {
    fontSize: ms(10),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  role: {
    fontSize: ms(9),
    fontFamily: Fonts.Medium,
    color: COLORS.lavender,
    textAlign: 'center',
  },
  dateTime: {
    fontSize: ms(7),
    color: COLORS.lavender,
    fontFamily: Fonts.Regular,
  },
  posUserCon: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    marginVertical: ms(7),
    marginRight: ms(10),
    paddingVertical: SH(30),
    borderRadius: ms(18),
    flex: 0.25,
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

  verifyContainerSix: {
    // width: windowWidth * 0.45,
    // height: windowHeight * 0.8,
    // borderWidth: 1,
    // borderColor: COLORS.solidGrey,
    // alignSelf: 'center',
    // borderRadius: 15,
    // alignItems: 'center',
    // backgroundColor: COLORS.white,
    width: windowWidth * 0.42,
    height: windowHeight * 0.8,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: ms(25),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow4,
  },
  flexWidthSix: {
    width: windowWidth * 0.35,
  },
  subHeadingSix: {
    fontSize: SF(24),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  forgotPin: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  forgotPinText: {
    fontSize: SF(18),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
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
  welcomeTo: {
    fontFamily: Fonts.Medium,
    fontSize: ms(15),
    color: COLORS.navy_blue,
    marginVertical: ms(20),
  },

  // 2fa security

  firstBox: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-evenly' },
  scurityScan: {
    width: SW(150),
    height: SW(150),
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
  nextButtonNew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
    width: SW(40),
    alignSelf: 'center',
    borderRadius: ms(10),
    paddingVertical: verticalScale(5),
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
});

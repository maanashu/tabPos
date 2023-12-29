import { StyleSheet } from 'react-native';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRoot: {
    width: SW(50),
    borderWidth: 1,
    height: SW(50),
    alignItems: 'center',
    borderRadius: SW(50),
    marginHorizontal: SW(5),
    justifyContent: 'center',
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
  },
  cellText: {
    fontSize: SF(20),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
  },
  enterPinTextStyle: {
    fontSize: SF(16),
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: Fonts.Regular,
  },
  loaderViewStyle: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  // passcode screen css start

  verifyContainer: {
    width: '100%',
    height: '90%',
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    alignSelf: 'center',
    // borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flexWidth: {
    width: '100%',
  },

  subHeading: {
    fontSize: SF(20),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  cellRoot: {
    backgroundColor: COLORS.white,
    height: moderateScale(40),
    width: moderateScale(40),
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
    width: SW(22),
    height: SW(22),
    resizeMode: 'contain',
    right: SW(-50),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //security

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
  alignSelfCenterSix: {
    alignSelf: 'center',
  },

  crossSix: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  crossSixNew: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  flexRowSix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWidthSix: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  subHeadingSix: {
    fontSize: SF(18),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  nextButtonNew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
    width: '80%',
    alignSelf: 'center',
    borderRadius: ms(10),
    paddingVertical: verticalScale(10),
  },
  scurityScanNew: {
    width: SW(300),
    height: SW(300),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  firstBox: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-evenly' },
  forgotPin: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
  },
  forgotPinText: {
    fontSize: SF(16),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  checkArrow: {
    width: SW(13),
    height: SW(13),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
    tintColor: COLORS.darkGray,
  },
});

import { StyleSheet } from 'react-native';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { moderateScale, scale } from 'react-native-size-matters';

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

  //
});

import { StyleSheet } from 'react-native';
import { Fonts, COLORS, SF, SH, SW } from '@/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  JobrLogoImageStyle: {
    width: SH(160),
    height: SH(60),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  phoneImageStyle: {
    width: SW(232),
    height: SW(202),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  enterPhoneTextStyle: {
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(22),
    color: COLORS.solid_grey,
    paddingHorizontal: SW(20),
  },
  sendotpTextStyle: {
    paddingTop: 5,
    fontFamily: Fonts.Regular,
    fontSize: SF(16),
    color: COLORS.solid_grey,
    paddingHorizontal: SW(20),
  },
  textInputView: {
    marginTop: 16,
    borderWidth: 0,
    height: SH(50),
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    width: SW(350),
    alignSelf: 'center',
    paddingHorizontal: SW(12),
    backgroundColor: COLORS.textinput_bg,
  },
  codeText: {
    fontSize: SF(18),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  textInputContainer: {
    width: SW(270),
    fontSize: SF(16),
    color: COLORS.black,
    fontFamily: Fonts.Italic,
    paddingHorizontal: SW(10),
    backgroundColor: COLORS.textinput_bg,
  },
  verifyNumberText: {
    textAlign: 'center',
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(30),
    color: COLORS.solid_grey,
    paddingHorizontal: SW(20),
  },
  enterOtpTextStyle: {
    textAlign: 'center',
    paddingTop: 8,
    fontFamily: Fonts.Regular,
    fontSize: SF(16),
    color: COLORS.solid_grey,
    paddingHorizontal: SW(20),
  },
  phoneNumberTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.MaisonMonoBold,
    fontSize: SF(30),
    color: COLORS.solid_grey,
    paddingHorizontal: SW(20),
  },
  cellRoot: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SW(50),
    height: SW(50),
    borderRadius: SW(50),
    borderColor: COLORS.light_border,
    backgroundColor: COLORS.lightgray,
    marginHorizontal: SW(5),
  },
  cellText: {
    fontSize: SF(20),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  loaderViewStyle: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default styles;

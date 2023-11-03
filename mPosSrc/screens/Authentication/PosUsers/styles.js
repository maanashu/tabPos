import { StyleSheet } from 'react-native';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
  },
  userMainViewStyle: {
    padding: SW(16),
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: SW(10),
    marginHorizontal: SW(16),
    backgroundColor: COLORS.white,
  },
  profileImageStyle: {
    width: SW(80),
    height: SW(80),
    borderRadius: SW(40),
    resizeMode: 'cover',
  },
  detailViewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  userNameTextStyle: {
    fontSize: SF(16),
    paddingTop: SH(8),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  roleTextStyle: {
    fontSize: SF(14),
    paddingTop: SH(6),
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  datetimeTextStyle: {
    fontSize: SF(9),
    paddingTop: SH(6),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
  },
  buttonStyle: {
    height: SH(40),
    width: SW(300),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonTextStyle: {
    fontSize: SF(12),
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  noUsers: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    alignSelf: 'center',
    margin: ms(20),
  },
  activityIndicatorView: { marginTop: 50 },
});

export default styles;

import { StyleSheet } from 'react-native';
import { COLORS, Fonts, SF, SW } from '@/theme';

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
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  enterPinTextStyle: {
    textAlign: 'center',
    fontSize: SF(16),
    color: COLORS.text,
    fontFamily: Fonts.Regular,
  },
});

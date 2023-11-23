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
});

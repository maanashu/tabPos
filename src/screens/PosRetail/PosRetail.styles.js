import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },

  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // main screen css start
  homeScreenCon: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal:
      Platform.OS === 'android' ? moderateScale(22) : moderateScale(12),
  },
  searchScreenHeader: {
    height: SH(60),
    justifyContent: 'center',
  },
  cashLabelBold: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  crossBg: {
    width: SW(20),
    height: SW(8),
    resizeMode: 'contain',
  },
});

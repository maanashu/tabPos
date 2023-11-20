import { StyleSheet } from 'react-native';
import { SH, SW, COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cellRoot: {
    backgroundColor: COLORS.lineGrey,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.light_border,
    marginHorizontal: moderateScale(5),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(20),
    color: COLORS.black,
  },
});

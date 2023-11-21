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
    backgroundColor: COLORS.lightgray,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.light_border,
    marginHorizontal: moderateScale(5),
    paddingTop: SH(8),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(20),
    color: COLORS.black,
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

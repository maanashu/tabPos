import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    paddingVertical: ms(15),
    paddingHorizontal: ms(16),
    flex: 1,
    marginVertical: ms(5),
  },

  rowJustified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  termsText: {
    fontSize: ms(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  yourPlanText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Medium,
    fontSize: ms(16),
    marginBottom: ms(10),
  },
  subTitleText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(14),
    marginBottom: ms(10),
  },
  planType: {
    color: COLORS.bluish_green,
    fontFamily: Fonts.Medium,
    fontSize: ms(32),
  },
  everythingText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
  },
  planIncludedText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
    marginLeft: ms(10),
  },
  dateText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
  },
  featuresText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
    marginLeft: ms(10),
  },
  chnagePlanIcon: {
    height: ms(25),
    width: ms(25),
  },
});

export default styles;

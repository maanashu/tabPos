import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(15),
  },
  rightIconStyle: {
    height: ms(22),
    width: ms(22),
  },
  questionText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(14),
  },
});

export default styles;

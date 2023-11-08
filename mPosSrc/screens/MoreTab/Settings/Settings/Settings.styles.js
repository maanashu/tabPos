import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(20),
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
  imageStyle: {
    height: ms(30),
    width: ms(30),
    tintColor: COLORS.darkGray,
  },
  rightIcon: {
    height: ms(24),
    width: ms(24),
  },
  titleText: {
    color: COLORS.black,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },
  subTitleText: {
    color: COLORS.darkGray,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
});

export default styles;

import { COLORS, Fonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: ms(10),
    paddingHorizontal: ms(20),
    flexGrow: 1,
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
    height: ms(32),
    width: ms(32),
    // tintColor: COLORS.darkGray,
  },
  toggleIcon: {
    height: ms(24),
    width: ms(24),
  },
  titleText: {
    color: COLORS.solid_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },
  subTitleText: {
    color: COLORS.dark_grey,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  itemContainer: {
    borderWidth: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(5),
    marginVertical: ms(5),
    borderColor: COLORS.solidGrey,
  },
  iconStyle: { tintColor: COLORS.darkGray, height: ms(25), width: ms(25) },
  innerContainer: {
    backgroundColor: COLORS.white,
    padding: ms(15),
    borderRadius: ms(10),
  },
});

export default styles;

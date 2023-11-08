import { COLORS, Fonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: ms(10),
    paddingHorizontal: ms(20),
    // flexGrow: 1,
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
  itemContainer: {
    borderWidth: 1,
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(5),
    marginVertical: ms(5),
    borderColor: COLORS.solidGrey,
  },
  addressTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(14),
    color: COLORS.solid_grey,
  },
  addressText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.dark_grey,
    marginTop: ms(2),
  },
  storeIcon: {
    height: ms(40),
    width: ms(40),
  },
});

export default styles;

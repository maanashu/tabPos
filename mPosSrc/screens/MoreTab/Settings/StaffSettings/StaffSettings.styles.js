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
  userIcon: {
    height: ms(34),
    width: ms(40),
    // tintColor: COLORS.darkGray,
  },
  toggleIcon: {
    height: ms(24),
    width: ms(24),
  },
  userName: {
    color: COLORS.solid_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },
  roleText: {
    color: COLORS.dark_grey,
    fontSize: ms(12),
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
    justifyContent: 'space-between',
  },
});

export default styles;

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
    height: ms(90),
    width: ms(90),
  },
  detailIcons: {
    height: ms(16),
    width: ms(16),
    tintColor: COLORS.primary,
  },
  toggleIcon: {
    height: ms(24),
    width: ms(24),
  },
  userName: {
    color: COLORS.solid_grey,
    fontSize: ms(18),
    fontFamily: Fonts.SemiBold,
  },
  semiBoldHeading: {
    color: COLORS.solid_grey,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  blueBoldHeading: {
    color: COLORS.solid_grey,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
    flex: 1,
    marginHorizontal: ms(2),
  },
  timeText: {
    color: COLORS.dark_grey,
    fontSize: ms(9),
    fontFamily: Fonts.SemiBold,
    paddingVertical: ms(15),
  },
  blueText: {
    color: COLORS.dark_grey,
    fontSize: ms(9),
    fontFamily: Fonts.SemiBold,
    paddingTop: ms(15),
    flex: 1,
    marginHorizontal: ms(2),
  },
  userDetailText: {
    color: COLORS.dark_grey,
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
    marginLeft: ms(5),
    marginVertical: ms(3),
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
    // flex: 1,
  },
  profileContainer: {
    backgroundColor: COLORS.white,
    padding: ms(15),
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    borderRadius: ms(5),
  },
  timeInnerView: { alignItems: 'flex-start', flex: 1 },
  blueInnerView: {
    alignItems: 'flex-start',
    // flex: 1,
    marginHorizontal: ms(2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  blueView: {
    backgroundColor: COLORS.blue_shade,
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
    borderBottomLeftRadius: ms(5),
    borderBottomRightRadius: ms(5),
    borderColor: COLORS.mid_grey,
    borderTopWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-evenly',
  },
});

export default styles;

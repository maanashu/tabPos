import { StyleSheet, Dimensions } from 'react-native';
import { SH, SW, COLORS, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  rowJustified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ms(15),
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.inputBorder,
    borderBottomWidth: 1,
    paddingVertical: verticalScale(10),
    marginHorizontal: 10,
  },
  img: {
    height: SH(23),
    width: SW(20),
    resizeMode: 'contain',
  },
  subName: {
    color: COLORS.text,
    fontFamily: Fonts.Medium,
    fontSize: scale(13),
    alignSelf: 'center',
  },
  cardName: {
    color: '#A7A7A7',
    fontFamily: Fonts.SemiBold,
    fontSize: ms(16),
  },
  toggle: {
    height: SH(32),
    width: SW(40),
  },
  face: {
    height: ms(200),
    width: ms(200),
    alignSelf: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    borderColor: COLORS.light_border,
    borderWidth: ms(1),
    height: ms(146),
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: ms(15),
  },
  rightArrowStyle: {
    tintColor: COLORS.light_grey,
    height: ms(16),
    width: ms(16),
  },
  lockIconStyle: {
    height: ms(24),
    width: ms(24),
  },
  changePinTextStyle: {
    color: COLORS.text,
    fontSize: ms(14),
    fontFamily: Fonts.Regular,
    marginLeft: ms(5),
  },
  bottomLine: {
    borderBottomWidth: ms(1),
    borderColor: COLORS.light_border,
    marginVertical: ms(10),
  },
  bottomTextStyle: {
    color: COLORS.light_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
  },
});

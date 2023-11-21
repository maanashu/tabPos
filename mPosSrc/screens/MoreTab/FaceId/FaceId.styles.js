import { StyleSheet, Dimensions } from 'react-native';
import { SH, SW, COLORS, SF, ShadowStyles, Fonts } from '@/theme';
import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';
import { width } from '@/theme/ScalerDimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  rowCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SH(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    width: windowWidth * 0.92,
    alignSelf: 'center',
    borderRadius: 7,
    ...ShadowStyles.shadow4,
    paddingHorizontal: moderateScale(10),
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
    fontSize: scale(13),
  },
  toggle: {
    height: SH(32),
    width: SW(40),
  },
  face: {
    height: ms(109),
    width: ms(109),
    alignSelf: 'center',
  },
  Card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
  },
  resetButtonStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.red,
    borderWidth: 1,
    height: ms(44),
    padding: ms(10),
    alignSelf: 'center',
    width: width * 0.85,
  },
  buttonTextStyle: {
    color: COLORS.red,
    fontFamily: Fonts.Regular,
    fontSize: ms(14),
    flex: 1,
  },
});

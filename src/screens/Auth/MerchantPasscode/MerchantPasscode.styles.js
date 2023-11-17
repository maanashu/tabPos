import { StyleSheet, Dimensions } from 'react-native';

import { moderateScale, ms, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, ShadowStyles } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.sky_grey,
  },
  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.82,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(60),
    ...ShadowStyles.shadow2,
  },
  heading: {
    fontSize: SF(30),
    textAlign: 'center',
    lineHeight: ms(22),
    letterSpacing: ms(-0.6),
    color: COLORS.navy_blue,
    fontFamily: Fonts.MaisonRegular,
  },
  subHeading: {
    fontSize: SF(16),
    color: COLORS.navy_light_blue,
    fontFamily: Fonts.Regular,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  cellRoot: {
    backgroundColor: COLORS.white,
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.solidGrey,
    marginHorizontal: moderateScale(10),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    color: COLORS.black,
    marginTop: SH(10),
  },
});

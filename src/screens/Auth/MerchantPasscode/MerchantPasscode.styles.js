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
    height: windowHeight * 0.84,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
  },
  heading: {
    fontSize: SF(24),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
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
    borderColor: COLORS.light_purple,
    marginHorizontal: moderateScale(10),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    color: COLORS.navy_blue,
    marginTop: SH(10),
  },
});

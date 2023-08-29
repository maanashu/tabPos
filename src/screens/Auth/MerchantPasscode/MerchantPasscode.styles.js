import { StyleSheet, Dimensions } from 'react-native';

import { moderateScale, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, ShadowStyles } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.82,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
  },
  heading: {
    fontSize: SF(24),
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
  },
  subHeading: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
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
  },
});

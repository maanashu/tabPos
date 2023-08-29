import { StyleSheet, Dimensions } from 'react-native';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, ShadowStyles } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.7,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
  },
  header: {
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
    backgroundColor: COLORS.textInputBackground,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    marginHorizontal: moderateScale(6),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(18),
    color: COLORS.black,
  },
  selectedText: {
    color: COLORS.white,
    paddingVertical: verticalScale(10),
  },
  buttonText: {
    color: COLORS.darkGray,
    paddingVertical: verticalScale(10),
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.35,
  },
  button: {
    backgroundColor: COLORS.textInputBackground,
    width: windowWidth * 0.35,
  },
});

import { StyleSheet, Dimensions } from 'react-native';

import { moderateScale, ms, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SW, SF, ShadowStyles, SH } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.87,
    // height: '87%',
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: ms(18),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
  },
  subHeading: {
    fontSize: SF(24),
    color: COLORS.dark_grey,
    fontFamily: Fonts.me,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  cellRoot: {
    backgroundColor: COLORS.white,
    height: moderateScale(37),
    width: moderateScale(37),
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
  cross: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  profileImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: SH(50),
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
  },
  firstName: {
    fontSize: ms(10),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  role: {
    fontSize: ms(9),
    fontFamily: Fonts.Medium,
    color: COLORS.lavender,
    textAlign: 'center',
  },
  welcomeTo: {
    fontFamily: Fonts.Medium,
    fontSize: ms(15),
    color: COLORS.navy_blue,
    marginVertical: ms(10),
  },
});

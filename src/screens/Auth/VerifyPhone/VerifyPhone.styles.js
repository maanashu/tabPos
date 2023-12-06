import { StyleSheet, Dimensions } from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SW, SF, ShadowStyles } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.sky_grey,
    justifyContent: 'center',
  },
  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.82,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: ms(25),
    // alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
  },
  header: {
    fontSize: SF(24),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: SF(16),
    color: COLORS.faded_purple,
    fontFamily: Fonts.Regular,
    marginTop: ms(4),
  },
  textInputView: {
    paddingLeft: ms(12),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    alignItems: 'center',
    flexDirection: 'row',
    height: ms(38),
    borderRadius: ms(20),
    marginTop: 16,
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    color: COLORS.navy_blue,
    fontSize: ms(11),
    fontFamily: Fonts.Medium,
  },
  textInputContainer: {
    backgroundColor: COLORS.input_bg,
    color: COLORS.navy_blue,
    fontSize: ms(11),
    fontFamily: Fonts.Medium,
    height: ms(38),
    flex: 1,
  },
  countryCodeBack: {
    backgroundColor: COLORS.sky_grey,
    paddingHorizontal: ms(5),
    paddingVertical: ms(2),
    marginHorizontal: ms(7),
    borderRadius: ms(5),
  },
});

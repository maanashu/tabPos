import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.black,
  },
  verifyContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.8,
    // borderWidth: 1,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  textInputView: {
    paddingHorizontal: SW(12),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: windowHeight * 0.08,
    width: windowWidth * 0.35,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    marginTop: 16,
    marginHorizontal: SW(10),
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    paddingLeft: 15,
  },
  textInputContainer: {
    width: SW(250),
    borderWidth: 0,
    height: SH(50),
    color: COLORS.darkGray,
    fontFamily: Fonts.Italic,
    paddingLeft: 10,
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

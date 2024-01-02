import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(20),
  },
  taxDesc: {
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  activeTaxStyle: {
    fontSize: ms(16),
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    flex: 1,
  },
  activeText: {
    fontSize: ms(13),
    fontFamily: Fonts.Medium,
    color: COLORS.white,
  },
  activeTaxBox: {
    paddingHorizontal: ms(25),
    paddingVertical: ms(15),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
    borderRadius: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeTaxButton: {
    borderRadius: ms(30),
    backgroundColor: COLORS.navy_blue,
    paddingVertical: ms(12),
    paddingHorizontal: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  taxPayerHeadingContainer: {
    alignItems: 'center',
  },
  taxPayerHeading: {
    fontSize: ms(36),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    flex: 1,
    textAlign: 'center',
  },
  inputHeaderText: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(14),
    left: ms(20),
  },
  taxPayerInput: {
    borderWidth: 1,
    borderRadius: ms(50),
    paddingHorizontal: ms(20),
    height: ms(55),
    borderColor: COLORS.light_purple,
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
  arrowIcon: {
    height: ms(22),
    width: ms(22),
  },
  saveButtonTax: {
    backgroundColor: COLORS.navy_blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    borderRadius: ms(30),
    height: ms(55),
  },
  saveButtonText: {
    color: COLORS.white,
    fontFamily: Fonts.Medium,
    fontSize: ms(14),
  },
  cancelButtonText: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(14),
  },
  cancelButtonTax: {
    backgroundColor: COLORS.input_border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(15),
    borderRadius: ms(30),
    height: ms(55),
  },
  verifiedIcon: {
    tintColor: COLORS.white,
    height: ms(20),
    width: ms(20),
  },
  verifiedButtonView: {
    backgroundColor: COLORS.success_green,
    borderRadius: ms(20),
    marginLeft: ms(10),
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(8),
    height: ms(50),
    justifyContent: 'center',
    marginTop: ms(7),
  },
  employeeInfoText: {
    fontSize: ms(10),
    color: COLORS.navy_blue,
    marginTop: ms(6),
    marginHorizontal: ms(4),
  },
  smallText: {
    fontSize: ms(10),
    color: COLORS.navy_blue,
    marginTop: ms(2),
  },
  employeeNameText: {
    color: COLORS.navy_blue,
    fontSize: ms(12),
    fontFamily: Fonts.Medium,
  },
  operatingCountryContainer: {
    flexDirection: 'row',
    padding: ms(10),
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.light_purple,
  },
  toggleIcon: {
    height: ms(35),
    width: ms(35),
  },
});

import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import { StyleSheet } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },

  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // main screen css start
  homeScreenCon: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal:
      Platform.OS === 'android' ? moderateScale(22) : moderateScale(12),
  },
  searchScreenHeader: {
    height: SH(60),
    justifyContent: 'center',
  },
  cashLabelBold: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  crossBg: {
    width: SW(20),
    height: SW(8),
    resizeMode: 'contain',
  },
  _centerContainer: {
    backgroundColor: COLORS.white,
    marginTop: ms(30),
    marginHorizontal: ms(26),
    marginBottom: ms(10),
    borderRadius: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  _totalAmountTitle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(20),
  },
  _dollarSymbol: {
    fontSize: ms(20),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    marginTop: ms(2),
  },
  _amount: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(30),
  },
  _bottomContainer: {
    marginTop: ms(10),
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    borderRadius: ms(8),
  },
  _selectTips: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.solid_grey,
  },
  _boxView: {
    height: ms(110),
    width: ms(118),
    backgroundColor: COLORS.transparentBlue,
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    margin: ms(5),
  },
  _usdText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
  },
  _tipsPercent: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginTop: ms(2),
  },
  _innerContainer: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
  },
  _inputMain: {
    marginTop: ms(15),
    width: '98%',
  },
  _inputSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  _inputContainer: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(40),
    borderRadius: ms(3),
    paddingHorizontal: ms(10),
    flex: 1,
  },
  _tipsButton: {
    height: ms(40),
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.silver_solid,
    borderRadius: ms(3),
    justifyContent: 'center',
    alignContent: 'center',
    flex: 0.4,
    marginLeft: ms(10),
  },
  _tipText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    alignSelf: 'center',
  },
  _border: {
    height: ms(10),
    backgroundColor: COLORS.solidGrey,
    width: ms(1),
    marginHorizontal: ms(10),
  },
  _date: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
  },
  _topContainer: {
    position: 'absolute',
    marginLeft: ms(25),
    width: '98%',
    alignItems: 'center',
    height: ms(30),
    flexDirection: 'row',
  },
  _cross: {
    height: ms(15),
    width: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: ms(20),
  },
});

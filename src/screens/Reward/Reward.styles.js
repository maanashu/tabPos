import { StyleSheet, Dimensions } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  walletMainCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 10,
    alignSelf: 'center',
    width: windowWidth * 0.92,
    height: windowHeight * 0.84,
    // paddingHorizontal: moderateScale(12),
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
    flexDirection: 'row',
  },
  backView: {
    width: SW(25),
    height: SW(12),
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.08,
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonArrow: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  backTextStyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingVertical: verticalScale(5),
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchView: {
    borderWidth: 1,
    width: SW(65),
    height: SH(43),
    borderRadius: 20,
    borderColor: COLORS.row_grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImage: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    left: 3,
  },
  textInputStyles: {
    width: SW(45),
    marginLeft: 10,
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
  },
  
});

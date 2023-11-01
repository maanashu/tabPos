import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Fonts, SF, SH, SW, ShadowStyles } from '@/theme';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.textinput_bg,
    paddingHorizontal: ms(10),
  },
  bodyContainer: {
    flex: 1,
    paddingTop: ms(25),
    paddingHorizontal: ms(12),
    paddingBottom: ms(30),
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: ms(100),
    height: ms(100),
    resizeMode: 'contain',
    borderRadius: ms(50),
  },
  profileName: {
    fontSize: ms(14),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  posCashier: {
    fontSize: ms(13),
    color: COLORS.text,
    fontFamily: Fonts.Medium,
  },
  posUserId: {
    fontSize: ms(10),
    color: COLORS.text,
    fontFamily: Fonts.Regular,
  },
  todaySaleCon: {
    borderWidth: 1,
    borderRadius: ms(7),
    borderColor: COLORS.light_border,
    padding: ms(10),
  },
  todaySale: {
    color: COLORS.darkBlue,
    fontSize: ms(16),
    fontFamily: Fonts.MaisonRegular,
  },
  cashLabel: {
    color: COLORS.dark_gray,
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
  },
  cashAmount: {
    color: COLORS.dark_gray,
    fontSize: ms(12),
    fontFamily: Fonts.SemiBold,
  },
  lockScreenButton: {
    borderWidth: 1,
    height: ms(50),
    borderRadius: ms(3),
    borderColor: COLORS.text,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    marginHorizontal: ms(5),
  },
});

import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  maincontainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    height: SH(50),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: COLORS.white,
    height: SH(50),
    ...ShadowStyles.shadow,
    marginHorizontal: moderateScale(-12),
  },
  iconcontainer: {
    right: SW(10),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: SF(14),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  image: {
    // alignSelf: 'center',
    height: SH(20),
    width: SW(20),
    resizeMode: 'contain',
  },
  subTitles: {
    fontSize: SF(14),
    color: COLORS.white,
    fontFamily: Fonts.Medium,
    alignSelf: 'center',
    paddingHorizontal: 4,
  },

  headerIcon: {
    width: SW(28),
    height: SH(24),
  },
  coinContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingVertical: verticalScale(4),
    paddingHorizontal: moderateScale(10),
    borderRadius: 16,
  },
  bodyContainer: {
    marginHorizontal: moderateScale(5),
  },
  flexRow: {
    // display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light_border,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(16),
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpText: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Medium,
    paddingHorizontal: moderateScale(8),
  },
  reqButton: {
    fontSize: SF(9),
    color: COLORS.dark_gray,
    paddingVertical: verticalScale(3),
    paddingHorizontal: moderateScale(10),
    backgroundColor: COLORS.yellowTweet,
    borderRadius: Platform.OS == 'ios' ? 10 : 8,
    marginHorizontal: moderateScale(8),
    overflow: 'hidden',
  },
  mask: {
    width: SW(15),
    height: SH(15),
    resizeMode: 'contain',
  },
  //

  selectScreenContainer: (screen, id) => {
    return {
      paddingHorizontal: ms(10),
      paddingVertical: ms(5),
      borderWidth: 1,
      borderRadius: ms(7),
      borderColor: screen == id ? COLORS.primary : COLORS.solidGrey,
    };
  },

  selectScreenText: (screen, id) => {
    return {
      fontFamily: screen == id ? Fonts.SemiBold : Fonts.Regular,
      color: screen == id ? COLORS.primary : COLORS.solid_grey,
      fontSize: ms(14),
    };
  },
});

export default styles;

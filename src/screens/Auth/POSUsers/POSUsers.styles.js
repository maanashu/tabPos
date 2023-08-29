import { StyleSheet, Dimensions, Platform } from 'react-native';

import { moderateScale, ms, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  containerSix: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  posUserNot: {
    fontSize: SF(25),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    alignSelf: 'center',
  },
  profileImage: {
    width: SH(100),
    height: SH(100),
    borderRadius: SH(50),
  },
  firstName: {
    fontSize: SH(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
  role: {
    fontSize: SH(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    width: SH(270),
    textAlign: 'center',
  },
  dateTime: {
    fontSize: SH(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  posUserCon: {
    backgroundColor: COLORS.textInputBackground,
    alignItems: 'center',
    marginVertical: SH(25),
    marginHorizontal: SH(15),
    padding: SH(10),
    width: Platform.OS === 'ios' ? ms(140) : ms(190),
    height: ms(190),
    borderRadius: 15,
  },
  posLoginHeader: {
    color: COLORS.black,
    fontSize: SH(16),
    fontFamily: Fonts.Bold,
    margin: SH(20),
  },
  arrowButonCon: {
    bottom: SH(25),
    backgroundColor: COLORS.primary,
    width: SH(84),
    height: SH(44),
    padding: SH(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  arrowImage: {
    width: SH(30),
    height: SH(20),
    resizeMode: 'contain',
  },
  logoutCon: {
    borderWidth: 1,
    borderColor: COLORS.dark_grey,
    width: SW(40),
    height: SW(12),
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOut: {
    fontSize: SH(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  powerAuth: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    marginRight: 4,
  },
  verifyContainerSix: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.8,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  flexWidthSix: {
    width: windowWidth * 0.35,
  },
  subHeadingSix: {
    fontSize: SF(24),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  alignSelfCenterSix: {
    alignSelf: 'center',
  },
  cellRootSix: {
    backgroundColor: COLORS.white,
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.solidGrey,
    marginHorizontal: moderateScale(5),
  },
  cellTextSix: {
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    color: COLORS.black,
  },
  crossSix: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  flexRowSix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

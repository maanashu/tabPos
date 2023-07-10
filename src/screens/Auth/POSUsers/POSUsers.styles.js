import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { Fonts } from '@/assets';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
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
  },
  dateTime: {
    fontSize: SH(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  posUserCon: {
    backgroundColor: COLORS.textInputBackground,
    alignItems: 'center',
    margin: SH(25),
    padding: SH(10),
    width: SH(306),
    height: SH(320),
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
});

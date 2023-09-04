import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, verticalScale, scale, ms } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
    flexDirection: 'row',
  },
  headerMianViewbottomRow: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBackStyle: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: ms(10),
    paddingLeft: SW(2),
  },
  searchView: {
    height: SH(45),
    borderRadius: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
  searchImage: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  textInputStyles: {
    width: ms(140),
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
    paddingLeft: 5,
    padding: 0,
    margin: 0,
  },

  scnStyle: {
    width: SW(13),
    height: SW(14),
    resizeMode: 'contain',
  },
  walletHomeBodyCon: {
    flex: 1,
    marginHorizontal: ms(10),
    backgroundColor: COLORS.white,
    borderRadius: ms(4),
    marginBottom: ms(5),
    paddingHorizontal: ms(10),
    paddingVertical: ms(12),
  },
  trancationHeading: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  homeCalenaderBg: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(28),
    width: SW(10),
    marginLeft: ms(20),
    borderRadius: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarStyle: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  custometrCon: {
    width: Platform.OS === 'android' ? ms(175) : ms(145),
    height: SH(94),
    borderRadius: 10,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: ms(10),
  },
  contentContainerStyle: {
    marginTop: ms(15),
    flex: 1,
    justifyContent: 'space-between',
  },
  newCustomer: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  customerCount: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: ms(12),
  },
  newCustomerHeading: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  viewButtonCon: {
    backgroundColor: COLORS.blue_shade,
    width: SW(25),
    height: SW(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    alignSelf: 'flex-end',
  },
  viewAll: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    fontSize: SF(14),
  },
  transactions: {
    fontFamily: Fonts.Medium,
    color: COLORS.dark_grey,
    fontSize: ms(10),
  },
});

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
    fontSize: ms(11),
    paddingLeft: SW(2),
  },
  searchView: {
    borderWidth: 1,
    height: SH(38),
    borderRadius: 30,
    borderColor: COLORS.row_grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
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
  homeBodyCon: {
    marginHorizontal: ms(20),
  },
  totalCustomerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  totalCustomerFirst: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(10),
  },
  custometrCon: {
    width: Platform.OS === 'android' ? ms(175) : ms(145),
    height: SH(94),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newCustomer: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  customerCount: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(24),
  },
  newCustomerHeading: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  contentContainerStyle: {
    marginTop: ms(10),
    flex: 1,
    justifyContent: 'space-between',
  },
  totalCusPrimary: {
    fontFamily: Fonts.Medium,
    color: COLORS.black,
    fontSize: ms(9),
  },
  totalCustomer: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(34),
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

  // all Users css start
  backTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
  },
  backIcon: {
    height: ms(10),
    width: ms(10),
    resizeMode: 'contain',
    marginRight: ms(3),
  },
  horizontalCustomerCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: ms(110),
    height: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(7),
  },
  horizCustomerText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(7),
  },
  orderTypeCon: {
    height: SH(55),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
    marginTop: ms(10),
  },
  datePickerCon: {
    borderWidth: 1,
    height: SH(38),
    width: SW(45),
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(7),
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  txtInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: SF(11),
    top: 2,
    color: COLORS.solid_grey,
  },
  jbrTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(55),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  paginationEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  columnSpace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(5),
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  dropDownIconPagination: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.darkGreen,
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStylePagination: {
    width: SW(22),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    color: COLORS.solidGrey,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    top: Platform.OS === 'android' ? 30 : 35,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  placeholderStylePagination: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  unionCon: {
    backgroundColor: COLORS.washGrey,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 7,
  },
  unionStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(12),
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  tableDataHeaderCon: {
    height: SH(50),
    backgroundColor: COLORS.textInputBackground,
    textAlign: 'center',
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
  },
  tableHeaderLeft: {
    flexDirection: 'row',
    width: windowWidth * 0.4,
  },
  tableTextHeaFirst: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(14),
    letterSpacing: -1,
    width: windowWidth * 0.01,
  },
  tableTextHea: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(14),
    letterSpacing: -1,
    width: windowWidth * 0.15,
  },
  tableHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.47,
  },
});

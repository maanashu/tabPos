import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: COLORS.white,
    // paddingHorizontal:moderateScale(10),
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign:{
    flexDirection:'row',
    alignItems:'center'
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(25),
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
  backText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
  },
  orderDetailView: {
    width: windowWidth / 2,
    backgroundColor: COLORS.white,
    paddingRight: 10,
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
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(2),
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  textInputStyles: {
    width: SW(45),
    marginLeft: 10,
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
  },
  walletMainCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 10,
    // height: SH(63),
    justifyContent:'center',
    paddingHorizontal: moderateScale(12),
  },
  customerHomeCon:{
    // borderWidth:1,
    width:windowWidth * 0.86,
    alignSelf:'center'
  },
  custometrCon:{
    width:SW(75),
    height:SH(94),
    borderWidth:1,
    borderRadius:10,
    borderColor:COLORS.silver_solid,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:verticalScale(7)
  },
  newCustomer:{
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  customerCount:{
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(24),
  },
  newCustomerHeading:{
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  trancationHeading: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  byDayCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    marginHorizontal: moderateScale(3),
  },
  byDayConLight: {
    // backgroundColor:COLORS.textInputBackground,
    borderRadius: 3,
    marginHorizontal: moderateScale(3),
  },
  todayText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(2),
  },
  todayTextLight: {
    color: COLORS.darkGray,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(2),
  },
  totalCustomer:{
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(54),
  },
  customersGraph:{
    width:windowWidth * 0.90,
    height:windowHeight * 0.60,
    resizeMode: 'contain',
  },
  orderTypeCon: {
    height: SH(63),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  datePickerCon: {
    borderWidth: 1,
    height: SH(35),
    width: SW(45),
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    alignItems: 'center',
    paddingHorizontal: moderateScale(7),
    flexDirection: 'row',
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  dropDownIcon: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.solidGrey,
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStyle: {
    width: SW(45),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
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
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    top:Platform.OS === 'android' ? 30 : 15,
    zIndex: Platform.OS === 'ios' ? 100 : 1
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  datePlaceholder: {
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(5),
  },
 
});

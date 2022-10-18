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
    paddingLeft: SW(4),
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  textInputStyle: {
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
  walletTranCon: {
    // borderRadius: 10,
    height: SH(63),
    justifyContent:'center',
    paddingHorizontal: moderateScale(12),
  },
  allTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    // borderRadius: 10,
    // height: SH(63),
    justifyContent:'center',
    paddingHorizontal: moderateScale(12),
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
  transationPrice: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(54),
  },
  trancationHeading: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  totalTranStyle:{
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  jbrCoinCon: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(15),
    // width:SW(110)
    width: windowWidth * 0.29,
  },
  jbrCoinStyle: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
  },
  arrowStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  jbrCoinheading: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  jbrCoinPrice: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(30),
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
    // paddingHorizontal: SW(5),
  },
  chartCon: {
    // borderWidth:1,
    // width:windowWidth * 0.30
  },
  transactionChartStyle: {
    width: SW(335),
    height: SW(90),
    resizeMode: 'contain',
  },
  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.07,
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
  trancationHeadingMono: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(18),
  },
  jbrTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(63),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  allJbrCon: {
    borderWidth: 1,
    height: SH(42),
    width: SW(30),
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
  },
  allJbrConBluish: {
    borderColor: COLORS.primary,
  },
  allJbrText: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  allJbrTextbluish: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
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
  datePlaceholder: {
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(5),
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
    top: 30,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  unionCon: {
    backgroundColor: COLORS.washGrey,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
  },
  unionConWhite: {
    backgroundColor: COLORS.white,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
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
  head: {
    height: SH(50),
    width: SW(43),
    backgroundColor: COLORS.silver_solid,
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.dark_grey,
    fontSize: SF(12),
    textAlign: 'center',
  },
  tableRowStyle: {
    width: SW(43),
    borderBottomWidth: 1,
    height: SH(63),
    borderBottomColor: COLORS.solidGrey,
    paddingVertical: SH(10),
    justifyContent: 'center',
  },
  tableRowText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    textAlign: 'center',
  },
  tableMainView: {
    // width: SW(330),
    zIndex: 1,
  },
  completedButton: {
    width: SW(30),
    height: SH(30),
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bluish_green,
  },
  completedText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    textAlign: 'center',
    color: COLORS.white,
  },

  numpadContainer: {
    width: SW(235),
    height: windowHeight,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 0,
    left: 0,
    // paddingLeft: moderateScale(10),
  },
  listOfItem: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(24),
  },
  walletItem: {
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(5),
  },
  walletItem: {
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(5),
  },
  itmybdaystyle: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingHorizontal: moderateScale(5),
  },
  jfrText: {
    fontSize: SF(18),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  boxText: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Italic,
  },
  rate: {
    fontSize: SF(18),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
  },
  oneX: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  ashtonStyle: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
  },
  leftBackStyle: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },
  orderNoStyle: {
    fontSize: SF(20),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(7),
  },
  headerCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(7),
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  listItemStyle: {
    fontSize: SF(24),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  itemStyle: {
    fontSize: SF(14),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(5),
  },
  rewardPointStyle: {
    fontSize: SF(18),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  onexstyle: {
    color: COLORS.dark_grey,
  },
  onlyxstyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  }, 
  paymentHeader: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
  },
  crossButtonStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  paymentDone: {
    backgroundColor: COLORS.blue_shade,
    height: SH(107),
    borderRadius: 5,
    justifyContent: 'center'
  },
  darkPricestyle: {
    fontSize: SF(32),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
  },
  payDoneText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  jbrWalllettext: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    alignSelf: 'center'
  },
  viaText: {
    fontSize: SF(10),
    fontFamily: Fonts.Italic,
    color: COLORS.black,
  },
  customerCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SH(342),
    borderRadius: 5,
    paddingHorizontal: moderateScale(10)
  },
  jbrCustomer: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain'
  },
  walletIdButtonCon: {
    borderTopWidth: 2,
    borderColor: COLORS.solidGrey,
    height: SH(75),
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: SW(107),
    backgroundColor: COLORS.solidGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerHeading: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
  },
  cusAddText: {
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  walletIdcontent: {
    fontSize: SF(14),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },
  bottomContainer: {
    borderTopWidth: 1,
    height: SH(350),
    borderColor: COLORS.row_grey,
  },
  bottomSubCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  smalldarkText: {
    fontSize: SF(14),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },
  smallLightText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  hr: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.row_grey,
  },
  selectedText: {
    color: COLORS.white,
    fontSize: SF(16),
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: SW(107),
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(9),
    // marginVertical:verticalScale(10)
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  checkArrow: {
    width: SW(10),
    height: SW(4),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
  },
  onlinedeliveryCon:{
    borderBottomWidth:1,
    borderColor:COLORS.solidGrey,
    paddingVertical:verticalScale(5)
  },
  onlinedeliveryBody:{
      borderWidth:1,
      width:windowWidth * 0.80,
      alignSelf:'center'
  },

  rightSidecon: {
    backgroundColor: COLORS.white,
    height: windowHeight,
    width: SW(116),
    position: 'absolute',
    right: 0,
    top: 0,
    borderColor: COLORS.black,
    elevation: 30,
    shadowColor: '#000000',
    shadowRadius: 4.84,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 6,
      height: 6,
    },
  },

  // online delivery start css
  buyerCon:{
    borderWidth:1,
    borderColor:COLORS.solidGrey,
    borderRadius:10,
    width:windowWidth * 0.48,
    height:SH(170),
    paddingHorizontal:moderateScale(8)
  },
  invoiceCon:{
    borderWidth:1,
    borderColor:COLORS.solidGrey,
    borderRadius:10,
    width:windowWidth * 0.30,
    height:SH(170),
    paddingHorizontal:moderateScale(8)
  },
  angelaAddress:{
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  angela:{
    color: COLORS.solid_grey,
    fontSize: SF(20),
    fontFamily: Fonts.Regular,
  },
  angelaPic:{
    Width:SW(10),
    height:SW(10),
    resizeMode:'contain',
    marginRight:-20,
    marginLeft:-35
  },
  buyer:{
    color: COLORS.dark_grey,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonRegular,
  },
  invoiceId:{
    color: COLORS.brown,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  deliveryDate:{
    color: COLORS.sucx,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  invoiceDetail:{
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.Italic,
  },
  pointCon:{
    backgroundColor:COLORS.primary,
    borderBottomLeftRadius:20,
    position:'absolute',
    top:0,
    right:0
  },
  pointText:{
    color: COLORS.solid_green,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal:moderateScale(18),
    paddingVertical:verticalScale(3)
    // paddingHorizontal
  }
});

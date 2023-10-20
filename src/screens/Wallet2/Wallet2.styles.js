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
  bgWhitecontainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    height: ms(45),
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
    width: Platform.OS === 'android' ? ms(175) : ms(135),
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

  //wallet 1 style

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
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  // searchView: {
  //   // borderWidth: 1,
  //   // width: SW(65),
  //   height: SH(38),
  //   // borderRadius: 30,
  //   borderColor: COLORS.row_grey,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingLeft: 10,
  //   backgroundColor: COLORS.white,
  // },
  searchImage: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  // textInputStyles: {
  //   width: SW(75),
  //   // marginLeft: 10,
  //   fontFamily: Fonts.Italic,
  //   // borderWidth: 3,
  //   fontSize: SF(15),
  //   paddingLeft: 5,
  //   padding: 0,
  //   right: 0,
  // },
  walletMainCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 10,
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.84,
    paddingHorizontal: moderateScale(12),
  },
  walletTranCon: {
    height: SH(40),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
  },
  allTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
  },
  byDayCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    marginHorizontal: moderateScale(3),
  },
  byDayConLight: {
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
    fontSize: SF(34),
  },
  trancationHeading: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  totalTranStyle: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  jbrCoinCon: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
    width: windowWidth * 0.4,
    height: windowHeight * 0.15,
    margin: moderateScale(10),
  },
  jbrCoinCon2: {
    height: windowHeight * 0.15,
  },
  jbrCoinStyle: {
    width: SW(12),
    height: SW(12),
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
    fontSize: SF(16),
  },
  jbrCoinPrice: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(20),
  },
  contentContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  transactionChartStyle: {
    width: windowWidth * 0.83,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
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
  trancationHeadingMono: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(18),
  },
  jbrTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(55),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  allJbrCon: {
    borderWidth: 1,
    height: SH(35),
    width: SW(30),
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(4),
    marginVertical: verticalScale(4),
  },
  allJbrConBluish: {
    borderColor: COLORS.primary,
  },
  allJbrText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  allJbrTextbluish: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
  },
  orderTypeCon: {
    height: SH(55),
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
    justifyContent: 'center',
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    alignSelf: 'center',
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
  dropDownIconPagination: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.darkGreen,
    marginLeft: ms(-5),
    top: Platform.OS === 'ios' ? 0 : ms(0),
  },
  transdropDownIconPagination: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.darkGreen,
    marginLeft: ms(-4),
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
    fontSize: SF(13),
    fontFamily: Fonts.MaisonBold,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    top: Platform.OS === 'android' ? 30 : 32,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  placeholderStylePagination: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  containerStylePagination: {
    width: SW(25),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    color: COLORS.solidGrey,
  },
  unionCon: {
    backgroundColor: COLORS.washGrey,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
  },
  jbrListCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
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
    width: SW(40),
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
    width: SW(40),
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
    color: COLORS.darkGray,
  },
  orderIdText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(16),
    textAlign: 'left',
    color: COLORS.dark_grey,
    marginLeft: -14,
  },

  numpadContainer: {
    width: SW(230),
    height: windowHeight,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 0,
    left: 0,
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
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  boxText: {
    fontSize: SF(9),
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
    width: SW(11),
    height: SW(11),
    resizeMode: 'contain',
    borderRadius: 50,
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
    paddingVertical: verticalScale(7),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  listItemStyle: {
    fontSize: SF(20),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  itemStyle: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(5),
  },
  rewardPointStyle: {
    fontSize: SF(16),
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
    height: SH(97),
    borderRadius: 5,
    justifyContent: 'center',
  },
  darkPricestyle: {
    fontSize: SF(26),
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
    alignSelf: 'center',
  },
  viaText: {
    fontSize: SF(12),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.black,
  },
  customerCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SH(260),
    borderRadius: 5,
    paddingHorizontal: moderateScale(10),
  },
  jbrCustomer: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius: 50,
  },
  walletIdButtonCon: {
    borderTopWidth: 2,
    borderColor: COLORS.solidGrey,
    height: SH(65),
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    bottom: 0,
    // right: 1,
    width: SW(105),
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
    fontSize: SF(14),
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
    fontFamily: Fonts.SemiBold,
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
    width: windowWidth * 0.29,
    alignSelf: 'center',
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
  onlinedeliveryCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(7),
    paddingVertical: verticalScale(7),
  },
  onlinedeliveryBody: {
    width: windowWidth * 0.8,
    alignSelf: 'center',
  },

  rightSidecon: {
    backgroundColor: COLORS.white,
    height: windowHeight,
    width: windowWidth * 0.31,
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
  buyerCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    width: windowWidth * 0.48,
    height: SH(135),
    paddingHorizontal: moderateScale(8),
  },
  invoiceCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    width: windowWidth * 0.3,
    height: SH(135),
    paddingHorizontal: moderateScale(8),
  },
  angelaAddress: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  angela: {
    color: COLORS.solid_grey,
    fontSize: SF(20),
    fontFamily: Fonts.Regular,
  },
  angelaPic: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius: 50,
    marginRight: 10,
  },
  buyer: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.MaisonRegular,
  },
  invoiceId: {
    color: COLORS.brown,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  deliveryDate: {
    color: COLORS.sucx,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
  },
  invoiceDetail: {
    color: COLORS.solid_grey,
    fontSize: SF(15),
    fontFamily: Fonts.Italic,
  },
  pointCon: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    top: -1,
    right: -1,
  },
  pointText: {
    color: COLORS.solid_green,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(3),
  },
  tableContainer: {
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
    borderRadius: 12,
  },
  tableheader: {
    backgroundColor: COLORS.textInputBackground,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: 'transparent',
  },

  tableLabel: {
    color: COLORS.dark_grey,
    fontSize: SF(14),
    fontFamily: Fonts.MaisonBold,
  },
  rowText: {
    color: COLORS.dark_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  ashtonClass: {
    Width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  tableSetting: {
    width: SW(200),
    marginRight: 170,
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SH(200),
    width: windowWidth * 0.38,
    borderRadius: 10,
    backgroundColor: COLORS.textInputBackground,
  },
  tablesubTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  tablesubTotalLabel: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
  },
  tablesubTotalText: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.MaisonRegular,
  },
  paidContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    marginHorizontal: moderateScale(5),
  },
  paidText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(1),
  },
  subtotalHr: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    marginVertical: moderateScale(5),
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    height: SH(200),
    width: windowWidth * 0.38,
    borderRadius: 10,
    backgroundColor: COLORS.textInputBackground,
    paddingVertical: verticalScale(4),
  },
  textInputNote: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    textAlignVertical: 'top',
    paddingHorizontal: moderateScale(10),
  },
  noteplaceholderStyle: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  shippingDetail: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(18),
  },
  trackingCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    height: SH(102),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  willis: {
    resizeMode: 'contain',
    width: SW(25),
    height: SW(25),
  },
  willisName: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
  },
  trackingNumber: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  deliverBtnCon: {
    backgroundColor: COLORS.bluish_green,
    flexDirection: 'row',
    height: SH(36),
    // width:SW(40),
    alignItems: 'center',
    borderRadius: 6,
    textAlign: 'center',
  },
  trackingBtnCon: {
    backgroundColor: COLORS.orange,
  },
  deliveryCheck: {
    resizeMode: 'contain',
    width: SW(6),
    height: SW(6),
  },
  deliveredText: {
    color: COLORS.white,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(1),
  },
  deliverTextCon: {
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
  },

  tableDataHeaderCon: {
    height: SH(50),
    backgroundColor: COLORS.textInputBackground,
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // alignSelf: 'center',
  },
  tableHeaderLeft: {
    flexDirection: 'row',
    width: windowWidth / 7.5,
  },
  tableHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.75,
    alignContent: 'center',
    alignItems: 'center',

    // paddingRight: Platform.OS === 'ios' ? 40 : 0,
  },
  tableTextHea: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(13),
    letterSpacing: -1,

    // width: windowWidth * 0.1,
  },
  // tableTextHea: {
  //   color: COLORS.dark_grey,
  //   fontFamily: Fonts.MaisonBold,
  //   fontSize: SF(14),
  //   letterSpacing: -1,
  //   width: windowWidth * 0.1,
  //   paddingHorizontal: 5,
  // },
  tableTextStatus: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(14),
    // letterSpacing: -1,
    // width: windowWidth * 0.1,
  },
  tableTextData: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    width: windowWidth / 8,
    marginTop: SF(2),
  },
  tableTextDataCom: {
    paddingHorizontal: moderateScale(4),
    fontSize: SF(14),
    color: COLORS.white,
    borderRadius: 3,
  },
  tableTextHeaFirst: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(14),
    letterSpacing: -1,

    // width: windowWidth * 0.01,
  },
  tableTextDataFirst: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    letterSpacing: -1,
    // width: windowWidth * 0.01,
  },
  tableTextCenter: {
    alignSelf: 'center',
    width: windowWidth * 0.1,
  },

  tableHeaderRightOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.36,
    // paddingRight: Platform.OS === 'ios' ? 40 : 0,
  },
  orderCigrate: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
    borderRadius: 50,
  },
  tableDataCon: {
    height: SH(55),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',

    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  indicatorstyle: {
    // borderWidth:1,
    paddingVertical: 5,
  },

  // order shipping css start
  onlinedeliveryCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingVertical: verticalScale(5),
  },
  leftBackStyle: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  orderNoStyle: {
    fontSize: SF(20),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(7),
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

  trackingNoBody: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    width: windowWidth * 0.92,
    alignSelf: 'center',
    height: windowHeight * 0.82,
    paddingHorizontal: moderateScale(10),
  },
  mapContainer: {
    width: windowWidth * 0.44,
    borderRadius: 10,
  },
  mapConatinerHeight: {
    height: windowHeight * 0.79,
  },
  costoContainer: {
    borderWidth: 1,
    width: windowWidth * 0.44,
    height: SH(120),
    borderRadius: 10,
    borderColor: COLORS.solidGrey,
  },
  costoName: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  costoAdd: {
    fontSize: SF(14),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(5),
  },
  costoHr: {
    borderWidth: 0.4,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.34,
    marginVertical: verticalScale(7),
  },
  costoPayCon: {
    borderEndWidth: 1,
    borderColor: COLORS.solidGrey,
    width: SW(45),
    justifyContent: 'center',
  },
  ticketImage: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
  },
  ciagrtext: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(4),
  },
  ticketImage: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
  },
  detailText: {
    color: COLORS.primary,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
  },
  dropRight: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
  },
  trackingAngela: {
    width: SW(17),
    height: SW(17),
    resizeMode: 'contain',
    borderRadius: 50,
    marginHorizontal: 10,
  },
  Phonelight: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  orderStatus: {
    color: COLORS.solid_grey,
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
  },
  orderStatus: {
    color: COLORS.solid_grey,
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
  },
  costoHr: {
    borderWidth: 0.4,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.34,
    marginVertical: verticalScale(7),
  },
  greyRadioCon: {
    flexDirection: 'row',
    paddingVertical: verticalScale(2),
  },
  greyRadioArr: {
    width: SW(7),
    height: SW(11),
    resizeMode: 'contain',
  },
  greyRadioBody: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  verifyTextLight: {
    color: COLORS.gerySkies,
    fontSize: SF(8),
    fontFamily: Fonts.SemiBold,
  },
  verifyTextDark: {
    color: COLORS.solid_grey,
    fontSize: SF(8),
    fontFamily: Fonts.SemiBold,
  },
  waitMinuteLight: {
    color: COLORS.gerySkies,
    fontSize: SF(10),
    fontFamily: Fonts.Regular,
  },
  carriarCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    height: SH(85),
    bottom: 0,
  },
  verifyTextLight: {
    color: COLORS.gerySkies,
    fontSize: SF(8),
    fontFamily: Fonts.SemiBold,
  },
  verifyTextDark: {
    color: COLORS.solid_grey,
    fontSize: SF(8),
    fontFamily: Fonts.SemiBold,
  },
  tracking2Angela: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  gredoName: {
    color: COLORS.black,
    fontSize: SF(13),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(5),
  },
  contactButton: {
    height: SH(36),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 24,
    justifyContent: 'center',
  },
  contactStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  contactText: {
    color: COLORS.solid_grey,
    fontSize: SF(10),
    fontFamily: Fonts.SemiBold,
    paddingLeft: moderateScale(5),
  },
  mapContainer2: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: windowWidth * 0.44,
    height: windowHeight * 0.79,
    borderRadius: 20,
  },
  tableArrow: {
    width: SW(5),
    height: SH(7),
    resizeMode: 'contain',
  },
  tableDropDownCon: {
    width: windowWidth * 0.12,
    height: SH(120),
    position: 'absolute',
    top: 30,
    backgroundColor: COLORS.white,
    zIndex: 99,
    borderRadius: 10,
    ...ShadowStyles.shadow,
  },
  userNotFound: {
    color: COLORS.primary,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(20),
    alignSelf: 'center',
  },
  tableBodyCon: {
    borderBottomWidth: 1,
    paddingHorizontal: moderateScale(10),
  },
  tableHeight: {
    height: windowHeight * 0.53,
  },

  //Date Picker style

  datePickerContainer: {
    height: SH(63),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  datepickerConatiner: {
    borderWidth: 1,
    height: SH(35),
    width: SW(45),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(7),
    justifyContent: 'center',
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  datePlaceholder: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(5),
  },
  txtInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: SF(11),
    top: 2,
    color: COLORS.solid_grey,
  },
  paymentMethodDownContainerStyle: {
    width: ms(80),
    left: ms(5),
    top: ms(25),
    zIndex: 999,
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
  },
  transTypeDownContainerStyle: {
    width: ms(90),
    left: ms(5),
    top: ms(25),
    zIndex: 999,
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
  },
  calendarModalView: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.6,
    height: windowHeight - SW(30),
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerView: {
    flexDirection: 'row',
    // padding: SW(2),
    height: SH(28),
    paddingHorizontal: ms(3),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SW(5),
    borderRadius: 3,
    borderColor: COLORS.gerySkies,
    borderWidth: 1,
  },
  dateText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
    marginLeft: ms(4),
  },
  dateText2: {
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
    fontSize: SF(12),
    marginLeft: ms(4),
  },
  invoiceContainer: {
    flex: 0.48,
    backgroundColor: COLORS.white,
    marginBottom: ms(10),
    right: SW(5),
    height: SH(700),
  },
});

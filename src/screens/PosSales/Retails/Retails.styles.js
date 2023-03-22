import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
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
  // hedaer  css start
  headerCon: {
    borderBottomColor: COLORS.solidGrey,
    height: SH(70),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: windowWidth * 0.94,
    paddingHorizontal: moderateScale(10),
  },
  menuStyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
    backgroundColor: COLORS.white,
    marginLeft: -20,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  searchInput: {
    borderRadius: 7,
    width: SW(170),
    fontFamily: Fonts.Italic,
  },
  searchInput2: {
    borderRadius: 7,
    width: SW(170),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(202),
    height: Platform.OS === 'android' ? SH(55) : SH(45),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
  },
  purchaseCon: {
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: Platform.OS === 'android' ? SH(55) : SH(45),
  },
  purcheseStyle: {
    width: SW(14),
    height: SW(15),
    resizeMode: 'contain',
  },
  arrowStyle: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
  },
  purchaseText: {
    fontSize: scale(6),
    paddingHorizontal: moderateScale(8),
    fontFamily: Fonts.Regular,
  },
  purchasecount: {
    fontSize: scale(6),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  categoryCon: {
    borderTopWidth: 1,
    borderBottomWidth: 0.8,
    borderColor: COLORS.solidGrey,
    height: SH(54),
    justifyContent: 'center',
  },
  categoryHeader: {
    fontSize: scale(7),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(8),
    width: SW(50),
  },
  catProcCon1: {
    borderRadius: 5,
    height: SH(40),
    width: SW(45),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    marginHorizontal: moderateScale(3),
    borderWidth: 2,
  },
  catProcCon2: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
    height: SH(50),
    width: SW(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    marginHorizontal: moderateScale(3),
  },
  productName1: {
    fontSize: SF(13),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(4),
  },
  productName2: {
    color: COLORS.gerySkies,
    fontSize: SF(15),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(7),
  },
  categoryProduct: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },

  // Productcontainer css start

  productContainer: {
    width: windowWidth * 0.295,
    height: SH(245),
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin: Platform.OS === 'ios' ? 4 : 11,
    padding: 15,
    elevation: 4,
    shadowColor: '#000000',
    shadowRadius: 4.84,
    shadowOpacity: 0.01,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  productbody: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: windowWidth * 0.94,
  },
  marboloStyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  proSubName: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  size: {
    fontSize: SF(13),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  cartonButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderRadius: 3,
  },
  singlePackBtn: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderRadius: 3,
    borderColor: COLORS.gerySkies,
    marginHorizontal: moderateScale(6),
  },
  previousRate: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    textDecorationLine: 'line-through',
  },
  currentRate: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(4),
  },
  hrLine: {
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
  },
  plusBtn: {
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
    color: COLORS.darkGray,
  },
  count: {
    fontSize: SF(18),
    color: COLORS.gerySkies,
    paddingHorizontal: moderateScale(10),
    marginBottom: 7,
  },

  // Productcontainer css end

  rightSideContainer: {
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
  doubleRightstyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  countCart: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(7),
    borderRadius: 7,
    fontFamily: Fonts.SemiBold,
  },
  clearCart: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(5),
    borderRadius: 7,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
    marginHorizontal: moderateScale(5),
  },
  actionButton: {
    borderWidth: 1,
    borderColor: COLORS.bluish_green,
    color: COLORS.bluish_green,
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(5),
    borderRadius: 7,
    fontSize: SF(13),
    fontFamily: Fonts.SemiBold,
  },
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jfrStyle: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius:50
  },
  jfrContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(10),
  },
  jfrContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bundleButton: {
    fontSize: SF(12),
    color: COLORS.white,
  },
  bundleButtonCon: {
    backgroundColor: COLORS.bluish_green,
    borderRadius: 3,
    width: SW(18),
    height: SH(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:12
  },
  updatePriceButton: {
    fontSize: SF(12),
    color: COLORS.white,
  },
  updatePriceButtonCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    width: SW(28),
    height: SH(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(8),
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: SW(30),
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
  jfrText: {
    fontSize: SF(14),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  boxText: {
    fontSize: SF(10),
    color: COLORS.darkGray,
    fontFamily: Fonts.Italic,
  },
  rate: {
    fontSize: SF(14),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
  },
  oneX: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
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
  smalldarkText2: {
    fontSize: SF(18),
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
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.27,
    height: windowHeight * 0.1,
    borderRadius: 10,
    alignSelf: 'center',
  },

  paymentDone: {
    backgroundColor: COLORS.blue_shade,
    height: SH(107),
    borderRadius: 5,
    justifyContent: 'center',
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
    alignSelf: 'center',
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
    paddingHorizontal: moderateScale(10),
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
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  walletIdcontent: {
    fontSize: SF(14),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },

  // amount popup css start

  bundleOfferText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
  },
  bundleOfferCon: {
    backgroundColor: COLORS.blue_shade,
    height: SH(42),
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
  },
  buypackText: {
    color: COLORS.primary,
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  bundleAddCon: {
    borderRadius: 3,
    width: SW(20),
    alignItems: 'center',
  },
  bundleAddText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingVertical: verticalScale(3),
  },
  amountPopupCon: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignSelf: 'center',
    position: 'absolute',
  },
  amountPopUPBody: {
    height: windowHeight * 0.68,
    paddingHorizontal: moderateScale(20),
  },
  primaryHeader: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
    backgroundColor: COLORS.primary,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: SF(18),
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
  },
  crossButton: {
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  crossButtonPosition: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  amountjfrContainer: {
    borderWidth: 2,
    borderColor: COLORS.textInputBackground,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
  },
  amountjfrStyle: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius:50,
    elevation: 10,
    marginVertical:verticalScale(4)
  },
  jfrmaduro: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
    width: SW(70),
  },
  dropDownIcon: {
    width: SW(3),
    height: SW(3),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  dropdown: {
    alignSelf: 'center',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  containerStyle: {
    width: SW(40),
    height: SH(35),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    right: 28,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    backgroundColor: COLORS.white,
    zIndex: 999,
    ...ShadowStyles.shadow,
    elevation: 2,
    top: 38,
    borderRadius: 7,
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    height: SH(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    zIndex: -99,
  },
  price: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },

  plusBtn2: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  removeButtonCon: {
    backgroundColor: COLORS.silver_solid,
    borderRadius: 5,
    width: SW(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    paddingVertical: verticalScale(9),
  },
  updateButtonCon: {
    backgroundColor: COLORS.bluish_green,
    marginLeft: 10,
  },
  updateButton: {
    color: COLORS.white,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(15),
    alignSelf: 'center',
  },
  // amount popup css end

  // numpad pop css start

  numpadContainer: {
    width: Platform.OS === 'android' ? windowWidth * 0.63 : windowWidth * 0.61,
    height: windowHeight,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: moderateScale(10),
  },
  // numpad pop css end

  // right side more action View  css start
  crossButtonStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  moreActText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
  discountCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textInputBackground,
  },
  addDiscountStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  addDiscountText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(2),
  },
  // right side more action View  css start
  // right side add discount View  css start
  adddiscountCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    paddingHorizontal: moderateScale(8),
  },
  discountHeader: {
    fontSize: SF(24),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  dicountInputWraper: {
    backgroundColor: COLORS.white,
    height: SH(52),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
  },
  dicountInputWraper2: {
    backgroundColor: COLORS.light_blue,
    height: SH(52),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
  },
  checkboxStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  amountLabel: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
    paddingHorizontal: moderateScale(5),
    width: SW(40),
  },
  amountLabel2: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    paddingHorizontal: moderateScale(5),
    width: SW(40),
  },
  discountTitle: {
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  discountTitleInput: {
    backgroundColor: COLORS.white,
    height: SH(52),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    fontFamily: Fonts.Italic,
    fontSize: SF(14),
  },
  amountDiscountInput: {
    borderWidth: 1,
    height: SH(38),
    width: SW(40),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    fontSize: SF(14),
    fontFamily: Fonts.Italic,
    paddingHorizontal: moderateScale(5),
  },
  amountDiscountInput2: {
    backgroundColor: COLORS.white,
    height: SH(38),
    width: SW(40),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    color: COLORS.primary,
    justifyContent: 'center',
    fontSize: SF(14),
    fontFamily: Fonts.Italic,
    paddingHorizontal: moderateScale(5),
  },

  // right side add discount View  css end

  // right side add notes View  css start
  addNoteInput: {
    height: SH(93),
    // width:SW(40),
    borderRadius: 7,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    fontSize: SF(14),
    fontFamily: Fonts.Italic,
    paddingHorizontal: moderateScale(15),
  },
  saveNotesButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    width: SW(40),
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveNotesText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  saveButtonCon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: moderateScale(3),
  },

  // right side add notes View  css end

  //  modal update price  css start
  updateAmount: {
    backgroundColor: COLORS.white,
    height: SH(44),
    width: SW(65),
    borderBottomRightRadius: 5,
    borderTopEndRadius: 5,
    borderLeftWidth: 1,
    borderColor: COLORS.solidGrey,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  updateprice: {
    paddingHorizontal: moderateScale(8),
    color: COLORS.Regular,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  trackLabel: {
    color: COLORS.Regular,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },
  invetryCon: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  invertyInput: {
    borderRadius: 7,
    width: SW(60),
    height: SH(50),
    fontSize: SF(12),
    color: COLORS.gerySkies,
    fontFamily: Fonts.Italic,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
  },
  invertyLabel: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  marboloPlusStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  //  modal update price  css end

  //  modal add new product   css start
  addNewProdouctCon: {
    height: windowHeight * 0.8,
  },
  scanerStyle: {
    resizeMode: 'contain',
    width: SW(219),
    height: SH(59),
    alignSelf: 'center',
  },
  barCodeText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    paddingTop: verticalScale(10),
  },
  scannedbarCodeCon: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.solidGrey,
    height: SH(54),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
  },
  barCodeNumText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  newProductLabel: {
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  productInput: {
    borderRadius: 5,
    height: SH(54),
    fontSize: SF(12),
    color: COLORS.gerySkies,
    fontFamily: Fonts.Italic,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
  },
  newProductdropdown: {
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    borderColor: 'transparent',
    marginVertical: verticalScale(2),
    zIndex: Platform.OS === 'ios' ? 100 : 0,
    fontStyle: 'italic',
    fontSize: SF(14),
  },
  newProductdropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: 30,
  },
  newProductcontainerStyle: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },

  //  modal add new product  css end
  iconInLine: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: SW(40),
  },

  paymentOptionCon: {
    borderWidth: 1,
    height: SH(60),
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paymentOptionCon2: {
    borderColor: COLORS.primary,
  },
  jbrIcon: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  jbrIconColored: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  jbrcoinText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    paddingHorizontal: moderateScale(5),
  },
  jbrCoinTextColored: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    paddingHorizontal: moderateScale(5),
  },

  //  customer and payment css start
  custPaymentBodyCon: {
    width: windowWidth * 0.25,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },
  walletIdText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(24),
  },
  walletIdInput: {
    borderRadius: 7,
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    fontSize: SF(16),
    height: SH(50),
    width: SW(70), 
    color:COLORS.dark_grey,
    paddingHorizontal:moderateScale(10),
  },

  walletAddresStyle:{
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(16),
  },
  scanerCon: {
    backgroundColor: COLORS.textInputBackground,
    width: windowWidth * 0.25,
    height: windowHeight * 0.22,
    borderRadius: 7,
  },
  customerPhoneCon: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  redrectingText: {
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    alignSelf: 'center',
    paddingVertical: verticalScale(10),
  },
  loaderPic: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
  },
  //  customer and payment css end

  // payment with jbr wallet css start
  listOfItems: {
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
  rewardPointStyle: {
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
  },
  jbrListCon: {
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  ashtonStyle: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
  },
  onexstyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(18),
  },
  onlyxstyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  itmybdaystyle: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingHorizontal: moderateScale(5),
  },
  orderSideCon: {
    height: windowHeight,
    width: windowWidth * 0.31,
    paddingHorizontal: moderateScale(10),
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderBottomEndRadius: 15,
    ...ShadowStyles.shadow,
  },
  crossButtonStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  paymenttdone: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    alignSelf: 'center',
  },
  paymentTipsCon: {
    borderRadius: 5,
    backgroundColor: COLORS.orderStatusBackground,
    height: SH(80),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10)
  },
  paymentTipsText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  paymentPay: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(26),
  },
  via: {
    color: COLORS.black,
    fontFamily: Fonts.Italic,
    fontSize: SF(14),
    alignSelf: 'center',
  },
  viaText: {
    color: COLORS.primary,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
  },
  customerImage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10),
  },
  customerAddreCons: {
    borderWidth: 1,
    height: SH(260),
    borderRadius: 5,
    borderColor: COLORS.washGrey,
  },
  customer: {
    fontSize: SF(16),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    paddingHorizontal: moderateScale(10),
  },
  jbrCustomer: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius:100
    
  },

  walletIdCon: {
    height: SH(55),
    borderTopWidth: 1,
    borderTopColor: COLORS.washGrey,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.solidGrey,
  },
  walletIdLabel: {
    fontSize: SF(13),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
  },
  walletId: {
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
  },
  bottomSubCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  smallLightText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
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

  // payment with jbr wallet css end
  // customer cash  modal css start
  customerNOStyle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(20),
  },
  customerInputWraper: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    height: SH(60),
    width: windowWidth * 0.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerNameInput: {
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    height: SH(50),
    fontSize: SF(13),
    width: windowWidth * 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    fontFamily: Fonts.Italic,
  },
  firstNameAdd: {
    color: COLORS.dark_grey,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
  },
  CusNotInSystem: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  customerPhoneInput: {
    color: COLORS.black,
    fontSize: SF(20),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
    width: SW(70),
  },
  customerAddreCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(221),
    width: SW(94),
    borderRadius: 7,
    paddingHorizontal: moderateScale(10),
    marginVertical:moderateScale(5)
  },
  // customer cash  modal css end

  //  customer cash total amount start

  custTotalAmountBodyCon: {
    width: windowWidth * 0.36,
    alignSelf: 'center',
    flex: 1,
  },
  tipChildCon: {
    height: SH(60),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.11,
  },
  tipChildConChecked: {
    borderColor: COLORS.primary,
  },
  tipChildText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
  },
  noTipsTextStyle: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  noTipsButtonCon: {
    height: SH(60),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherAmountInput: {
    height: SH(60),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    alignItems: 'center',
    fontFamily: Fonts.Italic,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(15),
  },
  //  customer cash total amount end

  changeDueText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(30),
    alignSelf: 'center',
  },
  //  pos search css start
  searchproductCon2: {
    height: windowHeight * 0.8,
  },
  searchproductCon1: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    position: 'absolute',
    paddingHorizontal: moderateScale(12),
    marginLeft: moderateScale(10),
  },
  searchInputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    height: SH(55),
    justifyContent: 'space-between',
  },
  backArrow2Style: {
    width: SW(15),
    height: SW(10),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  searchCrossButton: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(8),
  },
  marboloRedPackStyle: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
    borderRadius:50,
    marginVertical:verticalScale(4)
  },
  marbolorRedStyle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
  },
  viewDetailCon: {
    zIndex: 99,
    height: 35,
  },
  stockStyle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  padding: {
    paddingRight: moderateScale(15),
  },
  locStock: {
    paddingHorizontal: moderateScale(10),
  },
  searchItalicText: {
    color: COLORS.darkGray,
    fontFamily: Fonts.Italic,
    fontSize: SF(14),
  },
  hr: {
    borderWidth: 1,
    borderColor: COLORS.row_grey,
    marginVertical: verticalScale(5),
  },
  flatlistHeight: {
    height: windowHeight * 0.8,
  },
  productDetailCon: {
    width: windowWidth * 0.4,
    alignSelf: 'center',
  },
  availablestockHeading: {
    color: COLORS.bluish_green,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    alignSelf: 'center',
  },
  addcartButtonStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    width: windowWidth * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addToCartText: {
    color: COLORS.white,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    paddingVertical: verticalScale(7),
  },
  searchDetailsCon2: {
    height: windowHeight * 0.7,
    width: windowWidth * 0.7,
    position: 'absolute',
    top: 30,
    left: 100,
    ...ShadowStyles.shadow2,
  },
  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.07,
    alignItems: 'center',
    flexDirection: 'row',
  },
  backTextStyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingVertical: verticalScale(5),
  },
  backButtonArrow: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  productDetailHeader: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(32),
  },
  detailImageCon: {
    width: windowWidth * 0.25,
  },
  detailPriceCon: {
    width: windowWidth * 0.4,
  },
  marboloPackStyle: {
    width: SW(92),
    height: SW(60),
    resizeMode: 'contain',
  },
  productDescrptionCon: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5),
  },
  productDes: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(13),
  },
  detailHeader: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
  },
  detailHeader2: { color: COLORS.dark_grey, fontFamily: Fonts.MaisonRegular },
  descriptionAddCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desAddCartText: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingVertical: verticalScale(6),
  },
  unitTypeCon: {
    width: windowWidth * 0.12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5),
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(2),
  },
  unitFlatlist: {
    justifyContent: 'space-between',
  },
  categoryImagecCon: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: COLORS.white,
    overflow: 'hidden',
  },
  emptyListText: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  noCart: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
    alignSelf: 'center',
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  list: {
    backgroundColor: COLORS.white,
  },
  noProductText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(50),
  },

  //  pos search css end

  productModCon:{
    backgroundColor:COLORS.white,
    width:windowWidth * 0.48,
    height:windowHeight * 0.85,
    borderRadius:15,
  },
  productModCon2:{
    backgroundColor:COLORS.white,
    width:windowWidth * 0.70,
    height:windowHeight * 0.70,
    borderRadius:15,
    paddingHorizontal:moderateScale(15),
    paddingVertical:verticalScale(8)
  },
  productModConBody:{
    width:windowWidth * 0.35,
    height:windowHeight * 0.72,
    alignSelf:'center'
  },
  backView: {
    width: SW(28),
    height: SW(11),
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10)
  },
  truckStyle: {
    width: SH(32),
    height: SH(32),
    resizeMode: 'contain',
  },
  backText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
  },
  cameraContainer:{
    height:windowHeight * 0.95,
    paddingBottom:20
  },
  crossButtonRed:{
    width:SW(30),
    height:SH(50),
    resizeMode:'contain',
    backgroundColor:'#000',
    alignSelf:"center"
  },
  qrcodeImage:{
    width:SW(300),
    height:SH(300),
    resizeMode:'contain'
  },
  submitButtons: {
    backgroundColor: COLORS.primary,
    width: SW(93),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  selectedText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SF(16),
  },

});

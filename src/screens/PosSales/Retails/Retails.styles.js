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
    backgroundColor: COLORS.textInputBackground,
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // hedaer  css start
  headerCon: {
    // borderBottomWidth: 1,
    borderBottomColor: COLORS.solidGrey,
    height: SH(88),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  menuStyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
    backgroundColor: COLORS.white,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  scnStyle: {
    width: SW(16),
    height: SW(16),
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
    width: 200,
    fontFamily: Fonts.Italic,
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(208),
    height: SH(55),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
  },
  purchaseCon: {
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: SH(55),
  },
  purcheseStyle: {
    width: SW(13),
    height: SW(13),
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
    height: SH(64),
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
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    height: SH(50),
    width: SW(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    marginHorizontal: moderateScale(3),
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
    color: COLORS.white,
    fontSize: SF(15),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(7),
  },
  productName2: {
    color: COLORS.gerySkies,
    fontSize: SF(15),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(7),
  },
  categoryProduct: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },

  // Productcontainer css start

  productContainer: {
    width: SW(112),
    height: SH(300),
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    // ...ShadowStyles.shadow2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin: 11,
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
  },
  marboloStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: SF(24),
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
  },

  // Productcontainer css end

  rightSideContainer: {
    backgroundColor: COLORS.white,
    height: windowHeight,
    width: SW(116),
    position: 'absolute',
    right: 0,
    top: 0,
    //  borderWidth:1,
    borderColor: COLORS.black,
    //  ...ShadowStyles.shadow2
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
    width: SW(28),
    height: SW(28),
    resizeMode: 'contain',
  },
  jfrContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jfrContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical:verticalScale(20)
    // alignItems:'center'
  },
  bundleButton: {
    backgroundColor: COLORS.bluish_green,
    borderRadius: 3,
    width: SW(18),
    justifyContent: 'center',
    paddingLeft: moderateScale(8),
    paddingVertical: verticalScale(2),
    fontSize: SF(12),
    color: COLORS.white,
  },
  updatePriceButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    width: SW(28),
    justifyContent: 'center',
    paddingLeft: moderateScale(8),
    paddingVertical: verticalScale(2),
    fontSize: SF(12),
    color: COLORS.white,
    marginHorizontal: moderateScale(11),
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
  bottomContainer: {
    borderTopWidth: 1,
    height: SH(330),
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
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.27,
    height: windowHeight * 0.1,
    borderRadius: 10,
    alignSelf: 'center',
  },

  // amount popup css start
  amountPopupCon: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignSelf: 'center',
    position: 'absolute',
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
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountjfrStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
    elevation:10
  },
  jfrmaduro: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  dropDownIcon: {
    width: SW(3),
    height: SW(3),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
    // paddingRight: 30,
  },
  dropdown: {
    // width: SW(40),
    // height:SH(55),
    // alignSelf: 'center',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // marginVertical: verticalScale(1),
    zIndex: Platform.OS === 'ios' ? 100 : 4,
    // zIndex: 1,
    // fontStyle: 'italic',
  },
  containerStyle: {
    width: SW(40),
    borderWidth: 1,
    // height:SH(10),
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    // alignSelf: 'center',
    // marginHorizontal: moderateScale(7),
    // marginVertical: verticalScale(7),
    // zIndex: Platform.OS === 'ios' ? 100 : 4,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    zIndex: Platform.ios === 'ios' ? 100 : 1,
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
  removeButton: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    backgroundColor: COLORS.silver_solid,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(7),
    borderRadius: 5,
    marginHorizontal: moderateScale(10),
  },
  updateButton: {
    color: COLORS.white,
    color: COLORS.white,
    backgroundColor: COLORS.bluish_green,
    paddingHorizontal: moderateScale(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: verticalScale(10),
    // position: 'absolute',
    // bottom: 20,
    // left: 22,
  },
  // amount popup css end

  // numpad pop css start

  numpadContainer: {
    width: SW(235),
    height: windowHeight,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: moderateScale(15),
  },
  amountInput: {
    borderRadius: 7,
    width: 200,
    fontSize: SF(20),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  titleInput: {
    borderWidth: 1,
    height: SH(65),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    justifyContent: 'center',
  },
  addButtonCon: {
    borderWidth: 1,
    height: SH(55),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  directionInRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCartButton: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: SW(114),
    height: SH(55),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartButtonFill: {
    // borderWidth:1,
    // borderColor:COLORS.solidGrey,
    backgroundColor: COLORS.black,
    width: SW(114),
    height: SH(55),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addcountButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.textInputBackground,
    borderColor: 'transparent',
  },
  inputWraper2: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    // width: SW(208),
    height: SH(65),
    justifyContent: 'space-between',
  },
  minusBtn2: {
    tintColor: COLORS.mid_grey,
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  plusCartBtn: {
    tintColor: COLORS.darkGray,
  },
  addCartText: {
    fontSize: SF(20),
    color: COLORS.mid_grey,
  },
  addCartBtnTextsubmit: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
  },
  addCartBtnText: {
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
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
  },
  amountLabel2: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    paddingHorizontal: moderateScale(5),
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
    fontFamily: Fonts.Regular,
  },
  saveButtonCon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: moderateScale(3),
  },

  // right side add notes View  css end

  //  modal update price  css start
  updateAmount: {
    // borderWidth:1,
    backgroundColor: COLORS.white,
    // borderRadius: 5,
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
    // borderWidth:1
  },
  invertyInput: {
    borderRadius: 7,
    width: 220,
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
  marboloPlusStyle:{
    width:SW(20),
    height:SW(20),
     resizeMode:'contain'
  },
  //  modal update price  css end

  //  modal add new product   css start
   addNewProdouctCon: {
    height: windowHeight * 0.9,
  },
  scanerStyle:{
    resizeMode:'contain',
    width:SW(219),
    height:SH(59),
    alignSelf:'center'
  },
  barCodeText:{
     fontSize:SF(18),
     fontFamily:Fonts.MaisonBold,
     color:COLORS.solid_grey,
     paddingTop:verticalScale(10)
  },
  scannedbarCodeCon:{
    borderWidth:1,
    borderRadius:15,
    borderColor:COLORS.solidGrey,
    height:SH(54),
    justifyContent:'center',
    paddingHorizontal:moderateScale(12)
  },
  barCodeNumText:{
    fontSize:SF(16),
    fontFamily:Fonts.SemiBold,
    color:COLORS.solid_grey
  },
  newProductLabel:{
    fontSize:SF(16),
    fontFamily:Fonts.Regular,
    color:COLORS.dark_grey
  },
  productInput: {
    borderRadius: 5,
    // width: 220,
    fontSize: SF(12),
    color: COLORS.gerySkies,
    fontFamily: Fonts.Italic,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
  },
  newProductdropdown: {
    // width: SW(330),
    height:SH(60),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    borderColor:'transparent',
    marginVertical: verticalScale(2),
    zIndex: Platform.OS === 'ios' ? 100 : 0,
    fontStyle: 'italic',
    fontSize:SF(14)
  },
  newProductdropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: 30
  },
  newProductcontainerStyle: {
    // width: SW(330),
    // height:SH(100),
    alignSelf: 'center',
    // marginVertical: verticalScale(7),
  },

  //  modal add new product  css end

  paymentOptionCon:{
    borderWidth:1,
    height:SH(60),
    borderColor:COLORS.solidGrey,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  jbrIcon:{
    width:SW(7),
    height:SW(7),
    resizeMode:'contain'
  },
  jbrcoinText:{
    fontSize:SF(16),
    fontFamily:Fonts.SemiBold,
    color:COLORS.solid_grey,
    paddingHorizontal:moderateScale(5)
  }
});

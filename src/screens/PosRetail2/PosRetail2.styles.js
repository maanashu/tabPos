import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import { height, width } from '@/theme/ScalerDimensions';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import {
  moderateScale,
  verticalScale,
  ms,
  moderateVerticalScale,
} from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },

  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // main screen css start
  homeScreenCon: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal:
      Platform.OS === 'android' ? moderateScale(12) : moderateScale(12),
  },
  searchScreenHeader: {
    height: SH(60),
    justifyContent: 'center',
  },
  cashLabelBold: {
    color: COLORS.solid_grey,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  crossBg: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
  },
  _centerContainer: {
    backgroundColor: COLORS.white,
    // marginTop: ms(20),
    // marginHorizontal: ms(26),
    marginBottom: ms(10),
    borderRadius: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  _totalAmountTitle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(20),
  },
  _dollarSymbol: {
    fontSize: ms(20),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    marginTop: ms(2),
  },
  _dollarInput: {
    fontSize: ms(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(1),
  },
  _amount: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(30),
  },
  _bottomContainer: {
    marginTop: ms(10),
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    borderRadius: ms(8),
  },
  _selectTips: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.solid_grey,
  },
  _boxView: {
    height: ms(110),
    width: ms(118),
    backgroundColor: COLORS.transparentBlue,
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    margin: ms(5),
    borderWidth: 1,
  },
  _usdText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
  },
  _tipsPercent: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginTop: ms(2),
  },
  _innerContainer: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    paddingHorizontal: moderateScale(12),
  },
  _inputMain: {
    marginTop: ms(15),
    width: '98%',
  },
  _inputSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  _inputContainer: {
    height: ms(40),
    borderRadius: ms(3),
    flex: 1,
  },
  dollarInputCon: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(40),
    borderRadius: ms(3),
    paddingHorizontal: ms(10),
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  _inputCashContainer: {
    height: ms(40),
    borderRadius: ms(3),
    borderWidth: 1,
    paddingHorizontal: ms(10),
    borderColor: COLORS.solidGrey,
    flex: 1,
  },
  _tipsButton: {
    height: ms(40),
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.silver_solid,
    borderRadius: ms(3),
    justifyContent: 'center',
    alignContent: 'center',
    flex: 0.4,
    marginLeft: ms(10),
  },
  _tipText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    alignSelf: 'center',
  },
  _border: {
    height: ms(10),
    backgroundColor: COLORS.solidGrey,
    width: ms(1),
    marginHorizontal: ms(10),
  },
  _date: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
  },
  _topContainer: {
    position: 'absolute',
    marginLeft: ms(25),
    width: '98%',
    alignItems: 'center',
    height: ms(30),
    flexDirection: 'row',
  },
  _cross: {
    height: ms(15),
    width: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: ms(20),
  },
  _payBYBoxContainer: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(125),
    width: ms(170),
    margin: ms(3),
    borderRadius: ms(6),
    // justifyContent: 'center',
    alignItems: 'center',
    padding:ms(10)
  },
  _payBYBoxContainerEmpty: {
   
    height: ms(125),
    width: ms(170),
    margin: ms(3),
    alignItems: 'center',
    padding:ms(10)
  },
  _payByTitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(9),
    marginBottom: ms(5),
  },
  _payByMethod: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
    marginTop: ms(4),
  },
  _payByAmount: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(10),
    marginTop: ms(4),
  },
  _payByIcon: {
    height: ms(22),
    width: ms(22),
    resizeMode: 'contain',
    marginTop: ms(8),
  },
  _bottomCardView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    height: ms(110),
    width: ms(160),
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  _cardIconView: {
    height: ms(47),
    width: ms(47),
    tintColor: COLORS.solid_green,
  },
  _cardSubtitle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    color: COLORS.white,
    marginTop: ms(12),
  },
  _sendRequest: {
    height: ms(40),
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.dark_grey,
    borderRadius: ms(3),
    justifyContent: 'center',
    alignContent: 'center',
    flex: 0.4,
    marginLeft: ms(10),
  },
  _orContainer: {
    flexDirection: 'row',
    marginVertical: ms(5),
    alignItems: 'center',
  },
  _borderView: {
    backgroundColor: COLORS.solidGrey,
    height: 1,
    flex: 1,
  },
  _orText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
    marginHorizontal: ms(7),
  },
  _sendPaymentText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    color: COLORS.solid_grey,
    marginBottom: ms(10),
    marginTop: ms(20),
  },
  itemLIistCon: {
    width: windowWidth * 0.67,
    height: windowHeight * 0.88,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: moderateScale(8),
    paddingTop: verticalScale(8),
  },
  rightSideCon: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.87,
    // paddingHorizontal: moderateScale(8),
    paddingBottom: verticalScale(4),
    // borderWidth: 1,
  },
  chooseCategoryCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    width: windowWidth * 0.2,
    height: SH(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
  },
  categoryMenu: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  chooseCat: {
    color: COLORS.black,
    fontSize: SF(13),
    fontFamily: Fonts.Medium,
    width: windowWidth * 0.16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SW(2),
  },
  barcodeInputWraper: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    width: windowWidth * 0.41,
    height: SH(45),
    marginRight: 8,
    justifyContent: 'center',
  },
  allProduct: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.Medium,
  },
  allProductCount: {
    color: COLORS.darkGray,
    fontSize: SF(13),
    fontFamily: Fonts.Italic,
  },
  productBodyCon: {
    backgroundColor: COLORS.textInputBackground,
    // flex: 1,
    borderRadius: 10,
    // paddingTop: verticalScale(5),
    paddingHorizontal: moderateScale(4),
  },
  productCon: {
    width: Platform.OS === 'ios' ? windowWidth * 0.115 : windowWidth * 0.117,
    height: Platform.OS === 'ios' ? windowHeight * 0.22 : windowHeight * 0.25,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: moderateScale(3),
    paddingBottom: verticalScale(5),
    marginTop: verticalScale(5),
    marginLeft: 6,
  },
  categoryshoes: {
    width: windowWidth * 0.117,
    height: windowHeight * 0.11,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productDes: {
    color: COLORS.black,
    fontSize: SF(11),
    fontFamily: Fonts.Medium,
  },
  productSubHead: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Italic,
  },
  productPrice: {
    color: COLORS.black,
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
  },

  // sideBar css start
  keyboard: {
    width: SW(12),
    height: Platform.OS === 'android' ? SH(38) : SH(45),
    resizeMode: 'contain',
  },
  holdCartCon: {
    width: windowWidth * 0.09,
    height: SH(38),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  holdCartPad: {
    width: windowWidth * 0.03,
    height: SH(38),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pause: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  keyboardIcon: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  holdCart: {
    color: COLORS.dark_grey,
    fontSize: SF(12),
    fontFamily: Fonts.Bold,
    paddingHorizontal: moderateScale(3),
  },

  dark_greyBg: {
    backgroundColor: COLORS.dark_grey,
  },
  addNotesBtn: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  nameAddCon: {
    height:
      Platform.OS === 'android' ? windowHeight * 0.38 : windowHeight * 0.37,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  avaliableOfferCon: {
    height: windowHeight * 0.05,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: COLORS.dark_grey,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(5),
  },

  addDiscountCon: {
    backgroundColor: COLORS.blue_shade,
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    width: windowWidth * 0.1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(3),
  },
  addDiscountText: {
    color: COLORS.dark_grey,
    fontSize: SF(12),
    fontFamily: Fonts.MaisonRegular,
  },
  addDiscountPic: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(7),
  },
  totalItemCon: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingVertical: verticalScale(3),
  },
  totalItem: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.MaisonBold,
    paddingVertical: verticalScale(4),
  },
  paddVertical: {
    paddingVertical: verticalScale(3),
  },
  subTotal: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
  },
  subTotalDollar: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  itemValue: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  itemValueBold: {
    fontFamily: Fonts.SemiBold,
  },
  checkoutButtonSideBar: {
    width: windowWidth * 0.22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(5),
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

  // sideBar css end

  // categoryModal css Start
  categoryModalCon: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.55,
    height: windowHeight * 0.75,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10),
  },
  crossButton: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  categories: {
    color: COLORS.dark_grey,
    fontSize: SF(17),
    fontFamily: Fonts.SemiBold,
  },
  categoryInputWraper: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    height: Platform.OS === 'android' ? SH(48) : SH(45),
    justifyContent: 'center',
  },
  catProArrayCon: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.123,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: verticalScale(5),
    marginRight: moderateScale(7),
    paddingVertical: SH(5),
  },
  cloth: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  categories: {
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.MaisonBold,
  },
  listed: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  categoryflatlistHeight: {
    flex: 1,
  },

  // categoryModal css end

  // addto cart modal css start
  addCartCon: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: windowWidth * 0.5,
    height: windowHeight * 0.9,
    position: 'absolute',
    alignSelf: 'center',
  },

  addCartConHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SH(70),
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  backTocartCon: {
    backgroundColor: '#F5F6F7',
    width: SH(130),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  backTocartText: {
    color: COLORS.black,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },
  continueBtnCon: {
    width: SH(120),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginLeft: SH(10),
    borderRadius: 3,
  },
  addToCartCon: {
    backgroundColor: COLORS.primary,
    width: SH(120),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SH(10),
    borderRadius: 3,
  },
  addTocartText: {
    color: COLORS.white,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },
  colimbiaText: {
    color: COLORS.black,
    fontSize: SH(20),
    fontFamily: Fonts.Bold,
  },
  detailLeftDetail: {
    width: windowWidth * 0.35,
  },
  sizeAndColor: {
    color: COLORS.dark_grey,
    fontSize: SH(16),
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: SH(20),
  },
  minusBtnCon: {
    borderColor: '#D8D8D8',
    borderWidth: 1,
    width: windowWidth * 0.14,
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: SH(28),
    fontFamily: Fonts.Bold,
    color: COLORS.black,
  },
  colorText: {
    marginHorizontal: SH(10),
    fontSize: SH(18),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  colorRow: {
    height: SH(2),
    // width: SH(235),
    width: windowWidth * 0.17,
    backgroundColor: '#D8D8D8',
  },
  selectColorItem: {
    width: SH(142),
    height: SH(60),
    borderRadius: 5,
    borderColor: '#E1E3E4',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: moderateScale(3),
  },
  colorSelectText: {
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  detailBtnCon: {
    color: COLORS.primary,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },

  // addto cart modal css end

  // addto cart detail modal css start
  addCartDetailConHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SH(70),
  },
  addCartDetailConHeader2: {
    height: SH(55),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  addCartDetailCon: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: windowWidth * 0.6,
    height: windowHeight * 0.92,
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(13),
  },
  jacketName: {
    color: COLORS.solid_grey,
    fontSize: SH(18),
    fontFamily: Fonts.SemiBold,
  },
  addCartDetailBody: {
    height: windowHeight * 0.82,
  },
  clothProfileCon: {
    height: windowHeight * 0.08,
    flexDirection: 'row',
  },
  clothProfileDes: {
    color: COLORS.darkGray,
    fontSize: SH(11),
    fontFamily: Fonts.Regular,
  },
  clothProfileSubHead: {
    color: COLORS.darkGray,
    fontSize: SH(11),
    fontFamily: Fonts.Italic,
  },
  profileCloth: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  profileClothDes: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  priceCon: {
    height: windowHeight * 0.07,
    backgroundColor: COLORS.washGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  skuCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    paddingHorizontal: moderateScale(7),
  },
  skuConBody: {
    height: windowHeight * 0.06,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.solidGrey,
  },
  reOrderBody: {
    height: windowHeight * 0.05,
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  sku: {
    color: COLORS.solid_grey,
    fontSize: SH(14),
    fontFamily: Fonts.Regular,
  },
  inStoreBody: {
    height: windowHeight * 0.06,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(15),
  },
  inStoreText: {
    color: COLORS.solid_grey,
    fontSize: SH(14),
    fontFamily: Fonts.MaisonBold,
  },
  toggleSecBlue: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  ScrollableMainCon: {
    width: windowWidth * 0.48,
    alignSelf: 'center',
    // borderWidth: 1,

    // height: windowHeight * 0.5,
  },
  selectColorCon: {
    flexDirection: 'row',
  },
  colorArea: {
    width: SW(6),
    height: SW(6),
    backgroundColor: COLORS.bluish_green,
    borderRadius: 5,
    marginRight: 3,
  },
  scrollableBodyCon: {
    width: windowWidth * 0.48,
    alignSelf: 'center',
    // height: windowHeight * 0.45,
    flexDirection: 'row',
  },
  colorSelectArea: {
    // height: windowHeight * 0.45,
    width: windowWidth * 0.09,
    alignItems: 'center',
    borderEndWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  quantitySelectArea: {
    // height: windowHeight * 0.45,
    width: windowWidth * 0.25,
    paddingHorizontal: moderateScale(10),
  },
  RemindSelectArea: {
    // height: windowHeight * 0.45,
    width: windowWidth * 0.14,
  },
  imageView: {
    borderWidth: 2,
    borderRadius: 5,
    width: SW(25),
    height: SW(25),
    marginVertical: verticalScale(3),
  },
  scrollImage: {
    width: SW(23),
    height: SW(23),
    resizeMode: 'contain',
  },
  sizeSelectItemCon: {
    height: SW(11),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),

    marginTop: 7,
  },
  adminItemCon: {
    height: SW(11),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),

    marginTop: 7,
  },
  bell: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
  },
  sizeSelectItemCona: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(10),
  },

  // addto cart detail modal css start

  blueListHeader: {
    backgroundColor: COLORS.primary,
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    // alignContent: 'center',
  },

  listLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cashLabelWhite: {
    color: COLORS.white,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  cashLabelWhiteHash: {
    paddingHorizontal: moderateScale(15),
  },
  tableListSide: {
    width: windowWidth * 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tableListSide2: {
    width: windowWidth * 0.29,
    paddingRight: 20,
    alignItems: 'center',
  },
  blueListData: {
    borderWidth: 1,
    height: SH(48),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
    // alignContent: 'center',
  },
  blueListDataText: {
    color: COLORS.solid_grey,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
  },
  columbiaMen: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
  },
  minus: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  sukNumber: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  listCountCon: {
    borderWidth: 1,
    width: SW(30),
    height: SH(30),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    // paddingVertical: verticalScale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
  },
  borderCross: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(5),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(7),
  },
  _horizontalLine: {
    height: ms(1),
    width: '90%',
    marginTop: ms(4),
    backgroundColor: COLORS.textInputBackground,
  },

  _paymentTitleContainer: {
    marginTop: ms(10),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(15),
    marginTop: ms(3),
    fontSize: ms(7),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _upperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  _kUpperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  _kContainer: {
    height: ms(200),
    width: ms(300),
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5),
  },
  _kCenterContainer: {
    height: '100%',
    alignSelf: 'flex-end',
    flex: 0.6,
    borderLeftWidth: 1,
    borderColor: COLORS.textInputBackground,
    alignItems: 'center',
  },
  _kSubCenterContainer: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginTop: ms(5),
  },
  _kAddress: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    marginTop: ms(5),
  },
  _kNumber: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    marginTop: ms(3),
  },
  _flatListContainer: { height: ms(100), width: '100%', marginTop: ms(5) },
  _barCode: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
    color: COLORS.dark_grey,
  },
  _barCodeImage: { height: ms(25), width: '70%', marginTop: ms(5) },
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(10),
  },
  _cashRemainView: {
    marginTop: ms(15),
    height: 1,
    width: '50%',
    backgroundColor: COLORS.silver_solid,
  },
  _cashRemainText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(15),
    color: COLORS.solid_grey,
    marginTop: ms(10),
  },
  _printButton: {
    width: '30%',
    height: ms(26),
    backgroundColor: 'transparent',
    borderColor: COLORS.lineGrey,
    borderWidth: 0.2,
    borderRadius: ms(1),
    marginHorizontal: moderateScale(5),
  },
  _printBtnText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    color: COLORS.darkGray,
    fontWeight: 'normal',
  },
  noProductText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(50),
  },
  emptyListText: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  productListHeight: {
    height: windowHeight * 0.7,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  addNotesCon: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: windowWidth * 0.35,
    height: windowHeight * 0.45,
    // position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(13),
  },
  addNotesCon2: {
    paddingHorizontal: moderateScale(8),
  },
  addDiscountConPop: {
    height: windowHeight * 0.55,
  },
  addNotesInput: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    height: windowHeight * 0.27,
    textAlignVertical: 'top',
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
  },
  addNotes: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Medium,
  },
  backProScreen: {
    backgroundColor: COLORS.washGrey,
    width: SW(65),
    borderRadius: 5,
    height: SH(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.solid_grey,
    transform: [{ rotate: '180deg' }],
  },
  iconStyle: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: ms(3),
  },
  _blueButton: {
    backgroundColor: COLORS.primary,
    height: ms(40),
    width: '98%',
    marginTop: ms(10),
    color: COLORS.white,
  },

  cancelCatCon: {
    width: SW(30),
    height: SW(10),
    backgroundColor: COLORS.red,
    borderRadius: 8,
    marginHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  catCancelText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
  },
  categoryEmptyList: {
    fontSize: SF(22),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
    alignSelf: 'center',
  },

  // ******new desgin css  start******

  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },

  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  homeScreenCon: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal:
      Platform.OS === 'android' ? moderateScale(12) : moderateScale(12),
  },
  productView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: Platform.OS === 'android' ? windowWidth * 0.84 : windowWidth * 0.83,
    height: windowHeight * 0.87,
    paddingTop: verticalScale(6),
    paddingHorizontal: moderateScale(10),
  },
  rightSideView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: windowWidth * 0.06,
    height: windowHeight * 0.86,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
  },
  sideBarImage: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  bucketBackgorund: {
    width: SW(17),
    height: SW(17),
    borderRadius: 5,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseCategoryCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    width: windowWidth * 0.15,
    height: SH(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    marginHorizontal: moderateVerticalScale(8),
  },
  chooseCat: {
    color: COLORS.black,
    fontSize: SF(13),
    fontFamily: Fonts.Medium,
    // width: windowWidth * 0.16,
  },
  categoryMenu: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  barcodeInputWraper: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    width: Platform.OS === 'android' ? windowWidth * 0.21 : windowWidth * 0.2,
    height: SH(45),
    justifyContent: 'center',
  },
  sideSearchStyle: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    marginLeft: moderateScale(5),
    marginRight: moderateScale(5),
    tintColor: COLORS.gerySkies,
  },
  sideBarsearchInput: {
    borderRadius: 7,
    width: windowWidth * 0.24,
    fontFamily: Fonts.Italic,
    fontSize: SF(11),
    color: COLORS.solid_grey,
    height: SH(40),
  },
  allProduct: {
    color: COLORS.solid_grey,
    fontSize: SF(18),
    fontFamily: Fonts.SemiBold,
  },
  productCount: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.Italic,
  },
  hr: {
    borderWidth: 0.4,
    borderColor: COLORS.solidGrey,
  },
  productCon: {
    width: Platform.OS === 'ios' ? windowWidth * 0.108 : windowWidth * 0.11,
    height: Platform.OS === 'ios' ? windowHeight * 0.23 : windowHeight * 0.26,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: moderateScale(3),
    paddingBottom: verticalScale(5),
    marginTop: verticalScale(5),
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  categoryshoes: {
    width: windowWidth * 0.117,
    height: windowHeight * 0.11,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productDes: {
    color: COLORS.black,
    fontSize: SF(11),
    fontFamily: Fonts.Medium,
  },
  productSubHead: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Italic,
  },
  productPrice: {
    color: COLORS.black,
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
  },
  addToCart: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
  },
  sideAddToCart: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  bucketBadge: {
    borderWidth: 2,
    width: ms(13),
    height: ms(13),
    borderRadius: ms(10),
    position: 'absolute',
    right: 8,
    bottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.dark_grey,
    backgroundColor: COLORS.solidGrey,
  },
  productBadge: {
    width: ms(10),
    height: ms(10),
    borderRadius: ms(10),
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.dark_grey,
    backgroundColor: COLORS.primary,
  },
  bucketBadgePrimary: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
  },
  productBadgeText: {
    color: COLORS.white,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },

  holdBadge: {
    borderWidth: 2,
    width: ms(13),
    height: ms(13),
    borderRadius: ms(10),
    position: 'absolute',
    right: -5,
    bottom: -6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.gerySkies,
    backgroundColor: COLORS.white,
  },
  holdBadgetext: {
    color: COLORS.gerySkies,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
  },

  //NEW DESIGN 

  //Tip
  _payBYBoxContainerTip: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(55),
    width: ms(126),
    margin: ms(3),
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
  },

  _payByAmountTip: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(9),
    marginTop: ms(4),
  },
  _payByMethodTip: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
    marginTop: ms(4),
  },


//Recipe

_payBYBoxContainerReceipe: {
  borderColor: COLORS.solidGrey,
  borderWidth: 1,
  height: ms(50),
  width: ms(170),
  margin: ms(3),
  borderRadius: ms(6),
  justifyContent: 'center',
  alignItems: 'center',
},
_payBYBoxContainerReceipeEmpty: {
  height: ms(50),
  width: ms(170),
  margin: ms(3),
  justifyContent: 'center',
  alignItems: 'center',
},
_payByAmountReceipe: {
  fontFamily: Fonts.Regular,
  color: COLORS.solid_grey,
  fontSize: ms(9),
  marginTop: ms(4),
},
_payByMethodReceipe: {
  fontFamily: Fonts.SemiBold,
  color: COLORS.solid_grey,
  fontSize: ms(14),
  marginTop: ms(4),
},
selectTips:{
  fontSize:ms(12),
  margin:ms(5),
  fontFamily: Fonts.Regular,
  color: COLORS.gerySkies,
}
,
saveView:{
  backgroundColor:"#F5F6F7",
  height: ms(15),
  width: ms(80),
  margin:ms(6),
  justifyContent:"center",
  alignItems:"center",borderRadius:5
},
saveText:{
  fontSize:ms(8),
  fontFamily:Fonts.Medium
},
_kCenterContainer: {
  height: '100%',
  alignSelf: 'flex-end',
  flex: 0.6,
  borderLeftWidth: 1,
  borderColor: COLORS.textInputBackground,
  alignItems: 'center',
},
_kSubCenterContainer: {
  color: COLORS.dark_grey,
  fontFamily: Fonts.SemiBold,
  fontSize: ms(7),
  marginTop: ms(5),
},
_kAddress: {
  color: COLORS.dark_grey,
  fontFamily: Fonts.Regular,
  fontSize: ms(6),
  marginTop: ms(5),
},
_kNumber: {
  color: COLORS.dark_grey,
  fontFamily: Fonts.Regular,
  fontSize: ms(6),
  marginTop: ms(3),
},
_flatListContainer: { height: ms(100), width: '100%', marginTop: ms(5) },
_barCode: {
  fontFamily: Fonts.SemiBold,
  fontSize: ms(10),
  color: COLORS.dark_grey,
},
_barCodeImage: { height: ms(25), width: '70%', marginTop: ms(5) },
_thankyou: {
  fontFamily: Fonts.SemiBold,
  fontSize: ms(11),
  color: COLORS.dark_grey,
  marginTop: ms(10),
},
_cashRemainView: {
  marginTop: ms(15),
  height: 1,
  width: '50%',
  backgroundColor: COLORS.silver_solid,
},
_cashRemainText: {
  fontFamily: Fonts.SemiBold,
  fontSize: ms(15),
  color: COLORS.solid_grey,
  marginTop: ms(10),
},
_printButton: {
  width: '30%',
  height: ms(26),
  backgroundColor: 'transparent',
  borderColor: COLORS.lineGrey,
  borderWidth: 0.2,
  borderRadius: ms(1),
  marginHorizontal: moderateScale(5),
},
_printBtnText: {
  fontFamily: Fonts.SemiBold,
  fontSize: ms(7),
  color: COLORS.darkGray,
  fontWeight: 'normal',
},
noProductText: {
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: verticalScale(50),
},
emptyListText: {
  fontSize: SF(16),
  color: COLORS.primary,
  fontFamily: Fonts.Regular,
},

  avaliableOferBodyCon: {
    height:
      Platform.OS === 'android' ? windowHeight * 0.07 : windowHeight * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
    paddingVertical: verticalScale(7),
  },
  offerImage: {
    width: SW(11),
    height: SW(11),
    resizeMode: 'contain',
  },
  offerText: {
    color: COLORS.dark_grey,
    fontSize: SF(10),
    fontFamily: Fonts.Medium,
  },
  offerPrice: {
    color: COLORS.darkGray,
    fontSize: SF(9),
    fontFamily: Fonts.Regular,
  },
  offerPriceDark: {
    color: COLORS.dark_grey,
    fontSize: SF(9),
    fontFamily: Fonts.SemiBold,
  },
  cartListModalView: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.9,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: -30,
    right: -40,
    borderRadius: 10,
    padding: 18,
  },
  shortestCartListBody: {
    width: windowWidth * 0.35,
  },
  cartListIconBody: {
    width: windowWidth * 0.04,
  },
  carttoAdd: {
    color: COLORS.dark_grey,
    fontSize: SF(17),
    fontFamily: Fonts.MaisonBold,
    marginLeft: 8,
  },
  shortCartListData: {
    borderWidth: 1,
    width: windowWidth * 0.35,
    height: SH(48),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
    paddingHorizontal: ms(5),
  },
  shorttableListSide: {
    width: windowWidth * 0.12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ShorttableListSide2: {
    width: windowWidth * 0.23,
    flexDirection: 'row',
    paddingHorizontal: ms(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortCartListHeight: {
    height: windowHeight * 0.7,
  },




  //PHONE POPUP 

  calendarSettingModalContainer: {
    width: ms(295),
    height: ms(420),
    backgroundColor: 'white',
    padding: ms(10),
    paddingVertical: ms(15),
    alignSelf: 'center',
    borderRadius: ms(10),
    alignItems: "center"
  },
  _btnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth * 0.35,
  },
  declineBtnContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    borderRadius: ms(3),
  },
  acceptbtnContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: ms(3),
    marginLeft: ms(8),
  },
  declineText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.dark_grey,
  },

  input: {
    width: "90%",
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.35,
    marginVertical: SW(7),
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.32,
    height: SH(60),
  },
  buttonText: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },

  keyPadButton: {
    height: SH(110),
    width: SH(125),
    justifyContent: 'center',
    borderColor: COLORS.gerySkies,
    alignItems: 'center',
    borderWidth: 0.3,
    // borderRadius: 5,
    // overflow: 'hidden', 
  },
  outerBorderRadius: {
    borderRadius:5 ,
    overflow: 'hidden',
  },
  keyPadText: {
    fontSize: SH(28),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
  },
  textInputView: {
    paddingHorizontal: SW(12),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: windowHeight * 0.08,
    width: windowWidth * 0.348,
    // marginVertical: 10,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 5,
    marginHorizontal: SW(10),
    // marginBottom:SW(12)
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    color: COLORS.black,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
  },
  textInputContainer: {
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.Italic,
    width: windowWidth * 0.2,
  },

  jobrSaveView:{
    borderColor: COLORS.primary,
    borderWidth: 1,
    height: ms(50),
    width: ms(520),
    margin: ms(3),
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:ms(25)

},
youSave: {
  fontFamily: Fonts.Regular,
  color: COLORS.primary,
  fontSize: ms(9),
  marginBottom: ms(5),
},
saveJBR: {
  fontFamily: Fonts.SemiBold,
  color: COLORS.primary,
  fontSize: ms(14),
  marginTop: ms(4),
},

jbrContainer: {
  flexDirection: 'row',
  alignItems: 'baseline', // To align "JBR" and the percentage value on the same baseline
},
jbrText: {
  fontFamily: Fonts.Bold,
  color: COLORS.primary,
  fontSize: ms(11),
  
  marginTop: ms(4),
  alignSelf:"flex-start",marginRight:ms(3)
  // You can apply any other styles you want for "JBR"
},
savePercent: {
  fontFamily: Fonts.Bold,
  color: COLORS.primary,
  fontSize: ms(15),
  marginTop: ms(4), // Set your desired font size for the percentage value
  // Add any other styles you want for the percentage value here
},


//Email Modal 



  emailModalContainer: {
  width: ms(350),
  height: ms(160),
  backgroundColor: 'white',
  // padding: ms(10),
   paddingVertical: ms(15),
  alignSelf: 'center',
  borderRadius: ms(10),
  alignItems: "center"
},
modalHeaderCon: {
  height: SH(80),
  width:ms(300),
  // paddingHorizontal: moderateScale(0),
  justifyContent: 'center',

},
crossButton: {
  width: SW(9),
  height: SW(9),
  resizeMode: 'contain',
},
crossButtonCon: {
  width: SW(13),
  height: SW(13),
  // justifyContent: 'center',
  alignItems: 'center',
},
modalDataCon: {
  width: windowWidth * 0.38,
  alignSelf: 'center',
  flex: 1,
},
flexRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
twoStepText: {
  fontSize: SF(25),
  fontFamily: Fonts.MaisonBold,
  color: COLORS.black,
  textAlign:"left"
},

inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  width:ms(300),
  height:ms(40),
  marginTop:ms(25),
  padding:15
},
textInput: {
  flex:1,
  height: 45,
  fontSize:ms(10),
  paddingHorizontal: 15,

},
payNowButton: {
 height:ms(30),
  width:ms(70),
  backgroundColor:COLORS.darkGray,
  borderRadius: 5,
  alignItems:"center",
  justifyContent:"center",
  // marginHorizontal:ms(5)
},
payNowButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},

});

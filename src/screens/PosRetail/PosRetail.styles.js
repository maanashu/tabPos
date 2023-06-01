import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
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
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  crossBg: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
  },
  itemLIistCon: {
    width: windowWidth * 0.65,
    height: windowHeight * 0.88,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: moderateScale(8),
    paddingTop: verticalScale(8),
  },
  rightSideCon: {
    width: windowWidth * 0.26,
    height: windowHeight * 0.87,
    paddingHorizontal: moderateScale(4),
    paddingBottom: verticalScale(4),
    // backgroundColor: COLORS.white,
    // backgroundColor: COLORS.textInputBackground,
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
    flex: 1,
    borderRadius: 10,
    // paddingTop: verticalScale(5),
    paddingHorizontal: moderateScale(8),
  },
  productCon: {
    width: windowWidth * 0.096,
    height: windowHeight * 0.25,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: moderateScale(3),
    paddingBottom: verticalScale(5),
    marginTop: verticalScale(5),
  },
  categoryshoes: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.12,
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
    fontSize: SF(15),
    fontFamily: Fonts.SemiBold,
  },

  // sideBar css start
  keyboard: {
    width: SW(12),
    height: Platform.OS === 'android' ? SH(38) : SH(45),
    resizeMode: 'contain',
  },
  holdCartCon: {
    width: windowWidth * 0.1,
    height: SH(38),
    borderRadius: 5,
    backgroundColor: COLORS.marshmallow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pause: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  holdCart: {
    color: COLORS.white,
    fontSize: SF(13),
    fontFamily: Fonts.Bold,
    paddingHorizontal: moderateScale(3),
  },

  dark_greyBg: {
    backgroundColor: COLORS.dark_grey,
  },
  nameAddCon: {
    borderWidth: 1,
    height:
      Platform.OS === 'android' ? windowHeight * 0.35 : windowHeight * 0.37,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(5),
  },
  sideBarInputWraper: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    alignItems: 'center',
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    justifyContent: 'center',
    marginTop: 5,
    paddingLeft: moderateScale(22),
  },
  sideSearchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginLeft: moderateScale(10),
    marginRight: moderateScale(5),
    tintColor: COLORS.gerySkies,
  },
  sideBarsearchInput: {
    borderRadius: 7,
    width: windowWidth * 0.24,
    fontFamily: Fonts.Italic,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  nameAddSingleCon: {
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    justifyContent: 'center',
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    backgroundColor: COLORS.textInputBackground,
    marginTop: 5,
  },
  Phonelight: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
    marginLeft: moderateScale(10),
    marginRight: moderateScale(5),
  },
  terryText: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  lockLight: {
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(10),
  },
  okButtonCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.dark_grey,
    width: windowWidth * 0.24,
    alignSelf: 'center',
    borderRadius: 5,
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    marginTop: 5,
  },
  okText: {
    color: COLORS.white,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  addDiscountCon: {
    backgroundColor: COLORS.blue_shade,
    height: Platform.OS === 'android' ? SH(40) : SH(45),
    width: windowWidth * 0.12,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDiscountText: {
    color: COLORS.dark_grey,
    fontSize: SF(13),
    fontFamily: Fonts.MaisonRegular,
  },
  addDiscountPic: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(10),
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
    width: windowWidth * 0.25,
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
  },
  catProArrayCon: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.125,
    height: SW(34),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: verticalScale(5),
    marginRight: moderateScale(7),
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
    height: windowHeight * 0.58,
  },

  // categoryModal css end
});

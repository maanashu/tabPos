import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Fonts } from '@/theme';
import { ms } from 'react-native-size-matters';
import { verticalScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
    paddingBottom: ms(80),
  },
  contentContainerStyle: {
    marginVertical: ms(15),
  },
  categoryMainView: {
    height: ms(20),
    alignItems: 'center',
    marginHorizontal: ms(20),
    justifyContent: 'center',
  },
  disPlayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitleText: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  searchMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    // paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    marginVertical: ms(8),
  },
  searchIconStyle: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
  },
  searchTextInputStyle: {
    flex: 1,
    height: ms(40),
    // width: ms(235),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.Italic,
    fontSize: ms(10),
  },
  scannerViewStyle: {
    borderRadius: 7,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    // justifyContent: 'center',
    width: ms(50),
    height: ms(56),
    marginLeft: ms(15),
  },
  productDetailMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  productNameText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(14),
    color: COLORS.black,
  },
  genderTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(11),
    color: COLORS.grayShade,
    paddingTop: 2,
  },
  priceTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(14),
    color: COLORS.dark_gray,
  },
  stockTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(11),
    color: COLORS.text,
    paddingTop: 2,
  },
  productImageStyle: {
    width: ms(48),
    height: ms(48),
    borderRadius: 5,
    resizeMode: 'contain',
  },
  imageDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossImageStyle: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
  },

  // cart main sceen css start

  cartScreenHeader: {
    height: ms(40),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerImagecCon: {
    // borderWidth: 1,
    paddingHorizontal: ms(10),
  },
  headerImage: {
    width: ms(23),
    height: ms(23),
    resizeMode: 'contain',
  },
  cartProductCon: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: COLORS.white,
    padding: ms(7),
    marginTop: ms(4),
  },
  pencil: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    margin: ms(2),
  },
  cartPrice: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
    color: COLORS.solid_grey,
  },
  cartProductName: {
    fontFamily: Fonts.Medium,
    fontSize: ms(12),
    color: COLORS.dark_grey,
    width: ms(250),
  },
  colorName: {
    fontFamily: Fonts.Regular,
    fontSize: ms(9),
    color: COLORS.darkGray,
  },
  counterCon: {
    marginLeft: ms(10),
    height: ms(25),
    width: ms(100),
    borderWidth: 1,
    borderRadius: ms(3),
    borderColor: COLORS.row_grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterDigit: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(13),
    color: COLORS.text,
  },
  _flatListContainer: {
    // height: ms(280),
    width: '100%',
    flex: 0.53,
  },
  availablOffercon: {
    marginTop: ms(10),
    borderWidth: 1,
    borderColor: COLORS.dark_grey,
    borderRadius: ms(5),
    height: ms(47),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  avaliableofferText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
    color: COLORS.dark_grey,
  },
  totalItemCon: {
    marginTop: ms(5),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    paddingVertical: ms(3),
  },
  totalItem: {
    fontSize: ms(13),
    color: COLORS.primary,
    fontFamily: Fonts.MaisonBold,
    paddingVertical: ms(4),
  },
  subTotal: {
    fontSize: ms(13),
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonRegular,
  },
  subTotalBold: {
    fontSize: ms(13),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },
  itemValue: {
    fontSize: ms(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  payNowcon: {
    backgroundColor: COLORS.primary,
    borderRadius: ms(5),
    height: ms(47),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  payNowText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(13),
    color: COLORS.white,
  },
  buttonArrow: {
    width: ms(25),
    height: ms(20),
    resizeMode: 'contain',
    marginLeft: ms(8),
  },

  // for test

  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hiddenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: ms(4),
    flex: 1,
    width: ms(75),
    height: ms(65),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  sheetStyle: {
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    top: 15,
  },
  cartPlusCon: {
    width: ms(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataCon: {
    marginTop: ms(50),
    alignItems: 'center',
  },
  noDataFound: {
    fontSize: ms(14),
    color: COLORS.red,
    fontFamily: Fonts.MaisonRegular,
  },
  cartColorCon: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(2),
    marginHorizontal: ms(5),
  },
});

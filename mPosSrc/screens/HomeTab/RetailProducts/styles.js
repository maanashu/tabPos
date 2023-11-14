import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Fonts } from '@/theme';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
  },
  contentContainerStyle: {
    marginVertical: ms(12),
  },
  categoryMainView: {
    height: ms(20),
    alignItems: 'center',
    marginHorizontal: ms(15),
    justifyContent: 'center',
  },
  categoryTitleText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.Regular,
  },
  productDetailMainView: {
    flex: 1,
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
    fontFamily: Fonts.Medium,
    fontSize: ms(14),
    color: COLORS.black,
  },
  genderTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    paddingTop: 2,
  },
  priceTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(14),
    color: COLORS.solid_grey,
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
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: ms(10),
    // justifyContent: "center",
  },
  crossImageStyle: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
  },

  countView: {
    position: 'absolute',
    top: 0,
    right: ms(20),
    backgroundColor: COLORS.primary,
    paddingVertical: ms(1),
    paddingHorizontal: ms(5),
    borderRadius: ms(10),
  },
  addImage: {
    height: ms(30),
    width: ms(30),
  },
  addView: {
    padding: ms(4),
    borderWidth: 1,
    borderRadius: ms(5),
  },
  alignItem: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  notiImage: {
    height: ms(12),
    width: ms(20),
  },
  notificationView: {
    marginLeft: ms(10),
    borderWidth: 1,
    paddingHorizontal: ms(8),
    paddingVertical: ms(4),
    borderColor: COLORS.placeholderText,
    borderRadius: ms(4),
  },
  quantityText: {
    // flex: 1,
    fontSize: ms(13),
    color: COLORS.grayShade,
  },
  sizeText: {
    flex: 1,
    fontSize: ms(13),
    color: COLORS.grayShade,
  },
  sizeView: {
    flexDirection: 'row',
    paddingHorizontal: ms(15),
    borderWidth: 1,
    marginVertical: ms(5),
    paddingVertical: ms(3),
    borderColor: COLORS.placeholderText,
    borderRadius: ms(4),
    flex: 1,
  },
  cartText: {
    color: COLORS.white,
    fontSize: ms(14),
  },
  cartView: {
    paddingHorizontal: ms(8),
    paddingVertical: ms(3),
    marginLeft: ms(10),
    backgroundColor: COLORS.darkBlue,
    borderRadius: ms(4),
  },
  backview: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(3),
    marginLeft: ms(10),
    backgroundColor: COLORS.light_border,
    borderRadius: ms(4),
  },
  headerView: {
    flexDirection: 'row',
    position: 'absolute',
    right: ms(10),
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: ms(10),
  },

  detailImageView: {
    borderRadius: ms(10),
    overflow: 'hidden',
    height: ms(100),
    width: ms(80),
  },
  detailView: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: ms(10),
  },
  verticalLineSeprator: {
    backgroundColor: COLORS.light_border,
    width: ms(2),
  },

  minusImageView: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    paddingVertical: ms(10),
    borderColor: COLORS.placeholderText,
    borderTopLeftRadius: ms(7),
    borderBottomLeftRadius: ms(7),
  },
  minusImage: {
    height: ms(21),
    width: ms(25),
  },
  countNumber: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: ms(10),
    fontSize: ms(16),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontFamily: Fonts.Bold,
    color: COLORS.black,
    borderColor: COLORS.placeholderText,
  },
  addCountText: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: ms(10),
    fontSize: ms(16),
    borderColor: COLORS.placeholderText,
    borderTopRightRadius: ms(7),
    borderBottomRightRadius: ms(7),
  },

  stockImage: {
    height: ms(80),
    width: ms(80),
  },
  stockHeaderText: {
    fontSize: ms(11),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  usaText: {
    fontSize: ms(10),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },

  noProductCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProduct: {
    fontSize: ms(17),
    color: COLORS.red,
    fontFamily: Fonts.MaisonRegular,
    marginTop: ms(50),
  },
  verticalLineSeprator: {
    backgroundColor: COLORS.light_border,
    width: ms(2),
  },
  loading: {
    fontSize: ms(14),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
    marginHorizontal: ms(15),
  },
});

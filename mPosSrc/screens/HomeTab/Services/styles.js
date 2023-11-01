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
    marginVertical: ms(15),
  },
  categoryMainView: {
    height: ms(20),
    alignItems: 'center',
    marginHorizontal: ms(20),
    justifyContent: 'center',
  },
  categoryTitleText: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  searchMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchIconStyle: {
    width: ms(32),
    height: ms(32),
    resizeMode: 'contain',
    // tintColor: COLORS.light_border
  },
  searchTextInputStyle: {
    borderWidth: 2,
    height: ms(48),
    borderColor: COLORS.transparent,
    width: ms(235),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.Italic,
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
  rbSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: ms(10),
    // backgroundColor: "red"
  },
});

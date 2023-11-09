import { StyleSheet } from 'react-native';
import { COLORS, Fonts, SF, SH, SW, ShadowStyles } from '@/theme';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    backgroundColor: COLORS.inputBorder,
  },
  storeNameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(20),
    paddingHorizontal: ms(5),
  },
  storeName: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    width: ms(300),
  },
  itemViewStyle: {
    flex: 1 / 2,
    justifyContent: 'center',
    height: SW(120),
    // margin: SW(8),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: ms(5),
    marginHorizontal: ms(5),
  },
  bell: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
  },
  itemTitleStyle: {
    fontSize: ms(15),
    fontFamily: Fonts.MaisonBold,
    justifyContent: 'center',
    color: COLORS.black,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  imageStyle: {
    width: SW(35),
    height: SH(35),
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  listedProductsStyle: {
    fontSize: ms(10),
    fontFamily: Fonts.Regular,
    justifyContent: 'center',
    color: COLORS.darkGray,
  },
  descriptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dotImageStyle: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  homePageSearchCon: {
    height: ms(40),
    borderRadius: ms(7),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(15),
    marginVertical: ms(10),
    marginHorizontal: ms(5),
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
    color: COLORS.solid_grey,
  },
});

export default styles;

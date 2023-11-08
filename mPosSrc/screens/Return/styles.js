import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWraper: {
    top: 5,
    borderRadius: 7,
    height: SH(50),
    borderWidth: 0.5,
    borderColor: COLORS.inputBorder,
    width: width - 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  displayRow: {
    height: SH(44),
    marginLeft: 5,
    width: width - 95,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  searchStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  searchInput: {
    height: SH(44),
    borderRadius: 7,
    width: width - 125,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
    paddingLeft: 10,
  },
  scannerIconStyle: {
    width: SW(40),
    height: SW(40),
    resizeMode: 'contain',
    right: 2,
  },
  userDetailView: {
    borderRadius: 5,
    paddingHorizontal: ms(10),
    paddingVertical: ms(18),
    marginHorizontal: ms(15),
    backgroundColor: COLORS.white,
  },
  profileImageStyle: {
    width: SW(36),
    height: SW(36),
    borderRadius: SW(18),
    resizeMode: 'cover',
  },
  nameTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  addressTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    paddingTop: 2,
  },
  cancelButtonStyle: {
    backgroundColor: COLORS.washGrey,
    borderRadius: 5,
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
  },
  getProductDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(15),
    justifyContent: 'space-between',
  },
  scanProductView: {
    flex: 0.7,
    borderRadius: 3,
    alignItems: 'center',
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.blue_shade,
  },
  manualView: {
    flex: 0.28,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(10),
    paddingVertical: ms(15),
  },
  orderDateText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.darkGray,
  },
  scanTextInputStyle: {
    width: ms(220),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.darkGray,
  },
  orderproductView: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.white,
    borderColor: COLORS.blue_shade,
  },
  shippingOrderHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  searchViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  researchIconstyle: {
    width: SH(210),
    height: SH(210),
    resizeMode: 'contain',
  },
  emptyTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
    color: COLORS.primary,
  },
  infoIconStyle: {
    width: SH(15),
    height: SH(15),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  checkboxIconStyle: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
});

export default styles;

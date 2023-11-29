import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { StyleSheet, Dimensions } from 'react-native';
import { ms } from 'react-native-size-matters';
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(30),
  },
  paymentContainer: {
    backgroundColor: COLORS.inputBorder,
    width: '100%',
    paddingVertical: SH(15),
    paddingHorizontal: ms(21),
    borderRadius: ms(10),
    alignItems: 'flex-start',
    height: height * 0.065,
    flex: 1,
    justifyContent: 'center',
  },
  amountText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(16),
    color: COLORS.dark_gray,
  },
  amountTypeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.black,
  },
  amountContainer: {
    backgroundColor: 'white',
    padding: ms(16),
    borderRadius: ms(5),
    flex: 0.41,
    justifyContent: 'center',
  },
  orderNumbersText: {
    fontSize: ms(15),
    color: COLORS.text,
    fontFamily: Fonts.SemiBold,
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(10),
  },
  amountTypeIcon: {
    height: SH(30),
    width: SH(30),
  },
  typeSmallText: {
    fontSize: ms(8),
    fontFamily: Fonts.Regular,
    color: COLORS.text,
  },
  innerContainer: {
    alignItems: 'flex-start',
    marginLeft: SW(12),
  },

  // customer css
  subContainer: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
    height: ms(68),
    flexDirection: 'row',
    marginVertical: ms(5),
    alignItems: 'center',
    marginHorizontal: ms(10),
  },
  imageStyle: {
    width: ms(35),
    height: ms(35),
  },
  text: {
    fontSize: ms(13),
    color: COLORS.darkGray,
  },
  text2: {
    fontSize: ms(15),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    marginHorizontal: ms(10),
    marginBottom: ms(10),
    paddingVertical: ms(8),
  },
  totalCusPrimary: {
    fontFamily: Fonts.Medium,
    color: COLORS.black,
    fontSize: SF(16),
  },
  totalCustomer: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(34),
    flex: 1,
  },
  viewButtonCon: {
    backgroundColor: COLORS.blue_shade,
    borderRadius: 3,
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
  },
  viewAll: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    fontSize: SF(14),
  },
});

export default styles;

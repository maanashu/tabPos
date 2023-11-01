import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    // height: SH(70),
    flex: 1,
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
    height: SH(34),
    width: SH(34),
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
});

export default styles;

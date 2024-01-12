import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topListContainer: (item, type) => {
    return {
      borderWidth: 1,
      borderRadius: ms(7),
      paddingHorizontal: ms(5),
      paddingVertical: ms(6),
      flex: 1,
      marginHorizontal: ms(5),
      alignItems: 'center',
      borderColor: item?.value == type ? COLORS.darkBlue : COLORS.light_border,
    };
  },
  paymentText: (item, type) => {
    return {
      fontFamily: Fonts.Regular,
      fontSize: ms(11),
      color: item?.value == type ? COLORS.darkBlue : COLORS.text,
      fontFamily: item?.value == type ? Fonts.SemiBold : Fonts.Regular,
      letterSpacing: -0.5,
    };
  },

  filterContainer: {
    height: ms(40),
    backgroundColor: COLORS.white,
    width: ms(40),
    borderRadius: ms(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ms(10),
  },
  filterIcon: {
    height: ms(16),
    width: ms(16),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: ms(20),
    // flex: 0.5,
  },
  amountText: {
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    marginHorizontal: 5,
  },
  timeText: {
    color: COLORS.grayShade,
    fontFamily: Fonts.Regular,
    fontSize: ms(9),
    marginHorizontal: 5,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.textinput_bg,
    paddingVertical: ms(10),
    paddingLeft: ms(5),
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
  listMainContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: ms(16),
    marginBottom: ms(20),
    flex: 1,
  },
  rightIcon: {
    height: ms(15),
    width: ms(15),
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    height: height * 0.8,
    width: '100%',
    backgroundColor: COLORS.inputBorder,
    paddingVertical: ms(5),
    borderRadius: ms(5),
  },
  emptyText: {
    fontSize: ms(15),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
});

export default styles;

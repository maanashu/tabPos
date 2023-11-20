import { COLORS, Fonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: ms(10),
    paddingHorizontal: ms(20),
  },
  rowJustified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  publishText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.dark_grey,
  },
  dateText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.darkGray,
  },
  titleText: {
    fontFamily: Fonts.Bold,
    fontSize: ms(12),
    color: COLORS.solid_grey,
  },
  largeTitleText: {
    fontFamily: Fonts.Bold,
    fontSize: ms(16),
    color: COLORS.solid_grey,
  },
  closeText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(16),
    color: COLORS.white,
  },
  itemContainer: {
    borderWidth: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    // flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: ms(5),
    marginVertical: ms(10),
    borderColor: COLORS.solidGrey,
    // justifyContent: 'space-between',
    // flex: 1,
  },
  activeView: (active) => {
    return {
      paddingHorizontal: ms(8),
      paddingVertical: ms(5),
      borderWidth: 1,
      borderColor: active ? COLORS.sucx : COLORS.orange,
      borderRadius: ms(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: active ? COLORS.transparentGreen : COLORS.white,
    };
  },
  activeDot: (active) => {
    return {
      height: ms(8),
      width: ms(8),
      borderRadius: ms(8),
      backgroundColor: active ? COLORS.sucx : COLORS.orange,
    };
  },
  activeText: (active) => {
    return {
      fontSize: ms(10),
      color: active ? COLORS.sucx : COLORS.orange,
      fontFamily: Fonts.Regular,
      marginLeft: ms(3),
    };
  },
  contentContainer: {
    borderWidth: ms(1),
    borderRadius: ms(10),
    paddingHorizontal: ms(10),
    marginVertical: ms(15),
    borderColor: COLORS.textInputBackground,
    paddingTop: ms(10),
  },
  sheetStyle: {
    borderTopLeftRadius: ms(15),
    borderTopRightRadius: ms(15),
  },
  closeView: {
    height: ms(64),
    width: '100%',
    elevation: 10,
    shadowColor: '#000000',
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: ms(15),
  },
  closeButtonView: {
    backgroundColor: COLORS.row_grey,
    width: ms(91),
    height: ms(36),
    borderRadius: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    paddingBottom: ms(40),
    paddingHorizontal: ms(20),
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    padding: ms(15),
    flex: 1,
  },
});

export default styles;

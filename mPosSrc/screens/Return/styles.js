import { COLORS, Fonts, SH, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  inputWraper: {
    top: 5,
    borderRadius: 7,
    height: SH(50),
    borderWidth: 0.5,
    borderColor: COLORS.inputBorder,
    width: width - 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  displayRow: {
    height: SH(44),
    marginLeft: 5,
    width: width - 75,
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
    borderRadius: 7,
    height: ms(20),
    width: width * 0.4,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
  },
  scannerIconStyle: {
    width: SW(40),
    height: SW(40),
    resizeMode: 'contain',
    right: 2,
  },
});

export default styles;

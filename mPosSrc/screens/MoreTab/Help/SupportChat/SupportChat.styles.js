import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputToolbarStyle: {
    borderWidth: 1,
    borderRadius: ms(30),
    borderTopWidth: 1,
    borderTopColor: 'black',
    marginHorizontal: ms(10),
    paddingHorizontal: ms(10),
  },
  messageSend: {
    height: ms(30),
    width: ms(30),
  },
});

export default styles;

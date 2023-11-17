import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  notiContainer: {
    backgroundColor: COLORS.white,
    borderRadius: ms(7),
    paddingVertical: ms(16),
    borderWidth: ms(1),
    borderColor: COLORS.solidGrey,
  },
  toggleBtn: {
    height: ms(24),
    width: ms(24),
  },
  itemSeparatorStyle: {
    borderBottomWidth: ms(1),
    marginVertical: ms(10),
    borderBottomColor: COLORS.solidGrey,
    marginHorizontal: ms(15),
  },
  notiView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(25),
  },
  notificationType: {
    fontSize: ms(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  headerTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(14),
    color: COLORS.solid_grey,
  },
  notiHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(15),
  },
  bottomLine: {
    marginBottom: ms(15),
    marginHorizontal: ms(15),
  },
});

export default styles;

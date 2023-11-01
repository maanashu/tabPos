import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
  },
  headerMainView: {
    height: SH(55),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow1,
    paddingHorizontal: 10,
  },
  backImageStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(14),
    color: COLORS.dark_gray,
  },
  searchMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 5,
  },
  searchIconStyle: {
    width: SW(32),
    height: SW(32),
    resizeMode: 'contain',
  },
  searchTextInputStyle: {
    borderWidth: 2,
    height: SH(48),
    borderColor: COLORS.transparent,
    width: SW(235),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.Italic,
  },
  scannerViewStyle: {
    borderRadius: 7,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    width: SW(72),
    height: SW(56),
  },
  itemViewStyle: {
    flex: 1,
    height: SW(128),
    margin: SW(8),
    borderRadius: 10,
    paddingHorizontal: SW(13),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  itemImageStyle: {
    width: SW(48),
    height: SW(48),
    resizeMode: 'contain',
  },
  headingText: {
    fontFamily: Fonts.MaisonMonoBold,
    fontSize: SF(18),
    color: COLORS.dark_gray,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleText: {
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(18),
    color: COLORS.black,
    paddingTop: 5,
  },
  productsText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(12),
    color: COLORS.dark_gray,
    paddingTop: 3,
  },
});

export default styles;

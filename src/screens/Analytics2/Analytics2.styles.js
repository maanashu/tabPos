import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  totalProductCon: {
    backgroundColor: COLORS.white,
    // width: Platform.OS === 'android' ? SW(300) : SW(400),
    width: Platform.OS === 'android' ? windowWidth * 0.275 : windowWidth * 0.28,
    height: windowHeight * 0.318,
    resizeMode: 'contain',
    ...ShadowStyles.shadow2,
    borderRadius: 10,
    paddingHorizontal: moderateScale(15),
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(2),
    marginTop: verticalScale(3),
  },
  rightlight: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  darkBlackText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: SF(14),
    // flex: 1,
    // height: SH(30),
    marginRight: SW(10),
  },

  tableContainer: {
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
    borderRadius: 12,
  },
  tableheader: {
    backgroundColor: COLORS.textInputBackground,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: 'transparent',
  },

  homeMainContainer: {
    paddingHorizontal: moderateScale(5),
    paddingBottom: Platform.OS === 'ios' ? 30 : 60,
    flex: 1,
  },

  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: windowWidth * 0.06,
    height: windowHeight - SW(4),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    alignSelf: 'center',
  },
  sideBarImage: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  bucketBackgorund: {
    width: SW(17),
    height: SW(17),
    borderRadius: 5,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginRight: SW(4),
    fontSize: SF(16),
    color: COLORS.dark_grey,
    fontWeight: '600',
  },
  subImages: {
    height: SH(26),
    width: SW(8),
    resizeMode: 'contain',
  },
  costText: {
    marginRight: SW(4),
    fontSize: SF(16),
    color: COLORS.dark_grey,
    fontWeight: '600',
  },
  subTitle: {
    marginRight: SW(4),
    fontSize: SF(12),
    color: COLORS.gerySkies,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  modalView: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.25,
    height: windowHeight - SW(30),
    alignSelf: 'flex-end',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    marginRight: SW(-12),
    borderRadius: SW(5),
  },
  headerImage: {
    tintColor: COLORS.primary,
    height: SH(18),
    width: SW(7),
    resizeMode: 'contain',
  },
  marginLeft4: {
    marginLeft: SW(4),
  },
  imageView: {
    backgroundColor: COLORS.textInputBackground,
    padding: SW(4),
  },
});

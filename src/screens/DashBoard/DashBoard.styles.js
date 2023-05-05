import { StyleSheet, Dimensions } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  displayflex: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // home Screen css start
  homeScreenCon: {
    // flex: 1,
  },
  cashProfileCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.95,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  cashProfile: {
    width: SW(55),
    height: SW(55),
    resizeMode: 'contain',
  },
  todaySaleCon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.26,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  sessionCon: {
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.26,
  },

  todaySale: {
    color: COLORS.primary,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonRegular,
  },
  cashLabel: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  cashAmount: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  paddingV: {
    paddingVertical: verticalScale(2.5),
  },
  profileHrRow: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.26,
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark_grey,
    width: windowWidth * 0.26,
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(9),
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  checkArrow: {
    width: SW(10),
    height: SW(4),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
  },
  cashierName: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
  },
  posCashier: {
    color: COLORS.dark_grey,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },
  cashProfilecon: {
    borderWidth: 4,
    borderRadius: 100,
    borderColor: COLORS.solidGrey,
  },
  rightOrderCon: {
    width: windowWidth * 0.64,
    height: windowHeight * 0.95,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(5),
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.61,
    height: Platform.OS === 'android' ? SH(55) : SH(45),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInput: {
    borderRadius: 7,
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
  },
  storeCardCon: {
    width: SW(110),
    height: SW(65),
    borderRadius: 15,
    backgroundColor: COLORS.dark_grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellingBucket: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  sellingArrow: {
    width: SW(10),
    height: SW(5),
    resizeMode: 'contain',
  },
  startSelling: {
    color: COLORS.white,
    fontSize: SF(22),
    fontFamily: Fonts.MaisonRegular,
  },
  scanSer: {
    color: COLORS.solid_green,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  arrowBtnCon: {
    width: SW(90),
    height: SW(14),
    borderWidth: 1,
    borderColor: COLORS.solid_green,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTableCon: {
    // borderWidth: 1,
    height: windowHeight * 0.48,
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow2,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  deliveries: {
    color: COLORS.black,
    fontSize: SF(20),
    fontFamily: Fonts.SemiBold,
  },
  tableScrollCon: {
    borderWidth: 1,
    height: SH(60),
  },
  reviewRenderView: {
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: SW(2),
    borderColor: COLORS.orderStatusBackground,
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: SW(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  timeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    textAlignVertical: 'center',
    paddingLeft: 2,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 1,
  },
  pinIcon: {
    width: SW(5),
    height: SW(8),
    resizeMode: 'contain',
  },
  rightIconStyle: {
    width: SW(35),
    justifyContent: 'center',
  },
  hashNumber: {
    fontFamily: Fonts.Medium,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  nameTextBold: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.dark_grey,
  },
  timeSec: {
    color: COLORS.primary,
    paddingRight: moderateScale(10),
  },

  // home Screen css end

  // home Screen css start
  backgroundColorSCreen: {
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(22),
  },

  searchScreenHeader: {
    height: SH(60),
    justifyContent: 'center',
  },
  crossBg: {
    width: SW(20),
    height: SW(8),
    resizeMode: 'contain',
  },
  cashLabelBold: {
    color: COLORS.solid_grey,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  itemLIistCon: {
    width: windowWidth * 0.57,
    height: windowHeight * 0.88,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },

  rightSideCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  inputWraper2: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.55,
    height: Platform.OS === 'android' ? SH(55) : SH(45),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  blueListHeader: {
    backgroundColor: COLORS.primary,
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    // alignContent: 'center',
  },

  tableListSide: {
    width: windowWidth * 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableListSide2: {
    width: windowWidth * 0.29,
  },
  listLeft: {
    justifyContent: 'flex-start',
  },
  cashLabelWhite: {
    color: COLORS.white,
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
  },
  cashLabelWhiteHash: {
    paddingHorizontal: moderateScale(15),
  },
});

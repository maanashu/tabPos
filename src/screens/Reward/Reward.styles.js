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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletMainCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 10,
    alignSelf: 'center',
    width: windowWidth * 0.92,
    height: windowHeight * 0.84,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(5),
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
    flexDirection: 'row',
  },
  backView: {
    width: SW(25),
    height: SW(12),
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    width: windowWidth * 0.08,
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonArrow: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  backTextStyle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    paddingVertical: verticalScale(5),
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchView: {
    borderWidth: 1,
    width: SW(65),
    height: SH(43),
    borderRadius: 20,
    borderColor: COLORS.row_grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImage: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    left: 3,
  },
  textInputStyles: {
    width: SW(45),
    marginLeft: 10,
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
  },
  totalRewardText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  totalRewardText2: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  jobrCountLabel: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(35),
  },
  rewardGraph: {
    width: windowWidth * 0.55,
    height: windowHeight * 0.38,
    resizeMode: 'contain',
  },
  rewardCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.38,
    borderRadius: 15,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(8),
    ...ShadowStyles.shadow2,
  },
  thirdRewardCon: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.21,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 2,
    backgroundColor: COLORS.lightBlue,
    opacity: 0.9,
    padding: 10,
    alignItems: 'center',
  },
  firstRewardCon: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.25,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.9,
    padding: 10,
    alignItems: 'center',
  },
  secondRewardCon: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.23,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 2,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    opacity: 0.9,
    padding: 10,
  },
  rewaurdMainCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  rewardFlower: {
    height: SH(100),
    width: SW(70),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rewardUserFirst: {
    height: SW(15),
    width: SW(15),
    resizeMode: 'contain',
  },
  rewardUserSecond: {
    height: SW(14),
    width: SW(14),
    resizeMode: 'contain',
  },
  rewardUserThird: {
    height: SW(12),
    width: SW(12),
    resizeMode: 'contain',
  },
  userImageBorder: {
    borderWidth: 10,
    width: SW(20),
    height: SW(20),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.light_green,
  },
  userImageBorderSecond: {
    width: SW(17),
    height: SW(17),
    borderWidth: 8,
  },
  userImageBorderThird: {
    width: SW(14),
    height: SW(14),
    borderWidth: 5,
  },
  firstText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(26),
  },
  rewardConPrice: {
    width: windowWidth * 0.08,
    height: windowHeight * 0.06,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(4),
  },
  reward: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.solid_green,
    marginRight: 10,
  },
  rewardPrice: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_green,
    fontSize: SF(15),
  },

  tableMainConatiner: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    // borderWidth:1,
  },
  viewButtonCon: {
    backgroundColor: COLORS.white,
    width: SW(25),
    height: SW(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    alignSelf: 'flex-end',
  },
  viewAll: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    fontSize: SF(14),
  },
  tableDataHeaderCon: {
    height: SH(40),
    textAlign: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
  },
  tableDataHeaderCon2: {
    height: SH(50),
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
  },
  text1: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    textAlign: 'center',
    width: windowWidth * 0.04,
  },
  text2: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    textAlign: 'center',
    width: windowWidth * 0.04,
  },
  text: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    textAlign: 'center',
    width: windowWidth * 0.15,
  },
  dateHeadAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.6,
  },
  tableDataDataCon: {
    height: SH(45),
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.textInputBackground,
    // borderColor: 'transparent',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
  },
  DataText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.dark_grey,
    fontSize: SF(12),
    textAlign: 'center',
    width: windowWidth * 0.15,
  },
  tableProfileData: {
    width: windowWidth * 0.2,
    justifyContent: 'center',
  },
  tableProfile: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
  },
  Phonelight: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
  },
  username: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: SF(12),
  },
  userAddress: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(10),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTypeCon: {
    height: SH(55),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  jbrTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(55),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  paginationEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  columnSpace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(5),
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  dropDownIconPagination: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.darkGreen,
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStylePagination: {
    width: SW(22),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    color: COLORS.solidGrey,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    top: Platform.OS === 'android' ? 30 : 35,
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  placeholderStylePagination: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  unionCon: {
    backgroundColor: COLORS.washGrey,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 7,
  },
  unionStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(12),
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  datePickerCon: {
    borderWidth: 1,
    height: SH(38),
    width: SW(45),
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(7),
  },
  calendarStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  txtInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: SF(11),
    top: 2,
    color: COLORS.solid_grey,
  },
  paddingVerHor: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(8),
  },
  requestNotFound: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: SF(20),
  },
});

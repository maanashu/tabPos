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
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calenderContainer:{
  width:windowWidth * 0.94,
  height:windowHeight
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
    flexDirection: 'row',
  },
  textInputStyle: {
    width: SW(45),
    marginLeft: 10,
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
  },
  truckStyle: {
    width: SH(32),
    height: SH(32),
    resizeMode: 'contain',
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
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
  calenderCon: {
    width: windowWidth * 0.64,
    height: windowHeight,
  },
  notificationCon: {
    width: windowWidth * 0.30,
    height: windowHeight,
  },
  approveButtonCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    height: SH(32),
    width: SH(110),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonCon: {
    backgroundColor: COLORS.dark_grey,
    borderRadius: 3,
    height: SH(32),
    justifyContent: 'center',
    alignItems: 'center',
    width: SH(110),
    marginHorizontal: moderateScale(10),
  },
  approveText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  requestFor: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(15),
  },
  timeLabel: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(15),
    paddingHorizontal: moderateScale(5),
  },
  notificationchildCon: {
    borderBottomWidth: 1,
    borderColor: '#F3F3F3',
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(8),
  },
  roundCalender: {
    width: SH(22),
    height: SH(22),
    resizeMode: 'contain',
    tintColor: COLORS.bluish_green,
  },
  watch: {
    width: SH(18),
    height: SH(18),
    resizeMode: 'contain',
    tintColor: COLORS.bluish_green,
  },
  modalMainView: {
    backgroundColor: COLORS.white,
    width: SW(180),
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerView: {
    backgroundColor: COLORS.primary,
    width: SW(180),
    height: SH(60),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  trackingButtonText: {
    fontFamily: Fonts.Medium,
    color: COLORS.white,
    fontSize: SF(12),
  },
  charlene: {
    width: SH(100),
    height: SH(100),
    resizeMode: 'contain',
  },
  address: {
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(5),
  },
  charleneName: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(20),
  },
  location: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  appointment: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  service: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
    fontSize: SF(16),
  },
  serviceType: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  upcomingCon: {
    borderRadius: 3,
    backgroundColor: COLORS.bluish_green,
    height: SH(35),
    width: SH(116),
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(16),
  },
  calenderHeader: {
    height: SH(60),
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  unChecked: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(12),
    // paddingHorizontal:moderateScale(18)
  },
  clickedButtonCon: {
    backgroundColor: COLORS.primary,
    height: SH(32),
    width: SH(68),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  unClickedButtonCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(32),
    width: SH(68),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  checkedText: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    fontSize: SF(12),
  },
  unCheckedText: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(12),
  },
  schdule: {
    height: SH(670),
    // width: SH(650),
    width: windowWidth * 0.68,
    resizeMode: 'contain',
  },
  monthlySchduel: {
    height: SH(36),
    width: SH(240),
    backgroundColor: COLORS.white,
    borderRadius: 3,
    paddingHorizontal: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftLight: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  monthlySchduleDate: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(5),
  },
});

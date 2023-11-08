import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Fonts, SF, SH, SW, ShadowStyles } from '@/theme';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.textinput_bg,
    paddingHorizontal: ms(10),
  },
  bodyContainer: {
    flex: 1,
    paddingTop: ms(25),
    paddingHorizontal: ms(12),
    paddingBottom: ms(30),
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: ms(100),
    height: ms(100),
    resizeMode: 'contain',
    borderRadius: ms(50),
  },
  profileName: {
    fontSize: ms(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  posCashier: {
    fontSize: ms(13),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
  },
  posUserId: {
    fontSize: ms(10),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  todaySaleCon: {
    borderWidth: 1,
    borderRadius: ms(7),
    borderColor: COLORS.solidGrey,
    padding: ms(10),
  },
  todaySale: {
    color: COLORS.primary,
    fontSize: ms(16),
    fontFamily: Fonts.MaisonRegular,
  },
  cashLabel: {
    color: COLORS.solid_grey,
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
  },
  cashAmount: {
    color: COLORS.solid_grey,
    fontSize: ms(12),
    fontFamily: Fonts.SemiBold,
  },
  lockScreenButton: {
    borderWidth: 1,
    height: ms(50),
    borderRadius: ms(3),
    borderColor: COLORS.dark_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  lock: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    marginHorizontal: ms(5),
  },

  modalMainView: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: ms(320),
    borderRadius: ms(12),
    alignSelf: 'center',
    height: ms(400),
    marginTop: ms(100),
  },
  headerCon: {
    backgroundColor: COLORS.primary,
    height: ms(50),
    borderTopEndRadius: ms(12),
    borderTopStartRadius: ms(12),
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(15),
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  startTracking: {
    color: COLORS.white,
    fontSize: ms(14),
    fontFamily: Fonts.Medium,
    marginLeft: ms(10),
  },
  modalBodyView: {
    flex: 1,
    paddingHorizontal: ms(15),
  },
  countCashDrawer: {
    color: COLORS.black,
    fontSize: ms(16),
    fontFamily: Fonts.Regular,
    marginTop: ms(10),
  },
  amountCounted: {
    color: COLORS.darkGray,
    fontSize: ms(13),
    fontFamily: Fonts.Regular,
    marginTop: ms(25),
  },
  amountTextStyle: {
    height: SH(55),
    borderRadius: 5,
    paddingLeft: SW(10),
    backgroundColor: COLORS.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(5),
  },
  dollarSign: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Medium,
    marginBottom: ms(1),
  },
  amountInput: {
    height: SH(55),
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Medium,
    flex: 1,
  },
  noteTextStyle: {
    height: SH(55),
    borderRadius: 5,
    paddingLeft: SW(10),
    backgroundColor: COLORS.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(5),
    fontFamily: Fonts.Italic,
  },
  startButton: {
    height: ms(50),
    backgroundColor: COLORS.gerySkies,
    borderRadius: ms(5),
    marginBottom: ms(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  startSession: {
    fontSize: SF(16),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
});

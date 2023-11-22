import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.dark.colors.background,
  },
  sopportContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: SW(350),
    // height: SW(291),
    borderRadius: 15,
    paddingHorizontal: SW(15),
    paddingTop: SW(15),
    marginVertical: 6,
  },
  orderCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  order: {
    fontSize: scale(18),
    fontWeight: '700',
    color: COLORS.black,
    fontFamily: Fonts.MaisonRegular,
  },
  timeCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(13),
    borderRadius: 14,
    borderColor: '#E1E8FF',
  },
  image: {
    width: SW(15),
    height: SW(15),
    marginVertical: verticalScale(2),
  },
  pendingBtn: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(15),
    borderRadius: 14,
    textAlign: 'center',
  },
  hr: {
    backgroundColor: COLORS.solidGrey,
    width: SW(315),
    height: SW(1),
    marginVertical: verticalScale(5),
  },
  pickupCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstCon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  secondCon: {
    display: 'flex',
    flexDirection: 'column',
  },
  pickUpText: {
    fontWeight: '600',
    fontSize: scale(12),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  address: {
    fontFamily: Fonts.Regular,
    fontSize: scale(13),
    fontWeight: '400',
  },
  manLogo: {
    width: SW(30),
    height: SW(30),
    marginVertical: verticalScale(4),
  },
  deliverManText: {
    fontFamily: Fonts.Regular,
    fontSize: scale(14),
    color: COLORS.black,
  },
  circleLogo: {
    width: SW(20),
    height: SW(20),
  },
  coloredLogo: {
    width: SW(22),
    height: SW(22),
  },
  verifiedLogo: {
    width: SW(17),
    height: SW(21),
  },
  lineArrow: {
    height: SH(50),
    width: SW(7),
  },
  verifiedCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verifiedBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  verifiesText: {
    color: COLORS.solid_grey,
    fontSize: scale(12),
  },
  supportText: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  paymentIssue: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  description: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    marginBottom: ms(10),
  },
  deliveredText: {
    backgroundColor: COLORS.orange,
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(13),
    borderRadius: 3,
    textAlign: 'center',
    fontSize: SF(12),
    color: COLORS.bluish_green,
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.bluish_green,
  },
  emptyListText: {
    fontSize: SF(20),
    color: COLORS.primary,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  emptyListView: {
    height: Dimensions.get('screen').height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

import { Fonts } from '@/assets';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  notificationHeader: {
    left: 8,
    fontSize: SF(16),
    color: COLORS.solid_grey,
    marginTop: moderateScale(8),
    fontFamily: Fonts.MaisonRegular,
  },
  notificationItem: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(3),
    marginVertical: 8,
    borderWidth: 1,
    ...ShadowStyles.shadow1,
    marginHorizontal: SW(6),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    backgroundColor: COLORS.white,
    borderColor: COLORS.washGrey,
    paddingVertical: moderateScale(15),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 165,
  },
  notificationImg: {
    width: SW(12),
    height: SW(12),
    borderRadius: 50,
  },
  notificationTextView: {
    width: SW(220),
    marginLeft: moderateScale(8),
  },
  notificationTitle: {
    fontSize: SF(15),
    fontWeight: '600',
    color: COLORS.solid_grey,
  },
  notificationDescrip: {
    color: '#2B3231',
  },
  notificationTime: {
    borderRadius: 4,
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(10),
    borderRadius: moderateScale(4),
    backgroundColor: COLORS.washGrey,
    paddingVertical: verticalScale(2),
    paddingHorizontal: moderateScale(4),
  },
  notificationTimeText: {
    fontSize: SF(9),
    fontFamily: Fonts.Regular,
    color: '#6D6F70',
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    position: 'absolute',
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(8),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
    flexDirection: 'row',
  },
  backViewStyle: {
    paddingHorizontal: SW(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backIconStyle: {
    width: SH(20),
    height: SH(30),
    tintColor: COLORS.black,
    resizeMode: 'contain',
  },
  container: {
    height: SH(55),
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  headerTitle: {
    fontSize: SF(14),
    paddingLeft: 4,
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  payText: {
    color: COLORS.darkGray,
    fontFamily: Fonts.SemiBold,
  },
  paidText: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  payButtonView: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: COLORS.washGrey,
  },
});

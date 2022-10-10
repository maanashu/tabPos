import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { scale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(30),
    flexDirection: 'row',
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
    fontSize: SF(20),
    paddingLeft: SW(4),
  },
  searchView: {
    borderWidth: 1,
    width: SW(65),
    height: SH(40),
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
  textInputStyle: {
    width: SW(45),
    marginLeft: 10,
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
  },
  orderView: {
    backgroundColor: COLORS.orderStatusBackground,
    borderRadius: 8,
    width: SW(80),
    height: SH(100),
    flexDirection: 'row',
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: SW(5),
  },
  orderStatusView: {
    justifyContent: 'center',
    paddingLeft: SW(10),
  },
  orderStatusImage: {
    width: SW(13),
    height: SW(13),
    resizeMode: 'contain',
  },
  countView: {
    justifyContent: 'center',
    paddingLeft: SW(5),
  },
  countText: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(30),
  },
  statusText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    textAlign: 'center',
  },
  orderNumberMainView: {
    width: windowWidth,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orderNumberLeftView: {
    borderRadius: 5,
    width: windowWidth / 2.25,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
  },
  chartView: {
    width: SW(168),
    height: SH(330),
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  chartImageStyle: {
    width: SW(168),
    height: SH(310),
    resizeMode: 'contain',
  },
  orderReviewRightView: {
    width: windowWidth / 2.25,
    borderRadius: 5,
    ...ShadowStyles.shadow,
    height: SW(205),
    backgroundColor: COLORS.white,
  },
  orderReviewText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  reviewHeadingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SW(5),
    alignItems: 'center',
  },
  viewAllView: {
    width: SW(25),
    height: SH(30),
    backgroundColor: COLORS.bluish_green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  viewText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(14),
    textAlign: 'center',
  },
  reviewRenderView: {
    marginHorizontal: SW(5),
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: SW(2),
    borderColor: COLORS.orderStatusBackground,
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: SW(5),
    justifyContent: 'space-between',
  },
  pinIcon: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  nameText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  timeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.dark_grey,
    textAlignVertical: 'center',
    paddingLeft: 2,
  },
  conversionRow: {
    width: windowWidth / 2.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center',
    paddingLeft:SW(7),
  },
  conversionBoxStyle: {
    width: SW(60),
    height: SW(60),
    resizeMode: 'contain',
  },
  renderOrderView: {
    width: SW(70),
    borderRadius: 6,
    height: SW(25),
    backgroundColor: COLORS.textInputBackground,
    marginTop: 5,
    paddingLeft: SW(6),
    justifyContent: 'center',
  },
  deliveryOrders:{
    width:windowWidth/2.25,
    backgroundColor:COLORS.orderStatusBackground,
    borderRadius:5,
    paddingHorizontal:SW(5),
  },
  deliveryViewStyle:{
    backgroundColor:COLORS.white,
    marginVertical:SH(15),
    marginHorizontal:SW(3),
    paddingLeft:SW(2),
    paddingRight:SW(5),
    paddingVertical:SW(1)
  }
});

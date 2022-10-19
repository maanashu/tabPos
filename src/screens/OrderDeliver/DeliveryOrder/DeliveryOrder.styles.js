import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { scale } from 'react-native-size-matters';
import { height, width } from '@/theme/ScalerDimensions';
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
    paddingVertical: SH(35),
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
    paddingVertical: SH(35),
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
    paddingHorizontal: SW(10),
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
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 1,
  },
  pinIcon: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  rightIconStyle: {
    width: SW(10),
    justifyContent: 'center'
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
    alignSelf: 'center',
    paddingLeft: SW(7),
  },
  conversionBoxStyle: {
    width: SW(60),
    height: SW(60),
    resizeMode: 'contain',
  },
  orderFlatlistView: {
    width: SW(100),
    alignItems: 'center',
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
  deliveryOrders: {
    width: windowWidth / 2.25,
    backgroundColor: COLORS.orderStatusBackground,
    borderRadius: 5,
    paddingHorizontal: SW(5),
    paddingTop: SW(3),
  },
  deliveryViewStyle: {
    backgroundColor: COLORS.white,
    marginVertical: SH(15),
    marginHorizontal: SW(3),
    paddingLeft: SW(2),
    paddingRight: SW(5),
    paddingVertical: SW(2),
  },
  totalText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    paddingLeft: 2,
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
  backText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
  },
  orderDetailView: {
    backgroundColor: COLORS.white,
    paddingRight: SW(50)
  },
  profileDetailView: {
    marginHorizontal: SW(5),
    paddingHorizontal: SW(5),
    paddingVertical: SW(3),
    borderRadius: 6,
    backgroundColor: COLORS.textInputBackground,
    marginTop: 4,
    flexDirection: 'row',
  },
  productImageView: {
    flexDirection: 'row',
    width: SW(50)
  },
  profileImage: {
    width: SW(17),
    height: SW(17),
    resizeMode: 'contain',
  },
  scooter: {
    width: SW(17),
    height: SW(18),
    resizeMode: 'contain',
  },
  titleText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    color: COLORS.black,
  },
  boxText: {
    fontFamily: Fonts.Italic,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  productViewStyle: {
    marginLeft: SW(5),
    marginRight: SW(15),
    flexDirection: 'row',
    top: 7,
    justifyContent: 'space-between',
  },
  priceText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: SW(105),
    backgroundColor: COLORS.white,
    width: windowWidth / 1.9,
    ...ShadowStyles.shadow,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SW(100),
    paddingVertical: 2,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  subTotal: {
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  subTotalValue: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  discount: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.solid_grey,
  },
  discountValue: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.darkGray,
  },
  totalLabel: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  totalValue: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  button: {
    width: SW(100),
    height: SW(15),
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    marginRight: 6,
    top: 8,
  },
  buttonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  declineButton: {
    width: SW(50),
    height: SW(15),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignSelf: 'flex-end',
    marginRight: 6,
    top: 8,
  },
  acceptButton: {
    width: SW(50),
    height: SW(15),
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    marginRight: 6,
    top: 8,
  },
  orderReviewButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
    marginTop: 7,
  },
  itemSeparatorView: {
    backgroundColor: COLORS.solidGrey,
    height: 1,
    width: '92%',
    alignSelf: 'center',
  },
  map: {
    width: windowWidth / 2.2,
    height: SW(137),
    alignSelf: 'center',
    borderRadius: 6
  },
  headerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  orderModalView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: Platform.OS === 'android' ? 40 : 10,
    backgroundColor: COLORS.white,
    right: SW(5),
    width: SW(100),
    paddingVertical: 8,
    borderRadius: 7,
  },
  deliveryImage: {
    width: SW(15),
    height: SH(46),
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  },
  deliveryStatus: {
    flexDirection: 'row',
    height: SH(53)
  },
  verifyText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.gerySkies,
  },
  justifyContentStyle: {
    justifyContent: 'flex-end'
  },
  radioImage: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    alignSelf: 'center',
    left: 6
  }
});

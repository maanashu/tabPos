import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SW, SH, SF, ShadowStyles, Fonts, COLORS } from '@/theme';
import { verticalScale, moderateScale, ms } from 'react-native-size-matters';

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
    // width: Platform.OS === 'android' ? windowWidth * 0.275 : windowWidth * 0.27,
    // height:
    //   Platform.OS === "android" ? windowHeight * 0.35 : windowHeight * 0.28,
    resizeMode: 'contain',
    // ...ShadowStyles.shadow2,
    borderRadius: 10,
    paddingHorizontal: moderateScale(15),
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(2),
    marginTop: Platform.OS === 'android' ? verticalScale(4.5) : verticalScale(6),
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
    paddingBottom: Platform.OS === 'ios' ? ms(10) : ms(20),
    flex: 1,
  },

  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: windowWidth * 0.06,
    height: Platform.OS === 'ios' ? windowHeight * 0.875 : windowHeight - ms(50),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? ms(7) : ms(5),
  },
  sideBarImage: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  bucketBackgorund: {
    width: SW(12),
    height: SW(12),
    borderRadius: 5,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBackgorund: {
    width: SW(12),
    height: SW(12),
    borderRadius: 5,
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: SH(10),
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
  dropdown: {
    zIndex: Platform.OS === 'ios' ? 100 : 0,
    fontStyle: Fonts.Regular,
    fontSize: ms(8),
    borderColor: COLORS.transparent,
    padding: 0,
    margin: 0,
    height: ms(15),
    minHeight: ms(24),
    borderWidth: 0,
    borderRadius: ms(5),
    backgroundColor: COLORS.primary,
  },
  dropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: ms(10),
    tintColor: COLORS.white,
    // backgroundColor: "red"
  },
  containerStyle: {
    backgroundColor: COLORS.white,
    width: Platform.OS === 'android' ? ms(110) : ms(98),
    padding: 0,
    marginTop: ms(5),
    // height: ms(20),
    borderWidth: 0,
    // width: ms(88),
    zIndex: 999,
  },
  dateTableSettingFirst: {
    width: ms(60),
    justifyContent: 'center',
  },
  revenueText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    textAlign: 'center',
    letterSpacing: -1,
    width: ms(30),
    // paddingHorizontal:moderateScale(40)
  },
  dateTableSetting: {
    // width: ms(150),
    justifyContent: 'center',
    width: ms(70),
  },
  tableHeaderView: {
    height: Platform.OS === 'ios' ? ms(80) : ms(80),
    justifyContent: 'center',
    width: ms(70),
  },
  dateTableRight: {
    // width: ms(150),
    justifyContent: 'flex-end',
    width: ms(90),
    position: 'absolute',
    right: ms(90),
  },
  dateTablealignStart: {
    // width: SH(185),
    width: ms(120),
    justifyContent: 'flex-start',
  },
  dateTableSetting2: {
    // width: ms(150),
    justifyContent: 'center',
    width: ms(120),
  },
  dateTablealignStart2: {
    // width: SH(185),
    width: ms(120),
    justifyContent: 'flex-start',
  },
  tableMainView: {
    backgroundColor: COLORS.transparent,
    left: ms(4),
    zIndex: -9,
    borderRadius: SW(4),
    overflow: 'hidden',
    marginRight: ms(10),
  },
  revenueDataText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
  },
  revenueDataText2: {
    fontWeight: '500',
    color: COLORS.black,
    fontSize: SF(14),
  },
  bottomTableView: {
    backgroundColor: COLORS.white,
    height: SH(300),
    borderBottomRightRadius: SW(5),
    borderBottomLeftRadius: SW(5),
  },
  backImageStyle: {
    width: SW(10),
    height: SW(10),
    resizeMode: 'contain',
    // top: ms(-2),
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.text,
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginVertical: ms(5),
  },
  tableListHeader: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: SW(4),
    borderTopLeftRadius: SW(4),
    overflow: 'hidden',
    width: Dimensions.get('window').width * 1.8,
  },
  graphHeaderText: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(15),
    fontSize: SF(14),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  graphHeaderView: {
    marginVertical: SH(10),
    backgroundColor: COLORS.white,
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width - SW(63)
        : Dimensions.get('window').width - SW(68),
    marginHorizontal: SW(5),
    borderRadius: SW(5),
  },
  dateText: {
    marginLeft: SW(3),
    fontSize: SF(12),
  },
  calenderImage: {
    height: ms(16),
    width: ms(18),
  },
  headerView: {
    flexDirection: 'row',
    // padding: SW(2),
    // height: ms(20),
    paddingHorizontal: ms(5),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SW(5),
    borderRadius: ms(4),
    borderColor: COLORS.gerySkies,
    borderWidth: 1,
    paddingVertical: ms(4),
  },
  graphTitle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(20),
    color: COLORS.black,
    marginVertical: ms(5),
    height: SH(30),
    // marginLeft: ms(5),
  },
  bullets: {
    height: SH(7),
    width: SH(7),
    borderRadius: SW(7),
    backgroundColor: COLORS.primary,
    marginRight: SW(3),
  },
  bulletText: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    marginRight: SW(5),
  },
  listLoader: {
    marginTop: SH(140),
    marginLeft: SW(150),
    alignItems: 'flex-start',
  },
  flex1: {
    flex: 1,
  },
  listView: {
    // height: Platform.OS === 'ios' ? ms(202) : ms(288),
    // width:
    //   Platform.OS === 'ios'
    //     ? Dimensions.get('window').width - ms(80)
    //     : Dimensions.get('window').width - ms(180),
  },
  listStyle: {
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width * 1.8,
  },
  tableView: {
    zIndex: -99,
    width: Dimensions.get('window').width * 1.8,
  },
  mainListContainer: {
    zIndex: -99,
    backgroundColor: COLORS.white,
    height: Platform.OS === 'ios' ? ms(255) : ms(250),
    borderBottomRightRadius: ms(10),
    borderBottomLeftRadius: ms(10),
    width: Dimensions.get('window').width * 1.8,
  },
  noDataFoundText: {
    fontSize: ms(14),
    color: COLORS.black,
  },
  subContainer: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
    height: ms(65),
    flexDirection: 'row',
    marginVertical: ms(5),
    alignItems: 'center',
    marginHorizontal: ms(10),
  },
  imageStyle: {
    width: ms(25),
    height: ms(25),
  },
  text: {
    fontSize: ms(13),
    color: COLORS.darkGray,
  },
  text2: {
    fontSize: ms(15),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
  },
  headerContainer: {
    // height: ms(310),
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
    marginHorizontal: ms(5),
    marginVertical: ms(10),
    paddingVertical: ms(5),
  },
  calendarModalView: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
  },
  calendarView: {
    // position: 'absolute',
    // right: ms(0),
    // top: ms(10),
    // height: ms(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
  reviewView: {
    borderColor: COLORS.primary,
    // top: 12,
    paddingHorizontal: ms(10),
    paddingVertical: ms(2),
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: ms(2),
  },
  loaderView: {
    paddingVertical: ms(30),
    marginRight: ms(250),
  },
  headerMainView: {
    // height: SH(55),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    ...ShadowStyles.shadow1,
    marginVertical: ms(10),
  },
  backImage: {
    width: ms(24),
    height: ms(24),
    resizeMode: 'contain',
  },
  dropdownStyle: {
    minHeight: ms(28),
    borderWidth: 0,
    borderRadius: ms(5),
    backgroundColor: COLORS.primary,
    width: ms(88),
    zIndex: 999,
  },
  arrowIconStyle: {
    height: ms(16),
    width: ms(16),
    tintColor: COLORS.white,
    marginLeft: SW(-5),
  },
});

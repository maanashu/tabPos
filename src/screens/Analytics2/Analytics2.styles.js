import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
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
    width: Platform.OS === 'android' ? windowWidth * 0.268 : windowWidth * 0.264,
    height: Platform.OS === 'android' ? windowHeight * 0.29 : windowHeight * 0.28,
    resizeMode: 'contain',
    // ...ShadowStyles.shadow2,
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
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
    color: COLORS.navy_blue,
    fontSize: SF(18),
    // flex: 1,
    // height: SH(30),
    // marginRight: SW(10),
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
    paddingRight: ms(8),
    paddingBottom: Platform.OS === 'ios' ? ms(10) : ms(20),
    flex: 1,
  },

  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: ms(30),
    width: windowWidth * 0.06,
    height: Platform.OS === 'ios' ? windowHeight * 0.875 : windowHeight - ms(120),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    // alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? ms(7) : ms(5),
  },
  sideBarImage: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
  },
  bucketBackgorund: {
    // width: ms(20),
    // height: ms(20),
    borderRadius: ms(20),
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
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
    tintColor: COLORS.navy_blue,
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
    fontSize: SF(14),
    borderColor: COLORS.transparent,
    padding: 0,
    margin: 0,
    height: ms(10),
    minHeight: ms(18),
    borderRadius: ms(20),
  },
  dropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: 30,
    tintColor: COLORS.navy_blue,
  },
  containerStyle: {
    backgroundColor: COLORS.white,
    width: SW(50),
    borderRadius: SW(10),
    borderColor: COLORS.transparent,
    borderWidth: 1,
    padding: 0,
    margin: 0,
    height: ms(10),
    minHeight: ms(20),
  },
  dateTableSettingFirst: {
    width: ms(60),
    justifyContent: 'center',
  },
  revenueText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.lavender,
    fontSize: SF(14),
    textAlign: 'center',
    letterSpacing: -1,
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
  },
  revenueDataText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
  },
  revenueDataText2: {
    fontWeight: '500',
    color: COLORS.navy_blue,
    fontSize: SF(14),
  },
  bottomTableView: {
    backgroundColor: COLORS.white,
    height: SH(300),
    borderBottomRightRadius: SW(5),
    borderBottomLeftRadius: SW(5),
  },
  backImageStyle: {
    width: ms(10),
    height: ms(10),
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
    // backgroundColor: COLORS.white,
    // overflow: 'hidden',
    // width: Dimensions.get('window').width - ms(160),
    borderRadius: 5,
    borderBottomWidth: 0,
    borderColor: 'blue',
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
    color: COLORS.navy_blue,
  },
  calenderImage: {
    height: ms(12),
    width: ms(10),
    tintColor: COLORS.navy_blue,
  },
  headerView: {
    flexDirection: 'row',
    // padding: SW(2),
    height: ms(20),
    paddingHorizontal: ms(5),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SW(5),
    borderRadius: SW(10),
    borderColor: COLORS.gerySkies,
    borderWidth: 1,
  },
  graphTitle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(20),
    color: COLORS.navy_blue,
    // marginVertical: ms(5),
    // height: SH(30),
    // marginLeft: ms(5),
  },
  bullets: {
    height: SH(7),
    width: SH(7),
    borderRadius: SW(7),
    backgroundColor: COLORS.navy_blue,
    marginRight: ms(3),
  },
  bulletText: {
    color: COLORS.darkBlue,
    fontSize: SF(12),
    // marginRight: SW(5),
  },
  listLoader: {
    marginTop: SH(140),
    // marginLeft: SW(150),
    // alignItems: 'flex-start',
    alignItems: 'center',
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
    // backgroundColor: COLORS.white,
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').width - ms(150)
        : Dimensions.get('window').width - ms(175),
    // width:
    //   Platform.OS === 'ios'
    //     ? Dimensions.get('window').width - ms(105)
    //     : Dimensions.get('window').width - ms(124),
  },
  tableView: {
    zIndex: -99,
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').width - ms(150)
        : Dimensions.get('window').width - ms(175),

    // width:
    //   Platform.OS === 'ios'
    //     ? Dimensions.get('window').width - ms(105)
    //     : Dimensions.get('window').width - ms(124),
  },
  mainListContainer: {
    zIndex: -99,
    // backgroundColor: COLORS.white,
    height: Platform.OS === 'ios' ? ms(300) : ms(288),
    borderBottomRightRadius: ms(10),
    borderBottomLeftRadius: ms(10),
  },
  noDataFoundText: {
    fontSize: ms(14),
    color: COLORS.navy_blue,
  },
  subContainer: {
    backgroundColor: COLORS.light_green,
    marginRight: ms(5),
    borderRadius: ms(10),
    flex: 1,
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
  },
  imageStyle: {
    width: ms(20),
    height: ms(20),
    tintColor: COLORS.medium_green,
  },
  text: {
    fontSize: ms(10),
    marginTop: ms(10),
    color: COLORS.dark_green,
  },
  text2: {
    fontSize: ms(14),
    color: COLORS.dark_green,
    fontFamily: Fonts.Bold,
  },
  headerContainer: {
    height: ms(100),
    // backgroundColor: COLORS.white,
    // marginHorizontal: ms(4),
    borderRadius: ms(10),
    flexDirection: 'row',
    paddingVertical: ms(8),
    // paddingHorizontal: ms(5),
  },
  calendarModalView: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.6,
    height: windowHeight - SW(30),
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
  },
  calendarView: {
    position: 'absolute',
    right: ms(0),
    top: ms(10),
    height: ms(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
  reviewView: {
    borderColor: COLORS.light_blue2,
    top: 12,
    paddingHorizontal: ms(10),
    paddingVertical: ms(3),
    borderWidth: 1,
    backgroundColor: COLORS.sky_grey,
    borderRadius: ms(10),
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(30),
  },
  bulletView: {
    paddingHorizontal: ms(5),
    backgroundColor: COLORS.light_purple,
    paddingVertical: ms(2),
    marginLeft: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(10),
  },
});

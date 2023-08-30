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
    width: Platform.OS === 'android' ? windowWidth * 0.275 : windowWidth * 0.27,
    height: Platform.OS === 'android' ? windowHeight * 0.29 : windowHeight * 0.28,
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
    fontSize: SF(14),
    borderColor: COLORS.transparent,
    padding: 0,
    margin: 0,
    height: ms(10),
    minHeight: ms(18),
  },
  dropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: 30,
  },
  containerStyle: {
    backgroundColor: COLORS.white,
    width: SW(50),
    borderRadius: SW(2),
    borderColor: COLORS.gerySkies,
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
    color: COLORS.solid_grey,
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
    fontFamily: Fonts.SemiBold,
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
    top: ms(-2),
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
    // width: Dimensions.get('window').width - ms(160),
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
    height: SH(15),
    width: SW(6),
  },
  headerView: {
    flexDirection: 'row',
    padding: SW(2),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SW(5),
    borderRadius: SW(2),
    borderColor: COLORS.gerySkies,
    borderWidth: 1,
  },
  graphTitle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(20),
    color: COLORS.black,
    // marginVertical: ms(5),
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
    height: Platform.OS === 'ios' ? ms(202) : ms(288),
    // width:
    //   Platform.OS === 'ios'
    //     ? Dimensions.get('window').width - ms(80)
    //     : Dimensions.get('window').width - ms(180),
  },
  listStyle: {
    backgroundColor: COLORS.white,
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').width - ms(105)
        : Dimensions.get('window').width - ms(110),
  },
  tableView: {
    zIndex: -99,
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').width - ms(105)
        : Dimensions.get('window').width - ms(110),
  },
  mainListContainer: {
    zIndex: -99,
    backgroundColor: COLORS.white,
    height: Platform.OS === 'ios' ? ms(255) : ms(288),
    borderBottomRightRadius: ms(10),
    borderBottomLeftRadius: ms(10),
  },
  noDataFoundText: {
    fontSize: ms(14),
    color: COLORS.black,
  },
  subContainer: {
    backgroundColor: COLORS.textInputBackground,
    marginRight: ms(5),
    borderRadius: ms(10),
    flex: 1,
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
  },
  imageStyle: {
    width: ms(20),
    height: ms(20),
  },
  text: {
    fontSize: ms(10),
    marginTop: ms(10),
    color: COLORS.darkGray,
  },
  text2: {
    fontSize: ms(14),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
  },
  headerContainer: {
    height: ms(100),
    backgroundColor: COLORS.white,
    marginLeft: ms(4),
    borderRadius: ms(10),
    flexDirection: 'row',
    paddingVertical: ms(8),
    marginRight: ms(10),
    paddingHorizontal: ms(5),
  },
});

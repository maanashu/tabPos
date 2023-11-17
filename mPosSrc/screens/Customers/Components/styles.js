import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { moderateScale, ms } from 'react-native-size-matters';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableDataHeaderCon: {
    height: SH(50),
    backgroundColor: COLORS.textInputBackground,
    textAlign: 'center',
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    width: width * 0.74,
  },
  tableHeaderLeft: {
    flexDirection: 'row',
    width: width * 0.35,
    alignItems: 'center',
  },
  tableTextHeaFirst: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(12),
    letterSpacing: -1,
    width: width * 0.02,
  },
  tableTextHea: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: ms(10),
    letterSpacing: -1,
    width: width * 0.15,
  },
  tableHeaderRight: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: width * 0.6,
  },
  tableHeaderRightInner: {
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  tableTextHeader: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.MaisonBold,
    fontSize: ms(10),
  },
  tableDataCon: {
    height: SH(55),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  tableTextDataFirst: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    letterSpacing: -1,
    width: width * 0.02,
  },
  userNotFound: {
    color: COLORS.primary,
    fontFamily: Fonts.MaisonRegular,
    fontSize: ms(16),
    alignSelf: 'center',
  },
  lovingStyleData: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    borderRadius: 50,
  },
  tableTextDataName: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
    width: width * 0.2,
  },
  tableTextDataAdd: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    width: width * 0.26,
  },
  tableTextData: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  editButtonCon: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 7,
  },
  editButtonText: {
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(7),
    paddingVertical: verticalScale(2),
  },
  searchView: {
    height: ms(30),
    borderRadius: ms(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.row_grey,
  },
  searchImage: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  textInputStyles: {
    width: ms(140),
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
    paddingLeft: 5,
    padding: 0,
    margin: 0,
  },
  horizontalCustomerCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    // width: Platform.OS === 'android' ? ms(100) : ms(75),
    height: ms(30),
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: ms(10),
    paddingHorizontal: ms(20),
    paddingVertical: ms(2),
  },
  horizCustomerText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
  },
  filterContainer: {
    height: ms(40),
    backgroundColor: COLORS.white,
    width: ms(40),
    borderRadius: ms(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ms(10),
  },
  filterIcon: {
    height: ms(16),
    width: ms(16),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(20),
    marginHorizontal: ms(16),
    // flex: 0.5,
  },
  container: {
    backgroundColor: COLORS.white,
    // flex: 1,
    height: ms(40),
    borderRadius: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  searchIcon: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.placeholderText,
    marginRight: ms(10),
    marginLeft: ms(15),
  },

  inputStyle: {
    flex: 1,
    fontFamily: Fonts.Regular,
  },
});

export default styles;

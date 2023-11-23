import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  ticketContainer: {
    borderColor: COLORS.solidGrey,
    // width: SW(350),
    borderRadius: 15,
    // padding: 10,
  },
  header: {
    fontSize: SF(18),
    color: COLORS.black,
    fontFamily: Fonts.MaisonBold,
  },
  description: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.text,
  },
  textInputView: {
    width: SW(325),
    alignItems: 'center',
    flexDirection: 'row',
    height: SH(50),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    paddingHorizontal: moderateScale(12),
    marginVertical: verticalScale(2),
  },
  manIcon: {
    width: SW(17),
    height: SH(17),
    tintColor: COLORS.dark_gray,
  },
  containerStyle: {
    borderColor: 'transparent',
    alignSelf: 'center',
    marginVertical: verticalScale(7),
  },
  textArea: {
    backgroundColor: COLORS.washGrey,
    borderColor: 'transparent',
    color: COLORS.black,
    // paddingVertical: verticalScale(10),
    // paddingHorizontal: moderateScale(10),
    borderRadius: 15,
    height: SH(120),
    fontStyle: 'italic',
    textAlignVertical: 'top',
    flex: 1,
    padding: ms(10),
  },
  cameraInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.light_blue,
    borderWidth: 2,
    borderColor: COLORS.primary,
    fontSize: scale(12),
    borderRadius: 5,
    fontStyle: 'italic',
    borderStyle: 'dashed',
    width: windowWidth * 0.89,
    height: windowHeight * 0.11,
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadView: { width: '100%', height: '100%', justifyContent: 'center' },
  galleryIcon: {
    width: SW(23),
    height: SH(25),
  },
  uploadIcon: {
    width: SW(18),
    height: SH(18),
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScale(2),
  },
  uploadText: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    marginVertical: moderateScale(2),
    fontFamily: Fonts.Regular,
  },
  selectedButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: ms(15),
  },
  selectedText: {
    color: COLORS.white,
  },
  doubledEmailIcon: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingRight: 30,
  },
  doubledEmail: {
    width: SW(330),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    borderColor: 'transparent',
    borderWidth: 0,
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStyle: {
    width: SW(330),
    borderWidth: 0,
    alignSelf: 'center',
    marginVertical: verticalScale(7),
  },
  profileDataCon: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
  },
  nameText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.light_grey,
    // paddingHorizontal: SW(16),
    // paddingTop: SH(10),
  },
  imageTextView: {
    flexDirection: 'row',
    paddingHorizontal: SW(16),
    alignItems: 'center',
    borderRadius: ms(5),
    backgroundColor: COLORS.washGrey,
    paddingVertical: SH(14),
  },
  notesView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(5),
    backgroundColor: COLORS.washGrey,
  },
  input: {
    paddingLeft: SW(10),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    // fontStyle: 'italic',
    fontSize: SF(14),
    flex: 1,
    // height: SH(35),
  },
  userIcon: {
    width: SW(18),
    height: SH(18),
    resizeMode: 'contain',
    tintColor: COLORS.light_grey,
  },
  dropDownIcon: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingRight: 30,
  },
  dropdown: {
    width: '100%',
    // alignSelf: 'center',
    backgroundColor: COLORS.washGrey,
    borderColor: 'transparent',
    marginVertical: verticalScale(2),
    zIndex: Platform.OS === 'ios' ? 100 : 0,
    fontStyle: 'italic',
  },
  containerStyle: {
    alignSelf: 'center',
    marginVertical: verticalScale(7),
    backgroundColor: COLORS.inputBorder,
    // borderRadius: 5,
  },
});

export default styles;

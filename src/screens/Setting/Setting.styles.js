import { StyleSheet, Dimensions, ViewPagerAndroidBase } from 'react-native';
import { SW, SH, SF, ShadowStyles } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dispalyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: windowWidth * 0.22,
    height: windowHeight * 0.96,
    justifyContent: 'center',
  },
  DataCon: {
    width: windowWidth * 0.73,
    height: windowHeight * 0.96,
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(18),
  },
  headingBody: {
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: COLORS.solidGrey,
    height: SW(15),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
  },
  right_light: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },
  security: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  securityText: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },
  notUpdated: {
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  HeaderLabelText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
  },

  // setting security css start
  securityMainCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    height: windowHeight * 0.33,
    padding: 15,
  },
  securityBodyCon: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 10,
    padding: 25,
  },
  securityLogo: {
    width: SW(18),
    height: SW(18),
    resizeMode: 'contain',
  },
  twoStepVerifiCon: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  twoStepText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  securitysubhead: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  twoStepMemberCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
  },
  teamMember: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  toggleSecurity: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  marginLeft: {
    marginLeft: moderateScale(8),
  },
  modalMainView: {
    width:windowWidth * 0.50,
    height:windowHeight * 0.80,
    borderRadius:10,
    borderWidth: 1,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor:COLORS.white
  },
  modalHeaderCon:{
     borderBottomWidth:1,
     borderColor:COLORS.solidGrey,
     height:SH(80),
     paddingHorizontal:moderateScale(10),
     justifyContent:'center'
  },
  crossButton: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  crossButtonCon:{
    width: SW(13),
    height: SW(13),
    justifyContent:'center',
    alignItems:'center'
  },
  modalDataCon:{
    width:windowWidth * 0.38,
    alignSelf:'center',
    flex:1
  },
  primaryClr:{
    color:COLORS.primary
  },
  firstDownloader:{
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  googleAuthCon:{
    borderWidth:1,
    borderColor:COLORS.solidGrey,
    borderRadius:10,
    height:SW(40),
    justifyContent:'center',
    paddingHorizontal:moderateScale(10)
  },
  googleAuthConSel:{
    borderWidth:1,
    borderColor:COLORS.bluish_green,
    backgroundColor:COLORS.light_sky,
    borderRadius:10,
    height:SW(40),
    justifyContent:'center',
    paddingHorizontal:moderateScale(10)
  },
  googleAuth: {
    width: SW(15),
    height: SW(15),
    resizeMode: 'contain',
  },
  googleAuthText:{
    fontSize: SF(22),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  checkboxSec:{
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  fontLeft:{
    fontSize:SF(14),
    marginLeft: moderateScale(8),

  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
    width: SW(70),
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: verticalScale(5),
  },
  checkoutText: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
  },
  checkArrow: {
    width: SW(8),
    height: SW(3),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(6),
    tintColor:COLORS.darkGray
  },
  buttonSetting:{
     alignItems:'center',
  },
  scanCodeCon:{
    width:windowWidth* 0.25,
    alignSelf:'center',
    height:SW(15),
    borderRadius:5,
    backgroundColor:COLORS.textInputBackground,
    justifyContent:'center',
    alignItems:'center'
  },
  scurityScan:{
    width: SW(65),
    height: SW(65),
    resizeMode: 'contain',
    alignSelf:'center'
  }

});

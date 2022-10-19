import { StyleSheet,Dimensions } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.black,
  },
  verifyContainer: {
    width: windowWidth * 0.40,
    height: windowHeight * 0.70,
    // borderWidth: 1,
    borderColor:'grey',
    alignSelf: 'center',
    borderRadius:15,
    alignItems:'center',
    backgroundColor:'#fff',
    ...ShadowStyles.shadow2
  },
  header:{
    fontSize:SF(24),
    color:COLORS.dark_grey,
    fontFamily:Fonts.Regular
  },
  subHeading:{
    fontSize:SF(24),
    color:COLORS.solid_grey,
    fontFamily:Fonts.Regular
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  cellRoot: {
    backgroundColor: COLORS.white,
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 7,
    borderColor: COLORS.solidGrey,
    marginHorizontal: moderateScale(10),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    color: COLORS.black,
  },
 
  selectedText:{
    color:COLORS.white,
    paddingVertical:verticalScale(10)
  },
  buttonText:{
   color:COLORS.darkGray,
   paddingVertical:verticalScale(10)
  },
  submitButton:{
     backgroundColor:COLORS.primary,
     width: windowWidth * 0.35,
  },
  button:{
    backgroundColor:COLORS.textInputBackground,
    width: windowWidth * 0.35,
  },
  popupContainer:{
    width: windowWidth * 0.40,
    height: windowHeight * 0.50,
    borderRadius:30,
    backgroundColor:COLORS.white,
    ...ShadowStyles.shadow,
    alignSelf:'center',
    position:'absolute',
  },
  verifyIcon:{ 
    alignSelf:'center',
    width:SW(160),
    height:SH(160),
    resizeMode:'contain'
  },
  crossButton:{
    width:SW(24),
    height:SH(24),
    resizeMode:'contain',
    // position:'absolute',
    // top:10,
    // right:10
  },
  position:{
     position:'absolute',
    top:20,
    right:1
  },
  success:{
    color:COLORS.primary,
    alignSelf:'center'
  },
  loginBack:{
    fontSize:SF(14),
    color:COLORS.solid_grey,
    fontFamily:Fonts.Regular,
    alignSelf:'center'
  },
});

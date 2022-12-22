import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
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
  position:{
    position:'absolute',
   top:20,
   right:1,
   height:SH(50)
 },
 crossButton:{
  width:SW(24),
  height:SH(24),
  resizeMode:'contain',
  // position:'absolute',
  // top:10,
  // right:10
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
header:{
  fontSize:SF(24),
  color:COLORS.dark_grey,
  fontFamily:Fonts.Regular
},
bodyCon:{
  flex: 1,
   backgroundColor:COLORS.row_grey, 
   justifyContent:'center' 
}
});

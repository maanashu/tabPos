import { StyleSheet, Dimensions } from 'react-native';
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
  flexRow:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center'
  },
  dispalyRow:{
    flexDirection:'row',
    alignItems:"center"
  },
  headingCon:{
    borderWidth:1,
    borderColor:COLORS.solidGrey,
    width:windowWidth * 0.22,
    height:windowHeight * 0.96,
    justifyContent:'center'
  },
  DataCon:{
    borderWidth:1,
    width:windowWidth * 0.73,
    height:windowHeight * 0.96
  },
  headingBody:{
     borderTopWidth:1,
     borderBottomWidth:1,
     borderColor:COLORS.solidGrey,
     height:SW(15),
     paddingHorizontal:moderateScale(10),
     justifyContent:'center'
  },
  right_light:{
     width:SW(8),
     height:SW(8),
     resizeMode:'contain'
  },
  security:{
    width:SW(8),
    height:SW(8),
    resizeMode:'contain',
    tintColor:COLORS.darkGray
 },
 securityText:{
    fontSize:SF(14),
    fontFamily:Fonts.SemiBold,
    color:COLORS.black
 },
 notUpdated:{
  fontSize:SF(11),
  fontFamily:Fonts.Regular,
  color:COLORS.darkGray
 }
 
});

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
  selectItemConatiner: {
    width: SH(100),
    height: SH(35),
    // borderWidth:1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
  },
  orderView: {
    backgroundColor: COLORS.orderStatusBackground,
    borderRadius: 8,
    width: SW(65),
    height: SH(92),
    flexDirection: 'row',
    marginHorizontal:moderateScale(7),
    alignItems:'center',
    justifyContent:'center',
  },
  orderViewBody:{
     width: SW(60),
     height: SH(50),
     justifyContent:'center'
  },
  imageCon:{
    borderRadius:10,
     width: SW(15),
     height: SH(50),
     backgroundColor:COLORS.textInputBackground
  },
  textSkelton:{
     borderRadius:5,
     width: SW(15),
     height: SH(20),
     backgroundColor:COLORS.textInputBackground
  },
  textSkelton2:{
    borderRadius:5,
    width: SW(42),
    height: SH(20),
    backgroundColor:COLORS.textInputBackground
 }
});

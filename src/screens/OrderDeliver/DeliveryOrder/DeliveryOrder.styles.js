import { StyleSheet,Dimensions } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  navigationCon:{
    width:windowWidth * 0.06,
    height:windowHeight,
    borderWidth:1,
    backgroundColor:COLORS.white
  },
  deliveryTruck:{
    width:SW(48),
    height:SH(48),
    resizeMode:'contain',
    borderWidth:2
  }
 
});

import { StyleSheet, Dimensions } from "react-native";
import { SW, SH, SF,ShadowStyles } from "@/theme";
import { COLORS } from "@/theme";
import { Fonts } from "@/assets";
import { verticalScale,moderateScale } from "react-native-size-matters";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    selectItemConatiner:{
      width:SH(100),
      height:SH(35),
      // borderWidth:1,
      borderRadius:3,
      justifyContent:'center',
      alignItems:'center',
      
    },
    selectText:{
      fontFamily:Fonts.Regular,
      fontSize:SF(12)
    }
    
})
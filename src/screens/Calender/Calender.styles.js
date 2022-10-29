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
     displayFlex:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      flexAlign:{
        flexDirection:'row',
        alignItems:'center'
      },
       headerMainView: {
        width: windowWidth - 10,
        paddingHorizontal: SW(16),
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingVertical: SH(35),
        flexDirection: 'row',
    },
    textInputStyle: {
        width: SW(45),
        marginLeft: 10,
        fontFamily: Fonts.Italic,
        fontSize: SF(15),
    },
    truckStyle: {
        width: SH(32),
        height: SH(32),
        resizeMode: 'contain',
        tintColor:COLORS.primary
    },
    deliveryView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deliveryText: {
        fontFamily: Fonts.MaisonRegular,
        color: COLORS.solid_grey,
        fontSize: SF(20),
        paddingLeft: SW(4),
    },
    searchView: {
        borderWidth: 1,
        width: SW(65),
        height: SH(43),
        borderRadius: 20,
        borderColor: COLORS.row_grey,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchImage: {
        width: SH(24),
        height: SH(24),
        resizeMode: 'contain',
        left: 3,
    },
    calenderCon:{
      width:windowWidth * 0.74,
      borderWidth:1,
      height:windowHeight
    },
    notificationCon:{
      width:windowWidth * 0.21,
      borderWidth:1,
      height:windowHeight,
      paddingHorizontal:moderateScale(8)
    },
    approveButtonCon:{
      backgroundColor:COLORS.primary,
      borderRadius:3,
      height:SH(32),
      width:SH(110),
      justifyContent:'center',
      alignItems:'center'
    },
    noButtonCon:{
      backgroundColor:COLORS.dark_grey,
      borderRadius:3,
      height:SH(32),
      width:SH(45),
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:moderateScale(10)
    },
    approveText:{
      color:COLORS.white,
      fontSize:SF(12),
      fontFamily:Fonts.Regular
    },
    requestFor:{
      fontFamily: Fonts.Regular,
      color: COLORS.dark_grey,
      fontSize: SF(15),
    }

})
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
    totalProductCon:{
        backgroundColor:COLORS.white,
        width:SH(632),
        height:SH(432),
        resizeMode:'contain',
        ...ShadowStyles.shadow2,
        borderRadius:10
    }
 

})
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
        borderRadius:10,
        paddingHorizontal:moderateScale(10),
        marginHorizontal:moderateScale(10),

        marginVertical:verticalScale(10)
    },
    rightlight:{
        width: SH(36),
        height: SH(36),
        resizeMode:'contain'
    },
    darkBlackText:{
        fontFamily: Fonts.SemiBold,
        color: COLORS.black,
        fontSize: SF(24),
    },
    productMap:{
        width: SH(602),
        height: SH(234),
        resizeMode:'contain'
    },
    contentContainer:{
        justifyContent:'space-between',
        flex:1
    },
    backButtonCon: {
        backgroundColor: COLORS.textInputBackground,
        borderRadius: 3,
        width: windowWidth * 0.08,
        alignItems: 'center',
        flexDirection: 'row',
      },
      backButtonArrow: {
        width: SW(12),
        height: SW(8),
        resizeMode: 'contain',
        tintColor: COLORS.dark_grey,
      },
      backTextStyle: {
        color: COLORS.dark_grey,
        fontFamily: Fonts.SemiBold,
        fontSize: SF(16),
        paddingVertical: verticalScale(5),
        // paddingHorizontal:moderateScale(5)
      },
      totalProductBodyCon:{
        // borderWidth:1,
        alignSelf:'center',
        width:windowWidth * 0.90
      },
      totalProductDetailCon:{
        backgroundColor:COLORS.textInputBackground,
        borderRadius:10,
        height:SH(426),
        paddingHorizontal:moderateScale(10)
      },
       
    //   totalProductDetail css start
    trancationHeading: {
        fontFamily: Fonts.SemiBold,
        color: COLORS.solid_grey,
        fontSize: SF(24),
      },
      byDayCon: {
        backgroundColor: COLORS.primary,
        borderRadius: 3,
        marginHorizontal: moderateScale(3),
      },
      byDayConLight: {
        // backgroundColor:COLORS.textInputBackground,
        borderRadius: 3,
        marginHorizontal: moderateScale(3),
      },
      todayText: {
        color: COLORS.white,
        fontSize: SF(12),
        fontFamily: Fonts.Regular,
        paddingHorizontal: moderateScale(8),
        paddingVertical: verticalScale(2),
      },
      todayTextLight: {
        color: COLORS.darkGray,
        fontSize: SF(12),
        fontFamily: Fonts.Regular,
        paddingHorizontal: moderateScale(8),
        paddingVertical: verticalScale(2),
      },
      productGraphcon:{
        // borderWidth:1,
        height:SH(218),
      },
      productGraphchildcon:{
        // borderWidth:1,
        height:SH(218),
        width:windowWidth * 0.43,
        backgroundColor:COLORS.white,
        borderRadius:15,
        // paddingHorizontal:moderateScale(10)
      },
      newAddedcon:{
        borderRightWidth:1,
        borderColor:COLORS.solidGrey,
        height:SH(190),
        width:windowWidth * 0.23,
        paddingHorizontal:moderateScale(15)
      },
      addedhr:{
        borderWidth:1,
        borderColor:COLORS.solidGrey,
        marginVertical:verticalScale(3)
      },
      newAddText:{
        fontFamily: Fonts.Regular,
        color: COLORS.bluish_green,
        fontSize: SF(16),
      },
      newAddTextBold:{
        fontFamily: Fonts.SemiBold,
        color: COLORS.bluish_green,
        fontSize: SF(16),
      },
      productDetails:{
        fontFamily: Fonts.MaisonBold,
        color: COLORS.black,
        fontSize: SF(18),
      },
      totalActiveProductCon:{
        height:SH(190),
        width:windowWidth * 0.20,
        // paddingHorizontal:moderateScale(15),
        // borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
      },
      activeProduct:{
        width: SH(130),
        height: SH(130),
        resizeMode:'contain'
      },
      activeProductText:{
        fontFamily: Fonts.SemiBold,
        color: COLORS.black,
        fontSize: SF(14),
      },
      categoryCon:{
        width: SH(270),
        height: SH(94),
        // borderWidth:1,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:moderateScale(15),
        marginVertical:moderateScale(8)
      },
      categoryChildCon:{
        width: SH(150),
        height: SH(94),
        borderBottomLeftRadius:15,
        borderTopLeftRadius:15,
        // borderRadius:15,
        backgroundColor:COLORS.white,
        justifyContent:'center',
        paddingHorizontal:moderateScale(10)
      },
      categoryChildPercent:{
        width: SH(120),
        height: SH(94),
        borderBottomEndRadius:15,
        borderTopEndRadius:15,
        // borderRadius:15,
        backgroundColor:COLORS.blue_shade,
        justifyContent:'center',
        alignItems:'center'
      },
      catPercent:{
        width: SH(50),
        height: SH(30),
        resizeMode:'contain'
      },
      percentText:{
        fontFamily: Fonts.Regular,
        color: COLORS.primary,
        fontSize: SF(12),
      },
      categoryText:{
        fontFamily: Fonts.Regular,
        color: COLORS.dark_grey,
        fontSize: SF(14),
      },
      categoryCount:{
        fontFamily: Fonts.MaisonBold,
        color: COLORS.solid_grey,
        fontSize: SF(32),
      },
      productCategorychildcon:{
        // borderWidth:1,
        height:SH(245),
        width:windowWidth * 0.45,
        backgroundColor:COLORS.white,
        borderRadius:15,
        paddingHorizontal:moderateScale(10)
      },
      

})
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: COLORS.white,
        // paddingHorizontal:moderateScale(10),
      },
      displayFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerMainView: {
        width: windowWidth,
        paddingHorizontal: SW(16),
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingVertical: SH(25),
        flexDirection: 'row',
      },
      backView: {
        width: SW(25),
        height: SW(12),
        backgroundColor: COLORS.textInputBackground,
        flexDirection: 'row',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
      },
      backText: {
        fontFamily: Fonts.SemiBold,
        fontSize: SF(16),
        color: COLORS.dark_grey,
      },
      orderDetailView: {
        width: windowWidth / 2,
        backgroundColor: COLORS.white,
        paddingRight: 10,
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
      deliveryView: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
      },
      deliveryText: {
        fontFamily: Fonts.MaisonBold,
        color: COLORS.solid_grey,
        fontSize: SF(18),
        paddingLeft: SW(4),
      },
      truckStyle: {
        width: SH(28),
        height: SH(28),
        resizeMode: 'contain',
      },
      textInputStyle: {
        width: SW(45),
        marginLeft: 10,
        fontFamily: Fonts.Italic,
        fontSize: SF(15),
      },
      walletMainCon:{
        backgroundColor:COLORS.textInputBackground,
        borderRadius:10,
        paddingHorizontal:moderateScale(12)
      },
      byDayCon:{
        backgroundColor:COLORS.primary,
        borderRadius:3,
        marginHorizontal:moderateScale(3),
      },
      byDayConLight:{
        // backgroundColor:COLORS.textInputBackground,
        borderRadius:3,
        marginHorizontal:moderateScale(3),
      },
      todayText:{
        color:COLORS.white,
        fontSize:SF(12),
        fontFamily:Fonts.Regular,
        paddingHorizontal:moderateScale(8),
        paddingVertical:verticalScale(2)
      },
      todayTextLight:{
        color:COLORS.darkGray,
        fontSize:SF(12),
        fontFamily:Fonts.Regular,
        paddingHorizontal:moderateScale(8),
        paddingVertical:verticalScale(2)
      },
      transationPrice:{
        fontFamily: Fonts.SemiBold,
        color: COLORS.primary,
        fontSize: SF(54),
      },
      trancationHeading:{
        fontFamily: Fonts.SemiBold,
        color: COLORS.solid_grey,
        fontSize: SF(24),
      },
      jbrCoinCon:{
        backgroundColor:COLORS.white,
        borderRadius:5,
        paddingHorizontal:moderateScale(15),
        paddingVertical:verticalScale(15),
        // width:SW(110)
        width:windowWidth * 0.29
      },
      jbrCoinStyle:{
        width: SW(15),
        height: SW(15),
        resizeMode: 'contain',
      },
      arrowStyle:{
        width: SW(5),
        height: SW(5),
        resizeMode: 'contain',
        tintColor:COLORS.darkGray
      },
      jbrCoinheading:{
        fontFamily: Fonts.MaisonBold,
        color: COLORS.black,
        fontSize: SF(18),
      },
      jbrCoinPrice:{
        fontFamily: Fonts.Regular,
        color: COLORS.dark_grey,
        fontSize: SF(30),
      },
      contentContainer: {
        justifyContent: 'space-between',
        flex: 1,
        // paddingHorizontal: SW(5),
      },
      chartCon:{
        // borderWidth:1,
        // width:windowWidth * 0.30
      },
      transactionChartStyle:{
        width: SW(335),
        height: SW(90),
        resizeMode: 'contain',
      },
      backButtonCon:{
        backgroundColor:COLORS.textInputBackground,
        borderRadius:3,
        width:windowWidth * 0.07,
        alignItems:'center',
        flexDirection:'row'
      },
      backButtonArrow:{
        width: SW(12),
        height: SW(8),
        resizeMode: 'contain',
        tintColor:COLORS.dark_grey,
      },
      backTextStyle:{
        color:COLORS.dark_grey,
        fontFamily:Fonts.SemiBold,
        fontSize:SF(16),
        paddingVertical:verticalScale(5)
      },
      trancationHeadingMono:{
          fontFamily: Fonts.MaisonBold,
          color: COLORS.solid_grey,
          fontSize: SF(18),
      },
      jbrTypeCon:{
         backgroundColor:COLORS.textInputBackground,
         height:SH(63),
         justifyContent:'center',
         paddingHorizontal:moderateScale(8),
      },
      allJbrCon:{
        borderWidth:1,
        height:SH(42),
        width:SW(30),
        borderRadius:7,
        borderColor:COLORS.solidGrey,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:moderateScale(4)
      },
      allJbrConBluish:{
        borderColor:COLORS.primary,
      },
      allJbrText:{
        fontFamily: Fonts.Regular,
          color: COLORS.dark_grey,
          fontSize: SF(14),
        },
        allJbrTextbluish:{
          fontFamily: Fonts.SemiBold,
          color: COLORS.primary,
          },
          orderTypeCon:{
            height:SH(63),
            justifyContent:'center',
            paddingHorizontal:moderateScale(12),
            borderBottomWidth:1,
            borderTopWidth:1,
            borderColor:COLORS.solidGrey
         },
         datePickerCon:{
          borderWidth:1,
          height:SH(35),
          width:SW(45),
          borderRadius:7,
          borderColor:COLORS.solidGrey,
          // justifyContent:'center',
          alignItems:'center',
          // marginHorizontal:moderateScale(4),
          paddingHorizontal:moderateScale(7),
          flexDirection:'row'
        },
        calendarStyle:{
          width: SW(5),
          height: SW(5),
          resizeMode: 'contain',
        },
        datePlaceholder:{
          fontFamily: Fonts.Regular,
          color: COLORS.gerySkies,
          fontSize: SF(12),
          paddingHorizontal:moderateScale(5)
        },
        dropDownIcon: {
          width: SW(4),
          height: SW(4),
          resizeMode: 'contain',
          // paddingRight: 30,
          tintColor:COLORS.solidGrey
        },
        // dropdown: {
        //   width:SW(45),
        //   height:SH(8),
        //   // alignSelf: 'center',
        //   borderColor:COLORS.solidGrey,
        //   // borderColor: 'transparent',
        //   // marginVertical: verticalScale(2),
        //   zIndex: Platform.OS === 'ios' ? 100 : 0,
        //   // fontStyle: 'italic',
        //   backgroundColor: COLORS.white,
        // },
        // containerStyle: {
        //   alignSelf: 'center',
        //   width:SW(45),
        //   // marginVertical: verticalScale(7),
        //   backgroundColor: COLORS.white,
        //   borderRadius: 5,
        // },
        // dropDownContainerStyle: {
        //   // borderWidth: 1,
        //   backgroundColor: COLORS.white,
        //   // borderRadius: 7,
        //   zIndex: 1,
        // },
        dropdown:{
          alignSelf:'center',
          backgroundColor:COLORS.white,
          borderColor:COLORS.solidGrey,
          height:SH(20),
          marginHorizontal:moderateScale(4)
        },
        containerStyle:{
          width:SW(45),
           height:SH(20),
           justifyContent:'center',
          //  borderWidth:1,
          //  borderRadius:7,
          //  borderColor:COLORS.black,
        },
        listItemLabelStyle:{
          fontSize:SF(12),
          fontFamily:Fonts.Regular
        },
        labelStyle:{
          fontSize:SF(12),
          fontFamily:Fonts.Regular
        },
        selectedItemLabelStyle:{
          fontSize:SF(12),
          fontFamily:Fonts.Regular
        },
        dropDownContainerStyle:{
          borderWidth:1,
          borderColor:COLORS.solidGrey,
          borderRadius:7,
          backgroundColor:COLORS.white,
          top:30,
          zIndex:Platform.OS === 'ios' ? 100 : 1
        },
        placeholderStyle:{
          fontSize:SF(12),
          fontFamily:Fonts.Regular,
          color:COLORS.gerySkies
        },
        unionCon:{
          // borderWidth:1,
          backgroundColor:COLORS.washGrey,
          height:SH(40),
          justifyContent:'center',
          borderRadius:4
        },
        unionConWhite:{
          // borderWidth:1,
          backgroundColor:COLORS.white,
          height:SH(40),
          justifyContent:'center',
          borderRadius:4
        },
        unionStyle:{
          width:SW(5),
          height:SW(5),
          resizeMode:'contain',
          paddingHorizontal:moderateScale(12)
        },
        paginationCount:{
          fontSize:SF(14),
          fontFamily:Fonts.Regular,
          color:COLORS.black,
          paddingHorizontal:moderateScale(12)
        },
        head: {
          height: SH(50),
          backgroundColor: '#E1E3E4',
          textAlign: 'center',
          // borderWidth: 0,
          borderTopWidth:1,
          borderColor:COLORS.solidGrey
          // borderColor: 'transparent',
      },
      text: {
          fontFamily: Fonts.MaisonBold,
          color: COLORS.dark_grey,
          fontSize: SF(14),
          // textAlign: 'center',
          // borderWidth:1,
          alignSelf:'center'
      },
      tableRowStyle: {
          borderBottomWidth: 1,
          height:SH(63),
          borderBottomColor: COLORS.solidGrey,
          paddingVertical: SH(10)
      },
      tableRowText: {
          fontFamily: Fonts.Regular,
          color: COLORS.solid_grey,
          fontSize: SF(14),
          alignSelf:'center'
          // textAlign: 'center',
      },
      tableMainView: {
        // width: SW(330),
        zIndex: 1
    },
    })
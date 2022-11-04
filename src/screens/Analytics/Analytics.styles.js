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
      tablerightSectionBody:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.65,
        paddingRight: Platform.OS === 'ios' ? 40 : 0,
      },
      tableDataLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
      },
      tableHeaderRight:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.65,
        paddingRight: Platform.OS === 'ios' ? 40 : 0,
      },
      tableHeaderLeft:{
        flexDirection: 'row',
        alignItems:'center',
        width: windowWidth * 0.25,
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
        flex:1,
        alignSelf:'center',
        width:windowWidth * 0.90
      },
      totalProductDetailCon:{
        backgroundColor:COLORS.textInputBackground,
        borderRadius:10,
        height:SH(426),
        paddingHorizontal:moderateScale(10),
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
        fontSize: SF(15),
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
        // paddingHorizontal:moderateScale(10)
      },

         //   totalProductDetail css end


  //   productCategory css start
  categoryHeader:{
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    fontSize: SF(18),
    paddingHorizontal:moderateScale(12)
  },
  orderTypeCon: {
    height: SH(63),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  dropDownIcon: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.solidGrey,
  },
 
  dropdown: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  containerStyle: {
    width: SW(45),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
  },
  listItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  labelStyleWeekly: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    fontFamily:Fonts.SemiBold
  },
  selectedItemLabelStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    top:Platform.OS === 'android' ? 30 : 15,
    zIndex: Platform.OS === 'ios' ? 100 : 1
  },
  placeholderStyle: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  placeholderStyleWeekly: {
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  jbrTypeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: SH(63),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
    borderBottomWidth:1,
    borderColor:COLORS.solidGrey

  },
  dropDownIconPagination: {
    width: SW(4),
    height: SW(4),
    resizeMode: 'contain',
    tintColor: COLORS.darkGreen,
  },
  containerStylePagination: {
    width: SW(20),
    height: SH(35),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    backgroundColor:COLORS.white,
    color:COLORS.solidGrey
  },
  placeholderStylePagination: {
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  unionCon: {
    backgroundColor: COLORS.washGrey,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
  },
  jbrListCon:{
     borderBottomWidth:1,
     borderColor:COLORS.solidGrey
  },
  unionConWhite: {
    backgroundColor: COLORS.white,
    height: SH(40),
    justifyContent: 'center',
    borderRadius: 4,
  },
  unionStyle: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingHorizontal: moderateScale(12),
  },
  paginationCount: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    paddingHorizontal: moderateScale(12),
  },
  tableDataHeaderCon:{
    height: SH(50),
        backgroundColor:COLORS.textInputBackground,
        textAlign: 'center',
        borderWidth: 0,
        borderColor: 'transparent',
    paddingHorizontal:moderateScale(20),
    justifyContent:'center'
  },
  text: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    fontSize: SF(13),
    textAlign: 'center',
    letterSpacing:-1
},
tableDataCon:{
  height:SH(55),
  borderBottomWidth:1,
  borderColor:COLORS.solidGrey,
  justifyContent:'center',
  paddingHorizontal:moderateScale(20)
},
usertableRowText: {
  fontFamily: Fonts.Regular,
  color: COLORS.solid_grey,
  fontSize: SF(12),
  // textAlign: 'center',
},
allienpic:{
  width:SH(42),
  height:SH(42),
  resizeMode:'contain'
},





  //   productCategory css start
  modalMainView: {
    backgroundColor: COLORS.white,
    width: SH(926),
    height:SH(665),
    borderRadius: 15,
    alignSelf: 'center',
    // justifyContent: 'center',
    paddingHorizontal:moderateScale(15)
},
editButtonCon:{
  width: SH(97),
  height:SH(36),
  borderWidth:1,
  borderColor:COLORS.primary,
  borderRadius:7,
  backgroundColor:COLORS.textInputBackground,
  justifyContent:'center',
  alignItems:'center'
},
pencil:{
  width: SH(24),
  height:SH(24),
  resizeMode:'contain'
},
edit:{
  fontSize: SF(14),
  fontFamily: Fonts.SemiBold,
  color: COLORS.primary,
  paddingHorizontal:moderateScale(4)
},
marboloText:{
  fontSize: SF(32),
  fontFamily: Fonts.MaisonBold,
  color: COLORS.solid_grey,
},
marboloRed:{
  width: SH(354),
  height:SH(200),
  resizeMode:'contain'
},
descriptionCon:{
  width:SH(492),
  height:SH(200),
  borderRadius:10,
  borderWidth:1,
  borderColor:COLORS.solidGrey,
  borderStyle:'dashed',
  paddingHorizontal:moderateScale(10)
},
description:{
  fontSize: SF(14),
  fontFamily: Fonts.Regular,
  color: COLORS.dark_grey,
},
sellingPriceConblue:{
  width:SH(200),
  height:SH(98),
  borderRadius:10,
  borderWidth:1,
  borderColor:COLORS.primary,
  borderStyle:'dashed',
  justifyContent:'center',
  paddingLeft:moderateScale(8),
  marginHorizontal:moderateScale(5),
},
sellingPriceCongrey:{
  borderColor:COLORS.solidGrey,
},
sellingCount:{
  fontSize: SF(18),
  fontFamily: Fonts.SemiBold,
  color: COLORS.dark_grey,
},
contentContainer:{
  justifyContent:'space-between',
  flex:1
},
saveButtonCon:{
  width:SH(65),
  height:SH(36),
  backgroundColor:COLORS.primary,
  borderRadius:7,
  justifyContent:'center',
  alignItems:'center'
},
saveText:{
  fontSize: SF(14),
  fontFamily: Fonts.SemiBold,
  color: COLORS.white,
},
sellingPriceInput:{
  width:SH(168),
  height:SH(32),
  backgroundColor:COLORS.solidGrey,
  // borderRadius:7,
  justifyContent:'center',
  alignItems:'center',
  paddingVertical:verticalScale(3),
  fontFamily:Fonts.SemiBold,
  paddingLeft:moderateScale(38)
},
sellingPlaceholder:{
  fontSize: SF(14),
  fontFamily: Fonts.SemiBold,
  color: COLORS.white,
},
//   productCategory css send

//   invoive css start
invoiveIdHeaderCon:{
  height:SH(55),
  borderBottomWidth:1,
  borderColor:COLORS.solidGrey,
  justifyContent:'center',
  paddingHorizontal:moderateScale(8)
},
crossButtonStyle:{
  width:SH(24),
  height:SH(24),
  resizeMode:'contain'
},
printButtonCon:{
  width:SH(110),
  height:SH(36),
  borderRadius:24,
  backgroundColor:COLORS.primary,
  justifyContent:'center',
  alignItems:'center',
  marginHorizontal:moderateScale(15)
},
invoiceIdText:{
  fontSize: SF(20),
  fontFamily: Fonts.Regular,
  color: COLORS.dark_grey,
  paddingHorizontal:moderateScale(5)
},
leftBackStyle:{
  width:SH(34),
  height:SH(34),
  resizeMode:'contain'
},
addressText:{
  fontSize: SF(16),
  fontFamily: Fonts.Regular,
  color: COLORS.dark_grey,
},
trackIdCon:{
  borderWidth:1,
  borderStyle:'dashed',
  borderRadius:10,
  width:SH(240),
  height:SH(82),
  borderColor:COLORS.solidGrey,
  paddingHorizontal:moderateScale(8),
  justifyContent:'center'
},
trackIdText:{
  fontSize: SF(18),
  fontFamily: Fonts.MaisonBold,
  color: COLORS.darkGray,
},
tableContainer:{
  borderRadius:12,
  borderWidth:1,
  borderColor:COLORS.solidGrey,
  paddingHorizontal:moderateScale(10)
},
textInputStyleInvoice:{
  borderWidth:1,
  borderColor:COLORS.solidGrey,
  height:SH(274),
  width:windowWidth * 0.38,
  borderRadius:10,
  backgroundColor:COLORS.textInputBackground,
  color:COLORS.black,
  fontFamily:Fonts.Regular,
  fontSize:SF(14),
  textAlignVertical:'top',
  paddingHorizontal:moderateScale(10)
},
noteContainer:{
  borderWidth:1,
  // backgroundColor:COLORS.,
  borderColor:COLORS.solidGrey,
  height:SH(274),
  width:windowWidth * 0.35,
  borderRadius:10,
  backgroundColor:COLORS.textInputBackground
},
tablesubTotal:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  paddingHorizontal:moderateScale(20),
  // borderBottomWidth:1,
  // borderColor:COLORS.solidGrey,
  // paddingVertical:verticalScale(7)
},
tablesubTotalLabel:{
  color: COLORS.solid_grey,
  fontSize: SF(14),
  fontFamily: Fonts.Regular,
},
tablesubDarkLabel:{
  color: COLORS.solid_grey,
  fontSize: SF(18),
  fontFamily: Fonts.MaisonBold,
},
subtotalHr:{
  borderWidth:1,
  borderColor:COLORS.solidGrey,
  marginVertical:Platform.OS === 'android' ? moderateScale(9) : moderateScale(7)
},
tablesubTotalText:{
  color: COLORS.solid_grey,
  fontSize: SF(14),
  fontFamily: Fonts.MaisonRegular,
},
paidContainer:{
  backgroundColor:COLORS.primary,
  borderRadius:3,
  marginHorizontal:moderateScale(5)
},
paidText:{
  color: COLORS.white,
  fontSize: SF(12),
  fontFamily: Fonts.Regular,
  paddingHorizontal:moderateScale(6),
  paddingVertical:verticalScale(1)
},
shippingDetail:{
  color:COLORS.solid_grey,
  fontFamily:Fonts.MaisonBold,
  fontSize:SF(18),
},
trackingCon:{
  borderWidth:1,
  borderColor:COLORS.solidGrey,
  borderRadius:10,
  height:SH(102),
  justifyContent:'center',
  paddingHorizontal:moderateScale(8)
},
willis:{
  resizeMode:'contain',
  width:SH(72),
  height:SH(72)
},
willisName:{
  color:COLORS.black,
  fontFamily:Fonts.SemiBold,
  fontSize:SF(16),
},
trackingNumber:{
  color:COLORS.black,
  fontFamily:Fonts.Regular,
  fontSize:SF(12),
},
deliverBtnCon:{
  backgroundColor:COLORS.bluish_green,
  flexDirection:'row',
  height:SH(36),
  // width:SW(40),
  alignItems:'center',
  borderRadius:6,
  textAlign:'center'
},
deliverBtnCon:{
  backgroundColor:COLORS.bluish_green,
  flexDirection:'row',
  height:SH(36),
  // width:SW(40),
  alignItems:'center',
  borderRadius:6,
  textAlign:'center'
},
trackingBtnCon:{
  backgroundColor:COLORS.primary,
},
deliverTextCon:{
  paddingHorizontal:moderateScale(10),
  flexDirection:'row'
},
dateTableSetting:{
  // justifyContent:'center',
},
orderNoStyle: {
  fontSize: SF(20),
  color: COLORS.dark_grey,
  fontFamily: Fonts.Regular,
  paddingHorizontal: moderateScale(7),
},
deliveredText:{
  color:COLORS.white,
  fontFamily:Fonts.Regular,
  fontSize:SF(14),
  paddingHorizontal:moderateScale(1)
},
deliveryCheck:{
  resizeMode:'contain',
  width:SW(6),
  height:SW(6),
},


//   invoive css end


      

})
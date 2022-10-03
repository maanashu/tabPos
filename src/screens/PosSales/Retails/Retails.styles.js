import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  // hedaer  css start
  headerCon: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.solidGrey,
    height: SH(88),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  menuStyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
    backgroundColor: COLORS.white,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  scnStyle: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  searchInput: {
    borderRadius: 7,
    width:200,
    fontFamily:Fonts.Italic
    
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(208),
    height: SH(55),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(15),
  },
  purchaseCon: {
    backgroundColor: COLORS.textInputBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: SH(55),
  },
  purcheseStyle: {
    width: SW(13),
    height: SW(13),
    resizeMode: 'contain',
  },
  arrowStyle: {
    width: SW(12),
    height: SW(8),
    resizeMode: 'contain',
  },
  purchaseText: {
    fontSize: scale(6),
    paddingHorizontal: moderateScale(8),
    fontFamily: Fonts.Regular,
  },
  purchasecount: {
    fontSize: scale(6),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  categoryCon: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.solidGrey,
    height: SH(64),
    justifyContent: 'center',
  },
  categoryHeader: {
    fontSize: scale(7),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(8),
    width: SW(50),
  },
  catProcCon1: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    height: SH(50),
    width: SW(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    marginHorizontal: moderateScale(3),
  },
  catProcCon2: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
    height: SH(50),
    width: SW(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    marginHorizontal: moderateScale(3),
  },
  productName1: {
    color: COLORS.white,
    fontSize: SF(15),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(7),
  },
  productName2: {
    color: COLORS.gerySkies,
    fontSize: SF(15),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(7),
  },
  categoryProduct: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },

  // Productcontainer css start

  productContainer: {
    width: SW(112),
    height: SH(300),
    // borderWidth: 1,
    ...ShadowStyles.shadow2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin: 11,
    padding: 15,
    elevation: 4,
    shadowColor: '#000000',
    shadowRadius: 4.84,
    shadowOpacity: 0.01,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  productbody: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  marboloStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: SF(24),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
  },
  proSubName: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  size: {
    fontSize: SF(13),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  cartonButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderRadius: 3,
  },
  singlePackBtn: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderRadius: 3,
    borderColor: COLORS.gerySkies,
    marginHorizontal: moderateScale(6),
  },
  previousRate: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    textDecorationLine:'line-through'
  },
  currentRate: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal:moderateScale(4)
  },
  hrLine: {
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
  },
  plusBtn: {
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
    color: COLORS.darkGray,
  },
  count: {
    fontSize: SF(18),
    color: COLORS.gerySkies,
    paddingHorizontal: moderateScale(10),
  },

  // Productcontainer css end

  rightSideContainer: {
    backgroundColor: COLORS.white,
    height: windowHeight,
    width: SW(116),
    position: 'absolute',
    right: 0,
    top: 0,
    //  borderWidth:1,
    borderColor: COLORS.black,
    //  ...ShadowStyles.shadow2
    elevation: 30,
    shadowColor: '#000000',
    shadowRadius: 4.84,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 6,
      height: 6,
    },
  },
  doubleRightstyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  countCart: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(7),
    borderRadius: 7,
    fontFamily: Fonts.SemiBold,
  },
  clearCart: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    color: COLORS.dark_grey,
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(5),
    borderRadius: 7,
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
    marginHorizontal: moderateScale(5),
  },
  actionButton: {
    borderWidth: 1,
    borderColor: COLORS.bluish_green,
    color: COLORS.bluish_green,
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(5),
    borderRadius: 7,
    fontSize: SF(13),
    fontFamily: Fonts.SemiBold,
  },
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jfrStyle: {
    width: SW(28),
    height: SW(28),
    resizeMode: 'contain',
  },
  jfrContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jfrContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical:verticalScale(20)
    // alignItems:'center'
  },
  jfrText: {
    fontSize: SF(18),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  boxText: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Italic,
  },
  rate: {
    fontSize: SF(18),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(10),
  },
  oneX: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  bottomContainer: {
    borderTopWidth: 1,
    height: SH(330),
    borderColor: COLORS.row_grey,
  },
  bottomSubCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  smalldarkText: {
    fontSize: SF(14),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },
  smallLightText: {
    fontSize: SF(14),
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.darkGray,
  },
  hr: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.row_grey,
  },
  selectedText: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.27,
    height: windowHeight * 0.1,
    borderRadius: 10,
    alignSelf: 'center',
  },

  // amount popup css start
  amountPopupCon: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.7,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignSelf:'center',
    position:'absolute',
  },
  primaryHeader: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
    backgroundColor: COLORS.primary,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  headerText:{
    fontSize:SF(18),
    fontFamily:Fonts.SemiBold,
    color:COLORS.white
  },
  crossButton:{
    width:SW(24),
    height:SH(24),
    resizeMode:'contain',
    tintColor:COLORS.white,
  },
  crossButtonPosition:{
     position:'absolute',
    right:0,
    top:20
  }
  // amount popup css end
});

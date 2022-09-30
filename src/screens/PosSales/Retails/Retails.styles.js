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
  },
  inputWraper: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(200),
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
    height: SH(60),
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
    width: SW(110),
    height: SH(300),
    // borderWidth: 1,
    ...ShadowStyles.shadow2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin:15,
    padding:15
  },
  productbody: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  marboloStyle:{
    width:SW(20),
    height:SW(20),
    resizeMode:'contain'
  },
  productName:{
    fontSize:SF(24),
    color:COLORS.solid_grey,
    fontFamily:Fonts.MaisonRegular
  },
  proSubName:{
    fontSize:SF(11),
    color:COLORS.darkGray,
    fontFamily:Fonts.Regular

  },
  size:{
    fontSize:SF(13),
    color:COLORS.solid_grey,
    fontFamily:Fonts.SemiBold
  },
  cartonButton:{
    backgroundColor:COLORS.primary,
    color:COLORS.white,
    fontSize:SF(12),
    paddingHorizontal:moderateScale(10),
    paddingVertical:verticalScale(2),
    borderRadius:3
  },
  singlePackBtn:{
    color:COLORS.gerySkies,
    fontSize:SF(12),
    fontFamily:Fonts.Regular,
    borderWidth:1,
    paddingHorizontal:moderateScale(10),
    paddingVertical:verticalScale(2),
    borderRadius:3,
    borderColor:COLORS.gerySkies,
    marginHorizontal:moderateScale(6)
  },
  previousRate:{
    color:COLORS.gerySkies,
    fontSize:SF(12),
    fontFamily:Fonts.Regular,
  },
  currentRate:{
    color:COLORS.solid_grey,
    fontSize:SF(16),
    fontFamily:Fonts.SemiBold,
  },
  hr:{
    borderWidth:0.5,
    borderColor:COLORS.solidGrey
  },
  plusBtn:{
    width:SW(24),
    height:SH(24),
    resizeMode:'contain',
    color:COLORS.darkGray
  },
  count:{
    fontSize:SF(20),
    color:COLORS.gerySkies,
    paddingHorizontal:moderateScale(10)
  }

  // Productcontainer css end
});

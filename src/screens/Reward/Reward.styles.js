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
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletMainCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 10,
    alignSelf: 'center',
    width: windowWidth * 0.92,
    height: windowHeight * 0.84,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(7),
  },
  headerMainView: {
    width: windowWidth,
    paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(18),
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
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
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
  textInputStyles: {
    width: SW(45),
    marginLeft: 10,
    fontFamily: Fonts.Italic,
    fontSize: SF(15),
  },
  totalRewardText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: SF(18),
  },
  jobrCountLabel: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: SF(35),
  },
  rewardGraph: {
    width: windowWidth * 0.55,
    height: windowHeight * 0.38,
    resizeMode: 'contain',
  },
  rewardCon: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.4,
    borderRadius: 15,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(8),
  },
  thirdRewardCon: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.20,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 2,
    backgroundColor:COLORS.lightBlue
  },
  firstRewardCon: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.25,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 2,
    backgroundColor:COLORS.primary,
    opacity:0.9,
    padding:10,
    alignItems:'center'
  },
  secondRewardCon: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.23,
    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 2,
    backgroundColor:COLORS.blueLight
  },
  rewaurdMainCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  rewardFlower:{
     height:SH(100),
     width:SW(70),
     resizeMode:'contain',
     alignSelf:"center"
    },
    rewardUserFirst:{
      height:SW(22),
      width:SW(22),
      resizeMode:'contain'
    } ,
    userImageBorder:{
      borderWidth:10,
      width:SW(20),
      height:SW(20),
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      borderColor:COLORS.light_green
    },
    firstText:{
      fontFamily: Fonts.SemiBold,
       color: COLORS.white,
    fontSize: SF(26),
    },
    rewardConPrice:{
      width: windowWidth * 0.07,
      height:windowHeight * 0.06,
      // borderWidth:1,
      borderRadius:5,
      backgroundColor: COLORS.primary,
      
    }
});

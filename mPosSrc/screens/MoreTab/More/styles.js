import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Fonts, SF, SH, SW, ShadowStyles } from '@/theme';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.textinput_bg,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disPlayCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // scrollViewStyle: {
  //   backgroundColor: COLORS.white,
  //   marginTop: 20,
  // },
  // profileDetailView: {
  //   padding: SH(10),
  //   borderRadius: 7,
  //   alignSelf: 'center',
  //   ...ShadowStyles.shadow4,
  //   width: windowWidth * 0.92,
  //   backgroundColor: COLORS.white,
  //   marginVertical: SH(8),
  // },
  // rowCard: {
  //   borderRadius: 7,
  //   padding: SH(12),
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   ...ShadowStyles.shadow1,
  //   width: windowWidth * 0.92,
  //   backgroundColor: COLORS.white,
  //   justifyContent: 'space-between',
  //   marginVertical: SH(6),
  //   paddingHorizontal: SW(10),
  // },

  // img: {
  //   width: SW(24),
  //   height: SW(24),
  //   resizeMode: 'contain',
  // },

  // subName: {
  //   color: COLORS.dark_gray,
  //   fontSize: SF(14),
  //   textAlign: 'center',
  //   fontFamily: Fonts.Regular,
  // },
  // profileIcon: {
  //   margin: -0.5,
  //   width: SW(34),
  //   height: SW(34),
  //   borderRadius: 100,
  // },

  // profileAddress: {
  //   width: SW(220),
  //   fontSize: SF(11),
  //   color: COLORS.black,
  //   fontFamily: Fonts.Regular,
  //   paddingHorizontal: SW(5),
  // },
  // profileId: {
  //   fontSize: SF(11),
  //   color: COLORS.black,
  //   fontFamily: Fonts.SemiBold,
  //   paddingHorizontal: SW(5),
  // },
  // profileCon: {
  //   flexDirection: 'column',
  //   paddingHorizontal: SW(10),
  // },

  // profileLogo: {
  //   width: SH(16),
  //   height: SH(16),
  //   tintColor: COLORS.darkBlue,
  // },
  // alignCenter: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

  moreTabBodyCon: {
    flex: 1,
    paddingHorizontal: ms(10),
  },
  storeNameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(10),
  },
  storeName: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_gray,
    width: ms(300),
  },
  bell: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
  },
  moreProfileSection: {
    marginTop: ms(10),
    backgroundColor: COLORS.white,
    height: ms(190),
    borderRadius: ms(10),
    padding: ms(15),
  },
  profileLogo: {
    width: ms(18),
    height: ms(18),
    tintColor: COLORS.darkBlue,
  },
  profileId: {
    fontSize: ms(10),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: SW(5),
  },
  profileName: {
    fontSize: ms(12),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  profileAddress: {
    // width: SW(220),
    fontSize: ms(10),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    paddingHorizontal: SW(5),
  },
  moreTabRow: {
    borderWidth: 0.4,
    borderColor: COLORS.light_border,
    marginVertical: ms(8),
  },
  moreTabHeading: {
    fontSize: ms(12),
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: SW(5),
  },
  masklogo: {
    width: ms(15),
    height: ms(15),
    resizeMode: 'contain',
    tintColor: COLORS.grayShade,
  },
  moreLogout: {
    borderRadius: 4,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SH(50),
    backgroundColor: COLORS.textinput_bg,
    marginTop: ms(8),
  },
  logoutButtonStyle: {
    color: COLORS.text,
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
  },
  power: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    marginHorizontal: ms(5),
  },
});

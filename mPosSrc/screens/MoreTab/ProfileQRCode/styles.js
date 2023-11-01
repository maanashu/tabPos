import { Dimensions, StyleSheet } from 'react-native';

import { SH, SW, COLORS, SF, ShadowStyles, Fonts } from '@/theme';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.white,
    paddingHorizontal: SW(10),
    alignSelf: 'center',
    alignItems: 'center',
  },
  maincontainer: {
    height: SH(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  backViewStyle: {
    paddingHorizontal: SW(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backIconStyle: {
    width: SH(20),
    height: SH(30),
    tintColor: COLORS.black,
    resizeMode: 'contain',
  },
  container: {
    height: SH(55),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow1,
    width: Dimensions.get('window').width,
  },
  headerTitle: {
    fontSize: SF(14),
    paddingLeft: 4,
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  bodyCon: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  scanImage: {
    width: SW(296),
    height: SW(296),
    resizeMode: 'contain',
  },
  scanDes: {
    fontSize: SF(14),
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
  },
  shareCodeCon: {
    borderWidth: 1,
    width: SW(296),
    height: SH(44),
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLORS.light_grey,
  },
  share: {
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
    marginHorizontal: SW(8),
  },
  scanDesCon: {
    width: SW(340),
    height: SH(60),
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBorder,
  },
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    position: 'absolute',
  },
  emptyView: {
    flex: 1,
    height: Dimensions.get('window').height / 2.5,
  },
  bottomViewStyle: {
    flex: 1,
    bottom: 10,
    position: 'absolute',
  },
});

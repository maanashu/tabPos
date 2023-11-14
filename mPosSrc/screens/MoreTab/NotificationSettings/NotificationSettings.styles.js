import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';
import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerView: {
    height: SH(50),
    flexDirection: 'row',
    alignItems: 'center',
    ...ShadowStyles.shadow1,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  backViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTextStyle: {
    textAlign: 'center',
    color: COLORS.text,
    fontFamily: Fonts.SemiBold,
  },
  backArrowStyle: {
    width: SH(20),
    height: SH(30),
    resizeMode: 'contain',
  },
  qrCodeImageStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  profileImageView: {
    ...ShadowStyles.shadow,
    backgroundColor: COLORS.white,
    width: SW(100),
    height: SW(100),
    alignSelf: 'center',
    borderRadius: SW(50),
    resizeMode: 'contain',
  },
  profileImageStyle: {
    alignSelf: 'center',
    width: SW(100),
    height: SW(100),
    resizeMode: 'cover',
    borderRadius: 97,
  },
  pencilIconStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    right: 10,
  },
  actionSheetItemStyle: {
    textAlign: 'center',
    color: COLORS.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
  cancelItemStyle: {
    textAlign: 'center',
    color: COLORS.red,
    fontFamily: Fonts.SemiBold,
  },
  actionItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalInfoText: {
    fontFamily: Fonts.MaisonMonoBold,
    fontSize: SF(16),
    color: COLORS.dark_gray,
    paddingHorizontal: 20,
  },
  profileDataContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: windowWidth * 0.92,
    paddingHorizontal: SW(20),
  },
  nameText: {
    fontSize: SF(14),
    fontFamily: Fonts.Medium,
    color: COLORS.text,
  },
  userIcon: {
    width: SW(18),
    height: SW(18),
    resizeMode: 'contain',
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueText: {
    fontSize: SF(16),
    color: COLORS.dark_gray,
    fontFamily: Fonts.Medium,
    paddingHorizontal: SW(10),
  },
  rowStyle: {
    paddingLeft: 5,
    width: SW(250),
    justifyContent: 'flex-start',
  },
});

export default styles;

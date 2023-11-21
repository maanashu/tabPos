import { StyleSheet } from 'react-native';
import { SH, SW, COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cellRoot: {
    backgroundColor: COLORS.lineGrey,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.light_border,
    marginHorizontal: moderateScale(5),
    paddingTop: SH(8),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: scale(20),
    color: COLORS.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#979A9A',
    // opacity: 0.2,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: moderateScale(25),
  },
  modalFilter: {
    position: 'absolute',
    width: '86%',
    backgroundColor: 'white',
    borderRadius: moderateScale(16),
  },
  formCont: {
    alignItems: 'center',
    flex: 1,
  },
  formContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(16),
    backgroundColor: '#1FB3FF',
    borderBottomEndRadius: moderateScale(16),
    borderBottomStartRadius: moderateScale(16),
  },
  fieldHeading: {
    fontSize: scale(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    alignItems: 'center',
  },
  subfieldHeading: {
    fontSize: scale(16),
    fontFamily: Fonts.MaisonMonoBold,
    color: COLORS.black,
    alignItems: 'center',
  },
  subHeading: {
    fontSize: scale(24),
    fontFamily: Fonts.MaisonBold,
    color: '#1FB3FF',
    alignItems: 'center',
  },
  field: {
    fontSize: scale(14),
    fontFamily: Fonts.Medium,
    color: COLORS.text,
    alignItems: 'center',
  },
  vectorImg: {
    height: SH(50),
    width: SW(42),
  },
});

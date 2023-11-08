import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Fonts, cross, deleteBack } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale, ms } from 'react-native-size-matters';
import { isTab } from '@common/commonImports';

export const PhonePopUp = ({ value, onPress }) => {
  if (value === 'cross' || value === 'deleteBack') {
    // Render an image for the delete and cross buttons
    const imageSource = value === 'cross' ? cross : deleteBack;

    return (
      <TouchableOpacity
        style={[styles.keyPadButton, { backgroundColor: '#FFFF' }]}
        onPress={() => onPress(value)}
      >
        <Image
          source={imageSource}
          style={{
            resizeMode: 'contain',
            height: SH(20),
            tintColor: '#626262',
            width: SH(20),
          }}
        />
      </TouchableOpacity>
    );
  } else {
    // Render a text button for the numeric keys
    return (
      <TouchableOpacity style={styles.keyPadButton} onPress={() => onPress(value)}>
        <Text style={styles.keyPadText}>{value}</Text>
      </TouchableOpacity>
    );
  }
};
export default PhonePopUp;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  calendarSettingModalContainer: {
    width: windowWidth * 0.5,
    height: ms(420),
    backgroundColor: 'white',
    padding: ms(10),
    paddingVertical: ms(15),
    alignSelf: 'center',
    borderRadius: ms(10),
    alignItems: 'center',
  },
  _btnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth * 0.35,
  },
  declineBtnContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    borderRadius: ms(3),
  },
  acceptbtnContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: ms(3),
    marginLeft: ms(8),
  },
  declineText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.dark_grey,
  },

  input: {
    width: '90%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.35,
    marginVertical: SW(7),
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.32,
    height: SH(60),
  },
  buttonText: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
  },

  keyPadButton: {
    height: SH(110),
    width: isTab ? windowWidth * 0.11 : ms(90),
    justifyContent: 'center',
    borderColor: COLORS.gerySkies,
    alignItems: 'center',
    borderWidth: 0.3,
    borderWidth: 0.5,
  },
  outerBorderRadius: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  keyPadText: {
    fontSize: SH(28),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
  },
  textInputView: {
    paddingHorizontal: SW(12),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: windowHeight * 0.08,
    width: windowWidth * 0.35,
    // marginVertical: 10,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 5,
    marginHorizontal: SW(10),
    // marginBottom:SW(12)
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    color: COLORS.black,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
  },
  textInputContainer: {
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.Italic,
    width: windowWidth * 0.2,
  },
});

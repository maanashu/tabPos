import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { Fonts, radioSelect, radioUnSelect, cross, deleteBack, dropdown } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale, ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { strings } from '@/localization';
import { APPOINTMENT_REQUEST_MODE, CALENDAR_MODES, CALENDAR_TIME_FORMAT, EMPLOYEES_COLOR_SET_MODE } from '@/constants/enums';
import CountryPicker from 'react-native-country-picker-modal';

const PhonePopUp = ({ isVisible, setIsVisible }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [enteredValue, setEnteredValue] = useState('+1');

  const onChangePhoneNumber = phone => {
    setPhoneNumber(phone);
  };

  const KEYBOARD_DATA = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'cross',
    '0',
    'deleteBack',
  ];

  const renderKeyPress = (value) => {
    if (value === 'cross' || value === 'deleteBack') {
      // Render an image for the delete and cross buttons
      const imageSource = value === 'cross' ? cross : deleteBack;

      return (
        <TouchableOpacity
          style={[styles.keyPadButton, styles.outerBorderRadius]}
          onPress={value => {
            if (value === 'cross') {
              setEnteredValue('');
            } else if (value === 'deleteBack') {
              setEnteredValue(prev => prev.slice(0, -1));
            } else {
              setEnteredValue(prev => {
                const newValue = prev + value;
                if (newValue.length > maxCharLength) {
                  return newValue.slice(0, maxCharLength);
                } else {
                  return newValue;
                }
              });
            }
          }}
        >
          <Image
            source={imageSource}
            style={{ resizeMode: 'contain', height: SH(20), width: SH(20), tintColor: COLORS.darkGray }}
          />
        </TouchableOpacity>
      );
    } else {
      // Render a text button for the numeric keys
      return (
        <TouchableOpacity
          style={[styles.keyPadButton, styles.outerBorderRadius]}
          onPress={value => {
            if (value === 'cross') {
              setEnteredValue('');
            } else if (value === 'deleteBack') {
              setEnteredValue(prev => prev.slice(0, -1));
            } else {
              setEnteredValue(prev => {
                const newValue = prev + value;
                if (newValue.length > maxCharLength) {
                  return newValue.slice(0, maxCharLength);
                } else {
                  return newValue;
                }
              });
            }
          }}
        >
          <Text style={styles.keyPadText}>{value}</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.calendarSettingModalContainer}>
        <View style={styles.textInputView}>
          <CountryPicker
            onSelect={code => {
              setFlag(code.cca2);
              if (code.callingCode !== []) {
                setCountryCode('+' + code.callingCode.flat());
              } else {
                setCountryCode('');
              }
            }}
            countryCode={flag}
            withFilter
            withCallingCode
          />
          <Image source={dropdown} style={styles.dropDownIcon} />
          <Text style={styles.countryCodeText}>{countryCode}</Text>
          <TextInput
            maxLength={15}
            returnKeyType="done"
            keyboardType="number-pad"
            value={phoneNumber.trim()}
            onChangeText={onChangePhoneNumber}
            style={styles.textInputContainer}
            placeholder={strings.verifyPhone.placeHolderText}
            placeholderTextColor={COLORS.darkGray}
            showSoftInputOnFocus={false}
          />
        </View>
        <View style={styles.numberPad}>
          <FlatList
            data={KEYBOARD_DATA}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            numColumns={3}
            renderItem={({ item, index }) => (
              renderKeyPress(item)
            )}
          />
        </View>

        <View style={styles._btnContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.declineBtnContainer}
          >
            <Text style={styles.declineText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const calendatSettings = {
                defaultCalendarMode: defaultCalendarMode,
                defaultTimeFormat: defaultTimeFormat,
                defaultAppointmentRequestMode: defaultAppointmentRequestMode,
                defaultEmployeesColorSet: defaultEmployeesColorSet,
              };
              setIsVisible(false);
            }}
            style={[styles.acceptbtnContainer]}
          >
            <Text style={styles.approveText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhonePopUp;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  calendarSettingModalContainer: {
    width: ms(300),
    height: ms(420),
    backgroundColor: 'white',
    padding: ms(10),
    paddingVertical: ms(15),
    alignSelf: 'center',
    borderRadius: ms(10),
    alignItems: "center"
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
    width: "90%",
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
    width: SH(125),
    justifyContent: 'center',
    borderColor: COLORS.gerySkies,
    alignItems: 'center',
    borderWidth: 0.3,
    // borderRadius: 5,
    // overflow: 'hidden', 
  },
  outerBorderRadius: {
    borderRadius:5 ,
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
    borderColor: "#D8D8D8",
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

